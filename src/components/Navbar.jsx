import React, { useState, useEffect } from "react";
import "./Navbar.css";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Certificates", href: "#certificates" },
    { name: "Events", href: "#extracurricular" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    const section = document.querySelector(href);
    if (section) {
      let offset = 80;
      if (href === "#certificates") offset = 40;
      if (href === "#contact") offset = 10;
      if (href === "#extracurricular") offset = 45;
      if (href === "#projects") offset = 50;
      if (window.innerWidth < 768) offset = 60;
      const offsetTop = section.offsetTop - offset;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#home" className="logo" onClick={handleNavClick}>
        <span className="logo-text">ABDULLAH //</span>
      </a>

      <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
        {navLinks.map((link, index) => (
          <li key={index} style={{ transitionDelay: `${index * 0.09}s` }}>
            <a href={link.href} onClick={handleNavClick}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <ThemeToggle />
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
