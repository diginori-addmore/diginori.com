"use client";
import type { Metadata } from "next";
import AboutSection from "./AboutSection";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const plusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Animate title on load
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    // Animate '+' on scroll
    gsap.fromTo(plusRef.current, 
      { opacity: 0, x: 200, y: -20, scale: 3 },
      {
        opacity: 1, x: 0, y: 0, scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        }
      }
    );
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-black">
      <div className="max-w-5xl w-full">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-8xl font-bold text-white">
            <span ref={titleRef} className="inline-block">디지노리</span>
            <sup ref={plusRef} className="text-4xl md:text-6xl text-yellow-300 opacity-0 inline-block ml-2">+</sup>
          </h1>
        </header>

        <nav className="flex w-full mb-12 sticky top-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm">
          <a
            href="#about"
            className="flex-1 text-center font-bold text-2xl md:text-3xl text-white py-2 transition-all duration-300 hover:bg-white hover:text-black"
          >
            About
          </a>
          <a
            href="#history"
            className="flex-1 text-center font-bold text-2xl md:text-3xl text-white py-2 transition-all duration-300 hover:bg-white hover:text-black"
          >
            History
          </a>
          <a
            href="#location"
            className="flex-1 text-center font-bold text-2xl md:text-3xl text-white py-2 transition-all duration-300 hover:bg-white hover:text-black"
          >
            Location
          </a>
        </nav>

        <hr className="border-gray-700"></hr>

        <div className="space-y-10 text-lg text-gray-300 leading-relaxed">
          <AboutSection />
        </div>
      </div>
    </main>
  );
}
