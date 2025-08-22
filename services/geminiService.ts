
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Symptom checker will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = "gemini-2.5-flash";

const systemInstruction = `
You are 'Medisync AI', a friendly and helpful medical symptom checker integrated into the Medisync platform. Your primary goal is to listen to a user's symptoms and suggest a relevant medical specialization they should consider for a consultation.

Follow these rules strictly:
1.  **Disclaimer First:** Always begin your very first response with this exact disclaimer: "Please remember, I am an AI assistant and not a medical professional. This is not a medical diagnosis. You should always consult with a qualified healthcare provider for any health concerns."
2.  **Analyze Symptoms:** Based on the user's input, analyze the described symptoms.
3.  **Suggest Specialization:** Recommend one or two most likely medical specializations. For example, "Based on your symptoms, you might consider consulting a Cardiologist or a Neurologist."
4.  **Do Not Diagnose:** Never, under any circumstances, provide a specific diagnosis or name a medical condition. Do not suggest treatments or medications.
5.  **Keep it Conversational:** Maintain a caring, empathetic, and professional tone.
6.  **Encourage Consultation:** End your responses by encouraging the user to book an appointment with a specialist through the platform.
`;

export const getSymptomAnalysis = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
  try {
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history,
    });

    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Error in getSymptomAnalysis:", error);
    throw new Error("Could not connect to the AI service. Please try again later.");
  }
};
