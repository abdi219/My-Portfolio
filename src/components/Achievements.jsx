import React, { useState, useEffect } from "react";
import "./Achievements.css";
import useScrollAnimation from "../hooks/useScrollAnimation";
import FloatingDoodles from "./FloatingDoodles";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
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
      highlight: "Production AI Pipelines & Agentic Systems",
      description: "Successfully completed an intensive 6-week AI/ML Engineering Internship Program at DevelopersHub Corporation. Honored with the prestigious Best Award in recognition of outstanding technical performance, significant pipeline contributions, and high-impact AI feature implementation.",
      image: "/Achievements & Hackathons/DeveloperHubIntern.png",
      verification: "Verified • Certificate ID: DHC-2090",
      tags: ["AIMLEngineering", "AgenticWorkflows", "ProductionAI", "Python", "FastAPI"]
    },
    {
      id: "ieee-lead",
      nodeNum: "02",
      bubbleLabel: "IEEE Lead",
      icon: <Award size={22} />,
      title: "IEEE AI/ML Domain Lead",
      issuer: "IEEE LGU Student Branch",
      categoryLabel: "LEADERSHIP",
      date: "2025 – Present",
      badge: "DOMAIN LEAD APPOINTMENT",
      highlight: "Technical Leadership & Student AI Bootcamps",
      description: "Appointed as the AI/ML Domain Lead at IEEE Open Source / IEEE LGU Student Branch. Spearheading hands-on developer workshops, hackathon mentorship sessions, and open-source project development for computing students.",
      image: "/Achievements & Hackathons/IEEE.png",
      verification: "Verified • IEEE LGU Student Branch",
      tags: ["IEEE", "AIMLDomain", "Leadership", "OpenSource", "Workshops"]
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
      highlight: "HeatShield AI — Urban Heat Risk Intelligence",
      description: "Awarded Certificate of Demonstrated Excellence for designing and developing HeatShield AI during FortyGuard Hackathon '26. Built an end-to-end street-level microclimate intelligence engine providing predictive urban heat hazard analytics.",
      image: "/Achievements & Hackathons/FortyGuardHackhton.png",
      verification: "Verified • Project: HeatShield AI",
      tags: ["HeatShieldAI", "UrbanAI", "Microclimate", "PredictiveAnalytics"]
    },
    {
      id: "ibm-bob-hackathon",
      nodeNum: "04",
      bubbleLabel: "IBM Bob",
      icon: <Bot size={22} />,
      title: "IBM Bob 2.0 Hackathon",
      issuer: "Lablab.ai & IBM",
      categoryLabel: "HACKATHON",
      date: "Sep 25 – 27, 2026",
      badge: "GLOBAL AI COMPLETION",
      highlight: "Multi-Agent System with IBM Watson & Groq",
      description: "Awarded Certificate of Completion for outstanding performance in architecting an enterprise multi-agent workflow solution integrating IBM Watson, OpenAI models, Groq LPUs, and Vercel cloud architecture.",
      image: "/Achievements & Hackathons/IBMBob2.0Hackhton.png",
      verification: "Verified • ID: CMJLAR0GC02AFS601DLOBMSI4",
      tags: ["IBMWatson", "GroqLPU", "AIAgents", "MultiAgent", "OpenAI"]
    },
    {
      id: "ai-factory-hackathon",
      nodeNum: "05",
      bubbleLabel: "AI Factory",
      icon: <Zap size={22} />,
      title: "AI Factory Hackathon",
      issuer: "Lablab.ai & NativelyAI",
      categoryLabel: "HACKATHON",
      date: "Aug 3 – 10, 2026",
      badge: "COMPLETION & DEMO",
      highlight: "Meta LLaMA 3 & Groq High-Throughput Automation",
      description: "Awarded Certificate of Completion for engineering a real-time automated workflow system leveraging Groq hardware acceleration and Meta LLaMA 3 foundation models for ultra-low latency response generation.",
      image: "/Achievements & Hackathons/AIFactoryHackhton.png",
      verification: "Verified • ID: CMSR9BRLQ00TPS601BY9ER7KX",
      tags: ["LLaMA3", "GroqLPUs", "FastInference", "Automation"]
    },
    {
      id: "intratech-hackathon",
      nodeNum: "06",
      bubbleLabel: "IntraTech",
      icon: <Code2 size={22} />,
      title: "IntraTech 2.0 Hackathon",
      issuer: "TechSphere Society",
      categoryLabel: "HACKATHON",
      date: "Dec 9 – 10, 2025",
      badge: "TOP 10 FINALIST",
      highlight: "Top 10 Finalist in Web Coding & Innovation",
      description: "Secured Top 10 Finalist recognition in the IntraTech 2.0 multi-day technical hackathon conducted by TechSphere Society. Designed, engineered, and pitched a full-stack responsive web application prototype within 48 hours.",
      image: "/image.png",
      verification: "Verified • TechSphere Society LGU",
      tags: ["WebCoding", "ReactJS", "Top10Finalist", "RapidPrototyping"]
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
      highlight: "Speed Programming Modulo Contestant",
      description: "Speed Programming contestant at University of Central Punjab's national tech olympiad TAAKRA 2026. Tackled rigorous data structure and algorithmic problem solving challenges under high time pressure.",
      image: "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.34 PM.jpeg",
      verification: "Verified • UCP TAAKRA 2026",
      tags: ["CompetitiveProgramming", "SpeedCoding", "DataStructures", "Algorithms"]
    },
    {
      id: "lablab-next-hackathon",
      nodeNum: "08",
      bubbleLabel: "LabLab Next",
      icon: <Layers size={22} />,
      title: "LabLab Next Hackathon",
      issuer: "Lablab.ai & NativelyAI",
      categoryLabel: "HACKATHON",
      date: "Jun 28 – Jul 4, 2024",
      badge: "COMPLETION CERTIFICATE",
      highlight: "LLaMA 3 Powered Intelligent Application",
      description: "Completed the global LabLab Next Hackathon by developing a full-stack intelligent prototype powered by LLaMA 3, focusing on prompt engineering, latency optimization, and developer experience.",
      image: "/Achievements & Hackathons/LablabNextHackhton.png",
      verification: "Verified • ID: CLZVCADDS004OV7ZUAIKGOW0",
      tags: ["LLaMA3", "GenerativeAI", "Lablab", "FullStack"]
    },
    {
      id: "acm-member",
      nodeNum: "09",
      bubbleLabel: "ACM Member",
      icon: <Users size={22} />,
      title: "ACM Technical Member",
      issuer: "LGU ACM Chapter",
      categoryLabel: "LEADERSHIP",
      date: "2024 – Present",
      badge: "CORE TECHNICAL TEAM",
      highlight: "Competitive Coding Contests & Peer Mentorship",
      description: "Active technical contributor and society organizer at ACM LGU Chapter. Co-organizing university competitive coding contests, student developer workshops, and open-source learning bootcamps.",
      image: "/Achievements & Hackathons/ACM.png",
      verification: "Verified • LGU ACM Chapter",
      tags: ["ACMChapter", "DeveloperCommunity", "PeerMentorship", "Events"]
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

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
          <h2>Achievements & Hackathons</h2>
          <p className="section-subtitle">
            Leadership Appointments, Global AI Hackathons & Industry Milestones
          </p>
        </div>

        {/* Story / Quick Selector Bubbles Strip - Centered with Crisp Monochrome SVGs */}
        <div className="post-story-strip anim-rise">
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
          <div className="post-card glass">
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
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="post-main-img"
                  loading="lazy"
                />
                <div className="post-media-overlay">
                  <div className="post-inspect-pill">
                    <Maximize2 size={15} />
                    <span>INSPECT DOCUMENT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Post Details Feed */}
            <div className="post-details-column">
              {/* Post Header */}
              <div className="post-author-header">
                <div className="post-author-left">
                  <div className="post-author-avatar">
                    <Building2 size={16} />
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
              <div className="post-content-body">
                <h3 className="post-title">{activeItem.title}</h3>
                
                <div className="post-highlight-strip">
                  <span>{activeItem.highlight}</span>
                </div>

                <p className="post-description">{activeItem.description}</p>

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

      {/* Expanded Certificate Lightbox Modal */}
      {isModalOpen && (
        <div className="achieve-inspect-modal" onClick={() => setIsModalOpen(false)}>
          <button 
            className="achieve-inspect-close-btn" 
            onClick={() => setIsModalOpen(false)}
            aria-label="Close preview"
          >
            <X size={24} />
          </button>

          <div className="achieve-inspect-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="achieve-inspect-display-area">
              <div className="achieve-inspect-polaroid">
                <div className="achieve-inspect-image-container">
                  {imageLoading && (
                    <div className="achieve-inspect-spinner-wrap">
                      <div className="achieve-inspect-spinner"></div>
                    </div>
                  )}
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className={`achieve-inspect-img ${imageLoading ? "" : "loaded"}`}
                    onLoad={() => setImageLoading(false)}
                  />
                </div>

                <div className="achieve-inspect-caption">
                  <h3 className="achieve-inspect-title">{activeItem.title.toUpperCase()}</h3>
                  <p className="achieve-inspect-subtitle">ISSUED BY: {activeItem.issuer.toUpperCase()} • {activeItem.date.toUpperCase()}</p>
                  <div className="achieve-inspect-badge-tag">
                    <span>{activeItem.verification}</span>
                  </div>
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
