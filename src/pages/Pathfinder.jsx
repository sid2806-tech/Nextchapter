import React, { useState } from 'react';
import { Compass, Cpu, Database, Palette, ChevronRight } from 'lucide-react';
import { Card, Button } from '../components/ui/Cards';
import { GeminiService } from '../lib/gemini';

const Pathfinder = () => {
    const [pathState, setPathState] = useState('ready'); // ready, generating, results
    const [suggestions, setSuggestions] = useState([]);

    const generatePaths = async () => {
        setPathState('generating');
        // Simulate delay for effect, or call API
        // const profile = ... (load from context/storage)
        try {
            // Mocking for smooth UI demo based on request
            const recommendations = [
                {
                    title: "Software Engineering / Development",
                    icon: Cpu,
                    desc: "Design, develop, test, and maintain software applications. This path can range from web development to system architecture.",
                    match: "Top Match",
                    analysis: "Combines a strong aptitude for maths with a creative outlet for problem-solving and building new things.",
                    skills: ["Programming (Python, Java)", "Data Structures", "Logic & Critical Thinking"],
                    growth: "EST. GROWTH: High Impact",
                    impact: "HIGH IMPACT"
                },
                {
                    title: "Data Science / Analytics",
                    icon: Database,
                    desc: "Extract insights from large datasets using statistical methods and machine learning.",
                    match: "Top Match",
                    analysis: "Leverages strong mathematical skills for statistical modeling and algorithmic design.",
                    skills: ["Statistics", "Mathematics", "Programming (R, Python)", "Data Visualization"],
                    growth: "EST. GROWTH: Critical Thinking",
                    impact: "HIGH IMPACT"
                },
                {
                    title: "UX/UI Design with Technical Focus",
                    icon: Palette,
                    desc: "Focuses on creating intuitive and engaging user experiences and interfaces for software and digital products.",
                    match: "Top Match",
                    analysis: "This path merges creative design sensibilities with logical and mathematical underpinnings.",
                    skills: ["User Research", "Visual Design", "Wireframing", "Front-end Basics"],
                    growth: "EST. GROWTH: Empathy & Problem-Solving",
                    impact: "HIGH IMPACT"
                }
            ];

            setTimeout(() => {
                setSuggestions(recommendations);
                setPathState('results');
            }, 2500); // Fake Loading Time
        } catch (e) {
            console.error(e);
            setPathState('ready');
        }
    };

    if (pathState === 'results') {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Path Finder</h2>
                        <p className="text-gray-500">Discover the academic and career routes tailored for you.</p>
                    </div>
                    <Button variant="outline" onClick={() => setPathState('ready')}>Regenerate Paths</Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {suggestions.map((rec, i) => (
                        <Card key={i} className="flex flex-col hover:shadow-xl transition-all border-t-4 border-t-emerald-500 cursor-pointer hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                    <rec.icon size={28} />
                                </div>
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">{rec.match}</span>
                            </div>

                            <h3 className="text-xl font-bold mb-3">{rec.title}</h3>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-3">{rec.desc}</p>

                            <div className="bg-gray-50 p-4 rounded-xl mb-6 flex-1">
                                <p className="text-xs text-gray-600 leading-relaxed italic border-l-2 border-emerald-300 pl-3">
                                    {rec.analysis}
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Required Skills</div>
                                <div className="flex flex-wrap gap-2">
                                    {rec.skills.map((s, idx) => (
                                        <span key={idx} className="bg-white border border-gray-200 text-gray-600 text-[10px] font-medium px-3 py-1 rounded-lg">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                <div>
                                    <div className="text-[8px] font-bold text-gray-400 uppercase">{rec.growth}</div>
                                    <div className="text-xs font-bold text-emerald-600">{rec.impact}</div>
                                </div>
                                <button className="text-emerald-600 text-sm font-bold flex items-center gap-1">Details <ChevronRight size={14} /></button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-full py-20 text-center">
            <Card className="max-w-lg p-12">
                <Compass size={64} className={`mx-auto mb-6 ${pathState === 'generating' ? 'text-emerald-500 animate-spin' : 'text-emerald-200'}`} />
                <h2 className="text-3xl font-bold mb-4">
                    {pathState === 'generating' ? 'Analyzing your potential...' : 'Ready to find your path?'}
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    {pathState === 'generating'
                        ? 'Buddy is processing your strengths, challenges, and goals to find your perfect matches.'
                        : 'Click the button below to let Buddy analyze your profile and suggest the best academic streams and careers tailored for you.'}
                </p>
                <Button
                    className="w-full h-12"
                    onClick={generatePaths}
                    disabled={pathState === 'generating'}
                >
                    {pathState === 'generating' ? 'Generating...' : 'Generate My Paths'}
                </Button>
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                    <div>
                        <div className="text-[8px] font-bold text-gray-400 uppercase mb-1">Skill Analysis</div>
                        <div className={`w-full h-1 rounded-full ${pathState !== 'ready' ? 'bg-emerald-500' : 'bg-gray-100'}`}></div>
                    </div>
                    <div>
                        <div className="text-[8px] font-bold text-gray-400 uppercase mb-1">Academic Fit</div>
                        <div className={`w-full h-1 rounded-full ${pathState === 'results' ? 'bg-emerald-500' : 'bg-gray-100'}`}></div>
                    </div>
                    <div>
                        <div className="text-[8px] font-bold text-gray-400 uppercase mb-1">AI Insights</div>
                        <div className={`w-full h-1 rounded-full ${pathState === 'results' ? 'bg-emerald-500' : 'bg-gray-100'}`}></div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Pathfinder;
