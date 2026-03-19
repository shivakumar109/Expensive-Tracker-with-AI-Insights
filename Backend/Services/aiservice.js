import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const generateSuggestions = async (summary) => {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const prompt = `
You are a financial advisor.

User financial data:
Income: ${summary.income}
Expense: ${summary.expense}
Balance: ${summary.balance}

Category breakdown:
${JSON.stringify(summary.categories)}

Give 5 simple and practical money-saving tips.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();

  } catch (error) {
    throw new Error("AI Error: " + error.message);
  }
};