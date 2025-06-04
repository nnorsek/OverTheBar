"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "./components/Card";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import TestamonialCard from "./components/TestamonialCard";
import DashboardPage from "./components/Dashboard";

type Program = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  level: "Easy" | "Intermediate" | "Advanced" | "Expert";
  images: { imgSrc: string; alt: string }[];
};

type Level = "Easy" | "Intermediate" | "Advanced" | "Expert";

const mapLevel = (level: string): Level => {
  const formatted =
    level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
  const levels: Level[] = ["Easy", "Intermediate", "Advanced", "Expert"];
  return levels.includes(formatted as Level) ? (formatted as Level) : "Easy";
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [elevateVisible, setElevateVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/program/all");
        const data = await res.json();
        setPrograms(data);
      } catch (err) {
        console.error("Failed to fetch programs", err);
      }
    };

    fetchPrograms();

    setIsVisible(true);
    const timer = setTimeout(() => setElevateVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, programs.length));
  };

  const bottomRef = useInfiniteScroll(loadMore);

  return (
    <div className="text-white overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative min-h-screen">
        <Image
          className="absolute inset-0 object-cover z-[-2]"
          src="/images/handstand.avif"
          alt="background-image"
          fill
        />
        <div className="absolute inset-0 bg-[black]/50 z-[-1]" />
        <div className="relative px-6 pt-40 pb-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold font-myfont">
            Master Your Body
          </h1>
          <h1 className="pt-6 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold font-myfont">
            Elevate Your Skills
          </h1>
          <p className="pt-6 text-gray-200 font-bold text-lg sm:text-xl">
            Turn your vision into reality...
          </p>
          <div className="pt-7">
            <a
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded text-xl shadow-lg transition-all duration-300"
            >
              Start Now
            </a>
          </div>
        </div>
      </div>

      <div
        className="relative bg-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/images/blob-scene-haikei.svg')" }}
      >
        <DashboardPage />

        {/* Testimonials */}
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold pt-16 sm:pt-20">
          They did it. You can too.
        </h1>
        <p className="text-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 2xl:px-80 text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-200 max-w-screen-xl mx-auto pt-6">
          Calisthenics workouts will influence every aspect of your life –
          relationships, business, family and health. Keep in mind that nothing
          comes easy. However, all of that hard work not only will pay off in
          having great physique, impressive bodyweight skills and superb body
          control but also and most importantly is gonna boost your
          self-confidence.
        </p>

        <div className="p-6 sm:p-8 md:p-10 lg:p-14 xl:p-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
          <TestamonialCard
            review="I started working out after I saw Darek’s one year body transformation video..."
            src="/images/transformation1.jpeg"
            name="John Smith"
            rating={4.3}
          />
          <TestamonialCard
            review="Attached photos show my 1 year progress. Started when I was 16 years old at 59kg..."
            src="/images/transformation2.jpeg"
            name="John Smith"
            rating={4.3}
          />
          <TestamonialCard
            review="Never could have accomplished it without the help of Caliathletics program."
            src="/images/transformation3.jpeg"
            name="John Smith"
            rating={4.3}
          />
        </div>

        {/* Programs */}
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pt-12">
          Looking for a Program?
        </h1>

        <div className="p-6 sm:p-8 md:p-10 lg:p-14 xl:p-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
          {programs.slice(0, visibleCount).map((program, index) => (
            <Card
              key={program._id}
              slug={program.slug}
              imageSrc={
                Array.isArray(program.images) && program.images.length > 0
                  ? program.images[0].imgSrc
                  : "/images/default.webp"
              }
              alt={
                Array.isArray(program.images) && program.images.length > 0
                  ? program.images[0].alt
                  : "Program image"
              }
              title={program.title}
              description={program.description}
              buttonText="View Program"
              index={index}
              level={mapLevel(program.level)}
            />
          ))}
        </div>
        <div ref={bottomRef} className="h-10" />
      </div>
    </div>
  );
}
