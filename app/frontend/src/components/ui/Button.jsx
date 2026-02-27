import React from 'react';

export const Button = ({ children, className = '', variant = 'default', size = 'default', ...props }) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none disabled:opacity-50';
    const variants = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border-2 border-slate-700 text-slate-300 hover:bg-slate-800',
        ghost: 'hover:bg-slate-800 text-slate-300',
    };
    const sizes = {
        default: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
        sm: 'px-3 py-1.5 text-sm',
    };
    return (
        <button className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>
            {children}
        </button>
    );
};
