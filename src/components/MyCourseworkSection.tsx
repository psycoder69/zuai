import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { useFileMetadataStore } from "@/store/FileMetadataStore";
import EvaluatedCourseworkPreview from "./EvaluatedCourseworkPreview";

const MyCourseworkSection = () => {
    const allMetadata = useFileMetadataStore(state => state.allMetadata);

    const [viewAll, setViewAll] = useState<boolean>(false);

    return (
        <section className="w-full flex items-center justify-center self-stretch px-3 md:px-5 sm:px-4">
            <div className="w-full max-w-[500px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] flex flex-col items-center justify-center gap-3 self-stretch">
                <div className="w-full max-w-full flex items-start">
                    <h3 className="text-xl text-[#5b6170] font-['Mont-Bold']">
                        My Coursework
                    </h3>
                </div>

                <div className="w-full max-w-full h-auto grid grid-cols-1 lg:grid-cols-2 items-start justify-start gap-4 self-stretch transition-all">
                    {
                        allMetadata
                            ?
                            allMetadata.map((fileMetadata, index) => {
                                return (((viewAll === true) || (index < 2))
                                    ?
                                    <Link href={`/coursework/${fileMetadata.fileId}`} as={`/coursework/${fileMetadata.fileId}`} key={fileMetadata.fileId}>
                                        <EvaluatedCourseworkPreview fileMetadata={fileMetadata} />
                                    </Link>
                                    :
                                    null
                                );
                            })
                            :
                            <>
                                <Skeleton className="w-full h-[174px] rounded-xl bg-[#ffffffcc]" />
                                <Skeleton className="w-full h-[174px] rounded-xl bg-[#ffffffcc]" />
                            </>
                    }
                </div>

                {
                    (allMetadata && (allMetadata.length > 2))
                    &&
                    <div className="w-full flex itens-center justify-center">
                        <button type="button" className="text-base text-[#98a1bb] font-['Mont-Bold'] px-1 py-1.5 hover:underline" onClick={() => setViewAll(prev => !prev)}>
                            {
                                viewAll ? `view less` : `view all`
                            }
                        </button>
                    </div>
                }
            </div>
        </section>
    );
};

export default MyCourseworkSection;