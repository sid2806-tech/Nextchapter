import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Bell, Volume2 } from 'lucide-react';
import { Card } from '../components/ui/Cards';

const Focus = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            setSessionCount(prev => prev + 1);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(25 * 60);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Focus Zone</h2>
                <p className="text-gray-500 mt-1">Enter deep work mode. Eliminate distractions and boost your productivity.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 flex flex-col items-center justify-center py-16 bg-gray-50/50 border-dashed border-2">
                    <div className="text-9xl font-extrabold text-gray-900 mb-8 tabular-nums tracking-tight">
                        {formatTime(timeLeft)}
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={toggleTimer}
                            className={`w-48 h-14 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${isActive ? 'bg-red-50 text-red-600' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                                }`}
                        >
                            {isActive ? <Pause /> : <Play />} {isActive ? 'Stop Focus' : 'Start Focus'}
                        </button>
                        <button
                            onClick={resetTimer}
                            className="w-14 h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-500 hover:text-emerald-600 cursor-pointer"
                        >
                            <RotateCcw />
                        </button>
                    </div>
                    <div className="mt-12 flex gap-8 text-sm font-medium text-gray-400">
                        <div className="flex items-center gap-2"><Bell size={16} /> Notifications Off</div>
                        <div className="flex items-center gap-2"><Volume2 size={16} /> Ambient Sound On</div>
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <h3 className="font-bold mb-4">Focus Stats</h3>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm text-gray-500">Daily Goal</span>
                            <span className="font-bold">{sessionCount}/8 Sessions</span>
                        </div>
                        <div className="flex gap-2 mb-2">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={`flex-1 h-2 rounded-full ${i < sessionCount ? 'bg-emerald-500' : 'bg-gray-100'}`}></div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 bg-emerald-50 rounded-xl text-center">
                                <div className="text-2xl font-bold text-emerald-700">{sessionCount * 25}</div>
                                <div className="text-[10px] text-emerald-600 font-bold uppercase">Mins Focused</div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl text-center">
                                <div className="text-2xl font-bold text-blue-700">{sessionCount}</div>
                                <div className="text-[10px] text-blue-600 font-bold uppercase">Sessions Done</div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            Study Vibes
                        </h3>
                        <div className="space-y-2">
                            {['Lo-fi Beats', 'Rainy Cafe', 'Forest Ambience', 'White Noise'].map((track, i) => (
                                <button key={i} className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex justify-between items-center group cursor-pointer ${i === 0 ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-600'}`}>
                                    {track}
                                    <Play size={14} className={i === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Focus;
