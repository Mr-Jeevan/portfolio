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
    <section id="about" ref={sectionRef} className="py-20 bg-gray-900/80 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="about-item text-4xl md:text-5xl font-bold mb-4 text-white">
            About Me
          </h2>
          <div className="about-item w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="about-item">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Education</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Final-year MCA student with a passion for technology and innovation. 
                Currently mastering advanced concepts in software development and 
                system design while building real-world applications.
              </p>
            </div>

            <div className="about-item">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Career Goals</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Aspiring to join a dynamic tech team where I can contribute to 
                meaningful projects, continue learning cutting-edge technologies, 
                and grow as a full-stack developer while making a positive impact.
              </p>
            </div>

            <div className="about-item">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Passion</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                I love creating digital experiences that solve real problems. 
                From designing intuitive interfaces to architecting robust backends, 
                I'm driven by the endless possibilities of code and creativity.
              </p>
            </div>
          </div>

          <div className="about-item">
            <div className="bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/20">
              <h3 className="text-2xl font-bold mb-6 text-white">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Degree</span>
                  <span className="text-white font-medium">MCA (Final Year)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Specialization</span>
                  <span className="text-white font-medium">Full-Stack Development</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Primary Stack</span>
                  <span className="text-white font-medium">MERN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience Level</span>
                  <span className="text-white font-medium">2+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white font-medium">Available to Relocate</span>
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