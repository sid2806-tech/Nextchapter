import React from 'react';
import { Modal } from '../ui/Modals';
import { User, Mail, GraduationCap, MapPin, Edit2 } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, user }) => {
    const userData = user || {
        displayName: 'Student Name',
        email: 'student@example.com',
        photoURL: ''
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="My Profile">
            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-3xl mb-4 border-4 border-white shadow-lg relative">
                    {userData.photoURL ? (
                        <img src={userData.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        userData.displayName?.[0] || 'S'
                    )}
                    <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full hover:bg-black transition-colors">
                        <Edit2 size={12} />
                    </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{userData.displayName}</h2>
                <div className="text-emerald-600 font-medium text-sm">Target: Computer Science</div>
            </div>

            <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-500 shadow-sm">
                        <Mail size={18} />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs text-gray-400 font-bold uppercase">Email</div>
                        <div className="text-sm font-medium text-gray-900">{userData.email}</div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-500 shadow-sm">
                        <GraduationCap size={18} />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs text-gray-400 font-bold uppercase">Grade/Standard</div>
                        <div className="text-sm font-medium text-gray-900">Grade 10</div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-500 shadow-sm">
                        <MapPin size={18} />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs text-gray-400 font-bold uppercase">Location</div>
                        <div className="text-sm font-medium text-gray-900">Mumbai, India</div>
                    </div>
                </div>
            </div>

            <button className="w-full mt-8 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50">
                Edit Profile Information
            </button>
        </Modal>
    );
};

export default ProfileModal;
