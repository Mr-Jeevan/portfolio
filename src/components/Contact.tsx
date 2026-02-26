import React, { useEffect, useRef } from 'react';
import { Mail, MapPin, Github, Linkedin, Copy, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = React.useState(false);

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
        start: 'top 80%',
      }
    });
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jeevanraj.rj7@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          {/* Contact Info - Left Column */}
          <div className="contact-item">
            <h3 className="text-2xl font-bold text-text-white mb-8">Let's Connect</h3>

            <div className="space-y-6 mb-8">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-yellow/20 rounded-full">
                  <Mail className="w-6 h-6 text-primary-yellow" />
                </div>
                <div className="flex-1">
                  <p className="text-text-muted text-sm">Email</p>
                  <div className="flex items-center gap-2">
                    <a
                      href="mailto:jeevanraj.rj7@gmail.com"
                      className="text-text-white hover:text-primary-yellow transition-colors"
                    >
                      jeevanraj.rj7@gmail.com
                    </a>

                    <button
                      onClick={handleCopyEmail}
                      className="p-1 hover:bg-card-gray rounded transition-colors"
                      title="Copy email"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-text-muted hover:text-primary-yellow" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Location */}
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
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card-gray rounded-full text-text-white hover:text-primary-yellow hover:bg-border-gray border border-border-gray transition-all duration-300"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/mr-jeevan/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card-gray rounded-full text-text-white hover:text-primary-yellow hover:bg-border-gray border border-border-gray transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
             
            </div>
          </div>

          {/* Contact Message - Right Column */}
          <div className="contact-item">
            <div className="bg-card-gray border border-border-gray rounded-lg p-8 h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-text-white mb-4">Ready to Work Together?</h3>
              <p className="text-text-muted mb-6 leading-relaxed">
                I'm actively seeking opportunities to contribute to meaningful projects and collaborate with talented teams. Whether you have a project in mind, want to discuss tech, or just want to connect—I'd love to hear from you!
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-primary-yellow font-bold text-lg mt-1">✓</span>
                  <p className="text-text-white">Full-stack MERN Development</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-yellow font-bold text-lg mt-1">✓</span>
                  <p className="text-text-white">Available to relocate and open to remote opportunities</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border-gray">
                <p className="text-text-muted text-sm">
                  <strong>Preferred Contact Method:</strong> Email me directly at{' '}
                  <a
                    href="mailto:jeevanraj.rj7@gmail.com"
                    className="text-primary-yellow hover:text-hover-yellow transition-colors"
                  >
                    jeevanraj.rj7@gmail.com
                  </a>

                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border-gray text-center">
          <p className="text-text-muted">
            © 2026 Raghul Jeevanraj A. Built with React, GSAP, and lots of ☕
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
