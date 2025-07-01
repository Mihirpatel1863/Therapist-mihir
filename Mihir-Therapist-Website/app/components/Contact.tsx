'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/common/Button';
import { PhoneCall, Mail, CheckCircle2 } from 'lucide-react';

// Scroll-based fade-in hook
const useInView = () => {
  const ref = useRef<HTMLDivElement | null>(null);
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

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', reason: '', time: '', agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const { ref, isVisible } = useInView();

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!/^\d{10}$/.test(formData.phone)) errs.phone = 'Phone number must be exactly 10 digits';
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.reason.trim()) errs.reason = 'Please tell us why you are coming';
    if (!formData.agree) errs.agree = 'You must agree to be contacted';
    // Optional:
    // if (!formData.time.trim()) errs.time = 'Preferred contact time is required';

    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', reason: '', time: '', agree: false });

    // Optional: clear success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className={`w-full bg-gradient-to-b from-[#f8f9f7] to-white py-20 px-6 sm:px-8 lg:px-16 transform transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Contact Info */}
        <div className="space-y-8 text-[#153d28] font-serif">
          <h3 className="text-4xl font-bold tracking-tight">Dr. Serena Blake, PsyD</h3>
          <p className="text-lg italic text-[#5a6e62]">Clinical Psychologist</p>

          <div className="space-y-1">
            <h4 className="font-semibold text-xl">Location</h4>
            <p className="text-[#4d5e53]">1287 Maplewood Drive, Los Angeles, CA 90026</p>
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-xl">Contact</h4>
            <div className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-[#153d28]" />
              <a href="tel:3235550192" className="underline hover:text-[#87a397] transition">
                (323) 555-0192
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#153d28]" />
              <a href="mailto:serena@blakepsychology.com" className="underline hover:text-[#87a397] transition">
                serena@blakepsychology.com
              </a>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-xl">Office Hours</h4>
            <p className="text-[#4d5e53]">In-person: Tue & Thu, 10 AM–6 PM</p>
            <p className="text-[#4d5e53]">Virtual via Zoom: Mon, Wed & Fri, 1 PM–5 PM</p>
          </div>

          <div>
            <h4 className="font-semibold text-xl">Experience</h4>
            <p className="text-[#4d5e53]">8 years of practice, 500+ sessions</p>
          </div>

          <div className="pt-4 space-y-2 text-[#153d28] font-serif text-sm">
            <a href="#home" className="block underline hover:text-[#87a397] transition">Home</a>
            <a href="https://www.drjenniferhahm.com/privacy-policy" target="_blank" className="block underline hover:text-[#87a397] transition">Privacy Policy</a>
            <a href="https://www.drjenniferhahm.com/good-faith-estimate" target="_blank" className="block underline hover:text-[#87a397] transition">Good Faith Estimate</a>
            <a href="https://drjenniferhahm.sessionshealth.com/" target="_blank" className="block underline hover:text-[#87a397] transition">Client Portal</a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="border border-[#153d28] rounded-2xl shadow-2xl bg-white p-8 sm:p-12 transition-transform duration-300 hover:shadow-green-200 hover:scale-[1.015]">
          <h2 className="text-4xl sm:text-5xl text-[#153d28] font-serif font-bold text-center mb-6">Get In Touch</h2>
          <p className="text-center text-[#3f5047] font-serif text-lg mb-10">
            Fill out the brief fields below. This form is private, secure, and free.
          </p>

          {submitted && (
            <div className="flex items-center bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-4" role="alert">
              <CheckCircle2 className="mr-2" />
              <span>Your message was submitted successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {['name', 'email', 'phone', 'time'].map((field) => (
              <div key={field} className="transition-all">
                <label htmlFor={field} className="block text-[#153d28] font-serif mb-1 capitalize">
                  {field === 'time' ? 'Preferred Contact Time' : field}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  id={field}
                  placeholder={
                    field === 'name' ? 'Your Name' :
                    field === 'email' ? 'you@example.com' :
                    field === 'phone' ? '5552345678' :
                    'e.g., Mornings, Evenings'
                  }
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  className="w-full border border-[#153d28] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#153d28] bg-white hover:border-green-400 transition"
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}

            <div>
              <label htmlFor="reason" className="block text-[#153d28] font-serif mb-1">Message</label>
              <textarea
                id="reason"
                name="reason"
                rows={4}
                placeholder="How can I help you?"
                value={formData.reason}
                onChange={handleChange}
                className="w-full border border-[#153d28] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#153d28] bg-white hover:border-green-400 transition"
              />
              {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={formData.agree}
                onChange={handleChange}
                className="h-4 w-4 text-[#153d28] border-gray-300 rounded focus:ring-[#153d28]"
              />
              <label htmlFor="agree" className="text-[#153d28]">I agree to be contacted</label>
            </div>
            {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

            <Button type="submit" disabled={!formData.agree} className="w-full bg-[#153d28] text-white font-serif hover:bg-[#0f2d1f] transition-all duration-200 rounded-lg shadow-lg">
              Submit
            </Button>

            <p className="text-sm text-[#153d28] text-center mt-4 font-serif">
              By clicking submit you consent to receive texts and emails from Dr. Serena Blake
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
