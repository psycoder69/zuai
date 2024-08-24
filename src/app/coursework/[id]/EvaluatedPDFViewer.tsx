import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getFileById } from "@/database/indexedDB";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

const EvaluatedPDFViewer = ({ fileName }: { fileName: string }) => {
    const pathname = usePathname();
    const routes = pathname.split("/");
    const fileId = routes[routes.length - 1];

    const [fileURL, setFileURL] = useState<string>("");

    useEffect(() => {
        try {
            (async () => {
                setFileURL(URL.createObjectURL(await getFileById(fileId)));
            })();
        } catch (error: any) {
            console.error(`${error.name}: ${error.message}`);
        }
    }, []);

    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(50);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <section className="w-full lg:w-3/5 h-[calc(100lvh-96px)] flex rounded-3xl lg:sticky lg:top-12">
            <div className="size-full rounded-3xl">
                <div className="size-full flex flex-col items-center justify-start overflow-hidden rounded-3xl">
                    <div className="w-full flex items-center justify-between gap-2 flex-wrap bg-[#ffffff7a] p-3">
                        <div className="max-w-48 rounded-xl bg-white px-3 py-1">
                            <p className="w-full truncate text-sm text-[#3d404b] font-['Bricolage-SemiBold'] leading-normal">
                                {
                                    fileName
                                }
                            </p>
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center justify-center gap-2">
                                <button type="button" onClick={() => setScale(prevScale => Math.max(prevScale - 10, 20))}>
                                    <Image src="/svgs/zoomout.svg" alt="zoom-out" width={20} height={21} priority={true} fetchPriority="high" decoding="async" />
                                </button>

                                <span className="text-sm text-[#7a8196] font-['Bricolage-SemiBold'] leading-normal">
                                    {
                                        `${scale}%`
                                    }
                                </span>

                                <button type="button" onClick={() => setScale(prevScale => Math.min(prevScale + 10, 200))}>
                                    <Image src="/svgs/zoomin.svg" alt="zoom-in" width={20} height={21} priority={true} fetchPriority="high" decoding="async" />
                                </button>
                            </div>

                            <div className="flex items-center justify-center gap-3">
                                <button type="button" className="rounded-full bg-white p-1">
                                    <Image src="/svgs/expand.svg" alt="expand" width={16} height={17} priority={true} fetchPriority="high" decoding="async" />
                                </button>

                                <button type="button" className="hidden sm:flex gap-0.5 rounded-full bg-white p-1 pr-3 cursor-pointer">
                                    <Image src="/svgs/shrink.svg" alt="shrink" width={16} height={16} priority={true} fetchPriority="high" decoding="async" />
                                    <p className="text-xs text-[#5b6170] font-['Mont-Bold'] leading-normal">
                                        Expand
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={`size-full flex ${(scale > 60) ? "items-start justify-start" : "items-center justify-center"} border border-[#c1ccd6] rounded-b-3xl bg-white p-4 relative inset-0 overflow-auto`}>
                        {
                            (fileURL.length > 0)
                                ?
                                <Document file={fileURL} onLoadSuccess={onDocumentLoadSuccess} className="max-w-fit absolute shadow-xl">
                                    <Page pageNumber={pageNumber} scale={scale / 100} />
                                </Document>
                                :
                                <span className="size-24 border-2 border-[#e5ecf3] b-t-2 border-t-transparent rounded-full animate-spin"></span>
                        }
                    </div>

                    {/* <div>
                        <p>Page {pageNumber} of {numPages}</p>

                        <button
                            onClick={() => setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1))}
                            disabled={pageNumber <= 1}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages))}
                            disabled={pageNumber >= numPages}
                        >
                            Next
                        </button>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default EvaluatedPDFViewer;