import { EvaluationResult } from "@/schema/FileSchema";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prompt1 = `
    "I need an evaluation of a Theory of Knowledge (TOK) essay. The evaluation should be based on 5 important criteria specific to TOK coursework, with each criterion worth up to 20 points, making the total possible score 100. Please evaluate the essay fairly and provide a score that reflects the quality of the essay, without being overly strict. The JSON response should follow the schema below and should not include json at the start or at the end.

Schema:

json
{
  "evaluationDate": new Date(),
  "evaluationScore": 90,
  "maximumScore": 100,
  "grade": "A+",
  "criteria": [
    {
      "name": "Criterion Name",
      "score": 18,
      "maxScore": 20,
      "remarks": "Provide a detailed and insightful remark about the criterion here.",
      "strengths": ["Strength 1", "Strength 2"],
      "scopeOfImprovement": ["Improvement 1", "Improvement 2"]
    }
  ]
}
Details to Include:

evaluationDate: The date of evaluation.
evaluationScore: The total score out of 100 based on the criteria.
maximumScore: The maximum score possible, which is 100.
grade: The overall grade based on the score, using the following scale:
90 to 100: A+
80 to 90: A
70 to 80: B+
60 to 70: B
50 to 60: C+
40 to 50: C
30 to 40: D+
20 to 30: D
10 to 20: E+
0 to 10: E
criteria: An array of objects where each object includes:
name: The name of the criterion.
score: The score for the criterion out of 20.
maxScore: The maximum score for the criterion (20).
remarks: A detailed remark about the criterion, up to 300 words.
strengths: An array of strengths identified in the essay.
scopeOfImprovement: An array of areas where the essay could be improved.
Please ensure the evaluation reflects a balanced and fair assessment of the essay’s quality. Thank you!"
`

const prompt2 = `
Evaluate the provided essay based on exactly 5 criteria that you determine to be important for the given coursework and subject. Each criterion should be worth up to 20 points, making a total possible score of 100. Please ensure that the evaluation is fair and not overly strict. Provide detailed remarks of up to 300 words for each criterion. Include multiple strengths and areas for improvement as needed. Use the JSON schema below for the response format.

Response Format:

json
Copy code
{
  "evaluationDate": new Date(),
  "evaluationScore": 90,
  "maximumScore": 100,
  "grade": "A+",
  "criteriaArray": [
    {
      "name": "Criterion Name",
      "score": 18,
      "maxScore": 20,
      "remarks": "Provide a detailed and insightful remark about the criterion here, with a maximum of 300 words.",
      "strengths": ["Strength 1", "Strength 2"],
      "scopeOfImprovement": ["Improvement 1", "Improvement 2"]
    }
  ]
}
Input Details:

You will receive a JSON stringified object with the following keys:

coursework: The title of the coursework.
subject: The subject of the coursework.
text: The text of the essay to be evaluated.
Please evaluate the essay based on exactly 5 criteria that you determine are relevant for the coursework and subject provided. Return the results in the JSON schema format above. Ensure the evaluation is balanced, reflects the quality of the essay, and includes detailed remarks (up to 300 words) for each criterion, with multiple strengths and areas for improvement as applicable.

Thank you!
`;

const getEvaluationResultFromAI = async (coursework: string, subject: string, extractedText: string) => {
    let newEvaluationResult: EvaluationResult = {
        evaluationDate: new Date(),
        evaluationScore: 0,
        maximumScore: 0,
        grade: "",
        criteriaArray: []
    };

    try {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt2 + JSON.stringify(
            {
                coursework: coursework,
                subject: subject,
                text: extractedText
            }
        ));

        const response = result.response;

        if (result && response) {
            if (response.candidates === undefined) {
                console.error(`Undefined response from AI`);

                return null;
            }

            const evalRes = (response.candidates[0].content.parts[0].text || "");

            newEvaluationResult = JSON.parse(evalRes.replace(/^```json/, '').replace(/```$/, ''));

			newEvaluationResult.evaluationDate = new Date();
        } else {
            console.error(`No response from AI`);

            return null;
        }
    } catch (error: any) {
        console.error(`Error generating AI content: ${error.name}: ${error.message}`);

        return null;
    }

    return newEvaluationResult;
};

export { getEvaluationResultFromAI };