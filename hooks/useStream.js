import useChatStore from '@/store/chatStore';

export function useStream() {
  const { addMessage, appendToLastMessage, setStreaming, messages } = useChatStore();

  const sendMessage = async (content) => {
    addMessage({ role: 'user', content, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    addMessage({ role: 'assistant', content: '', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    setStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content }] }),
      });

      if (!res.ok) throw new Error('Stream failed');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            const text = parsed.choices?.[0]?.delta?.content || '';
            if (text) appendToLastMessage(text);
          } catch {}
        }
      }
    } catch (e) {
      appendToLastMessage('Sorry, something went wrong. Please check your API key.');
    } finally {
      setStreaming(false);
    }
  };

  return { sendMessage };
}
