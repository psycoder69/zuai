"use client";

import NavBar from "@/components/NavBar";
import EvaluatedPDFViewer from "./EvaluatedPDFViewer";
import EvaluationScorecard from "./EvaluationScorecard";
import StreakPanel from "@/components/StreakPanel";

const EvaluationResults = () => {
    return (
        <div className="size-full flex items-start flex-grow flex-shrink-0 basis-0 self-stretch bg-[#e5ecf3]">
            <NavBar />

            <main className="w-full h-full min-h-lvh flex flex-col lg:flex-row items-start justify-start sm:gap-6 px-4 py-12 2xl:py-20">
                <EvaluatedPDFViewer />
                <EvaluationScorecard />
            </main>

            <StreakPanel />
        </div>
    );
}

export default EvaluationResults;