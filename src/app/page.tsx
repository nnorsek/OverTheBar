"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [elevateVisible, setElevateVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Delay showing the second text by 1 second (1000 ms)
    const timer = setTimeout(() => setElevateVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-white overflow-hidden">
      <div className="relative h-screen">
        <Image
          className="absolute inset-0 w-full h-full object-cover z-[-2]"
          src="/images/pullup.webp"
          alt="background-image"
          fill
        />
        <div className="absolute inset-0 bg-black/50 z-[-1]" />

        <div className="p-10 pt-40">
          <h1
            className="text-7xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.5s ease-out",
              WebkitClipPath: isVisible
                ? "inset(0 0 0 0)"
                : "inset(0 50% 0 50%)",
              clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 50% 0 50%)",
              transitionProperty: "opacity, clip-path",
              transitionDuration: "0.5s",
              transitionTimingFunction: "ease-out",
            }}
          >
            Master Your Body.
          </h1>
        </div>
        <div className="pt-2 ml-30">
          <div className="overflow-hidden">
            <h1
              className="text-7xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{
                opacity: elevateVisible ? 1 : 0,
                transition: "opacity 0.5s ease-out",
                WebkitClipPath: elevateVisible
                  ? "inset(0 0 0 0)"
                  : "inset(0 50% 0 50%)",
                clipPath: elevateVisible
                  ? "inset(0 0 0 0)"
                  : "inset(0 50% 0 50%)",
                transitionProperty: "opacity, clip-path",
                transitionDuration: "0.5s",
                transitionTimingFunction: "ease-out",
              }}
            >
              Elevate Your Skills.
            </h1>
          </div>
          <div className="mt-12">
            <a
              href="/programs"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300"
            >
              Start Now
            </a>
          </div>
        </div>
      </div>

      <div className="p-10 bg-zinc-900">
        <h2 className="text-4xl font-semibold mb-4">Why Train With Us?</h2>
        <p className="text-lg text-gray-300">
          Our programs are designed to help you progress step-by-step, whether
          you're a beginner or an advanced athlete.
        </p>
      </div>
    </div>
  );
}
