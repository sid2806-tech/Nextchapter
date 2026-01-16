import React, { useState, useEffect } from 'react';
import {
  Compass,
  Target,
  Rocket,
  MessageSquare,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  Clock,
  User,
  Search,
  Bell,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Trophy,
  ExternalLink,
  Plus,
  LogOut,
  Settings,
  MoreVertical,
  X,
  Send,
  ChevronLeft,
  CheckCircle2,
  Cpu,
  Database,
  Palette
} from 'lucide-react';

// Import Firebase
import { auth, googleProvider } from './lib/firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    secondary: 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700',
    outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50',
    ghost: 'hover:bg-gray-100 text-gray-600'
  };
  return (
    <button className={`px-6 py-2.5 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

// --- Onboarding Flow ---
const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: auth.currentUser?.displayName || 'Student',
    grade: '',
    strengths: '',
    challenges: '',
    stream: '',
    vision: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

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
          <div className="absolute top-6 right-6 bg-emerald-50 text-emerald-700 p-3 rounded-2xl text-xs font-medium max-w-[180px] border border-emerald-100">
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
                  />
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
              onClick={step === 3 ? () => onComplete(formData) : nextStep}
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

// --- Landing Page ---
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
            <Card key={i} className="text-center group hover:border-emerald-200 hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <feature.icon size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

// --- View: Path Finder Results ---
const PathResults = ({ onRegenerate }) => {
  const recommendations = [
    {
      title: "Software Engineering / Development",
      icon: Cpu,
      desc: "Design, develop, test, and maintain software applications. This path can range from web development...",
      match: "Top Match",
      analysis: "Combines a strong aptitude for maths with a creative outlet for problem-solving and building new things.",
      skills: ["Programming (Python, Java)", "Data Structures", "Logic & Critical Thinking"],
      growth: "EST. GROWTH: High Impact",
      impact: "HIGH IMPACT"
    },
    {
      title: "Data Science / Analytics",
      icon: Database,
      desc: "Extract insights from large datasets using statistical methods and machine learning. This involves...",
      match: "Top Match",
      analysis: "Leverages strong mathematical skills for statistical modeling and algorithmic design. The creative aspect...",
      skills: ["Statistics", "Mathematics", "Programming (R, Python)", "Data Visualization"],
      growth: "EST. GROWTH: Critical Thinking",
      impact: "HIGH IMPACT"
    },
    {
      title: "UX/UI Design with Technical Focus",
      icon: Palette,
      desc: "Focuses on creating intuitive and engaging user experiences and interfaces for software and digital...",
      match: "Top Match",
      analysis: "This path merges creative design sensibilities with logical and mathematical underpinnings of how...",
      skills: ["User Research", "Visual Design", "Wireframing", "Front-end Development Basics"],
      growth: "EST. GROWTH: Empathy & Problem-Solving",
      impact: "HIGH IMPACT"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Path Finder</h2>
          <p className="text-gray-500">Discover the academic and career routes tailored for you.</p>
        </div>
        <Button variant="outline" onClick={onRegenerate}>Regenerate Paths</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, i) => (
          <Card key={i} className="flex flex-col hover:shadow-xl transition-all border-t-4 border-t-emerald-500">
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
};

// --- Sidebar Component ---
const Sidebar = ({ activeTab, setTab, onLogout }) => {
  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'finder', icon: Compass, label: 'Path Finder' },
    { id: 'resilience', icon: ShieldCheck, label: 'Resilience Hub' },
    { id: 'growth', icon: Trophy, label: 'Growth Zone' },
    { id: 'focus', icon: Clock, label: 'Focus Zone' },
    { id: 'tracker', icon: TrendingUp, label: 'Growth Tracker' },
  ];

  return (
    <aside className="w-64 border-r border-gray-100 bg-white h-screen flex flex-col sticky top-0">
      <div className="p-6 flex items-center gap-2 text-xl font-bold text-emerald-600">
        <Rocket size={24} />
        <span>PathwayBuddy</span>
      </div>

      <div className="flex-1 px-4 py-2 space-y-1">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4 mt-4">Learning Modules</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === item.id
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50">
          <Settings size={20} /> Settings
        </button>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

// --- Main App ---
export default function App() {
  const [view, setView] = useState('landing'); // landing, onboarding, dashboard
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotification, setShowNotification] = useState(false);
  const [pathState, setPathState] = useState('ready'); // ready, generating, results
  const [userData, setUserData] = useState({ fullName: '', grade: '' });
  const [firebaseUser, setFirebaseUser] = useState(null);

  // Monitor Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        setUserData({
          fullName: user.displayName || 'Friend',
          grade: 'Student'
        });
        // If logged in, go to dashboard directly (or onboarding if we had a flag)
        if (view === 'landing') setView('dashboard');
      } else {
        setView('landing');
      }
    });
    return () => unsubscribe();
  }, [view]); // depend on view to avoid resetting during active session interactions if needed

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Auth state listener will handle the transition
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleOnboardingComplete = (data) => {
    setUserData(data);
    setView('dashboard');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const generatePaths = () => {
    setPathState('generating');
    setTimeout(() => setPathState('results'), 1500);
  };

  const logout = () => {
    signOut(auth);
    setView('landing');
    setPathState('ready');
  };

  if (view === 'landing' || !firebaseUser) return <LandingPage onStart={handleLogin} />;
  if (view === 'onboarding') return <Onboarding onComplete={handleOnboardingComplete} />;

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] text-[#1A1A1A]">
      <Sidebar activeTab={activeTab} setTab={setActiveTab} onLogout={logout} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Toast Notification */}
        {showNotification && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4 duration-300">
            <div className="bg-emerald-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-700">
              <Rocket size={18} className="text-emerald-400" />
              <span className="text-sm font-bold">Onboarding completed! Welcome aboard.</span>
            </div>
          </div>
        )}

        <header className="h-20 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search paths, tips, or Buddy..."
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-emerald-600">
              <Bell size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right">
                <div className="text-sm font-bold">{userData.fullName}</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{userData.grade || 'N/A'}</div>
              </div>
              {firebaseUser?.photoURL ? (
                <img src={firebaseUser.photoURL} alt="Profile" className="w-10 h-10 rounded-xl" />
              ) : (
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                  {userData.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-[#FDFDFD]">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'finder' ? (
              pathState === 'results' ? (
                <PathResults onRegenerate={() => setPathState('ready')} />
              ) : (
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
              )
            ) : (
              // Default views... (simplified for this update)
              <div className="animate-in fade-in duration-500">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Welcome back, {userData.fullName?.split(' ')[0]}!</h2>
                  <p className="text-gray-500">Your dashboard is updated with the latest insights.</p>
                </div>
                {/* Dashboard content placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:border-emerald-200 cursor-pointer" onClick={() => setActiveTab('finder')}>
                    <Compass className="text-emerald-600 mb-4" />
                    <h3 className="font-bold">Path Finder</h3>
                    <p className="text-sm text-gray-500">Discover your career path</p>
                  </Card>
                  <Card>
                    <ShieldCheck className="text-emerald-600 mb-4" />
                    <h3 className="font-bold">Resilience Hub</h3>
                    <p className="text-sm text-gray-500">Turn failures into futures</p>
                  </Card>
                  <Card>
                    <Trophy className="text-emerald-600 mb-4" />
                    <h3 className="font-bold">Growth Zone</h3>
                    <p className="text-sm text-gray-500">Extra activities & skills</p>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Persistent AI Buddy */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <MessageSquare size={32} />
        </button>
      </div>
    </div>
  );
}
