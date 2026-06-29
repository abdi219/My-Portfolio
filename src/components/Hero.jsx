import React, { useRef, useEffect } from "react";
import "./Hero.css";

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const setSize = () => {
      canvas.width  = canvas.offsetWidth  || 520;
      canvas.height = canvas.offsetHeight || 520;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // ── theme colour ─────────────────────────────────────────────────────────
    let cr = 228, cg = 228, cb = 231;
    const readColor = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary").trim();
      if (!raw.startsWith("#")) return;
      const hex = raw.length === 4
        ? "#"+raw[1]+raw[1]+raw[2]+raw[2]+raw[3]+raw[3]
        : raw;
      cr = parseInt(hex.slice(1,3),16);
      cg = parseInt(hex.slice(3,5),16);
      cb = parseInt(hex.slice(5,7),16);
    };
    readColor();
    const themeObs = new MutationObserver(readColor);
    themeObs.observe(document.documentElement,
      { attributes: true, attributeFilter: ["data-theme"] });

    // ── Lorenz ODE ────────────────────────────────────────────────────────────
    const BASE_SIGMA = 10, BASE_RHO = 28, BETA = 8 / 3;
    const DT = 0.007;
    const MAX_TRAIL = 3500;

    let lx = 0.1, ly = 0, lz = 0;
    // Pre-allocated typed arrays for speed
    const trailX = new Float32Array(MAX_TRAIL);
    const trailY = new Float32Array(MAX_TRAIL);
    const trailZ = new Float32Array(MAX_TRAIL);
    let trailLen = 0;
    let trailHead = 0; // ring-buffer head index

    // ── rotation ──────────────────────────────────────────────────────────────
    let rotX = 0.42, rotY = 0;
    let targetRotX = 0.42, targetRotY = 0;
    let autoAngle = 0;

    // ── projection ────────────────────────────────────────────────────────────
    // Inline for hot-path speed
    let cosX, sinX, cosY, sinY;

    // ── main loop ─────────────────────────────────────────────────────────────
    let frame = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      frame++;

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // breathing morph (cheap trig, low frequency)
      const breathe = Math.sin(frame * 0.004) * 2.2
                    + Math.cos(frame * 0.0017) * 1.1;
      const RHO   = BASE_RHO   + breathe;
      const SIGMA = BASE_SIGMA + Math.sin(frame * 0.003) * 0.8;

      // auto-spin
      autoAngle  += 0.0008;
      targetRotY  = autoAngle;
      targetRotX  = 0.42 + Math.sin(frame * 0.0004) * 0.18;
      rotX += (targetRotX - rotX) * 0.055;
      rotY += (targetRotY - rotY) * 0.055;

      // pre-compute rotation trig once per frame
      cosX = Math.cos(rotX); sinX = Math.sin(rotX);
      cosY = Math.cos(rotY); sinY = Math.sin(rotY);

      // ── step ODE — 3 substeps ────────────────────────────────────────────
      for (let i = 0; i < 3; i++) {
        const dx =  SIGMA * (ly - lx);
        const dy =  lx * (RHO - lz) - ly;
        const dz =  lx * ly - BETA * lz;
        lx += dx * DT; ly += dy * DT; lz += dz * DT;

        const idx = trailHead % MAX_TRAIL;
        trailX[idx] = lx;
        trailY[idx] = ly;
        trailZ[idx] = lz;
        trailHead++;
        if (trailLen < MAX_TRAIL) trailLen++;
      }

      const cx = W / 2, cy = H / 2;
      const scale = Math.min(W, H) / 65;
      const OZ = -25;
      const fov = 300;

      // ── draw trail ───────────────────────────────────────────────────────
      // Stride 2: skip every other segment — halves draw calls, looks same
      const total = Math.min(trailLen, MAX_TRAIL);
      const start = trailHead - total;

      let prevPX = 0, prevPY = 0;

      for (let i = 0; i < total; i += 2) {
        const idx  = ((start + i) % MAX_TRAIL + MAX_TRAIL) % MAX_TRAIL;
        const tx = trailX[idx], ty = trailY[idx], tz = trailZ[idx] + OZ;

        // inline project
        const rx1 = tx*cosY - tz*sinY;
        const rz1 = tx*sinY + tz*cosY;
        const ry1 = ty*cosX - rz1*sinX;
        const rz2 = ty*sinX + rz1*cosX;
        const s   = fov / (fov + rz2 + 80);
        const px  = cx + rx1 * scale * s;
        const py  = cy + ry1 * scale * s;

        if (i === 0) { prevPX = px; prevPY = py; continue; }

        const a = i / total; // 0=old → 1=new
        // opacity: near-zero tail → bright head
        const op = Math.pow(a, 2.2) * 0.88;

        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${op.toFixed(3)})`;
        ctx.lineWidth   = 0.3 + a * 1.85;
        ctx.beginPath();
        ctx.moveTo(prevPX, prevPY);
        ctx.lineTo(px, py);
        ctx.stroke();

        prevPX = px; prevPY = py;
      }

      // ── glowing head (no radialGradient — just layered arcs) ─────────────
      const hIdx = ((trailHead - 1) % MAX_TRAIL + MAX_TRAIL) % MAX_TRAIL;
      const hx3 = trailX[hIdx], hy3 = trailY[hIdx], hz3 = trailZ[hIdx] + OZ;
      const hrx = hx3*cosY - hz3*sinY;
      const hrz = hx3*sinY + hz3*cosY;
      const hry = hy3*cosX - hrz*sinX;
      const hrz2= hy3*sinX + hrz*cosX;
      const hs  = fov / (fov + hrz2 + 80);
      const hx  = cx + hrx * scale * hs;
      const hy  = cy + hry * scale * hs;

      // Outer glow (3 simple arcs, no gradient)
      const glowSizes  = [24, 13, 6];
      const glowAlphas = [0.07, 0.18, 0.38];
      for (let g = 0; g < 3; g++) {
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${glowAlphas[g]})`;
        ctx.beginPath();
        ctx.arc(hx, hy, glowSizes[g], 0, Math.PI * 2);
        ctx.fill();
      }
      // Solid core
      ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
      ctx.beginPath();
      ctx.arc(hx, hy, 2.6, 0, Math.PI * 2);
      ctx.fill();
      // White-hot centre
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.arc(hx, hy, 1.0, 0, Math.PI * 2);
      ctx.fill();
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
      themeObs.disconnect();
    };
  }, []);

  return (
    <section id="home" className="hero">
      {/* Dynamic Cyber Grid Background */}
      <div className="hero-bg-grid"></div>
      
      {/* Floating CS / Mathematical Coding Symbols */}
      <div className="hero-bg-symbols">
        {/* Python & ML */}
        <span className="symbol symbol-1">import numpy as np</span>
        <span className="symbol symbol-2">def train(model):</span>
        <span className="symbol symbol-3">y_hat = σ(Wx + b)</span>
        <span className="symbol symbol-4">Softmax</span>
        <span className="symbol symbol-5">QuickSort</span>
        <span className="symbol symbol-6">learning_rate</span>
        <span className="symbol symbol-7">gradient_descent</span>
        <span className="symbol symbol-8">Loss = MSE</span>
        <span className="symbol symbol-9">epochs</span>
        
        {/* Stats & Maths */}
        <span className="symbol symbol-10">μ = 0, σ = 1</span>
        <span className="symbol symbol-11">P(A|B)</span>
        <span className="symbol symbol-12">E[X]</span>
        <span className="symbol symbol-13">Variance</span>
        <span className="symbol symbol-14">Eigenvalue</span>
        <span className="symbol symbol-15">∫ e^x dx</span>
        <span className="symbol symbol-16">dy/dx</span>
        <span className="symbol symbol-17">lim x→∞</span>
        <span className="symbol symbol-18">matrix.T</span>
        
        {/* Binary */}
        <span className="symbol symbol-19">0100</span>
        <span className="symbol symbol-20">1010</span>
        <span className="symbol symbol-21">0011</span>
        <span className="symbol symbol-22">1100</span>

        {/* C++ (More than Game Dev) */}
        <span className="symbol symbol-23">{"std::vector<T>"}</span>
        <span className="symbol symbol-24">{"std::unique_ptr"}</span>
        <span className="symbol symbol-25">{"const auto&"}</span>

        {/* Game Dev (Less than C++) */}
        <span className="symbol symbol-26">Update()</span>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-text fade-in-up">
            <p className="hero-greeting">Hi, I'm</p>
            <h1 className="hero-name">Abdullah Faisal</h1>
            <h2 className="hero-title">
              Computer Science Student | AI/ML, C++ &amp; Web Developer
            </h2>
            <p className="hero-description">
              I build things from scratch, specializing in Artificial
              Intelligence (AI/ML models &amp; agents), C++ programming,
              and web architectures. ACM Technical Member at LGU, passionate
              about clean logic, algorithms, and design.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact"  className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>

          <div className="hero-3d-wrapper">
            <canvas ref={canvasRef} className="attractor-canvas" />
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
