import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing VITE_GEMINI_API_KEY environment variable');
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY);

// Use the free gemini-pro model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface ChatContext {
  businessName?: string;
  products?: Array<{
    name: string;
    price: number;
    description?: string;
    category?: string;
  }>;
  customerInfo?: {
    name?: string;
    totalOrders?: number;
    totalSpent?: number;
  };
}

/**
 * Generate a WhatsApp message response using Gemini AI
 */
export async function generateWhatsAppResponse(
  userMessage: string,
  context: ChatContext = {}
): Promise<string> {
  try {
    // Build a comprehensive prompt with context
    const systemPrompt = buildSystemPrompt(context);
    
    const prompt = `${systemPrompt}

Customer: ${userMessage}

Assistant:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up and format the response
    return text.trim();
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    throw new Error('Failed to generate AI response');
  }
}

/**
 * Build a system prompt with business context
 */
function buildSystemPrompt(context: ChatContext): string {
  let prompt = `You are a helpful AI assistant for ${context.businessName || 'a business'}. You help customers via WhatsApp with:
- Product recommendations
- Order inquiries
- General questions
- Providing friendly, professional service

Guidelines:
- Be conversational and friendly, like texting
- Keep responses concise (WhatsApp messages should be short)
- Use emojis sparingly when appropriate
- Always be helpful and professional
- If you don't have information, say so politely

`;

  if (context.products && context.products.length > 0) {
    prompt += `\nAvailable Products:\n`;
    context.products.forEach((product) => {
      prompt += `- ${product.name}: $${product.price}`;
      if (product.category) prompt += ` (${product.category})`;
      if (product.description) prompt += ` - ${product.description}`;
      prompt += `\n`;
    });
  }

  if (context.customerInfo) {
    if (context.customerInfo.name) {
      prompt += `\nCustomer Name: ${context.customerInfo.name}\n`;
    }
    if (context.customerInfo.totalOrders !== undefined) {
      prompt += `Total Orders: ${context.customerInfo.totalOrders}\n`;
    }
    if (context.customerInfo.totalSpent !== undefined) {
      prompt += `Total Spent: $${context.customerInfo.totalSpent}\n`;
    }
  }

  return prompt;
}

/**
 * Generate product recommendations based on customer query
 */
export async function generateProductRecommendations(
  query: string,
  products: Array<{ name: string; price: number; description?: string }>
): Promise<string[]> {
  try {
    const productList = products
      .map((p, i) => `${i + 1}. ${p.name} - $${p.price}${p.description ? ': ' + p.description : ''}`)
      .join('\n');

    const prompt = `Based on this customer query: "${query}"

Here are the available products:
${productList}

Recommend the most relevant products (list 1-3 product numbers). Just reply with the numbers separated by commas, like: 1, 3`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Parse the response to extract product indices
    const matches = text.match(/\d+/g);
    if (matches) {
      return matches.map((num) => products[parseInt(num) - 1]?.name).filter(Boolean);
    }

    return [];
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}

/**
 * Analyze customer sentiment from message
 */
export async function analyzeSentiment(message: string): Promise<'positive' | 'neutral' | 'negative'> {
  try {
    const prompt = `Analyze the sentiment of this customer message: "${message}"

Respond with only one word: positive, neutral, or negative`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().toLowerCase().trim();

    if (text.includes('positive')) return 'positive';
    if (text.includes('negative')) return 'negative';
    return 'neutral';
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return 'neutral';
  }
}
