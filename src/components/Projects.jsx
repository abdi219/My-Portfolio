import React, { useState } from "react";
import "./Projects.css";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { Github, Cpu, Play, CircleAlert } from "lucide-react";

const Projects = () => {
  useScrollAnimation();

  const projects = [
    {
      title: "Catch or Kaboom",
      description: "A complete game built using Raylib (C++) featuring custom game mechanics, logic handling, collision detection, and performance-focused design.",
      tech: ["C++", "Raylib", "Game Dev"],
      github: "https://github.com/abdi219/CatchOrKaboom_Raylib",
      demo: "#",
      color: "#ef4444",
      romSize: "4.2 MB",
      genre: "ARCADE / REFLEX"
    },
    {
      title: "Snake Game",
      description: "Classic Snake game implementation in C++ with clean logic, efficient state management, and smooth gameplay mechanics.",
      tech: ["C++", "Raylib", "Algorithms"],
      github: "https://github.com/abdi219/SnakeGameCpp_Raylib",
      demo: "#",
      color: "#22c55e",
      romSize: "1.8 MB",
      genre: "CLASSIC / LOGIC"
    },
    {
      title: "E-Commerce Web",
      description: "Full frontend-focused web application built with React and Node.js, featuring a modern UI, component-based structure, and responsive design.",
      tech: ["React.js", "Node.js", "CSS"],
      github: "https://github.com/abdi219/React-Ecommerce-Website",
      demo: "#",
      color: "#3b82f6",
      romSize: "12.5 MB",
      genre: "COMMERCE / WEB"
    },
    {
      title: "AI Agent App",
      description: "A customized intelligent agent dashboard incorporating conversation memory nodes, contextual routing engines, and generative chatbot integrations.",
      tech: ["React.js", "Generative AI", "NLP"],
      github: "https://github.com/abdi219/Chatbot-React",
      demo: "#",
      color: "#8b5cf6",
      romSize: "8.1 MB",
      genre: "AI / CONSOLE"
    },
    {
      title: "Lock System",
      description: "Console-based security system demonstrating strong Object-Oriented Programming (OOP) principles and structured C++ design.",
      tech: ["C++", "OOP", "Console"],
      github: "https://github.com/abdi219/LockSystem",
      demo: "#",
      color: "#f59e0b",
      romSize: "0.5 MB",
      genre: "SECURITY / OOP"
    },
    {
      title: "Prince Adventure",
      description: "A 2D adventure game built with Godot (GDScript) featuring smooth character movement, custom level design, and engaging gameplay mechanics.",
      tech: ["Godot", "GDScript", "Game Dev"],
      github: "https://github.com/abdi219/PrinceWalkthrough",
      demo: "#",
      color: "#06b6d4",
      romSize: "8.4 MB",
      genre: "2D PLATFORMER"
    },
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [isInserting, setIsInserting] = useState(false);

  const handleSelectProject = (idx) => {
    if (idx === selectedIdx) return;
    setIsInserting(true);
    setSelectedIdx(idx);
    
    // Simulate cartridge insertion time
    setTimeout(() => {
      setActiveProject(projects[idx]);
      setIsInserting(false);
    }, 450);
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <h2>Featured Projects</h2>
          <p className="section-subtitle">Tactile Cartridge Console & Arcade Browser</p>
        </div>

        <div className="projects-arcade-layout animate-on-scroll">
          {/* Left Side: Cartridge Rack */}
          <div className="cartridge-rack-container">
            <h3 className="rack-title">Game Cartridge Rack</h3>
            <div className="cartridge-rack">
              {projects.map((proj, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={idx}
                    className={`project-cartridge ${isSelected ? "selected" : ""}`}
                    style={{ "--cartridge-color": proj.color }}
                    onClick={() => handleSelectProject(idx)}
                  >
                    <div className="cartridge-sticker">
                      <div className="sticker-header">
                        <span>ABDI_SYSTEM</span>
                        <Cpu size={10} />
                      </div>
                      <div className="sticker-title">{proj.title}</div>
                      <div className="sticker-footer">
                        <span>{proj.genre}</span>
                      </div>
                    </div>
                    <div className="cartridge-ridge-pattern"></div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Arcade Cabinet Screen */}
          <div className="arcade-cabinet-container">
            <div className="cabinet-bezel glass">
              <div className="crt-screen">
                <div className="crt-scanlines"></div>
                <div className="crt-glare"></div>

                {isInserting ? (
                  <div className="crt-boot-screen">
                    <div className="boot-spinner"></div>
                    <span className="boot-text">LOADING ROM...</span>
                  </div>
                ) : (
                  <div className="crt-project-content animate-fade-in">
                    <div className="project-display-header">
                      <span className="genre-tag">{activeProject.genre}</span>
                      <span className="rom-size-tag">ROM SIZE: {activeProject.romSize}</span>
                    </div>

                    <h3 className="project-display-title" style={{ color: activeProject.color }}>
                      {activeProject.title.toUpperCase()}
                    </h3>

                    <p className="project-display-desc">
                      {activeProject.description}
                    </p>

                    <div className="project-display-tech">
                      {activeProject.tech.map((t, i) => (
                        <span key={i} className="display-tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="project-display-links">
                      <a
                        href={activeProject.github}
                        className="display-btn btn-git glass-subtle"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={14} />
                        <span>SOURCE CODE</span>
                      </a>
                      
                      {activeProject.demo !== "#" ? (
                        <a
                          href={activeProject.demo}
                          className="display-btn btn-play"
                          style={{ background: activeProject.color }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Play size={14} />
                          <span>RUN DEMO</span>
                        </a>
                      ) : (
                        <div className="display-btn btn-offline glass-subtle">
                          <CircleAlert size={14} />
                          <span>OFFLINE ROM</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Console Slot Visualizer */}
            <div className="console-cartridge-slot">
              <div className="slot-opening">
                <div className={`slot-door ${isInserting ? "open" : ""}`}></div>
              </div>
              <span className="slot-label">INSERT CARTRIDGE TO PLAY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
