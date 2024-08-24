import Image from "next/image";
import MyCourseworkSection from "./MyCourseworkSection";
import ExploreCourseworkSection from "./ExploreCourseworkSection";
import FileUploader from "./FileUploader";
import { useFileMetadataStore } from "@/store/FileMetadataStore";
import { useEffect } from "react";
import { getSortedMetadata } from "@/database/indexedDB";

const Evaluator = () => {
    const { allMetadata, setAllMetadata } = useFileMetadataStore(state => ({
        allMetadata: state.allMetadata,
        setAllMetadata: state.setAllMetadata
    }));

    useEffect(() => {
        (async () => {
            const allSortedMetadata = await getSortedMetadata();

            setAllMetadata(allSortedMetadata);
        })()
    }, []);

    return (
        <main className="w-full flex items-end justify-center flex-grow flex-shrink-0 basis-0 self-stretch relative flex-1">
            <div className="sm:min-h-lvh flex flex-col items-center justify-center gap-8 flex-grow flex-shrink-0 basis-0 self-stretch flex-1 py-10 2xl:py-20">
                <section className="flex items-end justify-center gap-4 px-3 py-5 md:px-5 sm:px-4">
                    <FileUploader />

                    <div className="hidden h-full lg:flex items-end">
                        <Image src="/images/evaluation.webp" alt="evaluation-image" width={290} height={528} priority={true} fetchPriority="high" decoding="async" className="sm:w-[290px] h-auto" />
                    </div>
                </section>

                {
                    (allMetadata && allMetadata.length > 0)
                    &&
                    <>
                        <MyCourseworkSection />
                        <ExploreCourseworkSection />
                    </>
                }
            </div>
        </main>
    );
};

export default Evaluator;