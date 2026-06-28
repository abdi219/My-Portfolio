import React, { useState, useRef, useEffect } from "react";
import "./Contact.css";
import FloatingDoodles from "./FloatingDoodles";
import {
  Send,
  Loader2,
  Mail,
  Linkedin,
  Github,
  FileDown,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      if (!section || !container) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Start splitting when element top is at 95% of screen height
      // Complete splitting when element top is at 10% of screen height
      const startTrigger = viewportHeight * 0.95;
      const endTrigger = viewportHeight * 0.1;
      
      let ratio = (startTrigger - rect.top) / (startTrigger - endTrigger);
      ratio = Math.max(0, Math.min(1, ratio));
      
      container.style.setProperty('--scroll-ratio', ratio);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
      const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
      const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "abdullahf0100@gmail.com",
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setStatus({
        type: "success",
        message: "Message sent successfully! I will get back to you shortly.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please contact directly at abdullahf0100@gmail.com.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact" style={{ position: "relative" }} ref={sectionRef}>
      <FloatingDoodles section="contact" />
      <div className="container">
        <div className="section-header anim-rise">
          <h2>Contact</h2>
          <p className="section-subtitle">
            Get in touch to collaborate or chat about tech.
          </p>
        </div>

        <div className="contact-content" ref={containerRef}>
          {/* Left Side: Diagnostics and 2x2 Network Grid */}
          <div className="contact-info anim-slide-left">
            {/* Terminal Diagnostic Panel */}
            <div className="terminal-panel glass">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">system_comms.sh</span>
              </div>
              <div className="terminal-body">
                <p className="terminal-log">> CONNECTING TO NETWORK PORT...</p>
                <p className="terminal-log">> STATUS: ACTIVE [PORT 443]</p>
                <p className="terminal-log">> SECURE ENVELOPE LINK READY.</p>
              </div>
            </div>

            {/* Compact 2x2 Network Hub Grid */}
            <div className="contact-coords-grid">
              <a href="mailto:abdullahf0100@gmail.com" className="coord-grid-card glass">
                <div className="coord-icon-box">
                  <Mail size={18} />
                </div>
                <div className="coord-details">
                  <span className="coord-label">Email</span>
                  <span className="coord-value">Direct Line</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/abdullah-faisal-a8146930a" target="_blank" rel="noopener noreferrer" className="coord-grid-card glass">
                <div className="coord-icon-box">
                  <Linkedin size={18} />
                </div>
                <div className="coord-details">
                  <span className="coord-label">LinkedIn</span>
                  <span className="coord-value">Profile URL</span>
                </div>
              </a>

              <a href="https://github.com/abdi219" target="_blank" rel="noopener noreferrer" className="coord-grid-card glass">
                <div className="coord-icon-box">
                  <Github size={18} />
                </div>
                <div className="coord-details">
                  <span className="coord-label">GitHub</span>
                  <span className="coord-value">Repository</span>
                </div>
              </a>

              <a href="/Abdullahs Resume.pdf" download="Abdullahs_Resume.pdf" target="_blank" rel="noopener noreferrer" className="coord-grid-card glass resume-card">
                <div className="coord-icon-box">
                  <FileDown size={18} />
                </div>
                <div className="coord-details">
                  <span className="coord-label">Resume</span>
                  <span className="coord-value">Download CV</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Sleek Modern Glassmorphic Form */}
          <div className="contact-form-wrapper anim-slide-right">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-form-card glass"
            >
              <h3 className="form-card-title">Send Transmission</h3>
              
              {status.message && (
                <div className={`form-alert-banner ${status.type}`}>
                  <span className="alert-text">{status.message}</span>
                </div>
              )}

              <div className="form-input-group">
                <label htmlFor="name" className="form-field-label">NAME_INPUT ></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                  className="form-text-input"
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="email" className="form-field-label">EMAIL_INPUT ></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  disabled={isSubmitting}
                  className="form-text-input"
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="subject" className="form-field-label">SUBJECT_INPUT ></label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  disabled={isSubmitting}
                  className="form-text-input"
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="message" className="form-field-label">MESSAGE_INPUT ></label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="5"
                  required
                  disabled={isSubmitting}
                  className="form-textarea-input"
                ></textarea>
              </div>

              <div className="form-submit-row">
                <button
                  type="submit"
                  className="btn btn-primary form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spinning" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Transmission</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
