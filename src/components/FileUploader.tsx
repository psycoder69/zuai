import Image from "next/image";
import { ChangeEvent, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import FileDropZone from "./FileDropZone";
import { useFileStore } from "../store/FileStore";
import { storeFileWithMetadata } from "../database/indexedDB";
import { getMetadataFromFile } from "../lib/helper";
import { useRouter } from "next/navigation";
import { toast, useToast } from "./ui/use-toast";

const FileUploader = () => {
    const { file, setFile } = useFileStore(state => ({
        file: state.file,
        setFile: state.setFile
    }));

    const router = useRouter();

    const [title, setTitle] = useState("");
    const [coursework, setCoursework] = useState("");
    const [subject, setSubject] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();

    const handleTitleInputChange = (event: ChangeEvent <HTMLInputElement>) => {
        const inputTitle = event.target.value.trim().replace(/\s+/g, ' ');

        if (inputTitle.length <= 96) setTitle(inputTitle);
    };

    const uploadFileAndMetadata = async () => {
        try {
            if (isLoading) return; else setIsLoading(true);

            if (file && title.length && coursework.length) {
                const fileMetadata = await getMetadataFromFile(file, title, coursework, subject);

                const fileId = await storeFileWithMetadata(file, fileMetadata);

                router.push(`/coursework/${fileId}`);

                setFile(null);
            }
        } catch (error: any) {
            console.error(`${error.name}: ${error.message}`);
        }
    };

    return (
        <div className="max-w-[500px] xl:max-w-[600px] flex flex-col items-start gap-6">
            <h1 className="text-2xl lg:text-[28px] leading-snug font-['Mont-ExtraBold'] font-extrabold text-neutral-900 self-stretch xl:pr-0 lg:pr-32">
                <span className="text-[#1e2026]">
                    Hey IB Folks ! Unsure about the quality of your answers?
                </span>
                <span className="text-brand-primary">
                    &nbsp;We get you.
                </span>
            </h1>

            <div className="w-full flex flex-col items-center justify-center gap-8 mx-auto bg-[#fcfbfd] rounded-3xl p-3 lg:p-5">
                <div className="w-full flex flex-col items-start gap-3 lg:gap-6 rounded-2xl">
                    <FileDropZone />

                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="flex flex-col items-start gap-2.5 self-stretch">
                            <p className="text-sm text-normal text-neutrals-600 font-['Mont-SemiBold']">
                                Select your course & subjects*
                            </p>

                            <div className="w-full h-10 flex items-center gap-6">
                                <Select onValueChange={(value) => { setCoursework(value); setSubject("") }}>
                                    <SelectTrigger className="w-fit max-w-[50%] text-[15px] text-[#5b6170] font-['Mont-Bold'] leading-normal border border-[#d6dfe4] rounded-3xl px-3 py-5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-[#94a3b8]">
                                        <SelectValue placeholder="Coursework Type" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="Tok_Essay" className="text-[#5b6170] font-['Bricolage-SemiBold'] cursor-pointer rounded-lg">Tok Essay</SelectItem>
                                        <SelectItem value="Extended_Essay" className="text-[#5b6170] font-['Bricolage-SemiBold'] cursor-pointer rounded-lg">Extended Essay</SelectItem>
                                        <SelectItem value="Internal_Assessment" className="text-[#5b6170] font-['Bricolage-SemiBold'] cursor-pointer rounded-lg">Internal Assessment</SelectItem>
                                    </SelectContent>
                                </Select>

                                {
                                    ((coursework.length > 0) && (coursework !== "Tok_Essay"))
                                    &&
                                    <Select onValueChange={(value) => setSubject(value)} value={subject}>
                                        <SelectTrigger className="w-fit max-w-[50%] text-[15px] text-[#5b6170] font-['Mont-Bold'] leading-normal border border-[#d6dfe4] rounded-3xl px-3 py-5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-[#94a3b8]">
                                            <SelectValue placeholder="Subject" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {
                                                (coursework === "Extended_Essay")
                                                &&
                                                <>
                                                    <SelectItem value="Business_Management" className="text-[#5b6170] font-['Bricolage-SemiBold'] cursor-pointer rounded-md">Business Management</SelectItem>
                                                    <SelectItem value="Economics" className="text-[#5b6170] font-['Bricolage-SemiBold'] cursor-pointer rounded-md">Economics</SelectItem>
                                                    <SelectItem value="Language_and_Literature" className="text-[#5b6170] font-['Bricolage-SemiBold'] cursor-pointer rounded-md">Language and Literature</SelectItem>
                                                </>
                                            }

                                            {
                                                (coursework === "Internal_Assessment")
                                                &&
                                                <>
                                                    <SelectItem value="Mathematics" className="text-[#5b6170] font-['Bricolage-SemiBold'] cursor-pointer rounded-md">Mathematics</SelectItem>
                                                </>
                                            }
                                        </SelectContent>
                                    </Select>
                                }
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-2.5 self-stretch">
                            <p className="text-sm text-normal text-neutrals-600 font-['Mont-SemiBold']">
                                Enter your essay title*(Required)
                            </p>

                            <div className="w-full h-10 flex items-center gap-6 rounded-3xl">
                                <Input id="title" name="title" placeholder="how nation works....." className="max-w-[360px] text-sm text-[#1e2026] font-['Mont-SemiBold'] border border-[#d6dfe4] rounded-3xl px-3 py-5 leading-4 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" onChange={handleTitleInputChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-center gap-2.5 self-stretch">
                    <button className="w-full sm:w-fit h-[40px] inline-flex items-center justify-center gap-2 rounded-3xl whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#6947bf] p-2 pr-6 text-[18px] font-['Mont-Bold'] font-bold leading-[normal] hover:bg-[#6947bf] disabled:bg-[#adb8c9] transition-all" type="button" disabled={!(title.length >= 6 && (coursework === "Tok_Essay" || (coursework.length > 0 && subject.length > 0)))} onClick={uploadFileAndMetadata}>
                        <Image src="/svgs/sparkle.svg" alt="sparkle" width={24} height={24} priority={true} fetchPriority="high" decoding="async" className="size-6 rounded-xl" />

                        <div className="flex items-center justify-between gap-3">
                            <span className="text-white leading-5">
                                {`Evaluat` + (isLoading ? `ing ` : `e `) + `your Score` + (isLoading ? `...` : ``)}
                            </span>

                            {
                                isLoading
                                &&
                                <span className="size-5 border-2 border-[#e5ecf3] b-t-2 border-t-transparent rounded-full animate-spin"></span>
                            }
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUploader;