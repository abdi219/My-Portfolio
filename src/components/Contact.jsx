import React, { useState, useRef } from "react";
import "./Contact.css";
import FloatingDoodles from "./FloatingDoodles";
import {
  Send,
  Loader2,
  Mail,
  Linkedin,
  Github,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  
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
    <section id="contact" className="contact" style={{ position: "relative" }}>
      <FloatingDoodles section="contact" />
      <div className="container">
        <div className="section-header animate-on-scroll">
          <h2>Contact</h2>
          <p className="section-subtitle">
            Get in touch to collaborate or chat about tech.
          </p>
        </div>

        <div className="contact-content">
          {/* Left Side: Modern Info Panel */}
          <div className="contact-info animate-on-scroll">
            <div className="contact-intro-card glass">
              <h3 className="contact-intro-title">Let's build something together</h3>
              <p className="contact-intro-desc">
                Have an exciting project, a role opening, or just want to talk about game development, C++, or AI agents? Fill out the form, or reach out directly through any of the channels below.
              </p>
            </div>

            <div className="contact-coords-list">
              <a href="mailto:abdullahf0100@gmail.com" className="coord-item-link glass">
                <div className="coord-icon-box">
                  <Mail size={18} />
                </div>
                <div className="coord-details">
                  <span className="coord-label">Email</span>
                  <span className="coord-value">abdullahf0100@gmail.com</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/abdullah-faisal-a8146930a" target="_blank" rel="noopener noreferrer" className="coord-item-link glass">
                <div className="coord-icon-box">
                  <Linkedin size={18} />
                </div>
                <div className="coord-details">
                  <span className="coord-label">LinkedIn</span>
                  <span className="coord-value">abdullah-faisal-a8146930a</span>
                </div>
              </a>

              <a href="https://github.com/abdi219" target="_blank" rel="noopener noreferrer" className="coord-item-link glass">
                <div className="coord-icon-box">
                  <Github size={18} />
                </div>
                <div className="coord-details">
                  <span className="coord-label">GitHub</span>
                  <span className="coord-value">github.com/abdi219</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Sleek Modern Glassmorphic Form */}
          <div className="contact-form-wrapper animate-on-scroll">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-form-card glass"
            >
              <h3 className="form-card-title">Send a Message</h3>
              
              {status.message && (
                <div className={`form-alert-banner ${status.type}`}>
                  <span className="alert-text">{status.message}</span>
                </div>
              )}

              <div className="form-input-group">
                <label htmlFor="name" className="form-field-label">Your Name</label>
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
                <label htmlFor="email" className="form-field-label">Email Address</label>
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
                <label htmlFor="subject" className="form-field-label">Subject</label>
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
                <label htmlFor="message" className="form-field-label">Message</label>
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
                      <span>Send Message</span>
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
