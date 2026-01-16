import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_INSTRUCTION = `
You are 'Buddy', a friendly, empathetic, and wise AI student mentor for the 'NextChapter' app. 
Your goal is to help students navigate their academic and career journey, especially those facing setbacks.

Personality:
- Tone: Supportive, encouraging, but realistic. NOT robotic.
- Style: Use occasional emojis (🚀, 💪, 🧠). Keep responses concise (under 3-4 sentences unless asked for detail).
- Identity: You are NOT a generic AI. You are a "Study Buddy".

Key Functions:
1. Career Guidance: Help students find paths based on interests.
2. Emotional Support: Listen to students who failed exams. Remind them "Marks don't define you."
3. Focus: Encourage deep work and study habits.

Constraints:
- If asked about non-educational topics (like illegal acts), gently steer back to growth/studies.
- Do not provide medical advice.
`;

export const GeminiService = {
    hasKey() {
        return !!API_KEY;
    },

    // 1. Chat with Buddy
    // history: Array of { role: "user" | "model", parts: string }
    async chatWithBuddy(history, newMessage) {
        if (!this.hasKey()) {
            return this.mockResponse("buddy");
        }

        try {
            // Use gemini-1.5-flash for better system instruction support if available, else gemini-pro
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: SYSTEM_INSTRUCTION
            });

            const chat = model.startChat({
                history: history, // { role: 'user'|'model', parts: '...' }
            });

            const result = await chat.sendMessage(newMessage);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Gemini Chat Error:", error);
            // Fallback to pro if flash fails or other error
            return "I'm having a little trouble connecting to my brain right now. Can you check your connection?";
        }
    },

    // 2. Generate Career Paths (Pathfinder)
    async generateCareerPaths(userProfile) {
        if (!this.hasKey()) return this.mockResponse("pathfinder");

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `
                Act as an expert career counselor.
                Profile: 
                - Standard: ${userProfile.standard}
                - Stream: ${userProfile.stream || "Not decided"}
                - Interests: ${userProfile.interests.join(", ")}
                
                Task: Generate 3 distinct career paths suitable for this student.
                Format: JSON Array with objects: { title, desc, match, reason }.
                Strictly JSON. No markdown.
            `;

            const result = await model.generateContent(prompt);
            const text = result.response.text().replace(/```json|```/g, '').trim();
            return JSON.parse(text);
        } catch (error) {
            console.error("Gemini Pathfinder Error:", error);
            return this.mockResponse("pathfinder");
        }
    },

    // 3. Second Chance Motivation
    async getMotivation(setbackContext) {
        if (!this.hasKey()) return this.mockResponse("second_chance");

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: "You are a motivational coach for students facing failure. Be kind but action-oriented."
            });
            const prompt = `
                Setback: "${setbackContext}".
                Provide:
                1. Motivation (2 sentences).
                2. Next Step (1 actionable task).
                Return JSON: { "motivation": "...", "nextStep": "..." }
                Strictly JSON.
            `;

            const result = await model.generateContent(prompt);
            const text = result.response.text().replace(/```json|```/g, '').trim();
            return JSON.parse(text);
        } catch (error) {
            console.error("Gemini Motivation Error:", error);
            return this.mockResponse("second_chance");
        }
    },

    // Fallback Mock Data
    mockResponse(type) {
        console.warn("Using Mock AI Response (No API Key detected)");
        if (type === "buddy") return "🤖 [DEMO MODE] I see you said something! I can't really 'think' yet because my API Key is missing. \n\nPlease add VITE_GEMINI_API_KEY to your .env file to unlock my full brain! 🧠";

        if (type === "pathfinder") return [
            { title: "Software Developer (Demo)", desc: "Building the future with code.", match: "98%", reason: "Matches your love for Logic." },
            { title: "Data Scientist (Demo)", desc: "Analyzing patterns to predict trends.", match: "92%", reason: "Fits your analytical skills." },
            { title: "Product Manager (Demo)", desc: "Leading tech teams to success.", match: "85%", reason: "Combines logic with leadership." }
        ];

        if (type === "second_chance") return {
            motivation: "[DEMO] Failure is just feedback. You have not failed, you've just found 10,000 ways that won't work.",
            nextStep: "Add your API Key to enable real advice!"
        };
    }
};
