"use client";

import { useEffect, useState } from "react";
import ScoreRadialChart from "./ScoreRadialChart";
import EvaluationCriteriaContainer from "./EvaluationCriteriaContainer";
import { EvaluationResult, FileMetadata } from "@/schema/FileSchema";
import { updateEvaluationResult } from "@/database/indexedDB";
import { Skeleton } from "@/components/ui/skeleton";
import { getEvaluationResultFromAI } from "@/lib/gemini";

const EvaluationScorecard = ({ fileId, fileMetadata }: { fileId: string, fileMetadata: FileMetadata }) => {
    const [evaluationResult, setEvaluationResult] = useState<EvaluationResult>();

    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString("en-us", { month: "long" });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    useEffect(() => {
        if (fileMetadata) {
            if (fileMetadata.isEvaluated === false) {
                (async () => {
                    const newEvaluationResult = await getEvaluationResultFromAI(
                        fileMetadata.coursework,
                        fileMetadata.subject,
                        fileMetadata.extractedText
                    );

                    if (newEvaluationResult) {
                        setEvaluationResult(newEvaluationResult);

                        await updateEvaluationResult(fileId, newEvaluationResult);
                    }
                })()
            } else {
                setEvaluationResult(fileMetadata.evaluationResult);
            }
        }
    }, [fileMetadata]);

    return (
        <section className="w-full lg:w-2/5 h-full flex flex-col items-start gap-3.5 rounded-3xl">
            {
                evaluationResult
                    ?
                    <div className="w-full flex items-center justify-between gap-5 rounded-3xl bg-white p-3 pl-6">
                        <div className="flex flex-col items-start gap-0.5 flex-1">
                            <p className="text-sm text-[#3d404b] font-['Mont-Bold'] leading-normal">
                                Overall Score
                            </p>

                            <p className="text-2xl text-[#3d404b] font-['Mont-ExtraBold'] leading-normal">
                                {`Remark : `}

                                <span className="text-[#98a1bb]">
                                    {
                                        evaluationResult.grade
                                    }
                                </span>
                            </p>

                            <p className="text-xs text-[#98a1bb] font-['Mont-SemiBold'] leading-normal">
                                {
                                    `Evaluated on ${formatDate(evaluationResult.evaluationDate)}`
                                }
                            </p>
                        </div>

                        <div className="size-[84px] flex items-center justify-center shrink-0">
                            <ScoreRadialChart size={84} score={evaluationResult.evaluationScore} maximumScore={evaluationResult.maximumScore} />
                        </div>
                    </div>
                    :
                    <Skeleton className="w-full h-[104px] rounded-3xl bg-[#ffffffcc]" />
            }

            <div className="w-full flex flex-col items-start gap-2 self-stretch">
                {
                    evaluationResult
                        ?
                        evaluationResult.criteriaArray.map((criteria, index) => (
                            <EvaluationCriteriaContainer key={index} criteria={criteria} index={index} />
                        ))
                        :
                        [0,0,0,0,0].map((element, index) => (
                            <Skeleton key={index} className="w-full h-[82px] rounded-3xl bg-[#ffffffcc]" />
                        ))
                }
            </div>
        </section>
    )
};

export default EvaluationScorecard;