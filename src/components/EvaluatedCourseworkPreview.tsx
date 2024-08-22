import { FileMetadata } from "@/schema/FileSchema";
import Image from "next/image";

const EvaluatedCourseworkPreview = ({ fileMetadata }: { fileMetadata: FileMetadata }) => {
    return (
        <div className="w-full max-w-full flex gap-2 border border-[#f4ead8] rounded-xl p-1.5 cursor-pointer coursework-box">
            <div className="w-[120px] h-40 hidden sm:flex flex-col items-center justify-center border border-[#eaf0f2] rounded-lg bg-white p-2.5">
                <div className="w-[100px] h-[142px] flex items-center rounded-none shadow-sm bg-white px-1 py-2">
                    <div className="flex flex-col items-start gap-[2px] flex-1 self-stretch overflow-auto relative">
                        <Image src={fileMetadata.thumbnail} alt="file-thumbnail" fill className="w-full h-auto object-contain" loading="lazy" />
                    </div>
                </div>
            </div>

            <div className="h-40 flex flex-col items-start gap-1.5 flex-1 overflow-auto">
                <div className="flex flex-col items-start justify-center gap-1 px-1 py-2">
                    <h4 className="text-lg text-[#3d404b] leading-tight font-['Mont-ExtraBold'] overflow-hidden text-ellipsis line-clamp-2">
                        {
                            fileMetadata.title
                        }
                    </h4>

                    <p className="text-[11px] text-[#7a8196] leading-normal font-['Mont-SemiBold'] overflow-hidden whitespace-wrap break-words text-ellipsis line-clamp-2">
                        {
                            fileMetadata.extractedText
                        }
                    </p>

                    <div className="max-w-full max-h-full flex items-start gap-1 flex-wrap mt-1">
                        {
                            (fileMetadata.subject.length > 0)
                            &&
                            <div className="flex items-center gap-1 rounded-full bg-white p-0.5 pr-2.5">
                                <Image src="/images/person.png" alt="coursework" width={16} height={16} priority fetchPriority="high" decoding="async" />

                                <span className="text-[11px] text-[#5b6170] font-['Mont-Bold'] leading-normal">
                                    {
                                        fileMetadata.subject.replaceAll("_", " ")
                                    }
                                </span>
                            </div>
                        }

                        <div className="flex items-center gap-1 rounded-full bg-white p-0.5 pr-2.5">
                            <Image src="/images/notes.png" alt="coursework" width={16} height={16} priority fetchPriority="high" decoding="async" />

                            <span className="text-[11px] text-[#5b6170] font-['Mont-Bold'] leading-normal">
                                {
                                    `${fileMetadata.totalWordCount} words`
                                }
                            </span>
                        </div>

                        <div className="flex items-center gap-1 rounded-full bg-white p-0.5 pr-2.5">
                            <Image src="/images/clock.png" alt="coursework" width={16} height={16} priority fetchPriority="high" decoding="async" />

                            <span className="text-[11px] text-[#5b6170] font-['Mont-Bold'] leading-normal">
                                {
                                    `${fileMetadata.readingTime} mins read`
                                }
                            </span>
                        </div>

                        <div className="flex items-center gap-1 rounded-full bg-white p-0.5 pr-2.5">
                            <Image src="/images/hand.png" alt="coursework" width={16} height={16} priority fetchPriority="high" decoding="async" />

                            <span className="text-[11px] text-[#5b6170] font-['Mont-Bold'] leading-normal">
                                {
                                    fileMetadata.coursework.replaceAll("_", " ")
                                }
                            </span>
                        </div>

                        <div className="flex items-center gap-1 rounded-full bg-white p-0.5 pr-2.5">
                            <Image src="/images/star.png" alt="coursework" width={16} height={16} priority fetchPriority="high" decoding="async" />

                            <span className="text-[11px] text-[#5b6170] font-['Mont-Bold'] leading-normal">
                                {
                                    `${fileMetadata.evaluationResult.evaluationScore}/${fileMetadata.evaluationResult.maximumScore}`
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvaluatedCourseworkPreview;