import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            className="theme-toggle glass"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <span className="theme-icon">
                {theme === 'light' ? '☀️' : '🌙'}
            </span>
        </button>
    );
};

export default ThemeToggle;
