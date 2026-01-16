import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Button, Card } from '../components/ui/Cards';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase'; // Ensure these are exported

const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        grade: '',
        strengths: '',
        challenges: '',
        stream: '',
        vision: ''
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleComplete = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    ...formData,
                    onboardingCompleted: true,
                    updatedAt: new Date().toISOString()
                }, { merge: true });
            } else {
                // If accessed without auth (e.g. dev mode), save to local storage
                localStorage.setItem('studentProfile', JSON.stringify(formData));
            }
            navigate('/');
        } catch (error) {
            console.error("Error saving profile:", error);
            // Fallback
            localStorage.setItem('studentProfile', JSON.stringify(formData));
            navigate('/');
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                {/* Progress Header */}
                <div className="flex justify-center items-center gap-4 mb-12">
                    {[1, 2, 3].map((s) => (
                        <React.Fragment key={s}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                {step > s ? <CheckCircle2 size={20} /> : s}
                            </div>
                            {s < 3 && <div className={`h-1 w-12 rounded-full ${step > s ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
                        </React.Fragment>
                    ))}
                </div>

                <Card className="p-10 shadow-xl relative overflow-hidden">
                    {/* Buddy Bubble */}
                    <div className="absolute top-6 right-6 bg-emerald-50 text-emerald-700 p-3 rounded-2xl text-xs font-medium max-w-[180px] border border-emerald-100 hidden sm:block">
                        <span className="font-bold">BUDDY SAYS:</span><br />
                        {step === 1 && "Take your time, friend! This helps me guide you better."}
                        {step === 2 && "Almost there! Your interests define your future."}
                        {step === 3 && "This is the exciting part! Where do you see yourself?"}
                    </div>

                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-2xl font-bold mb-2">Basic Info</h2>
                            <p className="text-gray-500 mb-8">Tell us a bit about yourself to personalize your experience.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Current Grade/Standard</label>
                                    <select
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 outline-none appearance-none"
                                        value={formData.grade}
                                        onChange={e => setFormData({ ...formData, grade: e.target.value })}
                                    >
                                        <option value="">Select your grade</option>
                                        {[...Array(12)].map((_, i) => (
                                            <option key={i} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
                                        ))}
                                        <option value="Undergraduate">Undergraduate</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-2xl font-bold mb-2">Academic Life</h2>
                            <p className="text-gray-500 mb-8">Tell us about your academic strengths and hurdles.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">What are your favorite subjects or strengths?</label>
                                    <textarea
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 outline-none h-24 resize-none"
                                        placeholder="e.g. Mathematics, Creative Writing, Problem Solving"
                                        value={formData.strengths}
                                        onChange={e => setFormData({ ...formData, strengths: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">What subjects do you find challenging?</label>
                                    <textarea
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 outline-none h-24 resize-none"
                                        placeholder="e.g. History dates, Physics formulas..."
                                        value={formData.challenges}
                                        onChange={e => setFormData({ ...formData, challenges: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-2xl font-bold mb-2">Future Goals</h2>
                            <p className="text-gray-500 mb-8">Let's look ahead to where you want to be.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Any particular stream or path you're interested in?</label>
                                    <select
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 outline-none appearance-none"
                                        value={formData.stream}
                                        onChange={e => setFormData({ ...formData, stream: e.target.value })}
                                    >
                                        <option value="">Choose an interest</option>
                                        <option>Science / Engineering</option>
                                        <option>Commerce / Business</option>
                                        <option>Arts / Humanities</option>
                                        <option>Creative / Design</option>
                                        <option>Medical / Biology</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Where do you see yourself in 5 years?</label>
                                    <textarea
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 outline-none h-24 resize-none"
                                        placeholder="e.g. Working as a software engineer, traveling the world..."
                                        value={formData.vision}
                                        onChange={e => setFormData({ ...formData, vision: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 flex gap-4 pt-6 border-t border-gray-100">
                        {step > 1 && (
                            <Button variant="ghost" onClick={prevStep}>
                                <ChevronLeft size={20} /> Back
                            </Button>
                        )}
                        <Button
                            className="flex-1 h-12"
                            onClick={step === 3 ? handleComplete : nextStep}
                            disabled={step === 1 && (!formData.fullName || !formData.grade)}
                        >
                            {step === 3 ? 'Finish & Explore' : 'Next'} <ChevronRight size={20} />
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Onboarding;
