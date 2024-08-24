import { openDB } from "idb";
import { gzipSync, gunzipSync } from "fflate";
import { v4 as uuidv4 } from "uuid";
import { EvaluationResult, FileMetadata } from "../schema/FileSchema";

const setupDatabase = async () => {
    try {
        const db = await openDB("ZuAI Database", 1, {
            upgrade(db) {
                const fileStore = db.createObjectStore("files", { keyPath: "id" });
                const metadataStore = db.createObjectStore('metadata', { keyPath: "fileId" });

                fileStore.createIndex("id", "id", { unique: true });
                metadataStore.createIndex("fileId", "fileId", { unique: true });
                metadataStore.createIndex("fileCreationDate", "fileCreationDate", { unique: true });
            },
        });

        return db;
    } catch (error: any) {
        console.error(`Failed to set up the database`);
        console.error(`${error.name}: ${error.message}`);

        throw new Error(`Database setup failed`);
    }
};

// Function to compress and store a PDF file with metadata
export const storeFileWithMetadata = async (file: File, fileMetadata: FileMetadata) => {
    try {
        const db = await setupDatabase();

        const fileId = uuidv4();

        const fileBuffer = await file.arrayBuffer();
        const compressedFile = gzipSync(new Uint8Array(fileBuffer));

        const transaction = db.transaction(["files", "metadata"], "readwrite");

        const fileStore = transaction.objectStore("files");
        const metadataStore = transaction.objectStore("metadata");

        const fileData = { id: fileId, file: compressedFile };

        const metadataData = { ...fileMetadata, fileId: fileId };

        await fileStore.add(fileData);
        await metadataStore.add(metadataData);

        await transaction.done;

        return fileId;
    } catch (error: any) {
        console.error(`${error.name}: ${error.message}`);

        throw new Error(`File and metadata storage failed`);
    }
};

// Function to retrieve a file and its metadata by fileId
export const getFileAndMetadata = async (fileId: string) => {
    try {
        const db = await setupDatabase();

        const transaction = db.transaction(["files", "metadata"], "readonly");

        const fileStore = transaction.objectStore("files");
        const metadataStore = transaction.objectStore("metadata");

        const file = await fileStore.get(fileId);
        const metadata = await metadataStore.get(fileId);

        if (!file || !metadata) throw new Error("File or metadata not found");

        let decompressedFile: Uint8Array | null = null;

        if (file.fileData) {
            try {
                decompressedFile = gunzipSync(file.fileData);
            } catch (decompressionError) {
                console.error('Error decompressing file data:', decompressionError);
                throw new Error('Failed to decompress file data');
            }
        }

        const fileBlob = new Blob([decompressedFile || file.fileData], { type: "application/pdf" });
        const fileObject = new File([fileBlob], "retrieved.pdf", { type: "application/pdf" });

        await transaction.done;

        return { file: fileObject, fileMetadata: metadata };
    } catch (error: any) {
        console.error(`Failed to retrieve file and metadata`);
        console.error(`${error.name}: ${error.message}`);

        throw new Error("File and metadata retrieval failed");
    }
};

export const getFileById = async (fileId: string) => {
    try {
        const db = await setupDatabase();
        const transaction = db.transaction("files", "readonly");
        const fileStore = transaction.objectStore("files");

        const { file } = await fileStore.get(fileId);

        if (!file) throw new Error("File not found");

        let decompressedFile: Uint8Array;

        try {
            decompressedFile = gunzipSync(file);
        } catch (decompressionError) {
            console.error("Error decompressing file data:", decompressionError);
            throw new Error("Failed to decompress file data");
        }

        const fileBlob = new Blob([decompressedFile], { type: "application/pdf" });
        const fileObject = new File([fileBlob], "retrieved.pdf", { type: "application/pdf" });

        await transaction.done;

        return fileObject;
    } catch (error: any) {
        console.error(`Failed to retrieve file`);
        console.error(`${error.name}: ${error.message}`);
        throw new Error("File retrieval failed");
    }
};

export const getMetadataById = async (fileId: string) => {
    try {
        const db = await setupDatabase();
        const transaction = db.transaction("metadata", "readonly");
        const metadataStore = transaction.objectStore("metadata");

        const metadata: FileMetadata = await metadataStore.get(fileId);

        if (!metadata) throw new Error("Metadata not found");

        await transaction.done;

        return metadata;
    } catch (error: any) {
        console.error(`Failed to retrieve metadata`);
        console.error(`${error.name}: ${error.message}`);
        throw new Error("Metadata retrieval failed");
    }
};

export const updateEvaluationResult = async (fileId: string, newEvaluationResult: EvaluationResult) => {
    try {
        const db = await setupDatabase();

        const transaction = db.transaction(["metadata"], "readwrite");

        const metadataStore = transaction.objectStore("metadata");

        const fileMetadata = await metadataStore.get(fileId);

        if (!fileMetadata) throw new Error("File metadata not found");

        fileMetadata.evaluationResult = newEvaluationResult;
        fileMetadata.isEvaluated = true;

        await metadataStore.put(fileMetadata);

        await transaction.done;
    } catch (error: any) {
        console.error(`Failed to update evaluation result: ${error.name}: ${error.message}`);

        throw new Error("Failed to update evaluation result");
    }
};

export const getSortedMetadata = async () => {
    try {
        const db = await setupDatabase();
        const transaction = db.transaction("metadata", "readonly");
        const metadataStore = transaction.objectStore("metadata");
        const index = metadataStore.index("fileCreationDate");

        const sortedMetadata: FileMetadata[] = [];

        let cursor = await index.openCursor(null, "prev");

        while (cursor) {
            sortedMetadata.push(cursor.value);
            cursor = await cursor.continue();
        }

        await transaction.done;

        return sortedMetadata;
    } catch (error: any) {
        console.error(`Failed to retrieve sorted metadata`);
        console.error(`${error.name}: ${error.message}`);

        throw new Error(`Metadata retrieval failed`);
    }
};
