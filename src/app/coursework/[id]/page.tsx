"use client";

import NavBar from "@/components/NavBar";
import EvaluatedPDFViewer from "./EvaluatedPDFViewer";
import EvaluationScorecard from "./EvaluationScorecard";
import StreakPanel from "@/components/StreakPanel";
import { FileMetadata } from "@/schema/FileSchema";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getMetadataById } from "@/database/indexedDB";

const EvaluationResults = () => {
    const pathname = usePathname();
    const routes = pathname.split("/");
    const fileId = routes[routes.length - 1];

    const [fileMetadata, setFileMetadata] = useState <FileMetadata> ();

    useEffect(() => {
        try {
            (async () => {
                setFileMetadata(await getMetadataById(fileId));
            })();
        } catch (error: any) {
            console.error(`${error.name}: ${error.message}`);
        }
    }, []);

    return (
        <div className="size-full flex items-start flex-grow flex-shrink-0 basis-0 self-stretch bg-[#e5ecf3]">
            <NavBar />

            <main className="size-full min-h-lvh flex flex-col lg:flex-row items-start justify-start 2xl:justify-center sm:gap-6 px-4 py-12 2xl:py-20 relative mx-auto space-y-2.5 lg:space-y-0">
                {
                    fileMetadata
                    &&
                    <>
                        <EvaluatedPDFViewer fileName={fileMetadata.fileName} />
                        <EvaluationScorecard fileId={fileId} fileMetadata={fileMetadata} />
                    </>
                }
            </main>

            <StreakPanel />
        </div>
    );
}

export default EvaluationResults;