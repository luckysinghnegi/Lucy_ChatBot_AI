import Groq from "groq-sdk";
import 'dotenv/config';

// Initialize Groq with your API Key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Sends a single prompt to Groq and returns the text reply.
 */
export const askGroqAI = async (userPrompt) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            // Llama-3.3-70b is a top-tier choice for speed and intelligence in 2025
            messages: [
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
        });

        // Return the content from the first choice
        return chatCompletion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("Groq AI Error:", error);
        throw new Error("Failed to get reply from Groq AI.");
    }
};
