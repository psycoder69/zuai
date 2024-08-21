import React, { useEffect, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { useFileStore } from '../store/FileStore';

const UploadedPDFPreview = ({ fileURL }: { fileURL: string }) => {
    const setFile = useFileStore(state => state.setFile);

    const [images, setImages] = useState <string[]> ([]);

    useEffect(() => {
        const renderPdf = async () => {
            if (!fileURL) return;

            try {
                const loadingTask = pdfjs.getDocument(fileURL);
                const pdfDoc = await loadingTask.promise;

                const imagePromises = [];

                for (let i = 1; i <= pdfDoc.numPages; i++) {
                    const page = await pdfDoc.getPage(i);

                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    if (context) {
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;

                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport,
                        };

                        await page.render(renderContext).promise;

                        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.75);
                        imagePromises.push(imageDataUrl);
                    }
                }

                const images = await Promise.all(imagePromises);

                setImages(images);
            } catch (error: any) {
                console.error(`${error.name}: ${error.message}`);
            }
        };

        renderPdf();
    }, [fileURL]);

    return (
        <div className="relative z-10">
            <button type="button" className="absolute right-[-10px] top-[-10px] z-20 cursor-pointer rounded-full border bg-white p-[2px]" onClick={() => setFile(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x size-3">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
            </button>

            <div className="w-[140px] h-auto max-h-[140px] flex items-start justify-center border border-[#d6dfe4] rounded-[6px] relative z-10 p-2 overflow-auto">
                {
                    images.length
                    ?
                    images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Page ${index + 1}`}
                            className="w-full h-auto shadow-md"
                        />
                    ))
                    :
                    <div className="w-[120px] h-[120px] flex items-center justify-center">
                        <span className="spinner"></span>
                    </div>
                }
            </div>
        </div>
    );
};

export default UploadedPDFPreview;
