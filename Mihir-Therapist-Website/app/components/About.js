'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const useInView = () => {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const About = () => {
  const { ref, isVisible } = useInView();

  return (
    <section id="about" className="bg-white py-24">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center lg:items-start gap-16 transition-opacity duration-1000 ease-in-out ${
          isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
        }`}
      >
        {/* TEXT */}
        <div className="w-full lg:w-3/5 text-left">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#2e2e2e] mb-2">
            About Dr. Serena Blake
          </h2>
          <div className="h-1 w-20 bg-[#bfd8c2] rounded-full mb-6"></div>
          <div className="space-y-6 text-base text-[#5f5f5f] leading-7 font-sans">
            <p>
              Dr. Serena Blake is a licensed clinical psychologist (PsyD) based in Los Angeles, CA,
              with eight years of experience and over 500 client sessions. She blends
              evidence-based approaches—like cognitive-behavioral therapy and mindfulness—with
              compassionate, personalized care to help you overcome anxiety, strengthen
              relationships, and heal from trauma.
            </p>
            <p>
              Whether you meet in her Maplewood Drive office or connect virtually via Zoom,
              Dr. Blake is committed to creating a safe, supportive space for you to thrive.
            </p>
          </div>
        </div>

        {/* IMAGE */}
        <div className="w-full lg:w-2/5 flex justify-center">
          <div className="bg-white p-1 shadow-2xl rounded-xl max-w-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_#bfd8c2]">
            <Image
              src="/images/doctor_serena.jpeg"
              alt="Dr. Serena Blake"
              width={480}
              height={600}
              className="rounded-lg object-cover w-full h-auto"
              quality={85}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
