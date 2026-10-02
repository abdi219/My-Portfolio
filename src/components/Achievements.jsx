import React, { useState, useEffect } from "react";
import "./Achievements.css";
import useScrollAnimation from "../hooks/useScrollAnimation";
import FloatingDoodles from "./FloatingDoodles";
import { 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Maximize2, 
  CheckCircle2, 
  ShieldCheck,
  Briefcase,
  Award,
  Trophy,
  Bot,
  Zap,
  Code2,
  Terminal,
  Layers,
  Users
} from "lucide-react";

// Helper to safely encode spaces in image paths
const encodeImagePath = (path) => {
  if (!path) return "";
  return encodeURI(path);
};

const Achievements = () => {
  useScrollAnimation();

  const achievementsData = [
    {
      id: "devhub-intern",
      nodeNum: "01",
      bubbleLabel: "DevHub",
      icon: <Briefcase size={22} />,
      title: "AI / ML Engineering Internship",
      issuer: "DevelopersHub Corporation",
      categoryLabel: "INTERNSHIP",
      date: "Jun 1 – Jul 14, 2026",
      badge: "BEST AWARD • DHC-2090",
      highlight: "6-Week Intensive Internship • Multi-Phase Tasks & Team Mentorship",
      description: "Completed an intensive 6-week AI/ML Engineering Internship at DevelopersHub Corporation, delivering technical tasks across structured phases under active team mentorship. Honored with the Best Award in recognition of outstanding performance and high-quality contributions.",
      image: "/Achievements & Hackathons/DeveloperHubIntern.png",
      verification: "Verified • Certificate ID: DHC-2090",
      tags: ["DevelopersHub", "AIMLInternship", "TeamMentorship", "AIEngineering", "BestAward"]
    },
    {
      id: "ieee-lead",
      nodeNum: "02",
      bubbleLabel: "IEEE",
      icon: <Award size={22} />,
      title: "IEEE AI/ML Domain Lead & Mentor",
      issuer: "IEEE Open Source • Cohort 1",
      categoryLabel: "LEADERSHIP",
      date: "2026 – Present",
      badge: "DOMAIN LEAD • COHORT 1",
      highlight: "12-Week AI/ML Curriculum Design & Student Mentorship",
      description: "Served as the AI/ML Domain Lead and Mentor for Cohort 1 of IEEE Open Source. Designed and created the comprehensive 12-week AI/ML roadmap and course outline, mentoring students throughout the entire curriculum, managing weekly tasks, announcements, and providing structured guidance to build strong AI/ML foundations.",
      image: "/Achievements & Hackathons/IEEE.png",
      verification: "Verified • IEEE Open Source Cohort 1",
      tags: ["IEEEOpenSource", "DomainLead", "AIML", "CurriculumDesign", "StudentMentorship", "Cohort1"]
    },
    {
      id: "fortyguard-hackathon",
      nodeNum: "03",
      bubbleLabel: "FortyGuard",
      icon: <Trophy size={22} />,
      title: "FortyGuard Hackathon '26",
      issuer: "FortyGuard",
      categoryLabel: "HACKATHON",
      date: "Aug 18 – 30, 2026",
      badge: "DEMONSTRATED EXCELLENCE",
      highlight: "HeatShield AI • Microclimate Maps, Cool Routing & What-If Simulator",
      description: "Engineered HeatShield AI using FortyGuard's street-level climate APIs and Antigravity. Features multi-layer urban heat maps (street heat & tree canopy deficit), dual-route simulator (fastest vs coolest path), interactive what-if urban planting simulator, and context-aware AI with exportable PDF hazard reports.",
      image: "/Achievements & Hackathons/FortyGuardHackhton.png",
      verification: "Verified • Project: HeatShield AI",
      tags: ["HeatShieldAI", "FortyGuard", "UrbanMicroclimate", "CoolestRouting", "WhatIfSimulator", "Antigravity"]
    },
    {
      id: "ibm-bob-hackathon",
      nodeNum: "04",
      bubbleLabel: "IBM",
      icon: <Bot size={22} />,
      title: "IBM Bob 2.0 Hackathon",
      issuer: "Lablab.ai & IBM",
      categoryLabel: "HACKATHON",
      date: "Sep 25 – 27, 2026",
      badge: "GLOBAL AI COMPLETION",
      highlight: "Parity — Deterministic API Docs vs Codebase Parity Checker",
      description: "Architected Parity, an automated codebase-to-documentation parity checker that eliminates API drift. Employs AST-level parsing and Regex for high-precision deterministic code inspection, intelligent markdown doc parsing with LLM fallback for ambiguous docs, smart file heuristics, and actionable discrepancy diff reports.",
      image: "/Achievements & Hackathons/IBMBob2.0Hackhton.png",
      verification: "Verified • ID: CMJLAR0GC02AFS601DLOBMSI4",
      tags: ["Parity", "IBMBob", "APIDrift", "ASTParsing", "DocParity", "CodeIntelligence"]
    },
    {
      id: "ai-factory-hackathon",
      nodeNum: "05",
      bubbleLabel: "AIFactory",
      icon: <Zap size={22} />,
      title: "AI Factory Hackathon",
      issuer: "Lablab.ai & NativelyAI",
      categoryLabel: "HACKATHON",
      date: "Aug 3 – 10, 2026",
      badge: "COMPLETION & DEMO",
      highlight: "ScopeCreep Zero — AI-Powered Scope Drift & Client Sign-Off Engine",
      description: "Built ScopeCreep Zero to detect and eliminate client scope creep. Ingests initial client specs and messy follow-up messages, analyzes scope diffs with AI, auto-calculates hours & budgets with task breakdowns, generates client email drafts with interactive sign-off portals, and maintains an automated project change journal.",
      image: "/Achievements & Hackathons/AIFactoryHackhton.png",
      verification: "Verified • ID: CMSR9BRLQ00TPS601BY9ER7KX",
      tags: ["ScopeCreepZero", "AIFactory", "ScopeDrift", "ClientPortals", "AutomatedJournal", "FreelanceAI"]
    },
    {
      id: "intratech-hackathon",
      nodeNum: "06",
      bubbleLabel: "IntraTech",
      icon: <Code2 size={22} />,
      title: "Top 10 Finalist — IntraTech 2.0 C++ Hackathon",
      issuer: "TechSphere Society",
      categoryLabel: "HACKATHON",
      date: "December 2025",
      badge: "TOP 10 FINALIST",
      highlight: "Two-Phase C++ Problem Solving & Algorithmic AI Optimization",
      description: "Competed in the IntraTech 2.0 C++ Hackathon structured in two rounds: Phase 1 and the Phase 2 Top 10 Finalist round. Solved complex, large-scale C++ problem scenarios using algorithmic and AI-driven optimization techniques to maximize benchmark scores, qualifying and finishing as a Top 10 Finalist.",
      image: "/image.png",
      verification: "Verified • TechSphere Society LGU",
      tags: ["IntraTech", "Top10Finalist", "Cpp", "ProblemSolving", "Optimization", "TechSphere"]
    },
    {
      id: "ucp-taakra-speed",
      nodeNum: "07",
      bubbleLabel: "Taakra",
      icon: <Terminal size={22} />,
      title: "UCP Taakra Speed Coding",
      issuer: "University of Central Punjab",
      categoryLabel: "COMPETITION",
      date: "Feb 2026",
      badge: "OLYMPIAD COMPETITOR",
      highlight: "Team Lead • ACM LGU 3-Member Speed Programming Contingent",
      description: "Led a 3-member contingent sent officially by the ACM LGU Chapter to the national olympiad UCP TAAKRA 2026. Competed in the high-intensity Speed Programming module, solving multiple complex algorithmic and data structure problem sets under strict time limits.",
      image: "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.34 PM.jpeg",
      verification: "Verified • UCP TAAKRA 2026",
      tags: ["UCPTaakra", "TeamLead", "ACMLGU", "SpeedProgramming", "CompetitiveCoding", "Algorithms"]
    },
    {
      id: "lablab-next-hackathon",
      nodeNum: "08",
      bubbleLabel: "LabLab",
      icon: <Layers size={22} />,
      title: "LabLab Next Hackathon",
      issuer: "Lablab.ai & NativelyAI",
      categoryLabel: "HACKATHON",
      date: "Jun 28 – Jul 4, 2024",
      badge: "COMPLETION CERTIFICATE",
      highlight: "Prompt-to-Presentation — Real-Time Generative Slide Engine",
      description: "Engineered 'Prompt-to-Presentation' during the global LabLab Next Hackathon. Built an end-to-end AI slide generator that transforms raw prompts and unstructured topic ideas into structured, presentation-ready decks using LLMs, prompt engineering, and custom layout orchestration.",
      image: "/Achievements & Hackathons/LablabNextHackhton.png",
      verification: "Verified • ID: CLZVCADDS004OV7ZUAIKGOW0",
      tags: ["PromptToPresentation", "LablabNext", "GenerativeAI", "SlideGeneration", "LLMs", "FullStack"]
    },
    {
      id: "acm-member",
      nodeNum: "09",
      bubbleLabel: "ACM",
      icon: <Users size={22} />,
      title: "ACM Technical Member & Event Mentor",
      issuer: "LGU ACM Student Chapter",
      categoryLabel: "COMMUNITY",
      date: "2025 – Present",
      badge: "TECHNICAL MEMBER",
      highlight: "LinkedIn Corner Mentor, Industrial Visits & Society Meetings",
      description: "Active Technical Member of the ACM Student Chapter. Served as a student mentor for the 'LinkedIn Corner' event, guiding university peers on profile optimization, networking, and career growth. Actively participated in industrial tours, technical meetings, and chapter initiatives.",
      image: "/Achievements & Hackathons/ACM.png",
      verification: "Verified • LGU ACM Chapter",
      tags: ["ACMChapter", "TechnicalMember", "LinkedInCorner", "Mentorship", "IndustrialTours", "Community"]
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const storyStripRef = React.useRef(null);
  const isInitialMount = React.useRef(true);

  const activeItem = achievementsData[activeIndex];

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + achievementsData.length) % achievementsData.length);
    setImageLoading(true);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % achievementsData.length);
    setImageLoading(true);
  };

  // Auto-scroll selected bubble horizontally inside story strip ONLY on user interaction
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (storyStripRef.current) {
      const selectedBubble = storyStripRef.current.children[activeIndex];
      if (selectedBubble) {
        const container = storyStripRef.current;
        const scrollLeft = selectedBubble.offsetLeft - (container.offsetWidth / 2) + (selectedBubble.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      handleNext(); // swiped left
    } else if (distance < -45) {
      handlePrev(); // swiped right
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <section id="achievements" className="achievements" style={{ position: "relative" }}>
      <FloatingDoodles section="achievements" />
      <div className="container">
        {/* Section Header */}
        <div className="section-header anim-rise">
          <h2>Achievements &amp; Hackathons</h2>
          <p className="section-subtitle">
            Leadership Appointments, Global AI Hackathons &amp; Industry Milestones
          </p>
        </div>

        {/* Story / Quick Selector Bubbles Strip - Centered with Crisp Monochrome SVGs */}
        <div className="post-story-strip anim-rise" ref={storyStripRef}>
          {achievementsData.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={item.id}
                className={`story-item ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  setActiveIndex(idx);
                  setImageLoading(true);
                }}
                aria-label={`View ${item.title}`}
              >
                <div className="story-avatar-ring">
                  <div className="story-avatar-icon-wrap">
                    {item.icon}
                  </div>
                </div>
                <span className="story-title-label">{item.bubbleLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Main Side-by-Side Instagram/Dossier Card */}
        <div className="post-card-container anim-slide-right">
          <div 
            className="post-card glass"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Column: Photo / Certificate Canvas */}
            <div 
              className="post-media-column"
              onClick={() => {
                setIsModalOpen(true);
                setImageLoading(true);
              }}
            >
              <div className="post-image-canvas">
                <img
                  key={`img-${activeItem.id}`}
                  src={encodeImagePath(activeItem.image)}
                  alt={activeItem.title}
                  className="post-main-img post-fade-in"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.style.opacity = "0.7";
                  }}
                />
              </div>
              <div className="post-media-overlay">
                <div className="post-inspect-floating-pill">
                  <Maximize2 size={13} />
                  <span>Inspect Document</span>
                </div>
                <div className="post-mobile-slide-pill">
                  {activeIndex + 1} / {achievementsData.length}
                </div>
              </div>
            </div>

            {/* Right Column: Post Details Feed */}
            <div className="post-details-column">
              {/* Post Header */}
              <div className="post-author-header" key={`hdr-${activeItem.id}`}>
                <div className="post-author-left">
                  <div className="post-author-avatar">
                    <Building2 size={15} />
                  </div>
                  <div className="post-author-info">
                    <div className="post-author-name-row">
                      <span className="post-author-name">{activeItem.issuer}</span>
                      <ShieldCheck size={14} className="verified-badge-icon" />
                    </div>
                    <span className="post-author-date">{activeItem.date}</span>
                  </div>
                </div>

                <span className="post-badge-pill">{activeItem.categoryLabel}</span>
              </div>

              {/* Post Body Content */}
              <div className="post-content-body" key={`body-${activeItem.id}`}>
                <div className="post-title-group">
                  <h3 className="post-title">{activeItem.title}</h3>
                  <div className="post-highlight-strip">
                    <span>{activeItem.highlight}</span>
                  </div>
                </div>

                <p className="post-description">{activeItem.description}</p>

                <div className="post-meta-bottom-group">
                  <div className="post-verification-tag">
                    <CheckCircle2 size={13} className="check-icon" />
                    <span>{activeItem.verification}</span>
                  </div>

                  {/* Hashtags */}
                  <div className="post-hashtags-row">
                    {activeItem.tags.map((tag, idx) => (
                      <span key={idx} className="post-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Post Action Footer */}
              <div className="post-action-footer">
                <div className="post-counter-text">
                  <span>{String(activeIndex + 1).padStart(2, '0')} / {String(achievementsData.length).padStart(2, '0')}</span>
                </div>

                <div className="post-nav-actions">
                  <button 
                    className="post-inspect-btn"
                    onClick={() => {
                      setIsModalOpen(true);
                      setImageLoading(true);
                    }}
                  >
                    <Maximize2 size={13} />
                    <span>Inspect</span>
                  </button>

                  <div className="post-arrows-wrap">
                    <button 
                      className="post-arrow-btn" 
                      onClick={handlePrev}
                      aria-label="Previous achievement"
                      title="Previous"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      className="post-arrow-btn" 
                      onClick={handleNext}
                      aria-label="Next achievement"
                      title="Next"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Certificate Lightbox Modal - Click anywhere outside to dismiss */}
      {isModalOpen && (
        <div className="achieve-inspect-modal" onClick={() => setIsModalOpen(false)}>
          <div className="achieve-inspect-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="achieve-inspect-dossier-card">
              <div className="achieve-inspect-image-container">
                {imageLoading && (
                  <div className="achieve-inspect-spinner-wrap">
                    <div className="achieve-inspect-spinner"></div>
                  </div>
                )}
                <img
                  src={encodeImagePath(activeItem.image)}
                  alt={activeItem.title}
                  className={`achieve-inspect-img ${imageLoading ? "" : "loaded"}`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setImageLoading(false)}
                  onError={(e) => {
                    setImageLoading(false);
                    e.target.style.opacity = "0.7";
                  }}
                />
              </div>

              <div className="achieve-inspect-footer-bar">
                <div className="achieve-inspect-meta-left">
                  <h3 className="achieve-inspect-title">{activeItem.title}</h3>
                  <p className="achieve-inspect-subtitle">
                    {activeItem.issuer} • {activeItem.date}
                  </p>
                </div>
                <div className="achieve-inspect-badge-pill">
                  <ShieldCheck size={13} className="inspect-verified-icon" />
                  <span>{activeItem.verification}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
