'use client';
import Link from 'next/link';
import { MessageSquare, Zap, Brain, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 px-6 h-14 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <MessageSquare size={14} className="text-white" />
          </div>
          <span className="font-semibold text-gray-900">StreamChat</span>
        </div>
        <Link href="/chat" className="border border-gray-200 text-gray-700 text-sm px-4 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          Log in
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 flex items-center gap-16">
        <div className="flex-1">
          <div className="flex gap-2 mb-6">
            <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1"><Zap size={11} /> Streaming</span>
            <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1"><MessageSquare size={11} /> Real-time</span>
            <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1"><Brain size={11} /> AI Powered</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
            Talk to AI.<br />Get answers,<br />
            <span className="text-primary italic">instantly.</span>
          </h1>
          <p className="text-gray-500 mb-8 text-base">A real-time AI chat experience powered by OpenAI and streaming technology.</p>
          <div className="flex gap-3">
            <Link href="/chat" className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
              Start Chatting →
            </Link>
            <button className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="hidden md:flex w-72 h-64 bg-gray-50 rounded-2xl items-center justify-center relative">
          <div className="bg-white rounded-2xl shadow-lg p-5 w-56">
            <div className="flex gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-primary/30"></div>
              <div className="w-3 h-3 rounded-full bg-primary/20"></div>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 text-xs text-gray-600">Hi! How can I help?</div>
              <div className="bg-primary/10 rounded-xl rounded-tr-sm px-3 py-2 text-xs text-gray-700 ml-6">Explain SSE in simple terms</div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"><MessageSquare size={10} className="text-white" /></div>
                <div className="bg-gray-100 rounded-xl px-3 py-2 text-xs text-gray-600 flex-1">
                  <span className="animate-pulse">●●●</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary/40"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-primary/20"></div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-5">
          {[
            { icon: Zap, title: 'Real-time Streaming', desc: 'Watch AI responses appear word by word in real-time.' },
            { icon: Brain, title: 'Smart & Contextual', desc: 'AI remembers the conversation context for better answers.' },
            { icon: Shield, title: 'Secure & Private', desc: 'Your chats are private and never stored.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-gray-50 rounded-2xl p-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
