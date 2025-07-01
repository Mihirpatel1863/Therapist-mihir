'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/sections/FAQ/Accordion';

const Question = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const faq = [
    {
      value: 'ques-1',
      question: 'Do you accept insurance?',
      answer: 'No, but a superbill is provided for self-submission.',
    },
    {
      value: 'ques-2',
      question: 'Are online sessions available?',
      answer: 'Yes—all virtual sessions via Zoom.',
    },
    {
      value: 'ques-3',
      question: 'What is your cancellation policy?',
      answer: '24-hour notice required.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`flex flex-col items-center px-4 py-20 bg-[#f5f3eb] transition-all duration-1000 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      id="faq"
    >
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-center text-[#1d2a2e] mb-10 tracking-tight">
        Frequently Asked Questions
      </h1>

      <div className="w-full mt-4 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-5">
          {faq.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="group border border-[#bfd8c2] rounded-2xl bg-white overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold font-serif text-[#153d28] group-hover:text-[#0f2d1f] transition-colors duration-200">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-base font-serif text-gray-700 leading-relaxed transition-all duration-300 ease-in-out">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Question;
