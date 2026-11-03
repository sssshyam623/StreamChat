# StreamChat — OpenAI SSE Chat

Real-time AI chat with streaming tokens via OpenAI and Server-Sent Events.

## Features
- Streaming AI responses (token by token)
- Chat session history with Zustand
- Custom useStream hook
- Sidebar with session list
- Empty state & loading states

## Tech Stack
- **Next.js 14** (App Router + Edge Runtime)
- **OpenAI SDK** — GPT-4o-mini with streaming
- **Zustand** — chat state management
- **Tailwind CSS** — styling

## Getting Started
```bash
npm install
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local
npm run dev
```

## Routes
- `/` — Landing/home page
- `/chat` — Main chat UI
- `/api/chat` — SSE streaming endpoint
