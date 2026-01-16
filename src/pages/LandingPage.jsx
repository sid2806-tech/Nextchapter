import React from 'react';
import { Rocket, ChevronRight, Compass, Target, MessageSquare } from 'lucide-react';
import { Button, Card } from '../components/ui/Cards';

const LandingPage = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A]">
            <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2 text-2xl font-bold text-emerald-600">
                    <Rocket size={32} />
                    <span>PathwayBuddy</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                    <a href="#" className="hover:text-emerald-600">Solutions</a>
                    <a href="#" className="hover:text-emerald-600">Resources</a>
                    <a href="#" className="hover:text-emerald-600">About</a>
                </div>
                <Button onClick={onStart}>Log In</Button>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-full">
                        ✨ YOUR ACADEMIC JOURNEY STARTS HERE
                    </div>
                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                        Unlock Your <span className="text-emerald-600">Potential</span> <br />
                        with Pathway Buddy
                    </h1>
                    <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                        The ultimate guidance platform for students. Choose your stream, track your
                        growth, and navigate through academic challenges with your personal AI buddy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="h-14 px-10 text-lg shadow-lg shadow-emerald-200" onClick={onStart}>
                            Get Started with Google <ChevronRight size={20} />
                        </Button>
                        <Button variant="secondary" className="h-14 px-10 text-lg">
                            Watch Demo
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { icon: Compass, title: "Stream Selection", desc: "Find your perfect path" },
                        { icon: Target, title: "Goal Tracking", desc: "Monitor your progress" },
                        { icon: Rocket, title: "Future Ready", desc: "Skills for tomorrow" },
                        { icon: MessageSquare, title: "AI Buddy", desc: "Always here to help" }
                    ].map((feature, i) => (
                        <Card key={i} className="text-center group hover:border-emerald-200 hover:-translate-y-1 transition-all pointer-events-none">
                            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <feature.icon size={28} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm">{feature.desc}</p>
                        </Card>
                    ))}
                </div>

                <div className="mt-24 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070"
                        alt="Students collaborating"
                        className="w-full h-[400px] object-cover opacity-90"
                    />
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
