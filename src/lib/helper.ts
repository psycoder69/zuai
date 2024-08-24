import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import { FileMetadata } from "../schema/FileSchema";

GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

const calculateWordCount = (text: string) => {
    return text.split(/\s+/).filter(word => word.length > 0).length;
};

const calculateReadingTime = (totalWordCount: number, wordsPerMinute: number = 180): number => {
    return Math.ceil(totalWordCount / wordsPerMinute);
};

const capitalizeFirstLetter = (text: string) => {
    if (text.length === 0 || text[0] === text[0].toUpperCase()) return text;

    return (text[0].toUpperCase() + text.slice(1));
};

const getCourseCode = (coursework: string) => {
    if (coursework === "Internal_Assessment") return "IA";
    else if (coursework === "Extended_Essay") return "EE";

    return "Tok";
};

const getMetadataFromFile = async (file: File, title: string, coursework: string, subject: string): Promise <FileMetadata> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;

    const getFileThumbnail = async () => {
        try {
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1.5 });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (context) {
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: context, viewport: viewport }).promise;

                return canvas.toDataURL("image/png");
            }
        } catch (error: any) {
            console.error(`Error generating file thumbnail: ${error.name}: ${error.message}`);
        }

        return "";
    };

    const pageCount = pdf.numPages;

    let fileTextContent = "", wordCount = 0;

    for (let pageNum = 1; pageNum <= pageCount; pageNum ++) {
        const page = await pdf.getPage(pageNum);
        const pageTextContent = await page.getTextContent();

        const pageText = pageTextContent.items.map((item) => {
            return ((typeof(item) === "object" && "str" in item) ? item.str : "");
        }).join(" ");

        const cleanedPageText = pageText.replace(/\s+/g, ' ').trim();

        fileTextContent += (cleanedPageText + "\n");
        wordCount += calculateWordCount(pageText);
    }

    return {
        fileId: "",
        fileName: file.name,
        fileSizeInBytes: file.size,
        totalPages: pageCount,
        totalWordCount: wordCount,
        readingTime: calculateReadingTime(wordCount),
        extractedText: capitalizeFirstLetter(fileTextContent),
        thumbnail: await getFileThumbnail(),
        language: "English",
        fileCreationDate: new Date(),
        lastAccessedDate: new Date(),
        coursework: coursework,
        courseCode: getCourseCode(coursework),
        subject: subject,
        title: capitalizeFirstLetter(title),
        isEvaluated: false,
        evaluationResult: {
            evaluationDate: new Date(),
            evaluationScore: 0,
            maximumScore: 0,
            grade: "",
            criteriaArray: []
        }
    };
};

export { getMetadataFromFile };