'use client';

import React, { useEffect, useRef, useState } from 'react';

const useInView = () => {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

export default function Fees() {
  const { ref, isVisible } = useInView();

  return (
    <section
      ref={ref}
      className={`w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f3eb] transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-12 transition-transform duration-300 hover:scale-[1.01] hover:shadow-[#bfd8c2]/40">
        <h2 className="text-center text-3xl sm:text-4xl font-serif font-bold text-[#153d28] mb-6">
          Rates and Insurance
        </h2>

        <div className="flex flex-col gap-6 text-[#153d28] font-serif text-lg tracking-wide">
          <div className="flex justify-between px-4">
            <span className="hover:text-[#87a397] transition">Individual Session</span>
            <span className="font-semibold">$200</span>
          </div>
          <div className="flex justify-between px-4">
            <span className="hover:text-[#87a397] transition">Couples Session</span>
            <span className="font-semibold">$240</span>
          </div>

          <p className="px-4 mt-4 text-[#3f5047]">
            I accept both private pay and insurance. I am in-network with{' '}
            <strong className="text-[#153d28]">BCBS</strong> and{' '}
            <strong className="text-[#153d28]">Aetna</strong>.
          </p>

          <p className="px-4 text-[#3f5047]">
            For out-of-network plans, I’ve partnered with Mentaya using{' '}
            <a
              href="https://app.mentaya.com/public/practices/zGs5AgWuQhDtekoxCW7M/eligibility?p=qiXNacRErRNrk7OjP7lg"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-700 hover:text-blue-900 transition"
            >
              this tool
            </a>{' '}
            to help you check your eligibility for reimbursement for my services.
          </p>
        </div>
      </div>
    </section>
  );
}
