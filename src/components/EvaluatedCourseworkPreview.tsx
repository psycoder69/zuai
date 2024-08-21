import { FileMetadata } from "@/schema/FileSchema";

const EvaluatedCourseworkPreview = ({fileMetadata}: {fileMetadata: FileMetadata}) => {
    return (
        <div className="w-full max-w-full flex gap-2 border border-[#f4ead8] rounded-xl p-1.5 cursor-pointer coursework-box">
            <div className="w-[120px] h-40 hidden sm:flex flex-col items-center justify-center border border-[#eaf0f2] rounded-lg bg-white p-2.5">
                <div className="w-[100px] h-[142px] flex items-center rounded-none shadow-sm bg-white px-1 py-2">
                    <div className="flex flex-col items-start gap-[2px] flex-1 self-stretch overflow-auto">
                        <img src={fileMetadata.thumbnail} className="w-full h-auto" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start gap-1.5 flex-1">
                <div className="flex flex-col items-start justify-center gap-1 px-1 py-2">
                    <h4 className="text-lg text-[#3d404b] leading-tight font-['Mont-ExtraBold'] overflow-hidden text-ellipsis line-clamp-2">
                        {
                            fileMetadata.title
                        }
                    </h4>

                    <p className="text-[11px] text-[#7a8196] leading-normal font-['Mont-SemiBold'] overflow-hidden whitespace-wrap break-words text-ellipsis line-clamp-3">
                        {
                            fileMetadata.extractedText
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EvaluatedCourseworkPreview;