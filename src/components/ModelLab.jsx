import React, { useState, useEffect, useRef } from "react";
import "./ModelLab.css";
import { X, Play, RotateCw, Settings2, ShieldCheck, Compass, Heart, Activity, Palette } from "lucide-react";

// Themes list - Exported for use in ThemeToggle
export const THEMES = [
  {
    id: "editorial-newspaper",
    name: "Editorial Newspaper (Paper & Ink)",
    colors: {
      bg: "#faf9f6",
      text: "#1a1a2e",
      accent: "#27272a",
    },
    variables: {
      "--color-bg-primary": "#faf9f6",
      "--color-bg-secondary": "#ffffff",
      "--color-glass": "rgba(255, 255, 255, 0.85)",
      "--color-glass-border": "rgba(39, 39, 42, 0.08)",
      "--color-shadow": "rgba(39, 39, 42, 0.02)",
      "--color-shadow-md": "rgba(39, 39, 42, 0.04)",
      "--color-shadow-lg": "rgba(39, 39, 42, 0.08)",
      "--color-grid-line": "rgba(39, 39, 42, 0.015)",
      "--color-text-primary": "#1a1a2e",
      "--color-text-secondary": "rgba(26, 26, 46, 0.75)",
      "--color-text-muted": "rgba(26, 26, 46, 0.5)",
      "--color-primary": "#27272a",
      "--color-primary-rgb": "39, 39, 42",
      "--color-primary-light": "#52525b",
      "--color-primary-dark": "#09090b",
      "--color-secondary": "#52525b",
      "--color-accent-1": "#27272a",
      "--color-accent-2": "#27272a",
      "--color-accent-3": "#27272a",
      "--color-accent-4": "#27272a",
    }
  },
  {
    id: "minimal-stark",
    name: "Stark Monochrome (White & Jet Black)",
    colors: {
      bg: "#ffffff",
      text: "#000000",
      accent: "#4b5563",
    },
    variables: {
      "--color-bg-primary": "#ffffff",
      "--color-bg-secondary": "#f4f4f5",
      "--color-glass": "rgba(244, 244, 245, 0.85)",
      "--color-glass-border": "rgba(0, 0, 0, 0.08)",
      "--color-shadow": "rgba(0, 0, 0, 0.01)",
      "--color-shadow-md": "rgba(0, 0, 0, 0.03)",
      "--color-shadow-lg": "rgba(0, 0, 0, 0.06)",
      "--color-grid-line": "rgba(0, 0, 0, 0.01)",
      "--color-text-primary": "#000000",
      "--color-text-secondary": "rgba(0, 0, 0, 0.75)",
      "--color-text-muted": "rgba(0, 0, 0, 0.5)",
      "--color-primary": "#4b5563",
      "--color-primary-rgb": "75, 85, 99",
      "--color-primary-light": "#6b7280",
      "--color-primary-dark": "#374151",
      "--color-secondary": "#374151",
      "--color-accent-1": "#4b5563",
      "--color-accent-2": "#4b5563",
      "--color-accent-3": "#4b5563",
      "--color-accent-4": "#4b5563",
    }
  },
  {
    id: "cozy-minimalist",
    name: "Cozy Minimalist (Oat & Sage)",
    colors: {
      bg: "#f7f4ef",
      text: "#1a1f2c",
      accent: "#4d7c0f",
    },
    variables: {
      "--color-bg-primary": "#f7f4ef",
      "--color-bg-secondary": "#edeae4",
      "--color-glass": "rgba(237, 234, 228, 0.85)",
      "--color-glass-border": "rgba(26, 31, 44, 0.08)",
      "--color-shadow": "rgba(26, 31, 44, 0.02)",
      "--color-shadow-md": "rgba(26, 31, 44, 0.05)",
      "--color-shadow-lg": "rgba(26, 31, 44, 0.08)",
      "--color-grid-line": "rgba(26, 31, 44, 0.015)",
      "--color-text-primary": "#1a1f2c",
      "--color-text-secondary": "rgba(26, 31, 44, 0.75)",
      "--color-text-muted": "rgba(26, 31, 44, 0.5)",
      "--color-primary": "#4d7c0f",
      "--color-primary-rgb": "77, 124, 15",
      "--color-primary-light": "#65a30d",
      "--color-primary-dark": "#3f6212",
      "--color-secondary": "#3f6212",
      "--color-accent-1": "#4d7c0f",
      "--color-accent-2": "#4d7c0f",
      "--color-accent-3": "#4d7c0f",
      "--color-accent-4": "#4d7c0f",
    }
  },
  {
    id: "nordic-clay",
    name: "Nordic Clay (Oat & Terracotta)",
    colors: {
      bg: "#f5ece3",
      text: "#2b2623",
      accent: "#d35e45",
    },
    variables: {
      "--color-bg-primary": "#f5ece3",
      "--color-bg-secondary": "#e8ded4",
      "--color-glass": "rgba(232, 222, 212, 0.85)",
      "--color-glass-border": "rgba(43, 38, 35, 0.08)",
      "--color-shadow": "rgba(43, 38, 35, 0.02)",
      "--color-shadow-md": "rgba(43, 38, 35, 0.05)",
      "--color-shadow-lg": "rgba(43, 38, 35, 0.08)",
      "--color-grid-line": "rgba(43, 38, 35, 0.015)",
      "--color-text-primary": "#2b2623",
      "--color-text-secondary": "rgba(43, 38, 35, 0.75)",
      "--color-text-muted": "rgba(43, 38, 35, 0.5)",
      "--color-primary": "#d35e45",
      "--color-primary-rgb": "211, 94, 69",
      "--color-primary-light": "#df7d67",
      "--color-primary-dark": "#b0442c",
      "--color-secondary": "#b0442c",
      "--color-accent-1": "#d35e45",
      "--color-accent-2": "#d35e45",
      "--color-accent-3": "#d35e45",
      "--color-accent-4": "#d35e45",
    }
  },
  {
    id: "sakura-dream",
    name: "Sakura Dream (Rose & Peach)",
    colors: {
      bg: "#faf0ee",
      text: "#3f2d29",
      accent: "#e15b74",
    },
    variables: {
      "--color-bg-primary": "#faf0ee",
      "--color-bg-secondary": "#f3e2de",
      "--color-glass": "rgba(243, 226, 222, 0.85)",
      "--color-glass-border": "rgba(63, 45, 41, 0.08)",
      "--color-shadow": "rgba(63, 45, 41, 0.02)",
      "--color-shadow-md": "rgba(63, 45, 41, 0.05)",
      "--color-shadow-lg": "rgba(63, 45, 41, 0.08)",
      "--color-grid-line": "rgba(63, 45, 41, 0.015)",
      "--color-text-primary": "#3f2d29",
      "--color-text-secondary": "rgba(63, 45, 41, 0.75)",
      "--color-text-muted": "rgba(63, 45, 41, 0.5)",
      "--color-primary": "#e15b74",
      "--color-primary-rgb": "225, 91, 116",
      "--color-primary-light": "#eb8095",
      "--color-primary-dark": "#bc3e55",
      "--color-secondary": "#bc3e55",
      "--color-accent-1": "#e15b74",
      "--color-accent-2": "#e15b74",
      "--color-accent-3": "#e15b74",
      "--color-accent-4": "#e15b74",
    }
  }
];

// Creative fun 3D models list
const ENGINES = [
  {
    id: "robot-head",
    name: "Neural Robot Buddy",
    icon: Compass,
    description: "A cute floating 3D assistant face that blinks organically, tracks your cursor, and smiles when hovered.",
  },
  {
    id: "gamepad-3d",
    name: "3D Retro Gamepad",
    icon: RotateCw,
    description: "A retro gaming controller floating in space. Tilts on mouse movement and pulses its buttons when hovered.",
  },
  {
    id: "space-helmet",
    name: "Space Explorer Helmet",
    icon: Activity,
    description: "A floating wireframe astronaut helmet with a glossy light-reflecting visor, surrounded by orbiting stars.",
  },
  {
    id: "prism-sculpture",
    name: "Faceted Glass Prism",
    icon: Heart,
    description: "A floating 3D crystal sculpture reflecting light gradients. Counter-rotates and expands on hover.",
  }
];

const ModelLab = ({ isOpen, onClose, activeEngine, onApplyEngine }) => {
  const [selectedEngine, setSelectedEngine] = useState(activeEngine);
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem("light_theme_selection") || "editorial-newspaper";
  });
  const [speed, setSpeed] = useState(1.2);
  const [scale, setScale] = useState(1.0);
  const canvasesRef = {
    "robot-head": useRef(null),
    "gamepad-3d": useRef(null),
    "space-helmet": useRef(null),
    "prism-sculpture": useRef(null),
  };

  // Setup preview animations
  useEffect(() => {
    if (!isOpen) return;

    const animations = [];
    const colorPrimary = window.getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim();
    const parseColor = (colorStr) => {
      let hex = colorStr || "#27272a";
      if (hex.startsWith("#")) {
        if (hex.length === 4) {
          hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
      }
      return "39, 39, 42";
    };
    const primaryRGB = parseColor(colorPrimary);

    // 1. Robot Head Preview
    const initRobot = (canvas) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let width = canvas.width = canvas.offsetWidth || 220;
      let height = canvas.height = canvas.offsetHeight || 180;
      let animationId;
      let frame = 0;

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        frame += 0.03 * speed;

        const cx = width / 2;
        const cy = height / 2;
        const time = Date.now() * 0.001;

        // Draw 3D wireframe robot face
        ctx.strokeStyle = `rgba(${primaryRGB}, 0.8)`;
        ctx.lineWidth = 1.2 * scale;
        
        // Tilt head based on mouse ClientX/Y
        const tiltX = Math.sin(time) * 0.12;
        const tiltY = Math.cos(time) * 0.15;

        // Draw head sphere/box
        ctx.beginPath();
        ctx.arc(cx + tiltY * 15, cy + tiltX * 10, 40 * scale, 0, Math.PI * 2);
        ctx.stroke();

        // Antenna
        ctx.beginPath();
        ctx.moveTo(cx + tiltY * 15, cy - 40 * scale + tiltX * 10);
        ctx.lineTo(cx + tiltY * 18, cy - 55 * scale + tiltX * 10);
        ctx.stroke();

        // Antenna bulb glow
        const glowRad = (4 + Math.sin(time * 5) * 2) * scale;
        ctx.fillStyle = `rgba(${primaryRGB}, 0.9)`;
        ctx.beginPath();
        ctx.arc(cx + tiltY * 18, cy - 55 * scale + tiltX * 10, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Eyes (Blinking cycle)
        const isBlinking = Math.floor(frame * 0.25) % 15 === 0;
        const eyeYScale = isBlinking ? 0.1 : 1.0;
        ctx.fillStyle = `rgba(${primaryRGB}, 0.85)`;

        // Left eye
        ctx.beginPath();
        ctx.ellipse(cx - 15 * scale + tiltY * 15, cy - 5 * scale + tiltX * 10, 5 * scale, 8 * eyeYScale * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Right eye
        ctx.beginPath();
        ctx.ellipse(cx + 15 * scale + tiltY * 15, cy - 5 * scale + tiltX * 10, 5 * scale, 8 * eyeYScale * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Mouth smile
        ctx.beginPath();
        ctx.arc(cx + tiltY * 15, cy + 10 * scale + tiltX * 10, 10 * scale, 0, Math.PI);
        ctx.stroke();

        // Ears
        ctx.beginPath();
        ctx.arc(cx - 43 * scale + tiltY * 15, cy + tiltX * 10, 4 * scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 43 * scale + tiltY * 15, cy + tiltX * 10, 4 * scale, 0, Math.PI * 2);
        ctx.stroke();

        animationId = requestAnimationFrame(render);
      };
      render();

      animations.push(() => cancelAnimationFrame(animationId));
    };

    // 2. Gamepad 3D Preview
    const initGamepad = (canvas) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let width = canvas.width = canvas.offsetWidth || 220;
      let height = canvas.height = canvas.offsetHeight || 180;
      let animationId;
      let angle = 0;

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        angle += 0.015 * speed;

        const cx = width / 2;
        const cy = height / 2;

        // Controller outline
        ctx.strokeStyle = `rgba(${primaryRGB}, 0.75)`;
        ctx.lineWidth = 1 * scale;

        const tiltX = Math.sin(angle) * 0.15;
        const tiltY = Math.cos(angle) * 0.2;

        ctx.save();
        ctx.translate(cx, cy);
        
        // Draw round body shell
        ctx.beginPath();
        ctx.roundRect(-42 * scale, -22 * scale, 84 * scale, 44 * scale, 15 * scale);
        ctx.stroke();

        // D-Pad Cross
        ctx.strokeStyle = `rgba(${primaryRGB}, 0.6)`;
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(-24 * scale, -4 * scale); ctx.lineTo(-14 * scale, -4 * scale);
        ctx.moveTo(-19 * scale, -9 * scale); ctx.lineTo(-19 * scale, 1 * scale);
        ctx.stroke();

        // Buttons A / B
        ctx.fillStyle = `rgba(${primaryRGB}, 0.8)`;
        ctx.beginPath();
        ctx.arc(20 * scale, 5 * scale, 4 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(28 * scale, -3 * scale, 4 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Handles left/right grips
        ctx.strokeStyle = `rgba(${primaryRGB}, 0.3)`;
        ctx.lineWidth = 1 * scale;
        ctx.beginPath();
        ctx.arc(-35 * scale, 10 * scale, 10 * scale, 0, Math.PI * 2);
        ctx.arc(35 * scale, 10 * scale, 10 * scale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();

        animationId = requestAnimationFrame(render);
      };
      render();

      animations.push(() => cancelAnimationFrame(animationId));
    };

    // 3. Space Helmet Preview
    const initSpace = (canvas) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let width = canvas.width = canvas.offsetWidth || 220;
      let height = canvas.height = canvas.offsetHeight || 180;
      let animationId;
      let frame = 0;

      const stars = Array.from({ length: 25 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 80 + 10,
        speed: 0.2 + Math.random() * 0.8
      }));

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        frame += 0.01 * speed;

        const cx = width / 2;
        const cy = height / 2;

        // Draw background stars
        stars.forEach((star) => {
          star.z -= star.speed * speed;
          if (star.z <= 0) star.z = 90;
          const s = 120 / star.z;
          const sx = cx + (star.x - cx) * s;
          const sy = cy + (star.y - cy) * s;
          ctx.fillStyle = `rgba(${primaryRGB}, ${Math.max(0.1, 1 - star.z / 90) * 0.4})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 1 * s * scale, 0, Math.PI * 2);
          ctx.fill();
        });

        // Helmet wireframe
        ctx.strokeStyle = `rgba(${primaryRGB}, 0.8)`;
        ctx.lineWidth = 1 * scale;

        const tiltX = Math.sin(frame * 1.5) * 6;
        const tiltY = Math.cos(frame * 1.8) * 8;

        // Neck ring
        ctx.beginPath();
        ctx.ellipse(cx + tiltY, cy + 30 * scale + tiltX, 28 * scale, 8 * scale, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Main sphere
        ctx.beginPath();
        ctx.arc(cx + tiltY, cy + tiltX, 32 * scale, 0, Math.PI * 2);
        ctx.stroke();

        // Visor glass shield
        ctx.fillStyle = `rgba(${primaryRGB}, 0.08)`;
        ctx.strokeStyle = `rgba(${primaryRGB}, 0.9)`;
        ctx.lineWidth = 1.5 * scale;
        ctx.beginPath();
        ctx.ellipse(cx + tiltY * 1.2, cy + tiltX * 1.2, 22 * scale, 15 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        animationId = requestAnimationFrame(render);
      };
      render();

      animations.push(() => cancelAnimationFrame(animationId));
    };

    // 4. Faceted Prism Preview
    const initPrism = (canvas) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let width = canvas.width = canvas.offsetWidth || 220;
      let height = canvas.height = canvas.offsetHeight || 180;
      let animationId;

      const vertices = [
        [0, 1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0],
        [0, 0, -1], [0, -1, 0]
      ];
      const faces = [
        [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
        [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]
      ];
      let rotX = 0.5, rotY = 0.5;

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        rotX += 0.007 * speed;
        rotY += 0.01 * speed;

        const cx = width / 2;
        const cy = height / 2;
        const radius = 55 * scale;
        const fov = 200;

        const projected = vertices.map(([x, y, z]) => {
          let y1 = y * radius * Math.cos(rotX) - z * radius * Math.sin(rotX);
          let z1 = y * radius * Math.sin(rotX) + z * radius * Math.cos(rotX);
          let x2 = x * radius * Math.cos(rotY) - z1 * Math.sin(rotY);
          let z2 = x * radius * Math.sin(rotY) + z1 * Math.cos(rotY);
          const s = fov / (fov + z2);
          return { x: cx + x2 * s, y: cy + y1 * s, z: z2 };
        });

        faces.forEach(([f1, f2, f3]) => {
          const p1 = projected[f1];
          const p2 = projected[f2];
          const p3 = projected[f3];
          const avgZ = (p1.z + p2.z + p3.z) / 3;
          const op = Math.max(0.08, 0.42 - (avgZ / radius) * 0.3);

          ctx.strokeStyle = `rgba(${primaryRGB}, ${op * 1.4})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y);
          ctx.closePath(); ctx.stroke();

          ctx.fillStyle = `rgba(${primaryRGB}, ${op * 0.12})`;
          ctx.fill();
        });

        animationId = requestAnimationFrame(render);
      };
      render();

      animations.push(() => cancelAnimationFrame(animationId));
    };

    // Run previews
    initRobot(canvasesRef["robot-head"].current);
    initGamepad(canvasesRef["gamepad-3d"].current);
    initSpace(canvasesRef["space-helmet"].current);
    initPrism(canvasesRef["prism-sculpture"].current);

    return () => {
      animations.forEach((cleanup) => cleanup());
    };
  }, [isOpen, speed, scale]);

  if (!isOpen) return null;

  const activeMetadata = ENGINES.find(e => e.id === selectedEngine) || ENGINES[0];

  const handleSelectTheme = (themeId) => {
    setSelectedTheme(themeId);
    const theme = THEMES.find(t => t.id === themeId);
    if (theme) {
      // Overwrite CSS variables instantly for real-time portfolio review
      const root = document.documentElement;
      Object.entries(theme.variables).forEach(([key, val]) => {
        root.style.setProperty(key, val);
      });
      localStorage.setItem("light_theme_selection", themeId);
    }
  };

  const handleApply = () => {
    onApplyEngine(selectedEngine);
    localStorage.setItem("hero_3d_model", selectedEngine);
    localStorage.setItem("hero_3d_speed", speed.toString());
    localStorage.setItem("hero_3d_scale", scale.toString());
    onClose();
  };

  return (
    <div className="model-lab-overlay animate-fade-in">
      <div className="model-lab-window glass">
        <div className="model-lab-header">
          <div className="header-info">
            <span className="lab-badge">CREATIVE DESIGN LAB 🎨</span>
            <h2>Visual Layout & Theme Switcher</h2>
            <p>Customize the artistic 3D visualization and Light Mode color palette of your website.</p>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close Model Lab">
            <X size={18} />
          </button>
        </div>

        <div className="model-lab-content">
          {/* Section 1: Themes Selection */}
          <div className="lab-section">
            <div className="section-title-wrapper">
              <Palette size={16} className="section-title-icon" />
              <h3>Choose Color Palette (Light Mode)</h3>
            </div>
            
            <div className="themes-grid">
              {THEMES.map((theme) => {
                const isSelected = selectedTheme === theme.id;
                return (
                  <div
                    key={theme.id}
                    className={`theme-card glass-subtle ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectTheme(theme.id)}
                  >
                    <div className="theme-card-header">
                      <h5>{theme.name}</h5>
                      {isSelected && <span className="theme-active-dot" />}
                    </div>
                    <div className="theme-color-preview">
                      <div className="color-swatch" style={{ background: theme.colors.bg }} title="Background" />
                      <div className="color-swatch" style={{ background: theme.colors.text }} title="Text Color" />
                      <div className="color-swatch" style={{ background: theme.colors.accent }} title="Brand Accent" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: 3D Art Models Selection */}
          <div className="lab-section">
            <div className="section-title-wrapper">
              <RotateCw size={16} className="section-title-icon" />
              <h3>Select 3D Art Visual Engine</h3>
            </div>
            
            <div className="models-grid">
              {ENGINES.map((engine) => {
                const IconComp = engine.icon;
                const isSelected = selectedEngine === engine.id;
                const isActive = activeEngine === engine.id;

                return (
                  <div
                    key={engine.id}
                    className={`model-card glass-subtle ${isSelected ? "selected" : ""} ${isActive ? "active-system" : ""}`}
                    onClick={() => setSelectedEngine(engine.id)}
                  >
                    <div className="card-top">
                      <div className="engine-title-area">
                        <IconComp size={15} className="engine-icon-badge" />
                        <h4>{engine.name}</h4>
                      </div>
                      {isActive && <span className="active-tag"><ShieldCheck size={10} /> ACTIVE</span>}
                    </div>
                    <div className="canvas-container">
                      <canvas ref={canvasesRef[engine.id]} className="preview-canvas" />
                    </div>
                    <p className="card-desc">{engine.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls and Apply Panel */}
          <div className="controls-panel glass-subtle">
            <div className="controls-header">
              <Settings2 size={15} />
              <h3>Interactive Visual Adjustments</h3>
            </div>
            
            <div className="control-rows">
              <div className="control-row">
                <div className="label-area">
                  <span>Rotation Speed</span>
                  <span className="value-label">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                />
              </div>

              <div className="control-row">
                <div className="label-area">
                  <span>Scale Multiplier</span>
                  <span className="value-label">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="action-row">
              <div className="selected-summary">
                <span className="summary-label">Target 3D Visual Art:</span>
                <span className="summary-value">{activeMetadata.name}</span>
              </div>
              <button className="btn btn-primary apply-btn" onClick={handleApply}>
                <Play size={14} /> Apply Visual Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelLab;
