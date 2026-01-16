import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic } from 'lucide-react';

const Buddy = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your personal mentor. How can I help you today? Feeling stressed about exams, or need some study tips?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages([...messages, newMsg]);
        setInput('');

        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "That's a great question! Let's break it down together.",
                "I understand how you feel. Remember, progress is step by step.",
                "Have you tried using the Pomodoro technique for that?",
                "You're doing better than you think. Keep pushing!",
                "Let's focus on what we can control right now."
            ];
            const randomResp = responses[Math.floor(Math.random() * responses.length)];
            setMessages(prev => [...prev, { id: Date.now() + 1, text: randomResp, sender: 'bot' }]);
        }, 1000);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col glass-card relative overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
                <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    <Bot size={24} />
                </div>
                <div>
                    <h2 className="font-bold text-lg">My Buddy</h2>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
                    </p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user'
                                ? 'bg-secondary/20 text-secondary border border-secondary/30'
                                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            }`}>
                            {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>

                        <div className={`p-4 rounded-2xl max-w-[80%] ${msg.sender === 'user'
                                ? 'bg-secondary/10 border border-secondary/20 rounded-tr-none text-white'
                                : 'bg-white/5 border border-white/10 rounded-tl-none text-gray-200'
                            }`}>
                            <p className="leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/20 border-t border-white/5">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-24 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                    />
                    <div className="absolute right-2 top-2 flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                            <Mic size={20} />
                        </button>
                        <button
                            onClick={handleSend}
                            className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Buddy;
