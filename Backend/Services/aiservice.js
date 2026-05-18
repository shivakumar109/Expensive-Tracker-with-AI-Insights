import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const generateSuggestions = async (summary) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    const prompt = `
You are a financial advisor.

User financial data:
Income: ${summary.income}
Expense: ${summary.expense}
Balance: ${summary.balance}

Category breakdown:
${JSON.stringify(summary.categories)}

Give 5 simple and practical money-saving tips based on the category breakdown. Be concise.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();

  } catch (error) {
    throw new Error("AI Error: " + error.message);
  }
};

export const chatWithAI = async (message, summary) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
You are a helpful AI financial assistant. 

Context of user's current finances:
Income: ${summary.income}
Expense: ${summary.expense}
Balance: ${summary.balance}
Categories: ${JSON.stringify(summary.categories)}

User asks: "${message}"

Answer the user directly and concisely. Provide actionable advice.
`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error("AI Chat Error: " + error.message);
  }
};