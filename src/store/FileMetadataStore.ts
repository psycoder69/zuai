import { FileMetadata } from "@/schema/FileSchema";
import { create } from "zustand";

interface FileMetadataState {
    allMetadata: FileMetadata[] | null;
    setAllMetadata: (file: FileMetadata[] | null) => void;
}

export const useFileMetadataStore = create<FileMetadataState>((set) => ({
    allMetadata: null,
    setAllMetadata: (fileMetadata) => set({ allMetadata: fileMetadata }),
}));