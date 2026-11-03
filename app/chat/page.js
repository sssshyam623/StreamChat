'use client';
import { MessageSquare, Plus, Settings, User } from 'lucide-react';
import Link from 'next/link';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import useChatStore from '@/store/chatStore';
import { useStream } from '@/hooks/useStream';

export default function ChatPage() {
  const { sessions, activeSessionId, messages, isStreaming, setActiveSession, newChat } = useChatStore();
  const { sendMessage } = useStream();

  const grouped = sessions.reduce((acc, s) => {
    if (!acc[s.date]) acc[s.date] = [];
    acc[s.date].push(s);
    return acc;
  }, {});

  const activeSession = sessions.find(s => s.id === activeSessionId);

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-50 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare size={12} className="text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-900">StreamChat</span>
          </div>
          <button onClick={newChat}
            className="w-full bg-primary text-white text-sm px-3 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors">
            <Plus size={14} /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {Object.entries(grouped).map(([date, sessions]) => (
            <div key={date} className="mb-4">
              <p className="text-xs text-gray-400 font-medium px-2 mb-1">{date}</p>
              {sessions.map(s => (
                <button key={s.id} onClick={() => setActiveSession(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs mb-0.5 truncate transition-colors ${
                    activeSessionId === s.id ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  {s.title}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600 font-medium">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">John Doe</p>
              <p className="text-xs text-gray-400 truncate">john@example.com</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><Settings size={14} /></button>
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-12 border-b border-gray-100 px-5 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{activeSession?.title || 'New Chat'}</span>
          <button className="text-gray-400 hover:text-gray-600">···</button>
        </div>

        {/* Messages */}
        <ChatWindow messages={messages} />

        {/* Input */}
        <ChatInput onSend={sendMessage} disabled={isStreaming} />
      </main>
    </div>
  );
}
