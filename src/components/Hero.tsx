import React, { useEffect, useRef } from 'react';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import profileImage from '../assets/p.jpg';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3'
    )
    .fromTo(imageRef.current, 
      { scale: 0.8, opacity: 0, rotation: -10 }, 
      { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }, '-=0.5'
    )
    .fromTo(buttonsRef.current?.children, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' }, '-=0.2'
    );

    // Floating animation for hero section
    gsap.to(heroRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Floating animation for profile image
    gsap.to(imageRef.current, {
      y: -15,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      <div ref={heroRef} className="max-w-7xl mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 
              ref={titleRef}
              className="text-5xl py-3 md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:300%_300%]"
            >
              A R Jeevanraj
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-white-700 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Full-Stack Developer crafting exceptional digital experiences with the 
              <span className="text-blue-600 font-semibold"> MERN stack</span> and creative design
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <a
                href="#projects"
                className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
              >
                View Projects
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="#"
                className="group px-8 py-3 border-2 border-blue-500 text-blue-600 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                Download Resume
                <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-purple-400/30 rounded-3xl blur-2xl transform rotate-6"></div>
              <img
                ref={imageRef}
                src={profileImage}
                alt="Raghul Jeevanraj A"
                className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl border-4 border-white/20 backdrop-blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <ArrowDown className="w-6 h-6 mx-auto text-gray-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;