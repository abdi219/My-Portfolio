import React, { useState } from "react";
import "./About.css";
import useScrollAnimation from "../hooks/useScrollAnimation";
import FloatingDoodles from "./FloatingDoodles";
import {
  Code2, Gamepad2, Terminal, FileJson, Atom, Server, Palette, BrainCircuit, Sparkles, MapPin, Briefcase, UserCheck, Users
} from "lucide-react";

const About = () => {
  useScrollAnimation();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSkill, setSelectedSkill] = useState({
    name: "C++",
    category: "lang",
    icon: <Code2 size={16} />,
    color: "var(--color-primary)",
    detail: "Used extensively in Game Dev with Raylib and Object-Oriented programming tasks."
  });

  const skills = [
    { name: "C++", category: "lang", icon: <Code2 size={16} />, color: "var(--color-primary)", detail: "Used extensively in Game Dev with Raylib and Object-Oriented programming tasks." },
    { name: "Raylib", category: "game", icon: <Gamepad2 size={16} />, color: "var(--color-primary)", detail: "C++ framework used to build game logic, drawing loops, and physics for Snake and Catch/Kaboom." },
    { name: "Python", category: "lang", icon: <Terminal size={16} />, color: "var(--color-primary)", detail: "Primary language for DSA problem-solving and experimenting with Machine Learning models." },
    { name: "JavaScript", category: "lang", icon: <FileJson size={16} />, color: "var(--color-primary)", detail: "Used for interactive web elements and logic in frontend React/Node components." },
    { name: "React", category: "web", icon: <Atom size={16} />, color: "var(--color-primary)", detail: "Frontend JS library used to build component architectures, custom hooks, and state logic." },
    { name: "Node.js", category: "web", icon: <Server size={16} />, color: "var(--color-primary)", detail: "Backend JavaScript environment for API development, routing, and backend integrations." },
    { name: "Tailwind CSS", category: "web", icon: <Palette size={16} />, color: "var(--color-primary)", detail: "CSS utility framework for constructing clean responsive designs rapidly." },
    { name: "DSA", category: "core", icon: <BrainCircuit size={16} />, color: "var(--color-primary)", detail: "Core CS knowledge: structures, algorithmic runtime analysis (Big O), and pathfinding algorithms." },
    { name: "AI & ML", category: "core", icon: <BrainCircuit size={16} />, color: "var(--color-primary)", detail: "Study of model trainings, regression analyses, and neural network foundations." },
    { name: "Gen AI", category: "core", icon: <Sparkles size={16} />, color: "var(--color-primary)", detail: "Leveraging LLMs and prompting techniques to build assistant bots and optimize coding speed." },
    { name: "Communication", category: "soft", icon: <Users size={16} />, color: "var(--color-primary)", detail: "Articulating technical concepts clearly and collaborating effectively in team settings." },
    { name: "Problem Solving", category: "soft", icon: <BrainCircuit size={16} />, color: "var(--color-primary)", detail: "Approaching complex software challenges methodically and building optimal solutions." },
    { name: "Team Leadership", category: "soft", icon: <UserCheck size={16} />, color: "var(--color-primary)", detail: "Mentoring peers and guiding technical initiatives within student societies." }
  ];

  const diagnosticLogs = [
    "[SYSTEM BOOT]: INITIALIZING Dossier Modules...",
    "[STATUS]: Core systems loading... OK",
    "[LOAD]: Semester 1: GPA 2.97 | PF, Calc, ICT",
    "[LOAD]: Semester 2: GPA 3.22 | OOP, DLD, LA, DB",
    "[LOAD]: Semester 3: GPA 3.23 | DS, COAL, Multi Calc, DM",
    "[LOAD]: Semester 4: GPA 3.49 | ADBMS, Prob & Stats, AOA, TOA",
    "[LOAD]: Internship at DeveloperHub as AI / ML Engineer (Active)",
    "[CHECK]: Cumulative CGPA: 3.23 / 4.00 (Verified)",
    "[MODULE]: Game Dev Subsystem loaded: Raylib C++ & Godot GDScript active",
    "[MODULE]: Web Dev Subsystem loaded: React, Node.js, and CSS modules active",
    "[MODULE]: AI Dev Subsystem loaded: Pandas, Hugging Face, & LLM Fine-Tuning active",
    "[SUCCESS]: System state green. READY TO COLLABORATE."
  ];

  return (
    <section id="about" className="about" style={{ position: "relative" }}>
      <FloatingDoodles section="about" />
      <div className="container">
        <div className="section-header anim-rise">
          <h2>About Me</h2>
          <p className="section-subtitle">Dossier & System Diagnostic</p>
        </div>

        <div className="about-layout anim-slide-left">
          {/* Left Column: Blueprint Picture */}
          <div className="blueprint-column">
            <div className="blueprint-frame glass">
              <div className="blueprint-grid-lines"></div>
              <img
                src="/abdi.JPG"
                alt="Abdullah Faisal"
                className="blueprint-image"
                onError={(e) => {
                  e.target.style.display = "none";
                  const pNode = e.target.parentElement;
                  if (pNode && !pNode.querySelector(".blueprint-fallback")) {
                    pNode.innerHTML += '<div class="blueprint-fallback">👋<br/>Abdullah</div>';
                  }
                }}
              />
              <div className="blueprint-tag">ABD-2026</div>
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
          <div className="dossier-column">
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
                  <p>
                    I’m Abdullah Faisal, a Computer Science student at
                    Lahore Garrison University with a CGPA of 3.23 (completed 4 Semesters). I genuinely enjoy
                    problem-solving and building things from scratch, constantly
                    diving deep into how software works under the hood.
                  </p>
                  <p>
                    Currently, I am doing my internship at DeveloperHub as an AI / ML Engineer,
                    working on cutting-edge models and systems.
                  </p>
                  <p>
                    My core interests lie at the intersection of Game Development,
                    Data Structures & Algorithms, and AI/ML. I also love leveraging
                    AI to enhance productivity and streamline development workflows,
                    constantly pushing technical boundaries and learning by doing.
                  </p>

                  <div className="dossier-stats">
                    <div className="dossier-stat-box glass-subtle">
                      <div className="stat-num">3.23</div>
                      <div className="stat-lbl">CGPA</div>
                    </div>
                    <div className="dossier-stat-box glass-subtle">
                      <div className="stat-num">18+</div>
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
                  <p className="tab-instruction">Select a node to query details.</p>
                  
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
