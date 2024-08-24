interface EvaluationCriterion {
    name: string;
    score: number;
    maxScore: number,
    remarks: string;
    strengths: string[];
    scopeOfImprovement: string[];
}

interface EvaluationResult {
    evaluationDate: Date;
    evaluationScore: number;
    maximumScore: number;
    grade: string;
    criteriaArray: EvaluationCriterion[];
}

interface FileMetadata {
    fileId: string,
    fileName: string,
    fileSizeInBytes: number;
    totalPages: number;
    totalWordCount: number;
    readingTime: number;
    extractedText: string;
    thumbnail: string;
    language: string;
    fileCreationDate: Date;
    lastAccessedDate: Date;
    coursework: string;
    courseCode: string;
    subject: string;
    title: string;
    isEvaluated: boolean;
    evaluationResult: EvaluationResult;
}

export type { FileMetadata, EvaluationResult, EvaluationCriterion };