import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Sparkles, BookOpen } from 'lucide-react';

const Login = () => {
    const { signInWithGoogle, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
            // AuthContext listener will update state. 
            // We rely on that state change to redirect or show onboarding in App.jsx or here.
            // But usually, App.jsx handles routing based on user state.
            // For now, we manually navigate to onboarding which will then check profile.
            navigate('/onboarding');
        } catch (error) {
            console.error("Login failed", error);
            alert("Login Failed: " + error.message + "\n\nDid you add the Firebase Config keys to .env?");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 font-sans">
            <div className="max-w-md w-full bg-white rounded-[3.5rem] shadow-2xl p-12 border border-slate-50 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-10">
                    <div className="p-7 bg-indigo-600 rounded-[2.5rem] shadow-2xl shadow-indigo-100 relative">
                        <BookOpen className="w-14 h-14 text-white" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 border-4 border-white rounded-full"></div>
                    </div>
                </div>

                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">NextChapter</h1>
                <p className="text-slate-500 mb-12 text-lg font-medium leading-relaxed">
                    Your personalized academic DNA. From your first grade to your dream career.
                </p>

                <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-4 bg-white border-2 border-slate-100 py-5 px-8 rounded-3xl font-bold text-slate-700 hover:border-indigo-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                >
                    <img src="https://www.google.com/favicon.ico" className="w-6 h-6" alt="Google" />
                    Continue with Google
                </button>

                <div className="mt-10">
                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">
                        Powered by Gemini & Firebase
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
