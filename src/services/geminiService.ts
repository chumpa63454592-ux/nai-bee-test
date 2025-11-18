import { GoogleGenAI, Type } from "@google/genai";
import type { DailyMeal } from '../types';

const MEAL_PLAN_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      day: {
        type: Type.INTEGER,
        description: 'The day of the month for November, from 1 to 30.',
      },
      dishName: {
        type: Type.STRING,
        description: 'The name of the Thai lunch dish.',
      },
      description: {
        type: Type.STRING,
        description: 'A brief, appealing one-sentence description of the dish in Thai.',
      },
    },
    required: ['day', 'dishName', 'description'],
  },
};

export const getMealPlan = async (): Promise<DailyMeal[]> => {
  // FIX: Adhere to guideline of using process.env.API_KEY for the API key.
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    สร้างตารางอาหารกลางวันที่หลากหลาย ไม่ซ้ำกัน สำหรับแต่ละวันในเดือนพฤศจิกายน (30 วัน)
    โดยเน้นอาหารไทยที่น่ารับประทานและเป็นที่นิยม
    สำหรับแต่ละวัน ให้ระบุชื่ออาหารและคำอธิบายสั้นๆ ที่น่าสนใจ
    (Generate a diverse and unique lunch meal plan for every day in November (30 days). 
    Focus on appetizing and popular Thai dishes.
    For each day, provide the dish name and a short, interesting description.)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: MEAL_PLAN_SCHEMA,
      },
    });

    const jsonText = response.text.trim();
    const mealPlan = JSON.parse(jsonText);
    
    if (!Array.isArray(mealPlan)) {
        throw new Error("Invalid format received from API. Expected an array.");
    }
    
    // Validate that the array is not empty and items have the correct structure
    if (mealPlan.length === 0 || !mealPlan[0].dishName) {
        throw new Error("API returned empty or malformed data.");
    }
    
    return mealPlan as DailyMeal[];

  } catch (error) {
    console.error("Error fetching or parsing meal plan:", error);
    throw new Error("Failed to get a valid meal plan from the Gemini API.");
  }
};
