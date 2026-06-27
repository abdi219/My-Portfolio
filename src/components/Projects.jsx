import React, { useState } from "react";
import "./Projects.css";
import useScrollAnimation from "../hooks/useScrollAnimation";
import FloatingDoodles from "./FloatingDoodles";
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
      title: "MindCare LLM",
      description: "Empathetic mental health chatbot fine-tuned on Hugging Face's empathetic_dialogues dataset using DistilGPT-2. Optimized with temperature controls and top-k/p thresholds to minimize repetition and maximize response stability.",
      tech: ["Python", "PyTorch", "Hugging Face", "LLMs"],
      github: "https://github.com/abdi219/MindCare-LLM-FineTuning",
      demo: "#",
      color: "#ec4899",
      romSize: "320 MB",
      genre: "AI / LLM FINE-TUNING"
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
      title: "FIFA Simulator",
      description: "Knockout-style FIFA World Cup tournament simulator built with Python and NumPy. Models goal generation using Poisson distribution based on team attack/defense attributes and runs Monte Carlo simulations to estimate win percentages.",
      tech: ["Python", "NumPy", "Monte Carlo"],
      github: "https://github.com/abdi219/FIFA_World_Cup_Simulator",
      demo: "#",
      color: "#f59e0b",
      romSize: "1.2 MB",
      genre: "SIM / PROBABILITY"
    },
    {
      title: "Nvidia Predictor",
      description: "Time-series regression model predicting NVIDIA's stock closing prices. Utilizes historical yfinance data with Random Forest, lag features, and moving averages to analyze high-volatility market movements.",
      tech: ["Python", "Scikit-Learn", "yfinance", "Regression"],
      github: "https://github.com/abdi219/Nvidia-Stock-Predictor",
      demo: "#",
      color: "#10b981",
      romSize: "14.2 MB",
      genre: "ML / TIME SERIES"
    },
    {
      title: "MediMind AI",
      description: "AI-powered health chatbot querying Llama 3.3 70B Instruct via Hugging Face Router API. Implements local keyword safety filtering, emergency warnings, and robust medical guardrails.",
      tech: ["Python", "Llama 3.3", "Hugging Face", "APIs"],
      github: "https://github.com/abdi219/MediMind-AI",
      demo: "#",
      color: "#06b6d4",
      romSize: "85 MB",
      genre: "AI / CLINICAL CHAT"
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
    <section id="projects" className="projects" style={{ position: "relative" }}>
      <FloatingDoodles section="projects" />
      <div className="container">
        <div className="section-header anim-rise">
          <h2>Featured Projects</h2>
          <p className="section-subtitle">Tactile Cartridge Console & Arcade Browser</p>
        </div>

        <div className="projects-arcade-layout anim-slide-right">
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

                    <h3 className="project-display-title">
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
