import React from 'react';

export const Card = ({ children, className = '', ...props }) => (
    <div className={`rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl ${className}`} {...props}>
        {children}
    </div>
);

export const CardHeader = ({ children, className = '', ...props }) => (
    <div className={`p-6 ${className}`} {...props}>{children}</div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
    <h3 className={`text-xl font-semibold ${className}`} {...props}>{children}</h3>
);

export const CardDescription = ({ children, className = '', ...props }) => (
    <p className={`text-slate-400 ${className}`} {...props}>{children}</p>
);

export const CardContent = ({ children, className = '', ...props }) => (
    <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>
);
