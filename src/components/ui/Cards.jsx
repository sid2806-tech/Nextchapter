import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const variants = {
        primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        secondary: 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700',
        outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50',
        ghost: 'hover:bg-gray-100 text-gray-600'
    };
    return (
        <button className={`px-6 py-2.5 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${className}`}>
        {children}
    </div>
);
