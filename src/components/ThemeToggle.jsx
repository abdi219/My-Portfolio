import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';
import { THEMES } from './ModelLab';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const root = document.documentElement;
        if (theme === 'light') {
            const selectedThemeId = localStorage.getItem("light_theme_selection") || 'cozy-minimalist';
            const themeObj = THEMES.find(t => t.id === selectedThemeId);
            if (themeObj) {
                Object.entries(themeObj.variables).forEach(([key, val]) => {
                    root.style.setProperty(key, val);
                });
            }
        } else {
            // Remove overrides in dark mode so stylesheet variables take over
            const variablesToClear = [
              "--color-bg-primary", "--color-bg-secondary", "--color-glass", "--color-glass-border",
              "--color-shadow", "--color-shadow-md", "--color-shadow-lg", "--color-grid-line",
              "--color-text-primary", "--color-text-secondary", "--color-text-muted",
              "--color-primary", "--color-primary-rgb", "--color-primary-light", "--color-primary-dark",
              "--color-secondary", "--color-accent-1", "--color-accent-2", "--color-accent-3", "--color-accent-4"
            ];
            variablesToClear.forEach(v => root.style.removeProperty(v));
        }
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
