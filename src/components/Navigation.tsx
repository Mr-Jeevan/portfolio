import React, { useEffect, useState } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';

// Enhanced MailLink Component with fallbacks and user feedback
const MailLink: React.FC<{ scrolled: boolean }> = ({ scrolled }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mailto parameters with proper encoding
  const emailAddress = 'jeevee.a77@gmail.com';
  const subject = encodeURIComponent('Portfolio Inquiry - Let\'s Connect');
  const body = encodeURIComponent('Hello,\n\nI\'m interested in learning more about your work and would love to connect!\n\nBest regards,\n');

  // Complete mailto URL with parameters
  const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

  // Fallback Gmail compose URL
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${subject}&body=${body}`;

  const handleMailClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Add click feedback
    setShowTooltip(false);

    try {
      // Attempt to open mailto link
      window.location.href = mailtoUrl;

      // Set timeout to show fallback if mailto doesn't work
      setTimeout(() => {
        setShowFallback(true);
        // Hide fallback after 5 seconds
        setTimeout(() => setShowFallback(false), 5000);
      }, 1000);
    } catch (error) {
      console.error('Error opening mail client:', error);
      setShowFallback(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy email:', err);
        // Fallback to prompt
        prompt('Copy this email address:', emailAddress);
      });
  };

  const handleGmailClick = () => {
    window.open(gmailUrl, '_blank');
    setShowFallback(false);
  };

  return (
    <div className="relative">
      {/* Mail icon link */}
      <a
        href={mailtoUrl}
        onClick={handleMailClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`nav-item transition-colors relative ${scrolled ? 'text-text-white hover:text-primary-yellow' : 'text-text-white hover:text-primary-yellow'}`}
        aria-label="Send email"
      >
        <Mail className="w-5 h-5" />

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-card-gray border border-border-gray text-text-white text-xs rounded whitespace-nowrap z-50">
            Send Email
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-card-gray"></div>
          </div>
        )}
      </a>

      {/* Fallback options */}
      {showFallback && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-card-gray border border-border-gray rounded-lg shadow-lg z-50 min-w-[200px]">
          <div className="text-text-white text-sm mb-2">
            <p className="font-medium">Email Client Not Found</p>
            <p className="text-text-muted text-xs">Choose an option below:</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleCopyEmail}
              className="w-full px-3 py-2 bg-primary-yellow/20 hover:bg-primary-yellow/30 text-primary-yellow rounded text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Email'}
            </button>

            <button
              onClick={handleGmailClick}
              className="w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-sm transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              Open Gmail
            </button>

            <button
              onClick={() => setShowFallback(false)}
              className="w-full px-3 py-1 text-text-muted hover:text-text-white text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo('.nav-item',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5 }
    );
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#tech', label: 'Tech Stack' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-card-gray/95 backdrop-blur-sm shadow-lg border-b border-border-gray' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="nav-item">
            <a href="#home" className={`text-xl font-bold transition-colors ${scrolled ? 'text-primary-yellow' : 'text-primary-yellow'}`}>
              Jeevan.dev
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-item transition-colors duration-300 ${scrolled ? 'text-text-white hover:text-primary-yellow' : 'text-text-white hover:text-primary-yellow'}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/Mr-Jeevan" className={`nav-item transition-colors ${scrolled ? 'text-text-white hover:text-primary-yellow' : 'text-text-white hover:text-primary-yellow'}`} aria-label="GitHub profile">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/mr-jeevan/" className={`nav-item transition-colors ${scrolled ? 'text-text-white hover:text-primary-yellow' : 'text-text-white hover:text-primary-yellow'}`} aria-label="LinkedIn profile">
              <Linkedin className="w-5 h-5" />
            </a>
            <MailLink scrolled={scrolled} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden nav-item ${scrolled ? 'text-text-white' : 'text-text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card-gray/95 backdrop-blur-sm rounded-lg mb-4 border border-border-gray">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-text-white hover:text-primary-yellow transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile mail link */}
              <div className="px-3 py-2">
                <a
                  href="mailto:jeevee.a77@gmail.com?subject=Portfolio Inquiry - Let's Connect&body=Hello,%0D%0A%0D%0AI'm interested in learning more about your work and would love to connect!%0D%0A%0D%0ABest regards,%0D%0A"
                  className="flex items-center gap-2 text-text-white hover:text-primary-yellow transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Me</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;