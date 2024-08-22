"use client";

import Image from "next/image";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import UploadedPDFPreview from "./UploadedPDFPreview";
import { useFileStore } from "../store/FileStore";

GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

const FileDropZone = () => {
    const fileInputRef = useRef <HTMLInputElement> (null);

    const { file, setFile } = useFileStore(state => ({
        file: state.file,
        setFile: state.setFile
    }));

    const [isDragging, setIsDragging] = useState <boolean> (false);
    const [error, setError] = useState <string> ("");

    const validateFile = (file: File): boolean => {
        if (file.type !== 'application/pdf' || file.size > 25 * 1024 * 1024) {
            setError("Please upload a valid PDF file (up to 25 MB)");

            return false;
        }

        setError("");

        return true;
    };

    const handleFileInputChange = async (event: ChangeEvent <HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files[0] && fileInputRef.current && validateFile(files[0])) {
            setFile(files[0]);

            fileInputRef.current.value = "";
        }
    };

    const handleDrop = async (event: DragEvent <HTMLDivElement>) => {
        event.preventDefault();

        setIsDragging(false);

        const files = event.dataTransfer.files;

        if (files && files[0] && fileInputRef.current && validateFile(files[0])) {
            setFile(files[0]);

            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={`w-full h-[200px] flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl overflow-hidden svg-dashed-border ${isDragging ? "" : ""}`} onDragEnter={() => setIsDragging(true)} onDragOver={(event) => event?.preventDefault()} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop}>
            <input accept="application/pdf,.pdf" multiple={false} type="file" tabIndex={-1} id="file" name="file" ref={fileInputRef} className="hidden" onChange={handleFileInputChange} />

            {
                file
                    ?
                    <div className="flex flex-col items-center justify-center gap-2">
                        <UploadedPDFPreview fileURL={URL.createObjectURL(file)} />

                        <p className="w-full text-sm text-[#98a1bb] font-['Mont-Bold'] text-center items-baseline text-ellipsis line-clamp-1">
                            {
                                file.name
                            }
                        </p>
                    </div>
                    :
                    <div role="presentation" tabIndex={0}>
                        <div className="flex flex-col items-center justify-center gap-[20px]">
                            <div className="flex flex-col items-center justify-center gap-[9px]">
                                <Image src="/svgs/file.svg" alt="File Logo" width={38} height={48} priority={true} fetchPriority="high" decoding="async" />

                                <div className="text-center">
                                    <p className="text-base font-['Mont-Bold'] font-bold text-neutrals-600 ">
                                        Drag and drop a PDF
                                    </p>
                                    <p className="text-xs font-['Mont-SemiBold'] font-semibold text-neutrals-600">
                                        *Limit 25 MB per file.
                                    </p>
                                </div>
                            </div>

                            <button type="button" className="w-[173px] font-['Mont-ExtraBold'] cursor-pointer rounded-2xl border border-[#cec4eb] bg-[#fcfbfd] px-3 py-2 text-center text-[15px] font-extrabold text-brand-primary upload-button" onClick={() => fileInputRef.current?.click()}>
                                Upload your file
                            </button>
                        </div>
                    </div>
            }
        </div>
    );
};

export default FileDropZone;