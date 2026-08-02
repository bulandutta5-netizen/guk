'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '@/types/property';

const QUICK_ACTIONS = ['Find Properties', 'EMI Help', 'Book Visit', 'FAQ'];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const createMsg = (role: 'user' | 'assistant', content: string): ChatMessage => ({
    id: Math.random().toString(36).substring(2, 9),
    role,
    content,
    timestamp: new Date(),
  });

  // Initialize and persist chat history
  useEffect(() => {
    const savedMessages = sessionStorage.getItem('dreamHomesChatHistory');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        setMessages([createMsg('assistant', 'Hello! I am your Demo AI Assistant. How can I help you find your perfect home today?')]);
      }
    } else {
      setMessages([createMsg('assistant', 'Hello! I am your Demo AI Assistant. How can I help you find your perfect home today?')]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('dreamHomesChatHistory', JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg = createMsg('user', text);
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      const data = await response.json();
      const aiMsg = createMsg('assistant', data.response || 'Sorry, I could not generate a response. Please try again.');
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = createMsg(
        'assistant',
        'I apologize, but I am having trouble connecting right now. Please try again later or contact our support team.'
      );
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative">
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-75" style={{ animationDuration: '3s' }}></div>
              <button
                onClick={() => setIsOpen(true)}
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition-transform hover:scale-110"
                aria-label="Open AI Chat"
              >
                <MessageCircle size={28} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[calc(100vw-3rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-gold/20 bg-navy/95 shadow-2xl backdrop-blur-xl sm:right-6 sm:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/20 bg-navy-mid/80 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-off-white">Demo AI Assistant</h3>
                  <div className="flex items-center gap-1 text-xs text-gold-light">
                    <Sparkles size={10} />
                    <span>Powered by Gemini</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-off-white/60 transition-colors hover:bg-white/10 hover:text-off-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gold/30">
              <div className="flex flex-col gap-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                        <Bot size={16} />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'rounded-br-sm bg-gold text-navy'
                          : 'glass-dark rounded-bl-sm border border-gold/10 text-off-white'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2 justify-start"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                      <Bot size={16} />
                    </div>
                    <div className="glass-dark flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gold/10 px-4 py-3">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="h-2 w-2 rounded-full bg-gold"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="h-2 w-2 rounded-full bg-gold"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="h-2 w-2 rounded-full bg-gold"
                      />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-gold/10 bg-navy-mid/30 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  onClick={() => handleSendMessage(action)}
                  className="rounded-full border border-gold/30 bg-navy px-3 py-1 text-xs text-gold transition-colors hover:bg-gold/20"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="bg-navy p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="input-field flex-1 rounded-full border border-gold/20 bg-navy-mid px-4 py-2 text-sm text-off-white placeholder-off-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-colors hover:bg-gold-light disabled:opacity-50 disabled:hover:bg-gold"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
