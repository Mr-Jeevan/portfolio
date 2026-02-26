import React, { useEffect, useRef } from 'react';
import { Palette, Video, Image, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Tools: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const toolCategories = [
    {
      icon: Palette,
      title: 'Design Tools',
      tools: ['Figma', 'Adobe Photoshop', 'Canva'],
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
      borderColor: 'border-pink-400/20'
    },
    {
      icon: Video,
      title: 'Video Editing',
      tools: ['DaVinci Resolve'],
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/20'
    },
    {
      icon: Image,
      title: 'Graphics',
      tools: ['Photoshop', 'GIMP'],
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20'
    },
    {
      icon: Zap,
      title: 'Development',
      tools: ['Postman', 'Firebase', 'MongoDB Atlas'],
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelector('.section-title'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%'
        }
      }
    );

    gsap.fromTo(section.querySelectorAll('.tool-card'),
      { y: 80, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%'
        }
      }
    );
  }, []);

  return (
    <section id="tools" ref={sectionRef} className="py-20 bg-dark-bg relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-4 text-text-white">
            Tools & Creative Work
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-yellow to-hover-yellow mx-auto mb-6"></div>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Beyond coding, I create stunning visuals and engaging content
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {toolCategories.map((category, index) => (
            <div
              key={category.title}
              className={`tool-card border rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group bg-card-gray backdrop-blur-sm hover:shadow-lg hover:shadow-primary-yellow/10 border-border-gray hover:border-primary-yellow`}
            >
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-full bg-primary-yellow/20 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`w-8 h-8 text-primary-yellow`} />
                </div>

                <h3 className="text-xl font-bold text-text-white mb-4">
                  {category.title}
                </h3>

                <div className="space-y-2">
                  {category.tools.map((tool) => (
                    <div
                      key={tool}
                      className={`px-3 py-1 bg-primary-yellow/20 rounded-full text-sm text-primary-yellow border border-primary-yellow/30`}
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card-gray rounded-2xl p-8 border border-border-gray bg-gradient-to-r from-yellow-tint to-primary-yellow/10">
            <h3 className="text-2xl font-bold text-text-white mb-4">
              Creative Philosophy
            </h3>
            <p className="text-text-muted text-lg max-w-3xl mx-auto leading-relaxed">
              I believe in the power of combining technical expertise with creative vision.
              Whether it's designing user interfaces, creating marketing materials, or
              editing videos, I approach every project with attention to detail and
              a passion for storytelling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;