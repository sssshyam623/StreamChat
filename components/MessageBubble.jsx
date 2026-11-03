import { Bot } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex items-end gap-2 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Bot size={14} className="text-white" />
        </div>
      )}
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser ? 'bg-gray-100 text-gray-800 rounded-br-sm' : 'bg-primary/10 text-gray-800 rounded-bl-sm'
        }`}>
          {message.content || <span className="text-gray-400 animate-pulse">●●●</span>}
        </div>
        {message.timestamp && (
          <span className="text-xs text-gray-400 mt-1 px-1">{message.timestamp}</span>
        )}
      </div>
    </div>
  );
}
