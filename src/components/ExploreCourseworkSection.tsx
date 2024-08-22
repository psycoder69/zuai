import { useFileMetadataStore } from "@/store/FileMetadataStore";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import EvaluatedCourseworkPreview from "./EvaluatedCourseworkPreview";

const ExploreCourseworkSection = () => {
    const allMetadata = useFileMetadataStore(state => state.allMetadata);

    const sections = ["All", "IA Example", "EE Example", "IO Example", "Tok Example"];

    const [activeSection, setActiveSection] = useState<string>("All");
    const [viewAll, setViewAll] = useState <boolean> (false);

    return (
        <section className="w-full flex items-center justify-center self-stretch px-3 md:px-5 sm:px-4">
            <div className="w-full max-w-[500px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] flex flex-col items-center justify-center gap-3 self-stretch">
                <div className="w-full flex items-start">
                    <h3 className="text-xl text-[#5b6170] font-['Mont-Bold']">
                        Explore Coursework
                    </h3>
                </div>

                <nav className="flex items-center content-center gap-2 flex-wrap self-stretch px-1">
                    {
                        sections.map((section, index) => (
                            <button type="button" className={`flex items-center justify-center gap-2.5 rounded-md px-3 py-1.5 ${activeSection === section ? "bg-[#ffffffa3]" : ""}`} key={index} onClick={() => setActiveSection(section)}>
                                <span className={`text-base ${activeSection === section ? "text-[#6947bf] font-['Mont-ExtraBold']" : "text-[#98a1bb] font-['Mont-Bold']"}`}>
                                    {
                                        section
                                    }
                                </span>
                            </button>
                        ))
                    }
                </nav>

                <div className="w-full max-w-full h-auto grid grid-cols-1 lg:grid-cols-2 items-start justify-start gap-4 self-stretch transition-all">
                    {
                        allMetadata
                            ?
                            allMetadata.map((fileMetadata, index) => {
                                return (
                                    (((activeSection === "All") || (activeSection.split(' ')[0] === fileMetadata.courseCode)) && ((viewAll === true) || (index < 2)))
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

export default ExploreCourseworkSection;