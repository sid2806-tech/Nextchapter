import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Rocket,
    LayoutDashboard,
    Compass,
    ShieldCheck,
    Trophy,
    Clock,
    TrendingUp,
    Settings,
    LogOut,
    Search,
    Bell
} from 'lucide-react';
import { auth } from '../lib/firebase';
import AIBuddy from '../components/AIBuddy';
import SettingsModal from '../components/features/SettingsModal';
import ProfileModal from '../components/features/ProfileModal';
import Notifications from '../components/features/Notifications';

const Sidebar = ({ activeTab, setTab, onLogout, onSettings }) => {
    const menuItems = [
        { id: '', icon: LayoutDashboard, label: 'Overview' },
        { id: 'pathfinder', icon: Compass, label: 'Path Finder' },
        { id: 'focus', icon: Clock, label: 'Focus Zone' },
        { id: 'resilience', icon: ShieldCheck, label: 'Resilience Hub' },
        { id: 'growth', icon: Trophy, label: 'Growth Zone' },
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
                <button
                    onClick={onSettings}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                    <Settings size={20} /> Settings
                </button>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </aside>
    );
};

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // State for Modals
    const [showSettings, setShowSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Map current path to tab id (remove leading slash)
    const currentTab = location.pathname.slice(1);

    const handleNavigation = (tabId) => {
        navigate(`/${tabId}`);
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const user = auth.currentUser;

    return (
        <div className="flex min-h-screen bg-[#FDFDFD] text-[#1A1A1A]">
            <Sidebar
                activeTab={currentTab}
                setTab={handleNavigation}
                onLogout={handleLogout}
                onSettings={() => setShowSettings(true)}
            />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-20 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search paths, tips, or Buddy..."
                            className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-6 relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                            <Bell size={22} />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        {/* Notifications Dropdown */}
                        <Notifications isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

                        <div
                            className="flex items-center gap-3 pl-6 border-l border-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setShowProfile(true)}
                        >
                            <div className="text-right">
                                <div className="text-sm font-bold">{user?.displayName || 'Student'}</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Grade 10</div>
                            </div>
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold overflow-hidden">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    user?.displayName?.[0] || 'S'
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-8 bg-[#FDFDFD]">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            <AIBuddy />

            {/* Modals */}
            <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
            <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} user={user} />
        </div>
    );
};

export default Layout;
