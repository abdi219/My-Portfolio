import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div 
            className={`theme-toggle-sidebar ${theme}`} 
            onClick={toggleTheme}
            role="button"
            tabIndex={0}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleTheme(); }}
        >
            <div className="toggle-thumb">
                {theme === 'light' ? (
                    <Sun size={12} className="thumb-icon-anim sun" fill="#ffffff" color="#ffffff" />
                ) : (
                    <Moon size={12} className="thumb-icon-anim moon" fill="#09090b" color="#09090b" />
                )}
            </div>
        </div>
    );
};

export default ThemeToggle;
