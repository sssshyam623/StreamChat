import Groq from 'groq-sdk';

export function getOpenAI() {
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
}