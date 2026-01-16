import React from 'react';
import { Compass, ShieldCheck, Trophy, Clock, TrendingUp } from 'lucide-react';
import { Button, Card } from '../components/ui/Cards';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back, Student!</h2>
                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                        You've completed <span className="font-bold text-emerald-600">65%</span> of your weekly goals. Keep it up!
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => navigate('/pathfinder')}>Continue Learning</Button>
                    <Button variant="secondary">View Schedule</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { icon: Compass, title: "Path Finder", desc: "Discover your career path", link: '/pathfinder' },
                        { icon: ShieldCheck, title: "Resilience Hub", desc: "Turn failures into futures", link: '/resilience' },
                        { icon: Trophy, title: "Growth Zone", desc: "Extra activities & skills", link: '/growth' },
                        { icon: Clock, title: "Focus Zone", desc: "Active focus mode", link: '/focus' }
                    ].map((mod, i) => (
                        <Card key={i} className="hover:border-emerald-200 cursor-pointer group" onClick={() => navigate(mod.link)}>
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                <mod.icon size={24} />
                            </div>
                            <h4 className="font-bold text-gray-900">{mod.title}</h4>
                            <p className="text-sm text-gray-500">{mod.desc}</p>
                        </Card>
                    ))}
                </div>

                <Card className="flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-emerald-500 border-t-transparent flex items-center justify-center mb-4">
                        <Trophy className="text-emerald-600" size={32} />
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Weekly Streak</div>
                    <div className="text-4xl font-extrabold text-gray-900">12 Days</div>
                    <div className="text-xs text-emerald-600 mt-2 font-medium">✨ Higher than 85% of students</div>
                </Card>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Completed Quiz", item: "Math: Intro to Calculus", time: "2 hours ago" },
                            { label: "New Skill Added", item: "Python Programming", time: "5 hours ago" },
                            { label: "Path Unlocked", item: "Data Science Specialization", time: "Yesterday" }
                        ].map((act, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <div className="flex flex-col">
                                    <span className="font-bold">{act.label}</span>
                                    <span className="text-gray-500">{act.item}</span>
                                </div>
                                <span className="text-gray-400">{act.time}</span>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <h3 className="font-bold mb-4">Current Focus</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Web Development Prep", progress: 78 },
                            { label: "Soft Skills Training", progress: 42 },
                            { label: "Exam Resilience Program", progress: 30 }
                        ].map((prog, i) => (
                            <div key={i} className="space-y-1.5">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>{prog.label}</span>
                                    <span>{prog.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${prog.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
