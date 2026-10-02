import React, { useState, useRef } from "react";
import "./Projects.css";
import useScrollAnimation from "../hooks/useScrollAnimation";
import FloatingDoodles from "./FloatingDoodles";
import { Github, Cpu, Play, CircleAlert, ChevronLeft, ChevronRight } from "lucide-react";

const Projects = () => {
  useScrollAnimation();
  const rackRef = useRef(null);

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
      title: "LLM Ticket Tagging",
      description: "An automated customer support ticket classification system comparing zero-shot and few-shot prompting techniques using Qwen2.5-1.5B-Instruct. Features advanced prompt engineering and tokenizer-level stopping guardrails for stable structured predictions.",
      tech: ["Qwen2.5", "Hugging Face", "LLMs", "Prompt Eng"],
      github: "https://github.com/abdi219/AutoTagging-SupportTickets",
      demo: "#",
      color: "#f59e0b",
      romSize: "1.5 GB",
      genre: "LLM / AUTO-TAGGING"
    },
    {
      title: "Telco Churn ML",
      description: "An end-to-end customer churn prediction pipeline built using Scikit-Learn. Features automated column preprocessing to eliminate data leakage and hyperparameters tuned via GridSearchCV to achieve 82% accuracy with Logistic Regression.",
      tech: ["Python", "Scikit-Learn", "GridSearchCV", "Pipeline"],
      github: "https://github.com/abdi219/Customer-Churn-Pipeline",
      demo: "#",
      color: "#10b981",
      romSize: "24 MB",
      genre: "ML / PIPELINE"
    },
    {
      title: "Context-Aware RAG Chatbot",
      description: "A context-aware conversational AI system built with LangChain and Retrieval-Augmented Generation. Uses Hugging Face embeddings, ChromaDB vector search, and conversational memory to retrieve and generate accurate responses from a custom knowledge base, deployed via Streamlit.",
      tech: ["Python", "LangChain", "ChromaDB", "Streamlit", "RAG"],
      github: "https://github.com/abdi219/Context-Aware-RAG-Chatbot",
      demo: "#",
      color: "#8b5cf6",
      romSize: "~500 MB",
      genre: "AI / RAG PIPELINE"
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
    }, 380);
  };

  const handlePrev = () => {
    const prevIdx = selectedIdx === 0 ? projects.length - 1 : selectedIdx - 1;
    handleSelectProject(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = selectedIdx === projects.length - 1 ? 0 : selectedIdx + 1;
    handleSelectProject(nextIdx);
  };

  return (
    <section id="projects" className="projects" style={{ position: "relative" }}>
      <FloatingDoodles section="projects" />
      <div className="container">
        <div className="section-header anim-rise">
          <h2>Featured Projects</h2>
          <p className="section-subtitle">Tactile Cartridge Console &amp; Arcade Browser</p>
        </div>

        <div className="projects-arcade-layout">
          {/* Left Side: Cartridge Rack (Desktop Left / Mobile Bottom) */}
          <div className="cartridge-rack-container anim-slide-left">
            <div className="rack-header-row">
              <h3 className="rack-title">Game Cartridge Rack</h3>
              <span className="rack-counter-badge">{selectedIdx + 1} / {projects.length}</span>
            </div>
            <div className="cartridge-rack" ref={rackRef}>
              {projects.map((proj, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={idx}
                    className={`project-cartridge ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectProject(idx)}
                    type="button"
                    aria-label={`Select ${proj.title}`}
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

          {/* Right Side: Arcade Cabinet Screen (Desktop Right / Mobile Top) */}
          <div className="arcade-cabinet-container anim-slide-right">
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
                      <span className="rom-size-tag">ROM: {activeProject.romSize}</span>
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

              {/* Mobile Arcade Cabinet Nav Buttons */}
              <div className="mobile-arcade-nav">
                <button
                  type="button"
                  className="arcade-nav-btn"
                  onClick={handlePrev}
                  aria-label="Previous ROM"
                >
                  <ChevronLeft size={14} /> PREV ROM
                </button>
                <div className="arcade-nav-rom-dots">
                  {projects.map((_, i) => (
                    <span
                      key={i}
                      className={`rom-dot ${i === selectedIdx ? "active" : ""}`}
                      onClick={() => handleSelectProject(i)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="arcade-nav-btn"
                  onClick={handleNext}
                  aria-label="Next ROM"
                >
                  NEXT ROM <ChevronRight size={14} />
                </button>
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

