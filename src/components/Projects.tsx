import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

import sms from '../assets/sms.png';
import ias from '../assets/ias.jpg';
import lfrs from '../assets/lfrs.jpg';
import pathfinder from '../assets/pathfinder.jpg';
import rads from '../assets/rads.png';
const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      title: 'Intelligent Attendance System',
      description: 'Automated face recognition attendance system with real-time detection, confidence verification, and management dashboard for academic tracking.',
      tech: ['React', 'Node.js', 'MongoDB', 'face-api.js', 'JWT'],
      category: 'EdTech',
      image: ias,
      github: 'https://github.com/Mr-Jeevan/inteli-attendance-sys-rjeevan',
      demo: 'https://ias-inteliattendancesys-1.onrender.com/'
    },
    {
      title: 'Path-Finder',
      description: 'AI-powered career & life mentor that generates personalized roadmaps with milestones and mentor tips based on user-defined life goals.',
      tech: ['React 19', 'Node.js', 'MongoDB', 'Hugging Face', 'JWT'],
      category: 'AI',
      image: pathfinder,
      github: 'https://github.com/Mr-Jeevan/pathfinder-public',
      demo: 'https://pathfinder-demo.onrender.com'
    },
    {
      title: 'Student Details Management System', 
      description: 'MCA student record management platform with CRUD operations, secure authentication, and Excel export functionality.',
      tech: ['React', 'Node.js', 'MongoDB', 'Bootstrap 5', 'JWT'],
      category: 'Management',
      image: sms,
      github: 'https://github.com/Mr-Jeevan/McaSms.git',
      demo: 'https://mcasms-frontend.onrender.com/'
    },
    {
      title: 'Lost Item Recovery System',
      description: 'Real-time community platform for reporting and tracking lost/found items with integrated messaging and status tracking.',
      tech: ['React 19', 'Python FastAPI', 'MongoDB', 'Socket.io'],
      category: 'Community',
      image: lfrs,
      github: 'https://github.com/Mr-Jeevan/hybrid-lfrs',
      demo: 'https://lfrs-iaue.onrender.com'
    },
    {
      title: 'Road Anomaly Detection System',
      description: 'Smart road-monitoring platform detecting potholes/speed breakers via vibration analysis and GPS tracking with geospatial visualization.',
      tech: ['React', 'Node.js', 'MongoDB', 'Leaflet', 'Turf.js'],
      category: 'IoT',
      image: rads,
      github: 'https://github.com/Mr-Jeevan/RADS.git',
      demo: 'https://rads-jqhp.onrender.com'
    },
    {
      title: 'E-commerce Platform',
      description: 'Responsive clothing store e-commerce platform with real-time discount calculations, size selection, and localStorage cart persistence.',
      tech: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Bootstrap 5', 'localStorage'],
      category: 'E-commerce',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com/Mr-Jeevan/Thuni-kada.git',
      demo: 'https://mr-jeevan.github.io/Thuni-kada/'
    },
  ];

  const categories = ['All', 'Web', 'EdTech', 'AI', 'Community', 'Management', 'E-commerce', 'IoT'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

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

    gsap.fromTo(section.querySelectorAll('.project-card'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%'
        }
      }
    );
  }, [filteredProjects]);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-dark-bg relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-4 text-text-white">
            Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-yellow to-hover-yellow mx-auto mb-6"></div>
          <p className="text-text-muted text-lg max-w-2xl mx-auto mb-8">
            A collection of projects showcasing my skills and creativity
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${filter === category
                  ? 'bg-primary-yellow text-dark-bg'
                  : 'bg-card-gray text-text-muted hover:bg-border-gray border border-border-gray'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="project-card group bg-card-gray rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl hover:shadow-primary-yellow/20 border border-border-gray hover:border-primary-yellow"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    target='_blank'
                    href={project.github}
                    className="p-2 bg-dark-bg/60 rounded-full text-primary-yellow hover:bg-dark-bg/80 transition-colors border border-border-gray"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    target='_blank'
                    href={project.demo}
                    className="p-2 bg-dark-bg/60 rounded-full text-primary-yellow hover:bg-dark-bg/80 transition-colors border border-border-gray"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-text-white mb-2 group-hover:text-primary-yellow transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-muted mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-yellow/20 text-primary-yellow rounded-full text-xs border border-primary-yellow/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;