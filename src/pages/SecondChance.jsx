import React from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Cards';

const SecondChance = () => {
    // Note: This matches the "Resilience Hub" view from the request
    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Resilience Hub</h2>
                <p className="text-gray-500 mt-1">Setbacks are just setups for a better comeback. Celebrate the journey, not just the result.</p>
            </div>

            <div className="flex gap-4 mb-8">
                <button className="px-6 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium cursor-pointer">Inspiring Stories</button>
                <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 cursor-pointer">Alternative Paths</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {[
                        {
                            title: "From Tail to Founder",
                            author: "Mark S.",
                            text: "I failed my math finals twice, but those challenges taught me more about resilience than any textbook ever could. I now run a tech startup.",
                            category: "Career Pivot"
                        },
                        {
                            title: "The Pivot",
                            author: "Sarah L.",
                            text: "Didn't get into medical school. Pivoted to Biotech research and I've never been happier. Rejection was just redirection.",
                            category: "Academic Shift"
                        },
                        {
                            title: "Late Bloomer",
                            author: "James D.",
                            text: "Took 3 years to pass the entrance exam. Now I'm a top engineer at a global firm. Time is just a number.",
                            category: "Persistence"
                        }
                    ].map((story, i) => (
                        <Card key={i} className="hover:border-emerald-200 transition-all cursor-pointer">
                            <div className="text-xs font-bold text-emerald-600 uppercase mb-2">{story.category}</div>
                            <h3 className="text-xl font-bold mb-2">"{story.title}"</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2 italic text-sm">"{story.text}"</p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <span className="text-sm font-medium text-gray-400">By {story.author}</span>
                                <button className="text-emerald-600 text-sm font-bold flex items-center gap-1">Read full journey <ChevronRight size={14} /></button>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="space-y-6">
                    <Card className="bg-emerald-900 text-white">
                        <MessageSquare size={32} className="text-emerald-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Need to talk?</h3>
                        <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
                            Buddy is here to listen and help you navigate through tough times. You don't have to carry the weight alone.
                        </p>
                        {/* Opens the global chat - in a real app this might trigger a context state */}
                        <button className="w-full py-3 bg-emerald-400 text-emerald-950 rounded-xl font-bold hover:bg-emerald-300 transition-colors cursor-pointer">
                            Chat with Buddy
                        </button>
                    </Card>

                    <Card>
                        <h3 className="font-bold mb-4">Weekly Motivation</h3>
                        <div className="p-4 bg-gray-50 rounded-xl italic text-gray-600 text-sm relative">
                            "Success is not final, failure is not fatal: it is the courage to continue that counts."
                            <div className="mt-2 font-bold text-gray-900">— Winston Churchill</div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SecondChance;
