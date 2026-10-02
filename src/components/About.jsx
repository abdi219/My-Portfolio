import React, { useState } from "react";
import "./About.css";
import useScrollAnimation from "../hooks/useScrollAnimation";
import FloatingDoodles from "./FloatingDoodles";
import {
  Code2, Gamepad2, Terminal, FileJson, Atom, Server, Palette, BrainCircuit, Sparkles, MapPin, Briefcase, UserCheck, Users, Lightbulb, RefreshCw, User, Cpu, TerminalSquare
} from "lucide-react";

const About = () => {
  useScrollAnimation();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileSegment, setMobileSegment] = useState("profile");

  const [selectedSkill, setSelectedSkill] = useState({
    name: "C++",
    category: "lang",
    icon: <Code2 size={16} />,
    color: "var(--color-primary)",
    detail: "Used extensively in Game Dev with Raylib and Object-Oriented programming tasks."
  });

  const skills = [
    { name: "C++", category: "lang", icon: <Code2 size={15} />, color: "var(--color-primary)", detail: "Used extensively in Game Dev with Raylib and Object-Oriented programming tasks." },
    { name: "Raylib", category: "game", icon: <Gamepad2 size={15} />, color: "var(--color-primary)", detail: "C++ framework used to build game logic, drawing loops, and physics for Snake and Catch/Kaboom." },
    { name: "Python", category: "lang", icon: <Terminal size={15} />, color: "var(--color-primary)", detail: "Primary language for DSA problem-solving and experimenting with Machine Learning models." },
    { name: "JavaScript", category: "lang", icon: <FileJson size={15} />, color: "var(--color-primary)", detail: "Used for interactive web elements and logic in frontend React/Node components." },
    { name: "React", category: "web", icon: <Atom size={15} />, color: "var(--color-primary)", detail: "Frontend JS library used to build component architectures, custom hooks, and state logic." },
    { name: "Node.js", category: "web", icon: <Server size={15} />, color: "var(--color-primary)", detail: "Backend JavaScript environment for API development, routing, and backend integrations." },
    { name: "Tailwind CSS", category: "web", icon: <Palette size={15} />, color: "var(--color-primary)", detail: "CSS utility framework for constructing clean responsive designs rapidly." },
    { name: "DSA", category: "core", icon: <BrainCircuit size={15} />, color: "var(--color-primary)", detail: "Core CS knowledge: structures, algorithmic runtime analysis (Big O), and pathfinding algorithms." },
    { name: "AI & ML", category: "core", icon: <BrainCircuit size={15} />, color: "var(--color-primary)", detail: "Study of model trainings, regression analyses, and neural network foundations." },
    { name: "Gen AI", category: "core", icon: <Sparkles size={15} />, color: "var(--color-primary)", detail: "Leveraging LLMs and prompting techniques to build assistant bots and optimize coding speed." },
    { name: "Communication", category: "soft", icon: <Users size={15} />, color: "var(--color-primary)", detail: "Articulating technical concepts clearly and collaborating effectively in team settings." },
    { name: "Problem Solving", category: "soft", icon: <BrainCircuit size={15} />, color: "var(--color-primary)", detail: "Approaching complex software challenges methodically and building optimal solutions." },
    { name: "Leadership", category: "soft", icon: <UserCheck size={15} />, color: "var(--color-primary)", detail: "IEEE LGU AI/ML Domain Lead, mentoring peers and guiding technical initiatives within student societies." },
    { name: "Teamwork", category: "soft", icon: <Users size={15} />, color: "var(--color-primary)", detail: "Working harmoniously with diverse groups to deliver successful project outcomes." },
    { name: "Adaptability", category: "soft", icon: <RefreshCw size={15} />, color: "var(--color-primary)", detail: "Thriving in dynamic environments and quickly mastering new tools or frameworks." },
    { name: "Creativity", category: "soft", icon: <Lightbulb size={15} />, color: "var(--color-primary)", detail: "Designing innovative, visually-stunning user interfaces and novel software architectures." }
  ];

  const diagnosticLogs = [
    "[SYSTEM BOOT]: INITIALIZING Dossier Modules...",
    "[STATUS]: Core systems loading... OK",
    "[LOAD]: Semester 1: GPA 2.97 | PF, Calc, ICT",
    "[LOAD]: Semester 2: GPA 3.22 | OOP, DLD, LA, DB",
    "[LOAD]: Semester 3: GPA 3.23 | DS, COAL, Multi Calc, DM",
    "[LOAD]: Semester 4: GPA 3.49 | ADBMS, Prob & Stats, AOA, TOA",
    "[LEADERSHIP]: IEEE LGU AI/ML Domain Lead (Active)",
    "[LOAD]: Internship at DeveloperHub as AI / ML Engineer (Active)",
    "[CHECK]: Cumulative CGPA: 3.23 / 4.00 (Verified)",
    "[MODULE]: Game Dev Subsystem loaded: Raylib C++ active",
    "[MODULE]: Web Dev Subsystem loaded: React & Node.js active",
    "[MODULE]: AI Dev Subsystem loaded: Pandas & LLM Agents active",
    "[SUCCESS]: System state green. READY TO COLLABORATE."
  ];

  return (
    <section id="about" className="about" style={{ position: "relative" }}>
      <FloatingDoodles section="about" />
      <div className="container">
        <div className="section-header anim-rise">
          <h2>About Me</h2>
          <p className="section-subtitle">Dossier &amp; System Diagnostic</p>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            DESKTOP LAYOUT (100% Intact & Untouched for min-width: 901px)
            ═══════════════════════════════════════════════════════════ */}
        <div className="about-layout about-desktop-layout">
          {/* Left Column: Blueprint Picture */}
          <div className="blueprint-column anim-slide-left">
            <div className="blueprint-frame glass">
              <div className="blueprint-grid-lines"></div>
              <img
                src="/abdi.JPG"
                alt="Abdullah Faisal"
                className="blueprint-image"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.style.display = "none";
                  const pNode = e.target.parentElement;
                  if (pNode && !pNode.querySelector(".blueprint-fallback")) {
                    pNode.innerHTML += '<div class="blueprint-fallback">👋<br/>Abdullah</div>';
                  }
                }}
              />
              <div className="blueprint-corner-labels">
                <span className="lbl-tl">CS_STUDENT</span>
                <span className="lbl-tr">LGU_PK</span>
                <span className="lbl-bl">STATUS: OPEN</span>
                <span className="lbl-br">v3.14</span>
              </div>
            </div>

            <div className="dossier-spec-card glass">
              <div className="spec-row">
                <span className="spec-label">Location</span>
                <span className="spec-value">Lahore, PK</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Leadership</span>
                <span className="spec-value">IEEE AI/ML Lead</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">ACM Org</span>
                <span className="spec-value">Technical Member</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Status</span>
                <span className="spec-value">Open to Work</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tabbed Panel */}
          <div className="dossier-column anim-slide-right">
            <div className="dossier-tabs-menu glass">
              <button
                className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <span>[01. Overview]</span>
              </button>
              <button
                className={`tab-btn ${activeTab === "skills" ? "active" : ""}`}
                onClick={() => setActiveTab("skills")}
              >
                <span>[02. Skill Node Map]</span>
              </button>
              <button
                className={`tab-btn ${activeTab === "diagnostics" ? "active" : ""}`}
                onClick={() => setActiveTab("diagnostics")}
              >
                <span>[03. Diagnostic Logs]</span>
              </button>
            </div>

            <div className="dossier-tab-content glass">
              {activeTab === "overview" && (
                <div className="tab-pane-overview animate-fade-in">
                  <h3 className="tab-title">Journey Specifications</h3>
                  <div className="bio-desktop">
                    <p>
                      I’m Abdullah Faisal, a Computer Science student at
                      Lahore Garrison University with a CGPA of 3.23 (completed 4 Semesters). I genuinely enjoy
                      problem-solving and building things from scratch, constantly
                      diving deep into how software works under the hood.
                    </p>
                    <p>
                      Currently, I serve as the <strong>IEEE LGU AI/ML Domain Lead</strong> and intern at DeveloperHub as an AI / ML Engineer,
                      working on cutting-edge models and systems.
                    </p>
                    <p>
                      My core interests lie at the intersection of Game Development,
                      Data Structures &amp; Algorithms, and AI/ML. I also love leveraging
                      AI to enhance productivity and streamline development workflows,
                      constantly pushing technical boundaries and learning by doing.
                    </p>
                  </div>

                  <div className="dossier-stats">
                    <div className="dossier-stat-box glass-subtle">
                      <div className="stat-num">3.23</div>
                      <div className="stat-lbl">CGPA</div>
                    </div>
                    <div className="dossier-stat-box glass-subtle">
                      <div className="stat-num">23+</div>
                      <div className="stat-lbl">Projects</div>
                    </div>
                    <div className="dossier-stat-box glass-subtle">
                      <div className="stat-num">4 Sems</div>
                      <div className="stat-lbl">Completed</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="tab-pane-skills animate-fade-in">
                  <h3 className="tab-title">Core Skills Nodes</h3>
                  <p className="tab-instruction">Select a node to query details &rarr;</p>
                  
                  <div className="skills-node-grid">
                    {skills.map((skill, index) => (
                      <button
                        key={index}
                        className={`skill-node-btn ${selectedSkill?.name === skill.name ? "selected" : ""}`}
                        style={{ "--accent-color": skill.color }}
                        onClick={() => setSelectedSkill(skill)}
                      >
                        <span className="node-icon" style={{ color: skill.color }}>{skill.icon}</span>
                        <span className="node-name">{skill.name}</span>
                      </button>
                    ))}
                  </div>

                  {selectedSkill && (
                    <div className="skill-detail-panel glass-subtle">
                      <div className="detail-header">
                        <span className="detail-category">{selectedSkill.category.toUpperCase()}</span>
                        <h4 style={{ color: selectedSkill.color }}>{selectedSkill.name}</h4>
                      </div>
                      <p className="detail-body">{selectedSkill.detail}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "diagnostics" && (
                <div className="tab-pane-diagnostics animate-fade-in">
                  <h3 className="tab-title">System Diagnostic Log</h3>
                  <div className="terminal-window">
                    <div className="terminal-header-bar">
                      <span className="term-dot term-red"></span>
                      <span className="term-dot term-yellow"></span>
                      <span className="term-dot term-green"></span>
                      <span className="terminal-title">bash - diagnostics</span>
                    </div>
                    <div className="terminal-log-output">
                      {diagnosticLogs.map((log, index) => (
                        <div key={index} className="terminal-log-line">
                          <span className="log-timestamp">[SYS_RUN]</span>{" "}
                          <span className="log-text">{log}</span>
                        </div>
                      ))}
                      <div className="terminal-cursor-line">
                        <span className="terminal-prompt">$</span>
                        <span className="terminal-cursor">▊</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            APPLE-STYLE COMPACT MOBILE WIDGET (max-width: 900px)
            ═══════════════════════════════════════════════════════════ */}
        <div className="about-apple-widget">
          {/* iOS Profile Header Card */}
          <div className="apple-profile-header glass">
            <div className="apple-avatar-box">
              <img
                src="/abdi.JPG"
                alt="Abdullah Faisal"
                className="apple-avatar"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <span className="apple-status-pulse"></span>
            </div>
            <div className="apple-header-meta">
              <div className="apple-name-row">
                <h3 className="apple-name">Abdullah Faisal</h3>
                <span className="apple-verified-pill">CS @ LGU</span>
              </div>
              <p className="apple-role-sub">IEEE AI/ML Lead • DevHub Intern</p>
            </div>
          </div>

          {/* Apple Segmented Control Pill Switcher */}
          <div className="apple-segmented-bar glass">
            <button
              type="button"
              className={`apple-segment-btn ${mobileSegment === "profile" ? "active" : ""}`}
              onClick={() => setMobileSegment("profile")}
            >
              <User size={13} />
              <span>Profile</span>
            </button>
            <button
              type="button"
              className={`apple-segment-btn ${mobileSegment === "skills" ? "active" : ""}`}
              onClick={() => setMobileSegment("skills")}
            >
              <Cpu size={13} />
              <span>Skills</span>
            </button>
            <button
              type="button"
              className={`apple-segment-btn ${mobileSegment === "logs" ? "active" : ""}`}
              onClick={() => setMobileSegment("logs")}
            >
              <TerminalSquare size={13} />
              <span>Logs</span>
            </button>
          </div>

          {/* Apple Widget Body (Compact Viewport) */}
          <div className="apple-widget-body glass">
            {mobileSegment === "profile" && (
              <div className="apple-pane animate-fade-in">
                {/* 3 Metric Chips */}
                <div className="apple-metrics-row">
                  <div className="apple-metric-card glass-subtle">
                    <span className="metric-val">3.23</span>
                    <span className="metric-label">CGPA</span>
                  </div>
                  <div className="apple-metric-card glass-subtle">
                    <span className="metric-val">23+</span>
                    <span className="metric-label">Projects</span>
                  </div>
                  <div className="apple-metric-card glass-subtle">
                    <span className="metric-val">4 Sems</span>
                    <span className="metric-label">Completed</span>
                  </div>
                </div>

                {/* Clean Bio */}
                <p className="apple-bio-text">
                  CS student passionate about building AI/ML models &amp; agents, C++ game logic (Raylib), and clean web architectures. Passionate about logic, algorithms, and deep system architecture.
                </p>

                {/* Quick Info Badges */}
                <div className="apple-quick-tags">
                  <span className="apple-tag"><MapPin size={11} /> Lahore, PK</span>
                  <span className="apple-tag"><Briefcase size={11} /> DeveloperHub</span>
                  <span className="apple-tag active-tag"><UserCheck size={11} /> Open to Work</span>
                </div>
              </div>
            )}

            {mobileSegment === "skills" && (
              <div className="apple-pane animate-fade-in">
                <div className="apple-skills-grid">
                  {skills.map((skill, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`apple-skill-chip ${selectedSkill?.name === skill.name ? "selected" : ""}`}
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <span className="chip-icon">{skill.icon}</span>
                      <span className="chip-name">{skill.name}</span>
                    </button>
                  ))}
                </div>

                {selectedSkill && (
                  <div className="apple-skill-detail glass-subtle">
                    <span className="detail-tag">{selectedSkill.name}</span>
                    <span className="detail-txt">{selectedSkill.detail}</span>
                  </div>
                )}
              </div>
            )}

            {mobileSegment === "logs" && (
              <div className="apple-pane animate-fade-in">
                <div className="apple-terminal-box">
                  <div className="apple-term-header">
                    <span className="mac-dot red"></span>
                    <span className="mac-dot yellow"></span>
                    <span className="mac-dot green"></span>
                    <span className="mac-title">diagnostics.sh</span>
                  </div>
                  <div className="apple-term-scroll">
                    {diagnosticLogs.map((log, index) => (
                      <div key={index} className="apple-term-row">
                        <span className="apple-term-cyan">[SYS]</span> {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
