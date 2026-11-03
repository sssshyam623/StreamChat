'use client';
import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t border-gray-100 bg-white">
      <button className="text-gray-400 hover:text-gray-600 p-1"><Paperclip size={18} /></button>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        disabled={disabled}
        placeholder="Type your message..."
        className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-40"
      >
        <Send size={15} className="text-white" />
      </button>
    </div>
  );
}
