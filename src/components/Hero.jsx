import React, { useRef, useEffect } from "react";
import "./Hero.css";
import { Gamepad2, Sparkles, Terminal } from "lucide-react";

const Hero = ({ activeEngine }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let cleanupfn = () => {};
    
    // Scale canvas to bounding container
    const rect = canvas.getBoundingClientRect();
    let width = canvas.width = rect.width || canvas.offsetWidth || 480;
    let height = canvas.height = rect.height || canvas.offsetHeight || 420;

    const handleResize = () => {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      width = canvas.width = r.width || canvas.offsetWidth || 480;
      height = canvas.height = r.height || canvas.offsetHeight || 420;
    };
    window.addEventListener("resize", handleResize);

    // Dynamic brand color parser
    const parseColor = (colorStr) => {
      let hex = colorStr || "#4d7c0f";
      if (hex.startsWith("#")) {
        if (hex.length === 4) {
          hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
      }
      if (hex.startsWith("rgb")) {
        const match = hex.match(/\d+/g);
        if (match && match.length >= 3) {
          return `${match[0]}, ${match[1]}, ${match[2]}`;
        }
      }
      return "77, 124, 15";
    };

    let primaryRGB = "77, 124, 15";
    let checkThemeCounter = 0;

    const updateThemeColors = () => {
      const computedStyle = window.getComputedStyle(document.documentElement);
      const colorPrimary = computedStyle.getPropertyValue("--color-primary").trim();
      primaryRGB = parseColor(colorPrimary);
    };
    updateThemeColors();

    const speed = parseFloat(localStorage.getItem("hero_3d_speed")) || 1.0;
    const scale = parseFloat(localStorage.getItem("hero_3d_scale")) || 1.0;

    // ==========================================
    // ENGINE 1: NEURAL CYBER TREE
    // ==========================================
    if (activeEngine === "neural-tree") {
      let rotY = 0.5;
      let targetRotY = 0.5;
      let isDragging = false;
      let prevMousePos = 0;
      let time = 0;

      const handleMouseDown = (e) => {
        isDragging = true;
        prevMousePos = e.clientX;
      };
      const handleMouseMove = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        if (isDragging) {
          targetRotY += (clientX - prevMousePos) * 0.005;
          prevMousePos = clientX;
        }
      };
      const handleMouseUp = () => isDragging = false;

      canvas.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      
      canvas.addEventListener("touchstart", (e) => {
        isDragging = true;
        prevMousePos = e.touches[0].clientX;
      }, { passive: true });
      canvas.addEventListener("touchmove", handleMouseMove, { passive: true });
      canvas.addEventListener("touchend", handleMouseUp);

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        checkThemeCounter++;
        if (checkThemeCounter % 40 === 0) updateThemeColors();

        time += 0.012 * speed;
        rotY += (targetRotY - rotY) * 0.08;
        if (!isDragging) targetRotY += 0.002;

        const cx = width / 2;
        const cy = height - 50;
        const fov = 250;

        const drawBranch3D = (startX, startY, startZ, length, angleTheta, anglePhi, depth) => {
          if (depth > 6) return;

          const dx = length * Math.sin(angleTheta) * Math.cos(anglePhi);
          const dy = -length * Math.cos(angleTheta);
          const dz = length * Math.sin(angleTheta) * Math.sin(anglePhi);

          const endX = startX + dx;
          const endY = startY + dy;
          const endZ = startZ + dz;

          // Rotations
          const rx = endX * Math.cos(rotY) - endZ * Math.sin(rotY);
          const rz = endX * Math.sin(rotY) + endZ * Math.cos(rotY);
          const sx = startX * Math.cos(rotY) - startZ * Math.sin(rotY);
          const sz = startX * Math.sin(rotY) + startZ * Math.cos(rotY);

          // Projection
          const sEnd = fov / (fov + rz + 100);
          const sStart = fov / (fov + sz + 100);

          const projEndX = cx + rx * sEnd;
          const projEndY = cy + endY * sEnd;
          const projStartX = cx + sx * sStart;
          const projStartY = cy + startY * sStart;

          // Draw branch line
          ctx.strokeStyle = `rgba(${primaryRGB}, ${0.85 - depth * 0.1})`;
          ctx.lineWidth = Math.max(0.6, (7 - depth) * 1.0 * scale);
          ctx.beginPath();
          ctx.moveTo(projStartX, projStartY);
          ctx.lineTo(projEndX, projEndY);
          ctx.stroke();

          // Leaf nodes
          if (depth === 6) {
            ctx.fillStyle = `rgba(${primaryRGB}, 0.95)`;
            ctx.beginPath();
            ctx.arc(projEndX, projEndY, 3.2 * scale, 0, Math.PI * 2);
            ctx.fill();
            return;
          }

          const sway = Math.sin(time + depth) * 0.06;
          drawBranch3D(endX, endY, endZ, length * 0.76, angleTheta - 0.44 + sway, anglePhi + 1.25, depth + 1);
          drawBranch3D(endX, endY, endZ, length * 0.76, angleTheta + 0.44 + sway, anglePhi - 1.25, depth + 1);
        };

        drawBranch3D(0, 0, 0, 80 * scale, 0, 0, 1);

        animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      cleanupfn = () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }

    // ==========================================
    // ENGINE 2: COSMIC GRAVITY NEBULA
    // ==========================================
    else if (activeEngine === "gravity-nebula") {
      const particles = [];
      const P_COUNT = 150;
      for (let i = 0; i < P_COUNT; i++) {
        particles.push({
          angle: Math.random() * Math.PI * 2,
          radius: 20 + Math.random() * 140,
          speed: 0.004 + Math.random() * 0.012,
          y3d: Math.random() * 40 - 20,
          size: 0.6 + Math.random() * 2.2
        });
      }

      let rotY = 0.5;
      let targetRotY = 0.5;
      let isDragging = false;
      let prevMousePos = 0;
      let mouse = { x: null, y: null };

      const handleMouseDown = (e) => {
        isDragging = true;
        prevMousePos = e.clientX;
      };
      const handleMouseMove = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const rect = canvas.getBoundingClientRect();
        mouse.x = clientX - rect.left;
        mouse.y = clientY - rect.top;

        if (isDragging) {
          targetRotY += (clientX - prevMousePos) * 0.005;
          prevMousePos = clientX;
        }
      };
      const handleMouseUp = () => isDragging = false;
      const handleMouseLeave = () => {
        isDragging = false;
        mouse.x = null;
        mouse.y = null;
      };

      canvas.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mouseleave", handleMouseLeave);

      canvas.addEventListener("touchstart", (e) => {
        isDragging = true;
        prevMousePos = e.touches[0].clientX;
      }, { passive: true });
      canvas.addEventListener("touchmove", handleMouseMove, { passive: true });
      canvas.addEventListener("touchend", handleMouseUp);

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        checkThemeCounter++;
        if (checkThemeCounter % 40 === 0) updateThemeColors();

        const time = Date.now() * 0.001;
        rotY += (targetRotY - rotY) * 0.08;
        if (!isDragging) targetRotY += 0.0015;

        const cx = width / 2;
        const cy = height / 2;
        const fov = 250;

        // Central singularity core glow
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 65 * scale);
        coreGrad.addColorStop(0, `rgba(${primaryRGB}, 0.18)`);
        coreGrad.addColorStop(0.5, `rgba(${primaryRGB}, 0.04)`);
        coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 65 * scale, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((p) => {
          p.angle += p.speed * speed;
          p.radius -= 0.12 * speed;
          if (p.radius < 8) p.radius = 140 + Math.random() * 20;

          let lx = p.radius * Math.cos(p.angle);
          let lz = p.radius * Math.sin(p.angle);

          const rx = lx * Math.cos(rotY) - lz * Math.sin(rotY);
          const rz = lx * Math.sin(rotY) + lz * Math.cos(rotY);

          const s = fov / (fov + rz + 100);
          let sx = cx + rx * s;
          let sy = cy + p.y3d * s;

          // Mouse warp gravity
          if (mouse.x !== null && mouse.y !== null) {
            const dx = sx - mouse.x;
            const dy = sy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              sx -= (dx / dist) * (1 - dist / 90) * 12;
              sy -= (dy / dist) * (1 - dist / 90) * 12;
            }
          }

          const opacity = Math.max(0.1, 1 - (rz + 80) / 240);
          ctx.fillStyle = `rgba(${primaryRGB}, ${opacity * 0.85})`;
          ctx.beginPath();
          ctx.arc(sx, sy, p.size * s * scale, 0, Math.PI * 2);
          ctx.fill();
        });

        animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      cleanupfn = () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    // ==========================================
    // ENGINE 3: FACETED PRISM SCULPTURE
    // ==========================================
    else if (activeEngine === "prism-sculpture") {
      const vertices = [
        [0, 1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0],
        [0, 0, -1], [0, -1, 0]
      ];
      const faces = [
        [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
        [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]
      ];

      let rotX = 0.45;
      let rotY = 0.55;
      let targetRotX = 0.45;
      let targetRotY = 0.55;
      let isDragging = false;
      let prevMousePos = { x: 0, y: 0 };
      let isHovered = false;
      let morphFactor = 0;

      const handleMouseDown = (e) => {
        isDragging = true;
        prevMousePos = { x: e.clientX, y: e.clientY };
      };
      const handleMouseMove = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        if (isDragging) {
          targetRotY += (clientX - prevMousePos.x) * 0.005;
          targetRotX += (clientY - prevMousePos.y) * 0.005;
          prevMousePos = { x: clientX, y: clientY };
        }
      };
      const handleMouseUp = () => isDragging = false;
      const handleMouseEnter = () => isHovered = true;
      const handleMouseLeave = () => {
        isHovered = false;
        isDragging = false;
      };

      canvas.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mouseenter", handleMouseEnter);
      canvas.addEventListener("mouseleave", handleMouseLeave);

      canvas.addEventListener("touchstart", (e) => {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }, { passive: true });
      canvas.addEventListener("touchmove", handleMouseMove, { passive: true });
      canvas.addEventListener("touchend", handleMouseUp);

      const fov = 350;

      const drawPrism = (radius, rx, ry, opacityScale) => {
        const cx = width / 2;
        const cy = height / 2;

        const projected = vertices.map(([x, y, z]) => {
          const vx = x * radius;
          const vy = y * radius;
          const vz = z * radius;

          let y1 = vy * Math.cos(rx) - vz * Math.sin(rx);
          let z1 = vy * Math.sin(rx) + vz * Math.cos(rx);
          let x2 = vx * Math.cos(ry) - z1 * Math.sin(ry);
          let z2 = vx * Math.sin(ry) + z1 * Math.cos(ry);

          const s = fov / (fov + z2);
          return { x: cx + x2 * s, y: cy + y1 * s, z: z2 };
        });

        faces.forEach(([f1, f2, f3]) => {
          const p1 = projected[f1];
          const p2 = projected[f2];
          const p3 = projected[f3];

          const avgZ = (p1.z + p2.z + p3.z) / 3;
          const faceOpacity = Math.max(0.05, 0.4 - (avgZ / radius) * 0.25) * opacityScale;

          // Draw wireframe paths
          ctx.strokeStyle = `rgba(${primaryRGB}, ${faceOpacity * 1.5})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();
          ctx.stroke();

          // Translucent face fill shading
          ctx.fillStyle = `rgba(${primaryRGB}, ${faceOpacity * 0.1})`;
          ctx.fill();
        });
      };

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        checkThemeCounter++;
        if (checkThemeCounter % 40 === 0) updateThemeColors();

        rotX += (targetRotX - rotX) * 0.08;
        rotY += (targetRotY - rotY) * 0.08;

        if (!isDragging) {
          rotX += 0.002 * speed;
          rotY += 0.003 * speed;
        }

        morphFactor += ((isHovered ? 1 : 0) - morphFactor) * 0.08;
        const radius = Math.min(width, height) * 0.36 * scale;

        // 1. Draw outer rotating prism
        drawPrism(radius, rotX, rotY, 1.0);

        // 2. Draw nested inner counter-rotating prism on hover
        if (morphFactor > 0.02) {
          drawPrism(radius * 0.45, -rotX * 1.4, -rotY * 1.8, morphFactor * 0.9);
        }

        animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      cleanupfn = () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mouseenter", handleMouseEnter);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    // ==========================================
    // ENGINE 4: CYBER HELIX WAVE RIBBON
    // ==========================================
    else {
      let time = 0;
      const pointsCount = 28;

      let rotX = 0.45;
      let targetRotX = 0.45;
      let isDragging = false;
      let prevMousePos = 0;

      const handleMouseDown = (e) => {
        isDragging = true;
        prevMousePos = e.clientY;
      };
      const handleMouseMove = (e) => {
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        if (isDragging) {
          targetRotX += (clientY - prevMousePos) * 0.005;
          prevMousePos = clientY;
        }
      };
      const handleMouseUp = () => isDragging = false;

      canvas.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      canvas.addEventListener("touchstart", (e) => {
        isDragging = true;
        prevMousePos = e.touches[0].clientY;
      }, { passive: true });
      canvas.addEventListener("touchmove", handleMouseMove, { passive: true });
      canvas.addEventListener("touchend", handleMouseUp);

      const fov = 350;

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        checkThemeCounter++;
        if (checkThemeCounter % 40 === 0) updateThemeColors();

        time += 0.02 * speed;
        rotX += (targetRotX - rotX) * 0.08;
        if (!isDragging) rotX = 0.45 + Math.sin(time * 0.5) * 0.1;

        const cx = width / 2;
        const cy = height / 2;

        for (let i = 0; i < pointsCount; i++) {
          const ratio = i / pointsCount;
          const lx = (ratio - 0.5) * 260 * scale;

          // Double helix waves calculations
          const spiralAngle = ratio * Math.PI * 4.5 + time;
          const rad = 45 * scale;
          const ly1 = Math.cos(spiralAngle) * rad;
          const lz1 = Math.sin(spiralAngle) * rad;

          const ly2 = Math.cos(spiralAngle + Math.PI) * rad;
          const lz2 = Math.sin(spiralAngle + Math.PI) * rad;

          // Rotations (rotX pitch)
          const rx1 = lx;
          const ry1 = ly1 * Math.cos(rotX) - lz1 * Math.sin(rotX);
          const rz1 = ly1 * Math.sin(rotX) + lz1 * Math.cos(rotX);
          const s1 = fov / (fov + rz1 + 100);
          const sx1 = cx + rx1 * s1;
          const sy1 = cy + ry1 * s1;

          const rx2 = lx;
          const ry2 = ly2 * Math.cos(rotX) - lz2 * Math.sin(rotX);
          const rz2 = ly2 * Math.sin(rotX) + lz2 * Math.cos(rotX);
          const s2 = fov / (fov + rz2 + 100);
          const sx2 = cx + rx2 * s2;
          const sy2 = cy + ry2 * s2;

          const opacity = Math.max(0.1, 1 - (rz1 + 50) / 180);

          // Draw rung connection lines
          ctx.strokeStyle = `rgba(${primaryRGB}, ${opacity * 0.15})`;
          ctx.lineWidth = 0.65;
          ctx.beginPath();
          ctx.moveTo(sx1, sy1);
          ctx.lineTo(sx2, sy2);
          ctx.stroke();

          // Draw node circles
          ctx.fillStyle = `rgba(${primaryRGB}, ${opacity * 0.9})`;
          ctx.beginPath(); ctx.arc(sx1, sy1, 3.2 * s1 * scale, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(sx2, sy2, 3.2 * s2 * scale, 0, Math.PI * 2); ctx.fill();
        }

        animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      cleanupfn = () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupfn();
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeEngine]);

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-text fade-in-up">
            <p className="hero-greeting">Hi, I'm</p>
            <h1 className="hero-name">Abdullah Faisal</h1>
            <h2 className="hero-title">
              Computer Science Student | Game, Web & AI Developer
            </h2>
            <p className="hero-description">
              I build things from scratch, specializing in Game Development (C++, Godot/GDScript), Web Architectures, and Artificial Intelligence. I love designing smart neural integrations, agents, and automated workflows. ACM Technical Member at LGU, passionate about clean logic and great design.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get In Touch
              </a>
            </div>
          </div>

          <div className="hero-3d-wrapper">
            <div className="constellation-globe-card">
              <div className="globe-overlay-tags">
                <span className="globe-tag-item">ENGINE: {activeEngine.toUpperCase()}</span>
                <span className="globe-tag-item">SYS: OK</span>
              </div>
              <canvas ref={canvasRef} className="constellation-canvas" />
              
              <div className="globe-tech-badge tech-badge-1">
                <span className="floating-icon"><Terminal size={14} /></span>
                <span>C++ / OOP</span>
              </div>
              <div className="globe-tech-badge tech-badge-2">
                <span className="floating-icon"><Gamepad2 size={14} /></span>
                <span>GameDev</span>
              </div>
              <div className="globe-tech-badge tech-badge-3">
                <span className="floating-icon"><Sparkles size={14} /></span>
                <span>AI Agents</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
