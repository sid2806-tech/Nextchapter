import React, { useState } from 'react';
import { MessageSquare, X, Send, Rocket } from 'lucide-react';
import { GeminiService } from '../lib/gemini';

const AIBuddy = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Initial history
    const [messages, setMessages] = useState([
        { role: 'model', text: 'Hi! I\'m Buddy 🤖, your educational pathfinder. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            // Prepare history for Gemini (excluding the very first local greeting if desired, or mapping it)
            // Gemini expects: { role: 'user' | 'model', parts: [{ text: '...' }] }
            // Simpler version for this helper: array of { role, parts: text }
            const apiHistory = messages.map(m => ({
                role: m.role === 'ai' ? 'model' : m.role, // normalize 'ai' -> 'model' just in case
                parts: m.text
            }));

            const reply = await GeminiService.chatWithBuddy(apiHistory, userMsg);

            setMessages(prev => [...prev, { role: 'model', text: reply }]);
        } catch (error) {
            console.error("Chat error", error);
            setMessages(prev => [...prev, { role: 'model', text: "I'm having a bit of trouble connecting to the cloud right now. 🌧️ Try again later?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="bg-white w-[350px] h-[450px] shadow-2xl rounded-3xl border border-gray-100 flex flex-col mb-4 animate-in slide-in-from-bottom-8 duration-300">
                    <div className="p-4 bg-emerald-600 text-white rounded-t-3xl flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <Rocket size={16} />
                            </div>
                            <div>
                                <div className="text-sm font-bold">Buddy AI</div>
                                <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-widest">Online Now</div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50/50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user'
                                        ? 'bg-emerald-600 text-white rounded-tr-none'
                                        : 'bg-white border border-gray-100 text-gray-700 shadow-sm rounded-tl-none'
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 text-gray-700 shadow-sm rounded-2xl rounded-tl-none p-3 text-sm">
                                    <span className="animate-pulse">Typing...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask Buddy anything..."
                            className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-emerald-600 text-white rounded-full shadow-xl shadow-emerald-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
            >
                <MessageSquare size={32} />
            </button>
        </div>
    );
};

export default AIBuddy;
