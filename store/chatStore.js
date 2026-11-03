import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  sessions: [
    { id: '1', title: 'Explain SSE in simple terms', messages: [], date: 'Today' },
    { id: '2', title: 'How does AI work?', messages: [], date: 'Today' },
    { id: '3', title: 'Best practices for Next.js', messages: [], date: 'Today' },
    { id: '4', title: 'Difference between JWT and sessions', messages: [], date: 'Today' },
    { id: '5', title: 'What is Pinecone?', messages: [], date: 'Yesterday' },
    { id: '6', title: 'How to chunk text?', messages: [], date: 'Yesterday' },
    { id: '7', title: 'Use of Embeddings', messages: [], date: 'Yesterday' },
  ],
  activeSessionId: '1',
  messages: [],
  isStreaming: false,

  setActiveSession: (id) => set({ activeSessionId: id, messages: [] }),
  newChat: () => {
    const id = Date.now().toString();
    set(state => ({
      sessions: [{ id, title: 'New Chat', messages: [], date: 'Today' }, ...state.sessions],
      activeSessionId: id,
      messages: [],
    }));
  },
  addMessage: (msg) => set(state => ({ messages: [...state.messages, msg] })),
  appendToLastMessage: (text) => set(state => {
    const msgs = [...state.messages];
    if (msgs.length && msgs[msgs.length - 1].role === 'assistant') {
      msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], content: msgs[msgs.length - 1].content + text };
    }
    return { messages: msgs };
  }),
  setStreaming: (isStreaming) => set({ isStreaming }),
}));

export default useChatStore;
