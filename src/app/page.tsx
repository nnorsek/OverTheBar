"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "./components/Card";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

const allPrograms = [
  {
    imageSrc: "/images/pullup3.jpg",
    alt: "Pull up",
    title: "Pull Ups for Beginners",
    description:
      "Learn how to start your pull-up journey with easy-to-follow progressions and tips.",
    buttonText: "Start Workout",
  },
  {
    imageSrc: "/images/dips.webp",
    alt: "Dips",
    title: "Dips Made Easy",
    description:
      "Build upper body strength with simple, effective dip progressions for all levels.",
    buttonText: "Start Workout",
  },
  {
    imageSrc: "/images/core.avif",
    alt: "Core",
    title: "Core Activation Basics",
    description:
      "Learn to engage your core the right way for calisthenics strength.",
    buttonText: "Start Workout",
  },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [elevateVisible, setElevateVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setElevateVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, allPrograms.length));
  };

  const bottomRef = useInfiniteScroll(loadMore);

  return (
    <div className="text-white overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative h-screen">
        <Image
          className="absolute inset-0 object-cover z-[-2]"
          src="/images/handstand.avif"
          alt="background-image"
          fill
        />
        <div className="absolute inset-0 bg-black/50 z-[-1]" />
        <div className="pl-15 pt-40 pb-2">
          <h1 className="text-8xl font-bold font-myfont">Master Your Body</h1>
          <h1 className="pt-8 text-8xl font-bold font-myfont">
            Elevate Your Skills
          </h1>
          <p className="pt-5 pl-2 text-gray-200 font-bold text-xl">
            Turn your vision into reality...
          </p>
          <div className="pt-7 pl-2">
            <a
              href="/programs"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded text-xl shadow-lg transition-all duration-300"
            >
              Start Now
            </a>
          </div>
        </div>
      </div>

      <div className="bg-black-1/4 pt-10">
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPrograms.slice(0, visibleCount).map((program, i) => (
            <Card key={i} {...program} />
          ))}
        </div>
        <div ref={bottomRef} className="h-10" />
      </div>
    </div>
  );
}
