import React from 'react';
import { Bell, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const NotificationItem = ({ type, title, time, read }) => {
    const icons = {
        success: <CheckCircle2 size={16} className="text-emerald-500" />,
        alert: <AlertCircle size={16} className="text-red-500" />,
        info: <Info size={16} className="text-blue-500" />
    };

    return (
        <div className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 ${read ? 'opacity-60' : 'bg-emerald-50/30'}`}>
            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${type === 'success' ? 'bg-emerald-100' : type === 'alert' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                {icons[type] || icons.info}
            </div>
            <div className="flex-1">
                <div className="text-sm font-bold text-gray-900">{title}</div>
                <div className="text-xs text-gray-500 mt-1">{time}</div>
            </div>
            {!read && <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>}
        </div>
    );
};

const Notifications = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop to close on click outside */}
            <div className="fixed inset-0 z-40" onClick={onClose}></div>
            <div className="absolute top-16 right-20 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold flex items-center gap-2">
                        <Bell size={16} className="text-emerald-600" /> Notifications
                    </h3>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                    <NotificationItem type="success" title="Goal Completed: Algebra Quiz" time="2 hours ago" />
                    <NotificationItem type="info" title="Buddy: New study tip available" time="5 hours ago" />
                    <NotificationItem type="alert" title="Reminder: Focus session missed" time="Yesterday" />
                    <NotificationItem type="info" title="Welcome to PathwayBuddy!" time="2 days ago" read={true} />
                </div>
                <div className="p-3 border-t border-gray-100 text-center">
                    <button className="text-xs font-bold text-gray-400 hover:text-emerald-600">Mark all as read</button>
                </div>
            </div>
        </>
    );
};

export default Notifications;
