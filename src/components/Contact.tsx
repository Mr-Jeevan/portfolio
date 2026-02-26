import React, { useEffect, useRef, useState } from 'react';
import { Send, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate all elements with the 'contact-item' class
    gsap.fromTo(section.querySelectorAll('.contact-item'), {
      y: 80,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%', // Animation starts when the top of the section is 80% from the top of the viewport
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // --- CONFIGURATION NOTE ---
    // For EmailJS to work, you MUST create a .env file in your project's root
    // and add your credentials like this:
    // REACT_APP_EMAILJS_SERVICE_ID=your_service_id
    // REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
    // REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatusMessage('Email service is not configured correctly.');
      console.error("EmailJS credentials are missing from .env file!");
      setTimeout(() => setStatusMessage(''), 5000);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log('EmailJS Success:', result.text);
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        formRef.current?.reset();
      }, (error) => {
        console.error('EmailJS Error:', error.text);
        setStatusMessage('Failed to send message. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setStatusMessage(''), 5000); // Clear message after 5 seconds
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-dark-bg relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="contact-item text-4xl md:text-5xl font-bold mb-4 text-text-white">
            Get In Touch
          </h2>
          <div className="contact-item w-20 h-1 bg-gradient-to-r from-primary-yellow to-hover-yellow mx-auto mb-6"></div>
          <p className="contact-item text-text-muted text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, projects, or just having a chat about technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-item">
            <h3 className="text-2xl font-bold text-text-white mb-8">Let's Connect</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-yellow/20 rounded-full">
                  <Mail className="w-6 h-6 text-primary-yellow" />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Email</p>
                  <a href="mailto:jeevee.a77@gmail.com" className="text-text-white hover:text-primary-yellow transition-colors">
                    jeevee.a77@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-yellow/20 rounded-full">
                  <MapPin className="w-6 h-6 text-primary-yellow" />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Location</p>
                  <p className="text-text-white">Available to Relocate</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/Mr-Jeevan"
                target='_blank'
                rel="noopener noreferrer"
                className="p-3 bg-card-gray rounded-full text-text-white hover:text-primary-yellow hover:bg-border-gray border border-border-gray transition-all duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/mr-jeevan/"
                target='_blank'
                rel="noopener noreferrer"
                className="p-3 bg-card-gray rounded-full text-text-white hover:text-primary-yellow hover:bg-border-gray border border-border-gray transition-all duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-item">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card-gray border border-border-gray rounded-lg text-text-white placeholder-text-muted focus:outline-none focus:border-primary-yellow transition-colors backdrop-blur-sm"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card-gray border border-border-gray rounded-lg text-text-white placeholder-text-muted focus:outline-none focus:border-primary-yellow transition-colors backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-card-gray border border-border-gray rounded-lg text-text-white placeholder-text-muted focus:outline-none focus:border-primary-yellow transition-colors resize-none backdrop-blur-sm"
                  placeholder="Enter your message"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-primary-yellow text-dark-bg py-3 px-6 rounded-lg font-medium hover:bg-hover-yellow hover:shadow-lg hover:shadow-primary-yellow/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark-bg"></div>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              {statusMessage && (
                <p className={`text-center mt-4 ${statusMessage.includes('Failed') || statusMessage.includes('not configured') ? 'text-red-400' : 'text-green-400'}`}>
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border-gray text-center">
          <p className="text-text-muted">
            © 2025 Raghul Jeevanraj A. Built with React, GSAP, and lots of ☕
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

