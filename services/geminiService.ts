
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisOutput, DetectionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeEmail = async (content: string, language: string): Promise<AnalysisOutput> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following email content and determine if it is Spam or Not Spam (Ham). 
      Format the response in JSON. 
      Input Content: ${content}
      Preferred Language for reasoning: ${language}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: {
              type: Type.STRING,
              description: "Must be either 'SPAM' or 'HAM'",
            },
            confidence: {
              type: Type.NUMBER,
              description: "Confidence score from 0 to 1",
            },
            reasoning: {
              type: Type.STRING,
              description: "Brief explanation of why it was classified this way in the requested language",
            },
          },
          required: ["classification", "confidence", "reasoning"],
        },
      },
    });

    const result = JSON.parse(response.text);
    return {
      classification: result.classification === 'SPAM' ? DetectionResult.SPAM : DetectionResult.HAM,
      confidence: result.confidence,
      reasoning: result.reasoning
    };
  } catch (error) {
    console.error("Gemini Detection Error:", error);
    return {
      classification: DetectionResult.ERROR,
      confidence: 0,
      reasoning: "Failed to analyze. Please check your connection or API key."
    };
  }
};
