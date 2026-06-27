import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { MessageCircle, X, Send, Bot, User, Trash2 } from "lucide-react";

// Converts URLs in text into clickable <a> tags
const linkifyText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="chat-link"
      >
        {part.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

const Chatbot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi, I'm Abdullah's portfolio assistant. Ask me anything about his skills, projects, events, or more.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const responseCounter = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // ──────────────── KNOWLEDGE BASE ────────────────
  const abdullahInfo = {
    about: `Abdullah Faisal is a Computer Science student at Lahore Garrison University (LGU) who has completed his 4th semester with a CGPA of 3.23. He is passionate about building creative and practical tech solutions from scratch.

His core interests lie at the intersection of Game Development (C++/Raylib and Godot/GDScript), Web Architectures, and AI Engineering (LLM agents, prompt pipelines, and ML diagnostics). He leverages AI systems to enhance productivity and streamline developer workflows.

He is an ACM Technical Team member and ESSE Technical Team member at LGU, actively contributing to the tech community.`,

    skills: `Abdullah's technical skills include:

Languages: C++, Python, JavaScript, GDScript
Web: React.js, Node.js, Tailwind CSS, HTML/CSS
Game Dev: Raylib (C++), Godot Engine (GDScript)
Core CS: Data Structures & Algorithms, OOP
AI Engineering: Generative AI integrations, multi-agent pipelines, prompt engineering
Other: Business Analytics (Excel), Git/GitHub`,

    projects: `Abdullah has built 10+ projects including:

Catch or Kaboom: C++/Raylib game with custom mechanics, collision detection and performance-focused design.
Snake Game: Classic implementation with clean logic and efficient state management (C++/Raylib).
AI Agent App: Custom intelligence dashboard with conversation memory nodes, routing engines, and generative chatbot integrations.
E-Commerce Website: Full frontend React/Node.js web app with modern UI and responsive design.
Lock System: Console-based C++ OOP security system.
Prince Adventure: 2D platformer adventure game built with Godot (GDScript), smooth character movement and custom level design.

You can view them in the Projects section.`,

    certifications: `Abdullah's certifications and achievements:

Oracle Cloud Infrastructure 2025 AI Foundations Associate
Microsoft Partner Program: Business Analytics with Excel (Simplilearn)
Top 10 Finalist at TechSphere, LGU Intra Tech Event (2024)
ACM Technical Team Member, LGU ACM Chapter
Game Development: Self-taught through hands-on projects (ongoing)

Visit the Certificates section for credential links.`,

    education: `Lahore Garrison University (LGU)
BS Computer Science (Completed 4th Semester)
CGPA: 3.23
Lahore, Punjab, Pakistan

He is actively deepening his knowledge in DSA, exploring AI/ML, and building game and web projects to complement his academics.`,

    contact: `You can reach Abdullah at:

Email: abdullahf0100@gmail.com
GitHub: https://github.com/abdi219
LinkedIn: https://www.linkedin.com/in/abdullah-faisal-a8146930a/
Resume: https://abdullahfaisal.dev/Abdullahs%20Resume.pdf

Or use the Contact form on this portfolio to send a direct message.`,

    memberships: `Abdullah is an active member of:

ACM Technical Team, LGU ACM Chapter (active contributor)
ESSE Technical Team Member, engineering and tech community involvement

He actively participates in hackathons, competitions, and open-source events through these organizations.`,

    interests: `Abdullah is passionate about:

Game Development with C++/Raylib and Godot/GDScript
Web Development with React, Tailwind, and Node.js
Data Structures & Algorithms and problem-solving
Artificial Intelligence and Machine Learning
Leveraging AI tools for productivity and smarter workflows
Building things from scratch and understanding how software works under the hood`,

    events: `Abdullah's extra-curricular activities:

UCP TAAKRA 2026: Speed Programming Modulo Competition
IntraTech 2.0 Hackathon: Innovation & Tech Competition
Hacktoberfest 2025: Open Source Contributions
DevSinc Industrial Tour: Corporate Tech Exposure
Top 10 Finalist at TechSphere, LGU Intra Tech Event
ACM & ESSE Technical Team: Active community participation

Check out the Extra-curricular section for event photos.`,

    location: `Abdullah is based in Lahore, Punjab, Pakistan. He studies at Lahore Garrison University (LGU).`,

    status: `Abdullah is currently open to work opportunities, internships, freelance projects, and collaborations.

He is especially interested in roles involving:
- Game Development (C++/Godot)
- Full-Stack Web Development (React/Node)
- AI/ML projects
- Open source contributions

Feel free to reach out via the Contact section.`,

    gamedev: `Abdullah is passionate about game development:

Catch or Kaboom: C++/Raylib game with custom mechanics and collision detection.
Snake Game: Classic implementation in C++/Raylib.
Prince Adventure: 2D platformer adventure in Godot/GDScript with custom level design.

He works with both Raylib (C++) for performance-focused games and Godot Engine (GDScript) for 2D adventures. Game development is one of his core passions.`,

    webdev: `Abdullah's web development experience:

E-Commerce Website: React/Node.js with modern UI.
AI Agent App: Custom intelligence dashboard with LLM integrations.
This Portfolio: Built with React + Vite.

Technologies: React.js, Node.js, Tailwind CSS, HTML/CSS, JavaScript. He focuses on clean, responsive, component-based design.`,

    resume: `Abdullah's key highlights:

BS Computer Science, LGU (Completed 4th Semester, CGPA 3.23)
18+ Projects (Game, Web & AI Dev)
Oracle Cloud AI Foundations Associate
Microsoft Business Analytics with Excel
Top 10 at TechSphere Hackathon
ACM & ESSE Technical Teams
Hacktoberfest 2025 Open Source Contributor

Download his resume: https://abdullahfaisal.dev/Abdullahs%20Resume.pdf

Currently open to work. Reach out via the Contact section.`,
  };

  // ──────────────── QUICK QUESTIONS ────────────────
  const quickQuestions = [
    "Who is Abdullah?",
    "What are his skills?",
    "Show me his projects",
    "Tell me about his events",
    "Is he open to work?",
    "How can I contact him?",
  ];

  // ──────────────── NLP / MATCHING ────────────────
  const knowledgeMap = [
    {
      key: "gamedev",
      keywords: [
        "game",
        "raylib",
        "godot",
        "gdscript",
        "catch or kaboom",
        "snake game",
        "prince walkthrough",
        "game dev",
        "2d",
        "adventure",
      ],
      weight: 3,
    },
    {
      key: "webdev",
      keywords: [
        "web",
        "react",
        "node",
        "tailwind",
        "frontend",
        "fullstack",
        "full-stack",
        "website",
        "ecommerce",
        "e-commerce",
      ],
      weight: 3,
    },
    {
      key: "projects",
      keywords: [
        "project",
        "built",
        "portfolio",
        "work",
        "made",
        "created",
        "develop",
        "build",
      ],
      weight: 2,
    },
    {
      key: "skills",
      keywords: [
        "skill",
        "tech",
        "know",
        "can he do",
        "language",
        "stack",
        "tool",
        "proficient",
        "experienced",
        "expertise",
        "c++",
        "python",
        "javascript",
      ],
      weight: 2,
    },
    {
      key: "certifications",
      keywords: [
        "certif",
        "course",
        "credential",
        "oracle",
        "microsoft",
        "badge",
        "achievement",
        "award",
        "simplilearn",
      ],
      weight: 2,
    },
    {
      key: "education",
      keywords: [
        "education",
        "study",
        "university",
        "school",
        "degree",
        "semester",
        "cgpa",
        "gpa",
        "lgu",
        "garrison",
        "college",
        "academic",
      ],
      weight: 2,
    },
    {
      key: "events",
      keywords: [
        "event",
        "hackathon",
        "activity",
        "activities",
        "competition",
        "taakra",
        "hacktoberfest",
        "intratech",
        "techsphere",
        "devsinc",
        "extracurricular",
        "extra-curricular",
        "tour",
      ],
      weight: 2,
    },
    {
      key: "contact",
      keywords: [
        "contact",
        "email",
        "reach",
        "github",
        "linkedin",
        "connect",
        "message",
        "hire",
        "social",
      ],
      weight: 2,
    },
    {
      key: "memberships",
      keywords: [
        "member",
        "acm",
        "esse",
        "club",
        "organization",
        "team",
        "chapter",
        "community",
      ],
      weight: 2,
    },
    {
      key: "interests",
      keywords: [
        "interest",
        "passion",
        "passionate",
        "like",
        "goal",
        "dream",
        "aspire",
        "future",
        "hobby",
      ],
      weight: 1,
    },
    {
      key: "location",
      keywords: [
        "where",
        "location",
        "live",
        "from",
        "city",
        "country",
        "based",
        "lahore",
        "pakistan",
      ],
      weight: 2,
    },
    {
      key: "status",
      keywords: [
        "hire",
        "job",
        "available",
        "status",
        "open to work",
        "freelance",
        "intern",
        "opportunity",
        "collaborate",
        "collaboration",
        "open",
      ],
      weight: 2,
    },
    {
      key: "resume",
      keywords: [
        "resume",
        "cv",
        "download",
        "pdf",
        "summary",
        "overview",
        "highlight",
        "everything",
        "all",
      ],
      weight: 2,
    },
    {
      key: "about",
      keywords: [
        "who",
        "about",
        "tell me about",
        "introduce",
        "yourself",
        "him",
        "abdullah",
        "abdi",
      ],
      weight: 1,
    },
  ];

  const greetings = [
    "Hello. Great to have you here. What would you like to know about Abdullah?",
    "Hey there. Ask me anything about Abdullah's skills, projects, or experience.",
    "Hi, I'm here to help. Want to know about Abdullah's projects, skills, or events?",
  ];

  const thanks = [
    "You're welcome. Feel free to ask more or check out the Contact section to reach Abdullah.",
    "Glad I could help. Don't hesitate to ask if you have more questions.",
    "No problem. If you're interested in working with Abdullah, head to the Contact section.",
  ];

  const getResponse = (input) => {
    const lowerInput = input.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|sup|yo|greetings|howdy|hola)\b/.test(lowerInput)) {
      const idx = responseCounter.current % greetings.length;
      responseCounter.current += 1;
      return greetings[idx];
    }

    // Thanks
    if (/thank|thanks|thx|appreciate/.test(lowerInput)) {
      const idx = responseCounter.current % thanks.length;
      responseCounter.current += 1;
      return thanks[idx];
    }

    // Goodbye
    if (/^(bye|goodbye|see you|later|cya)\b/.test(lowerInput)) {
      return "Goodbye. Thanks for visiting Abdullah's portfolio. Come back anytime.";
    }

    // Age
    if (/age|old|young|born/.test(lowerInput)) {
      return "Abdullah is a 4th semester CS student at LGU, focused on building real-world projects and growing his skills every day.";
    }

    // Fun / personality
    if (/fun fact|interesting|random|cool/.test(lowerInput)) {
      return "Fun fact: Abdullah has built games with both C++/Raylib and Godot Engine, and contributed to open source during Hacktoberfest 2025. He loves diving deep into how things work under the hood.";
    }

    // Score-based matching
    const scores = {};
    for (const entry of knowledgeMap) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (lowerInput.includes(kw)) {
          score += entry.weight;
        }
      }
      if (score > 0) {
        scores[entry.key] = score;
      }
    }

    // Pick the highest scoring match
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    if (sorted.length > 0) {
      const topKey = sorted[0][0];
      let response = abdullahInfo[topKey];

      // If there are multiple strong matches, mention the second topic too
      if (
        sorted.length > 1 &&
        sorted[1][1] >= 2 &&
        sorted[0][1] - sorted[1][1] <= 1
      ) {
        response += `\n\nYou might also be interested in: "${sorted[1][0]}". Just ask.`;
      }

      return response;
    }

    // Fallback
    return `I'm not sure about that, but I can tell you about Abdullah's:

- Background & Education
- Skills & Technologies
- Projects (Game Dev & Web)
- Events & Hackathons
- Certifications & Achievements
- Contact Information

Try asking something like "What are his skills?" or "Tell me about his game projects".`;
  };

  // ──────────────── HANDLERS ────────────────
  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { type: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay (300-800ms based on response length)
    const response = getResponse(text);
    const delay = Math.min(400 + response.length * 2, 1200);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text: response }]);
    }, delay);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        type: "bot",
        text: "Chat cleared. What would you like to know about Abdullah?",
      },
    ]);
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chatbot-window glass ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <Bot size={18} />
            </div>
            <div className="chatbot-header-text">
              <span className="chatbot-name">Abdullah's AI</span>
              <span className="chatbot-status">
                <span className="status-dot"></span>
                Online
              </span>
            </div>
          </div>
          <div className="chatbot-header-actions">
            <button
              className="chatbot-action-btn"
              onClick={clearChat}
              aria-label="Clear chat"
              title="Clear chat"
            >
              <Trash2 size={15} />
            </button>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <div className="message-icon">
                {msg.type === "bot" ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="message-content">{linkifyText(msg.text)}</div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot">
              <div className="message-icon">
                <Bot size={16} />
              </div>
              <div className="message-content typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 2 && !isTyping && (
          <div className="quick-questions">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                className="quick-question-btn"
                onClick={() => handleQuickQuestion(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="chatbot-input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask about Abdullah..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="chatbot-input"
            disabled={isTyping}
          />
          <button
            className="chatbot-send"
            onClick={handleSend}
            disabled={isTyping || !inputValue.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
