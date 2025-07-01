'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { X } from 'lucide-react';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) =>
          console.warn('Autoplay blocked by browser:', err)
        );
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const menu = [
    { title: 'home', value: 'Home', id: 'home' },
    { title: 'about', value: 'About', id: 'about' },
    { title: 'service', value: 'Service', id: 'service' },
    { title: 'faq', value: 'FAQ', id: 'faq' },
    { title: 'contact', value: 'Contact', id: 'contact' },
  ];

  return (
    <div id="home" className="w-full bg-[#f5f3eb]">
      {/* Navbar */}
      <nav className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between z-50 relative">
        {/* Logo */}
        <div
          className="flex items-center space-x-4 cursor-pointer group transition"
          onClick={() => window.location.href = '#home'}
        >
          <div className="w-20 h-20 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 300"
              className="w-full h-full"
            >
              <line x1="0" y1="300" x2="0" y2="0" stroke="#1E3A8A" strokeWidth="4" />
              <line x1="0" y1="300" x2="600" y2="300" stroke="#1E3A8A" strokeWidth="4" />
              <line x1="0" y1="0" x2="400" y2="300" stroke="#1E3A8A" strokeWidth="4" />
              <line x1="350" y1="50" x2="600" y2="300" stroke="#1E3A8A" strokeWidth="4" />
              <line x1="0" y1="150" x2="600" y2="300" stroke="#1E3A8A" strokeWidth="4" />
              <line x1="0" y1="300" x2="350" y2="50" stroke="#1E3A8A" strokeWidth="4" />
              <circle
                cx="100"
                cy="180"
                r="15"
                stroke="#1E3A8A"
                strokeWidth="4"
                fill="none"
                className="group-hover:fill-[#bfd8c2] transition duration-300"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-base md:text-lg text-[#1d2a2e] font-serif font-semibold group-hover:text-[#26443c] transition">
              Jennifer Hahm, Ph.D.
            </h2>
            <p className="text-sm md:text-base text-[#1d2a2e] font-serif group-hover:text-[#4f695e] transition">
              Psychological Services
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex space-x-6">
          {menu.map((item) => (
            <li
              key={item.title}
              className="text-[#1d2a2e] text-lg font-serif hover:border-b-2 border-[#bfd8c2] transition cursor-pointer"
            >
              <a href={`#${item.id}`}>{item.value}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="block sm:hidden text-2xl hover:bg-sky-200 p-1 rounded-full z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={27} /> : <HiMenu size={27} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <ul className="fixed top-0 right-0 w-72 h-screen bg-slate-800 shadow-2xl flex flex-col pt-16 z-40 sm:hidden">
            {menu.map((item) => (
              <li
                key={item.title}
                className="border-b border-slate-600 last:border-b-0"
              >
                <a
                  href={`#${item.id}`}
                  className="block px-8 py-5 text-slate-200 hover:bg-slate-700 text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
          <div
            className="fixed inset-0 bg-black/50 z-30 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}

      {/* Hero Section */}
      <div className="w-full flex justify-center">
        <div
          ref={heroRef}
          className={`relative w-full max-w-[1440px] h-[600px] sm:h-[650px] md:h-[700px] overflow-hidden border-4 border-[#bfd8c2] rounded-xl shadow-xl transition-all duration-1000 ease-out transform ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/1390942/1390942-uhd_2732_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>

          {/* Overlay Text */}
          <div className="relative z-10 flex items-center justify-center h-full bg-black/50 text-white text-center px-4">
            <div className="flex flex-col items-center justify-center gap-6 max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-snug">
                Psychological Care for
                <br />
                Change, Insight, and Well-Being
              </h1>
              <p className="text-lg md:text-xl font-light">
                Offering individual psychotherapy for adults via telehealth in Michigan and{' '}
                <a
                  href="https://psypact.gov/page/psypactmap"
                  target="_blank"
                  className="underline hover:text-[#bfd8c2]"
                >
                  most U.S. states
                </a>{' '}
                through PSYPACT participation
              </p>
              <a
                href="https://forms.gle/B1j8ik9XWyWuyK8y7"
                target="_blank"
                className="mt-4 px-8 py-3 rounded-full bg-[#bfd8c2] text-white font-semibold text-sm shadow-md hover:shadow-xl hover:bg-[#a3cdb3] transition"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
