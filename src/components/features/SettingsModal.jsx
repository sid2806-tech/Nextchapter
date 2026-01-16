import React from 'react';
import { Modal } from '../ui/Modals';
import { Bell, Shield, Moon, Monitor, User } from 'lucide-react';

const SettingsItem = ({ icon: Icon, title, desc, toggle }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors cursor-pointer" onClick={toggle}>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                <Icon size={20} />
            </div>
            <div>
                <div className="font-bold text-gray-900 text-sm">{title}</div>
                <div className="text-xs text-gray-500">{desc}</div>
            </div>
        </div>
        <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
        </div>
    </div>
);

const SettingsModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Settings">
            <div className="space-y-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Preferences</div>
                <SettingsItem
                    icon={Bell}
                    title="Push Notifications"
                    desc="Get updates on your goals"
                />
                <SettingsItem
                    icon={Moon}
                    title="Dark Mode"
                    desc="Switch to dark appearance"
                />
                <SettingsItem
                    icon={Monitor}
                    title="Focus Mode"
                    desc="Auto-hide sidebars in Focus Zone"
                />

                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-8 mb-4">Privacy</div>
                <SettingsItem
                    icon={Shield}
                    title="Public Profile"
                    desc="Allow others to see your progress"
                />
                <SettingsItem
                    icon={User}
                    title="Data Sharing"
                    desc="Share usage data for improvements"
                />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 text-gray-500 font-medium hover:bg-gray-100 rounded-xl">Cancel</button>
                <button onClick={onClose} className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700">Save Changes</button>
            </div>
        </Modal>
    );
};

export default SettingsModal;
