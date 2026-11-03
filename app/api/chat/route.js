import { asyncWrapper } from '@/lib/asyncWrapper';
import { getOpenAI } from '@/lib/openai';

export const POST = asyncWrapper(async (req) => {
  const { messages } = await req.json();
  const openai = getOpenAI();

  const stream = await openai.chat.completions.create({
    model: 'llama-3.1-8b-instant', 
    messages: [
      { role: 'system', content: 'You are a helpful AI assistant. Give clear, concise answers.' },
      ...messages.map(m => ({ role: m.role, content: m.content })),
    ],
    stream: true,
    max_tokens: 1000,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const data = JSON.stringify(chunk);
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' },
  });
});
