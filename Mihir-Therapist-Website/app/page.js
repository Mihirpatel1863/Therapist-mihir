'use client';

import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Fees from './components/Fees';
import Question from './components/Question';
import ContactForm from './components/Contact';

const Home = () => {
  return (
    <main className="flex flex-col gap-y-14 items-center overflow-x-hidden bg-[#f7f4ed]">
      <Hero />

      <section className="w-full bg-white px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="mx-auto max-w-7xl">
          <About />
        </div>
      </section>

      <section className="w-full bg-[#f5f3eb] py-16 px-4 sm:px-6 lg:px-8 animate-slide-in-left">
        <div className="mx-auto max-w-7xl">
          <Services />
        </div>
      </section>

      <section className="w-full bg-[#e8e4d9] py-16 px-4 sm:px-6 lg:px-8 animate-slide-in-right">
        <div className="mx-auto max-w-7xl">
          <Fees />
        </div>
      </section>

      <section className="w-full bg-[#f5f3eb] py-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="mx-auto max-w-7xl">
          <Question />
        </div>
      </section>

      <section className="w-full bg-[#e8e4d9] py-16 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="mx-auto max-w-7xl">
          <ContactForm />
        </div>
      </section>
    </main>
  );
};

export default Home;