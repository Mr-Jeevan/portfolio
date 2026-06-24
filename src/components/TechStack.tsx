import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TechStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const technologies = [
    {
      category: 'Frontend',
      items: [
        { name: 'React.js', color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { name: 'JavaScript', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
        { name: 'HTML5', color: 'text-orange-400', bg: 'bg-orange-400/10' },
        { name: 'CSS3', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Tailwind CSS', color: 'text-cyan-400', bg: 'bg-cyan-400/10' }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Java', color: 'text-red-400', bg: 'bg-red-400/10' },
        { name: 'Node.js', color: 'text-green-400', bg: 'bg-green-400/10' },
        { name: 'Express.js', color: 'text-gray-300', bg: 'bg-gray-300/10' }
      ]
    },
    {
      category: 'Database & Cloud',
      items: [
        { name: 'MongoDB', color: 'text-green-500', bg: 'bg-green-500/10' },
        { name: 'SQL', color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { name: 'MongoDB Atlas', color: 'text-green-400', bg: 'bg-green-400/10' }
      ]
    },
    {
      category: 'Tools & Others',
      items: [
        { name: 'Eclipse', color: 'text-orange-400', bg: 'bg-orange-400/10' },
        { name: 'VS Code', color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { name: 'Git & GitHub', color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { name: 'Postman', color: 'text-orange-400', bg: 'bg-orange-400/10' },
        { name: 'Oracle DB', color: 'text-orange-400', bg: 'bg-orange-400/10' }
      ]
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

    gsap.fromTo(section.querySelectorAll('.tech-category'),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%'
        }
      }
    );

    gsap.fromTo(section.querySelectorAll('.tech-item'),
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%'
        }
      }
    );
  }, []);

  return (
    <section id="tech" ref={sectionRef} className="py-20 bg-dark-bg relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-4 text-text-white">
            Tech Stack
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-yellow to-hover-yellow mx-auto mb-6"></div>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((category, categoryIndex) => (
            <div key={category.category} className="tech-category">
              <h3 className="text-xl font-semibold mb-6 text-center text-text-white">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.items.map((tech, techIndex) => (
                  <div
                    key={tech.name}
                    className={`tech-item p-4 rounded-xl border border-border-gray hover:border-primary-yellow transition-all duration-300 cursor-pointer group hover:scale-105 bg-card-gray backdrop-blur-sm hover:shadow-lg hover:shadow-primary-yellow/10`}
                  >
                    <div className="text-center">
                      <div className={`text-lg font-medium text-primary-yellow group-hover:scale-110 transition-transform duration-300`}>
                        {tech.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;