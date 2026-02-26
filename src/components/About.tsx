import React, { useEffect, useRef } from 'react';
import { GraduationCap, Target, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelectorAll('.about-item'),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-dark-bg relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="about-item text-4xl md:text-5xl font-bold mb-4 text-text-white">
            About Me
          </h2>
          <div className="about-item w-20 h-1 bg-gradient-to-r from-primary-yellow to-hover-yellow mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="about-item">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-primary-yellow" />
                <h3 className="text-xl font-semibold text-text-white">Education</h3>
              </div>
              <p className="text-text-muted leading-relaxed">
                Final-year MCA student with a passion for technology and innovation.
                Currently mastering advanced concepts in software development and
                system design while building real-world applications.
              </p>
            </div>

            <div className="about-item">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary-yellow" />
                <h3 className="text-xl font-semibold text-text-white">Career Goals</h3>
              </div>
              <p className="text-text-muted leading-relaxed">
                Aspiring to join a dynamic tech team where I can contribute to
                meaningful projects, continue learning cutting-edge technologies,
                and grow as a full-stack developer while making a positive impact.
              </p>
            </div>

            <div className="about-item">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-primary-yellow" />
                <h3 className="text-xl font-semibold text-text-white">Passion</h3>
              </div>
              <p className="text-text-muted leading-relaxed">
                I love creating digital experiences that solve real problems.
                From designing intuitive interfaces to architecting robust backends,
                I'm driven by the endless possibilities of code and creativity.
              </p>
            </div>
          </div>

          <div className="about-item">
            <div className="bg-card-gray rounded-2xl p-8 border border-border-gray shadow-lg hover:shadow-primary-yellow/10 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-tint to-primary-yellow/5 rounded-2xl pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-text-white">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Degree</span>
                    <span className="text-text-white font-medium">MCA (Final Year)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Specialization</span>
                    <span className="text-text-white font-medium">Full-Stack Development</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Primary Stack</span>
                    <span className="text-text-white font-medium">MERN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Experience Level</span>
                    <span className="text-text-white font-medium">2+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Location</span>
                    <span className="text-text-white font-medium">Available to Relocate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;