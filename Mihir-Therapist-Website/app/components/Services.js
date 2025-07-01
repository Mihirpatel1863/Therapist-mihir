'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const cardData = [
  {
    title: 'Anxiety & Stress Management',
    imgSrc: 'https://hopeandgrowthcenter.com/cdn/shop/articles/AdobeStock_408977856_837cb924-f9d3-47d2-b400-999d3d466b60.jpg?v=1719235865&width=1100',
    description: `Support for chronic stress, overwhelm, or panic. Together we’ll build tools to manage anxiety, regulate your nervous system, and create more peace in your daily life.`,
  },
  {
    title: 'Relationship Counseling',
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9eTNCcsiT36znWHuS4f1Luel2SoSf7xBSzg&s',
    description: `Whether you're navigating conflict, communication challenges, or feeling disconnected—therapy can help strengthen emotional bonds and create more fulfilling relationships.`,
  },
  {
    title: 'Trauma Recovery',
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5RKVWaal9ntfKCNx4EKYo43xR027HDDK8Xw&s',
    description: `Processing trauma takes time and care. In our work, we’ll focus on creating a safe space to rebuild trust, reduce triggers, and support your healing journey.`,
  },
];

export default function Services() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="service"
      className={`bg-gradient-to-b from-[#f5f3eb] to-[#f7f4ed] py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#153d28] mb-4 tracking-tight">
            Services & Specialties
          </h2>
          <div className="h-1 w-20 bg-[#b2c8bb] rounded-full mx-auto mb-12"></div>
        </div>

        <div className="grid gap-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center space-y-6 bg-white p-6 rounded-3xl shadow-lg border border-[#e4e1d9] transform transition duration-300 hover:scale-[1.03] hover:shadow-xl hover:border-[#bfd8c2]"
            >
              <div className="w-56 h-56 relative transition-transform duration-300 group-hover:scale-105">
                {card.imgSrc ? (
                  <Image
                    src={card.imgSrc}
                    alt={card.title}
                    fill
                    className="rounded-full object-cover border-[5px] border-[#153d28] shadow-md"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}
              </div>

              <h3 className="font-serif text-xl text-[#153d28] font-semibold transition-colors group-hover:text-[#0f2d1f]">
                {card.title}
              </h3>
              <p className="text-base text-[#3d3d3d] font-light leading-relaxed px-2 group-hover:text-[#1a1a1a] transition-colors">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
