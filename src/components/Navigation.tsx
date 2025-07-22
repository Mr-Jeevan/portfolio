import React, { useEffect, useState } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="nav-item">
            <a href="#home" className={`text-xl font-bold transition-colors ${scrolled ? 'text-blue-600' : 'text-blue-400'}`}>
              Jeevan.dev
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-item transition-colors duration-300 ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/Mr-Jeevan" className={`nav-item transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/mr-jeevan/" className={`nav-item transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:jeevee.a77@gmail.com" className={`nav-item transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden nav-item ${scrolled ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 backdrop-blur-sm rounded-lg mb-4 border border-gray-600">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;