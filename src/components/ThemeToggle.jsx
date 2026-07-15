import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });
    const [pressing, setPressing] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const isDark = theme === 'dark';

    return (
        <>
            {/* SVG Goo filter — only applied to the inner blob */}
            <svg
                style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', overflow: 'hidden' }}
                aria-hidden="true"
            >
                <defs>
                    <filter id="theme-goo" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                        <feColorMatrix
                            in="blur"
                            type="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <button
                className={[
                    'liq-toggle',
                    isDark ? 'liq-toggle--dark' : 'liq-toggle--light',
                    pressing ? 'liq-toggle--pressing' : '',
                ].join(' ')}
                onPointerDown={() => setPressing(true)}
                onPointerUp={() => { setPressing(false); toggleTheme(); }}
                onPointerLeave={() => setPressing(false)}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
                aria-pressed={isDark}
            >
                {/* Pill track background */}
                <span className="liq-track" aria-hidden="true" />

                {/* Goo blob layer — filter creates liquid squish */}
                <span className="liq-goo-wrap" aria-hidden="true">
                    <span className="liq-blob" />
                </span>

                {/* Visible thumb knob */}
                <span className="liq-thumb" aria-hidden="true">
                    {/* Sun — shown in light mode */}
                    <svg
                        className={`liq-icon liq-icon--sun${!isDark ? ' liq-icon--visible' : ''}`}
                        viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="4" />
                        <line x1="12" y1="2"  x2="12" y2="5" />
                        <line x1="12" y1="19" x2="12" y2="22" />
                        <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34" />
                        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                        <line x1="2"  y1="12" x2="5"  y2="12" />
                        <line x1="19" y1="12" x2="22" y2="12" />
                        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                    </svg>

                    {/* Moon — shown in dark mode */}
                    <svg
                        className={`liq-icon liq-icon--moon${isDark ? ' liq-icon--visible' : ''}`}
                        viewBox="0 0 24 24" fill="currentColor"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                    </svg>
                </span>
            </button>
        </>
    );
};

export default ThemeToggle;
