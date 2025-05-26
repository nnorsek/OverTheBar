"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "./components/Card";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import TestamonialCard from "./components/TestamonialCard";

type Level = "Easy" | "Intermediate" | "Advanced" | "Expert";

const allPrograms = [
  {
    imageSrc: "/images/pullup3.jpg",
    alt: "Pull up",
    title: "Pull Ups for Beginners",
    description:
      "Learn how to start your pull-up journey with easy-to-follow progressions and tips.",
    buttonText: "Start Workout",
    level: "Expert",
  },
  {
    imageSrc: "/images/dips.webp",
    alt: "Dips",
    title: "Dips Made Easy",
    description:
      "Build upper body strength with simple, effective dip progressions for all levels.",
    buttonText: "Start Workout",
    level: "Intermediate",
  },
  {
    imageSrc: "/images/core.avif",
    alt: "Core",
    title: "Core Activation Basics",
    description:
      "Learn to engage your core the right way for calisthenics strength.",
    buttonText: "Start Workout",
    level: "Easy",
  },
  {
    imageSrc: "/images/pullup3.jpg",
    alt: "Pull up",
    title: "Pull Ups for Beginners",
    description:
      "Learn how to start your pull-up journey with easy-to-follow progressions and tips.",
    buttonText: "Start Workout",
    level: "Easy",
  },
  {
    imageSrc: "/images/dips.webp",
    alt: "Dips",
    title: "Dips Made Easy",
    description:
      "Build upper body strength with simple, effective dip progressions for all levels.",
    buttonText: "Start Workout",
    level: "Easy",
  },
  {
    imageSrc: "/images/core.avif",
    alt: "Core",
    title: "Core Activation Basics",
    description:
      "Learn to engage your core the right way for calisthenics strength.",
    buttonText: "Start Workout",
    level: "Advanced",
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
              href="/programs"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded text-xl shadow-lg transition-all duration-300"
            >
              Start Now
            </a>
          </div>
        </div>
      </div>
      <div className="bg-[#272727] pt-10">
        <h1 className="text-center text-5xl font-bold py-2">
          They did it. You can too.
        </h1>
        <p className="text-center p-5 text-2xl w-250 mx-auto leading-relaxed text-gray-200">
          Calisthenics workouts will influence every aspect of your life –
          relationships, business, family and health. Keep in mind that nothing
          comes easy. However, all of that hard work not only will pay off in
          having great physique, impressive bodyweight skills and superb body
          control but also and most importantly is gonna boost your
          self-confidence.
        </p>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestamonialCard
            review="I started working out after I saw Darek’s one year body transofmration video. Attached photos show my 1 year progress. Started when I was 16 years old at 59kg and got to 68kg (172cm). Never could have accomplished it without the help of Caliathletics program."
            src="/images/transformation1.jpeg"
            name="John Smith"
            rating={4.3}
          />
          <TestamonialCard
            review="I started working out after I saw Darek’s one year body transofmration video. Attached photos show my 1 year progress. Started when I was 16 years old at 59kg and got to 68kg (172cm). Never could have accomplished it without the help of Caliathletics program."
            src="/images/transformation2.jpeg"
            name="John Smith"
            rating={4.3}
          />
          <TestamonialCard
            review="I started working out after I saw Darek’s one year body transofmration video. Attached photos show my 1 year progress. Started when I was 16 years old at 59kg and got to 68kg (172cm). Never could have accomplished it without the help of Caliathletics program."
            src="/images/transformation3.jpeg"
            name="John Smith"
            rating={4.3}
          />
        </div>
        <h1 className="text-center text-5xl font-bold py-2">
          Looking for a Program?
        </h1>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPrograms.map((program, i) => (
            <Card
              key={i}
              {...program}
              index={i}
              level={program.level as Level}
            />
          ))}
        </div>
        <div ref={bottomRef} className="h-10" />
      </div>
      <div className="pt-10"></div>
    </div>
  );
}
