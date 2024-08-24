import { useState } from "react";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import ScoreRadialChart from "./ScoreRadialChart";
import { EvaluationCriterion } from "@/schema/FileSchema";

const EvaluationCriteriaContainer = ({ criteria, index }: { criteria: EvaluationCriterion, index: number }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const alphabet = ['A', 'B', 'C', 'D', 'E'];

    return (
        <Accordion type="single" collapsible className="w-full rounded-3xl bg-white p-4">
            <AccordionItem value="item-1" className="w-full border-none">
                <AccordionTrigger className={`flex items-center gap-4 hover:no-underline accordian-trigger ${isAccordionOpen ? "pr-3 py-0" : "py-1"}`} onClick={() => { setIsAccordionOpen(prev => !prev); setIsDescriptionOpen(false); }}>
                    <div className={`${isAccordionOpen ? "size-[76px]" : "size-10"} shrink-0 relative transition-all duration-200`}>
                        <ScoreRadialChart size={isAccordionOpen ? 80 : 80} score={criteria.score} maximumScore={criteria.maxScore} />
                    </div>

                    <div className="flex flex-col items-start justify-center">
                        <p className="text-xs text-[#98a1bb] font-['Mont-Bold'] leading-normal">
                            {`Criteria ${alphabet[index]}:`}
                        </p>
                        <p className={`w-auto ${isAccordionOpen ? "text-xl" : "text-base"} text-black font-['Mont-Bold'] leading-normal text-left line-clamp-2`}>
                            {
                                criteria.name
                            }
                        </p>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-auto size-4 shrink-0 cursor-pointer transition-all">
                        <path d="M1.99305 4.91999C1.66638 5.24666 1.66638 5.77332 1.99305 6.09999L7.53305 11.64C7.79305 11.9 8.21305 11.9 8.47305 11.64L14.013 6.09999C14.3397 5.77332 14.3397 5.24666 14.013 4.91999C13.6864 4.59332 13.1597 4.59332 12.833 4.91999L7.99971 9.74666L3.16638 4.91333C2.84638 4.59333 2.31305 4.59332 1.99305 4.91999Z" fill="#5b6170"></path>
                    </svg>
                </AccordionTrigger>

                <AccordionContent className="p-0">
                    <div className="w-full flex flex-col gap-4 border-y border-y-[#d6dfe4] pt-2 pb-6 mt-2">
                        <button type="button" className="cursor-pointer" onClick={() => setIsDescriptionOpen(prev => !prev)}>
                            <p className={`text-sm text-[#5b6170] font-['Mont-SemiBold'] leading-normal text-left ${isDescriptionOpen ? "line-clamp-none" : "line-clamp-3"}`}>
                                {
                                    criteria.remarks
                                }
                            </p>
                        </button>

                        {
                            (criteria.strengths.length > 0)
                            &&
                            <div className="flex flex-col items-start justify-center gap-2">
                                <h3 className="text-xl text-black font-['Mont-ExtraBold'] leading-normal">
                                    Strengths
                                </h3>

                                <div className="flex flex-col items-start gap-2 border border-[#3cc28ab8] rounded-2xl p-4 bg-[#3cc28a05] self-stretch">
                                    {
                                        criteria.strengths.map((strength, index) => (
                                            <div className="flex gap-2" key={index}>
                                                <Image src="/svgs/correct.svg" alt="correct-check" width={20} height={20} priority={true} fetchPriority="high" decoding="async" className="size-5" />

                                                <p className="text-sm text-[#3d404b] font-['Mont-Bold']">
                                                    {
                                                        strength
                                                    }
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }

                        {
                            (criteria.scopeOfImprovement.length > 0)
                            &&
                            <div className="flex flex-col items-start justify-center gap-2">
                                <h3 className="text-xl text-black font-['Mont-ExtraBold'] leading-normal">
                                    Scope of Improvement
                                </h3>

                                <div className="flex flex-col items-start gap-2 border border-[#f9c94e80] rounded-2xl p-4 bg-[#f9c94e05] self-stretch">
                                    {
                                        criteria.scopeOfImprovement.map((improvementRemark, index) => (
                                            <div className="flex gap-2" key={index}>
                                                <Image src="/svgs/warning.svg" alt="warning-icon" width={20} height={20} priority={true} fetchPriority="high" decoding="async" className="size-5" />

                                                <p className="text-sm text-[#3d404b] font-['Mont-Bold']">
                                                    {
                                                        improvementRemark
                                                    }
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-4">
                        <p className="text-xs text-[#5b6170] font-['Mont-SemiBold']">
                            Your feedback will help us to improve our AI Model
                        </p>

                        <div className="flex items-center justify-center gap-5">
                            <button type="button" className="size-7 flex items-center justify-center rounded-full bg-[#eaf0f2] cursor-pointer">
                                <Image src="/svgs/thumbsup.svg" alt="thumbs-up" width={16} height={16} priority={true} fetchPriority="high" decoding="async" className="size-4 shrink-0" />
                            </button>

                            <button type="button" className="size-7 flex items-center justify-center rounded-full bg-[#eaf0f2] cursor-pointer">
                                <Image src="/svgs/thumbsdown.svg" alt="thumbs-down" width={16} height={16} priority={true} fetchPriority="high" decoding="async" className="size-4 shrink-0" />
                            </button>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default EvaluationCriteriaContainer;