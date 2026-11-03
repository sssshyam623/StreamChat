'use client';
import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { MessageSquare } from 'lucide-react';

export default function ChatWindow({ messages }) {
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
          <MessageSquare size={28} className="text-primary" />
        </div>
        <h3 className="font-semibold text-gray-800 mb-1">Start a new conversation</h3>
        <p className="text-gray-400 text-sm">Ask anything. Get answers instantly.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
      <div ref={bottomRef} />
    </div>
  );
}
