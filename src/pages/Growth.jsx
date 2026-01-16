import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Plus, Trophy } from 'lucide-react';
import { Card, Button } from '../components/ui/Cards';

const Growth = () => {
    // Determine which view to show. The prompt had 'tracker' and 'growth' (Growth Zone) as separate tabs.
    // However, the router renders this component for '/growth'.
    // Looking at Sidebar in Layout.jsx:
    // { id: 'growth', icon: Trophy, label: 'Growth Zone' } -> /growth
    // { id: 'tracker', icon: TrendingUp, label: 'Growth Tracker' } -> /tracker (Wait, I didn't add route for tracker in App.jsx yet!)

    // I will implement "Growth Tracker" here, and perhaps add a separate component for "Growth Zone" if needed, 
    // or use tabs inside here? 
    // The previous request had separate views. I will assume this file implements the "Growth Tracker" view 
    // and I'll create another one for Growth Zone or mis-route one of them.

    // Actually, looking at the layout I built:
    // { id: 'growth', label: 'Growth Zone' } -> /growth
    // { id: 'tracker', label: 'Growth Tracker' } -> I need to add this route to App.jsx!

    // Let's implement Growth Tracker View here for now, as it's the more complex one.

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Growth Tracker</h2>
                <p className="text-gray-500 mt-1">Visualize your evolution and academic journey over time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'ACADEMIC', value: 75, color: 'emerald' },
                    { label: 'TECHNICAL SKILLS', value: 45, color: 'amber' },
                    { label: 'SOFT SKILLS', value: 60, color: 'blue' },
                    { label: 'RESILIENCE', value: 30, color: 'purple' },
                ].map((stat, i) => (
                    <Card key={i}>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</div>
                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-3xl font-bold">{stat.value}%</span>
                            <span className="text-xs text-emerald-600 font-bold flex items-center mb-1"><TrendingUp size={12} /> +5%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full">
                            <div className={`h-full rounded-full bg-${stat.color}-500`} style={{ width: `${stat.value}%` }}></div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold">Activity Evolution</h3>
                        <select className="text-xs bg-gray-50 border-none rounded-lg px-2 py-1 font-medium text-gray-500 outline-none">
                            <option>Last 30 Days</option>
                            <option>Last 6 Months</option>
                        </select>
                    </div>
                    <div className="h-[250px] flex items-end justify-between gap-2 pt-8">
                        {[40, 65, 55, 80, 70, 95, 85, 90, 100, 75, 80, 85].map((h, i) => (
                            <div key={i} className="flex-1 group relative flex flex-col items-center">
                                <div
                                    className="w-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-all rounded-t-lg relative"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {h} pts
                                    </div>
                                </div>
                                <span className="text-[10px] text-gray-400 mt-2 font-bold">W{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">Milestones</h3>
                        <button className="text-emerald-600 cursor-pointer"><Plus size={20} /></button>
                    </div>
                    <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                        {[
                            { date: 'Jan 10', title: 'Joined Pathway Buddy', done: true },
                            { date: 'Jan 12', title: 'Set first career goal', done: true },
                            { date: 'Jan 14', title: 'Completed Path Finder', done: true },
                            { date: 'Jan 20', title: 'Complete first focus session', done: false },
                        ].map((mile, i) => (
                            <div key={i} className="flex gap-4 relative z-10">
                                <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shrink-0 ${mile.done ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-gray-200'}`}>
                                    {mile.done && <ShieldCheck size={12} />}
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase">{mile.date}</div>
                                    <div className={`text-sm font-bold ${mile.done ? 'text-gray-900' : 'text-gray-400'}`}>{mile.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Growth;
