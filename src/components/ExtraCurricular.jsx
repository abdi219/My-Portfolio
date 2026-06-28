import React, { useState, useEffect } from "react";
import "./ExtraCurricular.css";
import useScrollAnimation from "../hooks/useScrollAnimation";
import FloatingDoodles from "./FloatingDoodles";
import { ChevronLeft, ChevronRight, X, Calendar, FolderOpen, Images } from "lucide-react";

// Helper to encode spaces and parentheses in image paths
const encodeImagePath = (path) => {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
};

const ExtraCurricular = () => {
  useScrollAnimation();

  // Categorized, scalable event data structure
  const events = [
    {
      title: "UCP TAAKRA 2026",
      subtitle: "Speed Programming Modulo",
      category: "hackathon",
      date: "Feb 2026",
      coverImage: "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.36 PM (2).jpeg",
      images: [
        "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.36 PM (2).jpeg",
        "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.35 PM.jpeg",
        "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.37 PM.jpeg",
        "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.33 PM.jpeg",
        "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.34 PM (1).jpeg",
        "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.34 PM.jpeg",
        "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.35 PM (1).jpeg",
        "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.35 PM (2).jpeg",
        "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.36 PM (1).jpeg",
        "/UCP Taakra Hackathon/WhatsApp Image 2026-02-16 at 10.05.36 PM.jpeg",
      ],
    },
    {
      title: "SUPARCO Tour",
      subtitle: "National Space Agency - Contributions & Use of AI",
      category: "tour",
      date: "Jan 2026",
      coverImage: "/SUPARCO Tour/pic1.jpg",
      images: [
        "/SUPARCO Tour/pic1.jpg",
        "/SUPARCO Tour/pic2.jpg",
        "/SUPARCO Tour/pic3.jpg",
        "/SUPARCO Tour/pic4.jpg",
        "/SUPARCO Tour/pic6.jpg",
        "/SUPARCO Tour/IMG_2606.jpg",
      ],
    },
    {
      title: "Skill2Success AI Workshop",
      subtitle: "AI Agentic Workshop by Skill2Success Company",
      category: "workshop",
      date: "Jan 2026",
      coverImage: "/Skill2Success Agentic AI Workshop/pic1.jpg",
      images: [
        "/Skill2Success Agentic AI Workshop/pic1.jpg",
        "/Skill2Success Agentic AI Workshop/pic2.jpg",
        "/Skill2Success Agentic AI Workshop/pic3.jpg",
        "/Skill2Success Agentic AI Workshop/pic4.jpg",
      ],
    },
    {
      title: "IntraTech 2.0 Hackathon",
      subtitle: "Innovation & Tech Competition",
      category: "hackathon",
      date: "Nov 2025",
      coverImage: "/IntraTech 2.0 Hackathon/WhatsApp Image 2026-02-16 at 10.18.10 PM.jpeg",
      images: [
        "/IntraTech 2.0 Hackathon/WhatsApp Image 2026-02-16 at 10.18.10 PM.jpeg",
        "/IntraTech 2.0 Hackathon/WhatsApp Image 2026-02-16 at 10.18.10 PM (1).jpeg",
        "/IntraTech 2.0 Hackathon/WhatsApp Image 2026-02-16 at 10.19.54 PM.jpeg",
        "/IntraTech 2.0 Hackathon/WhatsApp Image 2026-02-16 at 10.18.09 PM (1).jpeg",
        "/IntraTech 2.0 Hackathon/WhatsApp Image 2026-02-16 at 10.18.09 PM (2).jpeg",
        "/IntraTech 2.0 Hackathon/WhatsApp Image 2026-02-16 at 10.18.09 PM.jpeg",
      ],
    },
    {
      title: "LinkedIn Mentorship",
      subtitle: "Student Mentor from ACM Society",
      category: "mentorship",
      date: "Nov 2025",
      coverImage: "/Linkedin Corner MentoirShip/pic1.jpg",
      images: [
        "/Linkedin Corner MentoirShip/pic1.jpg",
        "/Linkedin Corner MentoirShip/pic2.png",
        "/Linkedin Corner MentoirShip/pic3.jpg",
        "/Linkedin Corner MentoirShip/pic4.JPG",
      ],
    },
    {
      title: "Hacktoberfest 2025",
      subtitle: "Open Source Contributions",
      category: "open_source",
      date: "Oct 2025",
      coverImage: "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.35.59 PM.jpeg",
      images: [
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.35.59 PM.jpeg",
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.36.02 PM.jpeg",
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.36.00 PM (1).jpeg",
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.35.59 PM (1).jpeg",
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.36.00 PM (2).jpeg",
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.36.00 PM.jpeg",
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.36.01 PM (1).jpeg",
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.36.01 PM.jpeg",
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.36.03 PM (1).jpeg",
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.36.03 PM.jpeg",
        "/Hacktoberfest 2025/WhatsApp Image 2026-02-16 at 10.36.04 PM.jpeg",
      ],
    },
    {
      title: "DevSinc Industrial Tour",
      subtitle: "Corporate Tech Exposure",
      category: "tour",
      date: "May 2025",
      coverImage: "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.23 PM (1).jpeg",
      images: [
        "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.23 PM (1).jpeg",
        "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.24 PM (2).jpeg",
        "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.21 PM.jpeg",
        "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.22 PM (1).jpeg",
        "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.22 PM (2).jpeg",
        "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.22 PM.jpeg",
        "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.23 PM (2).jpeg",
        "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.23 PM.jpeg",
        "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.24 PM (1).jpeg",
        "/DevSinc Industrial Tour/WhatsApp Image 2026-02-16 at 10.30.24 PM.jpeg",
      ],
    },
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeEvent, setActiveEvent] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(e => e.category === activeFilter);

  // Reset active image index whenever the active event changes
  useEffect(() => {
    setActiveImageIdx(0);
  }, [activeIndex]);

  // Prevent background scroll when preview lightbox is open
  useEffect(() => {
    if (activeEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeEvent]);

  // Slideshow effect: cycle through images of active card every 3 seconds (pauses when preview modal is open)
  useEffect(() => {
    if (filteredEvents.length === 0) return;
    if (activeEvent !== null) return; // Pause slideshow when previewing images

    const interval = setInterval(() => {
      const currentEvent = filteredEvents[activeIndex];
      if (!currentEvent || !currentEvent.images || currentEvent.images.length === 0) return;

      setActiveImageIdx((prev) => {
        if (prev >= currentEvent.images.length - 1) {
          return 0; // Lock focus: only loop images of the active card, do NOT slide coverflow!
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, filteredEvents.length, activeEvent]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setActiveIndex(0);
  };

  const openLightbox = (eventTitle) => {
    const matched = events.find(e => e.title === eventTitle);
    if (matched) {
      setActiveEvent(matched);
      setActiveImageIdx(0);
    }
  };

  const closeLightbox = () => {
    setActiveEvent(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (!activeEvent) return;
    setActiveImageIdx((prev) => (prev + 1) % activeEvent.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (!activeEvent) return;
    setActiveImageIdx((prev) => (prev - 1 + activeEvent.images.length) % activeEvent.images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const N = filteredEvents.length;
    if (N === 0) return;
    setActiveIndex((prev) => (prev - 1 + N) % N);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const N = filteredEvents.length;
    if (N === 0) return;
    setActiveIndex((prev) => (prev + 1) % N);
  };

  const handleCardClick = (idx) => {
    if (idx === activeIndex) {
      openLightbox(filteredEvents[idx].title);
    } else {
      setActiveIndex(idx);
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "hackathon": return "Hackathon";
      case "tour": return "Industrial Tour";
      case "open_source": return "Open Source";
      case "mentorship": return "Mentorship";
      case "workshop": return "AI Workshop";
      default: return "Activity";
    }
  };

  const getCardClassAndStyle = (idx) => {
    const N = filteredEvents.length;
    if (N === 0) return { className: "carousel-card hidden", style: {} };
    if (N === 1) {
      return { 
        className: "carousel-card active", 
        style: { transform: "translateX(0) scale(1)", zIndex: 10, opacity: 1 } 
      };
    }
    
    let diff = idx - activeIndex;
    while (diff < -N / 2) diff += N;
    while (diff > N / 2) diff -= N;

    let style = {};
    let className = "carousel-card";

    if (diff === 0) {
      className += " active";
      style = {
        transform: "translateX(0) scale(1)",
        zIndex: 10,
        opacity: 1,
        pointerEvents: "auto",
      };
    } else if (diff === -1 || (diff === N - 1 && N === 2)) {
      className += " prev";
      style = {
        transform: "translateX(-48%) scale(0.82)",
        zIndex: 5,
        opacity: 0.45,
        pointerEvents: "auto",
      };
    } else if (diff === 1 || (diff === -(N - 1) && N === 2)) {
      className += " next";
      style = {
        transform: "translateX(48%) scale(0.82)",
        zIndex: 5,
        opacity: 0.45,
        pointerEvents: "auto",
      };
    } else {
      className += " far";
      style = {
        transform: `translateX(${diff > 0 ? 80 : -80}%) scale(0.65)`,
        zIndex: 1,
        opacity: 0,
        pointerEvents: "none",
      };
    }
    return { className, style };
  };

  return (
    <section id="extracurricular" className="extracurricular" style={{ position: "relative" }}>
      <FloatingDoodles section="extracurricular" />
      <div className="container">
        <div className="section-header anim-rise">
          <h2>Extra-curricular Activities</h2>
          <p className="section-subtitle">Chronological Tech Milestones, Competitions & Events</p>
        </div>


        {/* 3D Coverflow Slider Container */}
        <div className="activity-carousel-container anim-slide-right">
          {filteredEvents.length > 1 && (
            <button className="carousel-nav-arrow arrow-left" onClick={handlePrev} aria-label="Previous slide">
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="activity-carousel-viewport">
            <div className="activity-carousel-track">
              {filteredEvents.map((event, idx) => {
                const { className, style } = getCardClassAndStyle(idx);
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={idx}
                    className={className}
                    style={style}
                    onClick={() => handleCardClick(idx)}
                  >
                    <div className="activity-card-inner square-card">
                      <div className="activity-card-image-wrapper">
                        <img
                          key={isActive ? activeImageIdx : "cover"}
                          src={encodeImagePath(isActive ? event.images[activeImageIdx] : event.coverImage)}
                          alt={event.title}
                          loading="lazy"
                          className="activity-slide-image"
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.parentElement) {
                              e.target.parentElement.classList.add("image-error-fallback");
                            }
                          }}
                        />
                        <div className="activity-card-shadow-overlay"></div>
                      </div>

                      <div className="activity-card-overlay-header">
                        <span className="activity-card-date">
                          <Calendar size={10} />
                          <span>{event.date}</span>
                        </span>
                        <span className={`activity-card-badge badge-${event.category}`}>
                          <FolderOpen size={10} />
                          <span>{getCategoryLabel(event.category).toUpperCase()}</span>
                        </span>
                      </div>

                      <div className="activity-card-overlay-content">
                        <h3 className="activity-card-title">{event.title}</h3>
                        <p className="activity-card-subtitle">{event.subtitle}</p>
                        
                        {isActive && event.images && event.images.length > 0 && (
                          <div className="activity-card-dots animate-fade-in">
                            {event.images.map((_, dotIdx) => (
                              <span 
                                key={dotIdx} 
                                className={`activity-card-dot ${dotIdx === activeImageIdx ? "active" : ""}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {filteredEvents.length > 1 && (
            <button className="carousel-nav-arrow arrow-right" onClick={handleNext} aria-label="Next slide">
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Carousel Direct Jump Pagination Nodes */}
        {filteredEvents.length > 1 && (
          <div className="carousel-pagination anim-rise">
            {filteredEvents.map((event, idx) => (
              <button
                key={idx}
                className={`pagination-node ${idx === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to event ${idx + 1}`}
              >
                <span className="pagination-node-number">0{idx + 1}</span>
                <span className="pagination-node-title">{event.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Expanded Image Stack Lightbox Modal */}
        {activeEvent && (
          <div className="lightbox-modal" onClick={closeLightbox}>
            <div className="lightbox-content-box">
              {/* Left Arrow */}
              <button 
                className="lightbox-nav-btn nav-left" 
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage(e);
                }} 
                aria-label="Previous image"
              >
                <ChevronLeft size={36} />
              </button>

              {/* Main Photo Display Area */}
              <div className="lightbox-display-area" onClick={(e) => e.stopPropagation()}>
                <div className="lightbox-polaroid">
                  <div className="lightbox-image-container">
                    <img
                      key={activeImageIdx}
                      src={encodeImagePath(activeEvent.images[activeImageIdx])}
                      alt={`${activeEvent.title} - Photo ${activeImageIdx + 1}`}
                      className="lightbox-active-image"
                    />
                  </div>
                  <div className="lightbox-caption">
                    <h3 className="lightbox-title">{activeEvent.title}</h3>
                    <p className="lightbox-subtitle">{activeEvent.subtitle}</p>
                    <div className="lightbox-photo-counter">
                      Photo {activeImageIdx + 1} of {activeEvent.images.length}
                    </div>
                  </div>

                  {/* Horizontal Thumbnail Selector */}
                  {activeEvent.images.length > 1 && (
                    <div className="lightbox-thumbnails">
                      {activeEvent.images.map((imgUrl, tIdx) => (
                        <button
                          key={tIdx}
                          className={`lightbox-thumb-btn ${tIdx === activeImageIdx ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIdx(tIdx);
                          }}
                          aria-label={`Jump to photo ${tIdx + 1}`}
                        >
                          <img src={encodeImagePath(imgUrl)} alt="Thumbnail" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Arrow */}
              <button 
                className="lightbox-nav-btn nav-right" 
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage(e);
                }} 
                aria-label="Next image"
              >
                <ChevronRight size={36} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExtraCurricular;
