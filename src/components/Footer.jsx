import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer glass">
            <div className="container footer-container">
                <div className="footer-copyright">
                    <p>&copy; {currentYear} Abdullah Faisal. All rights reserved.</p>
                </div>
                <div className="footer-links">
                    <a href="mailto:abdullahf0100@gmail.com">EMAIL</a>
                    <span className="footer-separator">|</span>
                    <a href="https://github.com/abdi219" target="_blank" rel="noopener noreferrer">GITHUB</a>
                    <span className="footer-separator">|</span>
                    <a href="https://www.linkedin.com/in/abdullah-faisal-a8146930a/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
