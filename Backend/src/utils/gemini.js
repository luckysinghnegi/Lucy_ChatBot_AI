import { GoogleGenAI } from '@google/genai'; // Correct named export for 2025
import 'dotenv/config';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getGeminiReply = async (userPrompt) => {
    try {
        // Use the 'models' property for single-turn content generation
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash", // Use 2025's flash model for chatbots
            contents: userPrompt
        });

        return response.text;
    } catch (error) {
        console.error("Gemini Error:");
        throw new Error(error.message);
    }
};
