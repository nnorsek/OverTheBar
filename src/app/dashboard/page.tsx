"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getNextLevelInfo,
  getProgressionLabel,
  levelColor,
  mapLevel,
} from "../utils/level";
import { capitalizeFirstLetter } from "../utils/string";
import Link from "next/link";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { fetchAllPrograms } from "../utils/api";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Card from "../components/Card";

interface Program {
  _id: string;
  slug: string;
  title: string;
  description: string;
  level: "Unknown" | "Beginner" | "Intermediate" | "Advanced" | "Expert";
  images: { imgSrc: string; alt: string }[];
}

function getRandomPrograms(programs: Program[], count: number): Program[] {
  if (!Array.isArray(programs)) return [];
  const shuffled = [...programs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const progressData = [
  { month: "Jan 2024", points: 100 },
  { month: "Feb 2024", points: 150 },
  { month: "Mar 2024", points: 250 },
  { month: "Apr 2024", points: 400 },
  { month: "May 2024", points: 700 },
  { month: "Jun 2024", points: 1250 },
];

const DashboardPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [elevateVisible, setElevateVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [programs, setPrograms] = useState<Program[]>([]);
  const { user } = useAuth();

  const progression = user?.progression || 0;
  const nextLevelInfo = getNextLevelInfo(progression);
  const pointsToNext = nextLevelInfo?.pointsToNext ?? 0;
  const nextLevel = nextLevelInfo?.nextLevel ?? "";

  const progressPercent =
    pointsToNext !== 0
      ? (progression / (progression + pointsToNext)) * 100
      : 100;

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await fetchAllPrograms();
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
    <main className="relative text-white p-6">
      {!user && (
        <>
          <div className="absolute inset-0 backdrop-blur-md bg-black/40 z-20" />
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <div className="bg-[#1a1a1a] border border-orange-500 p-10 rounded-xl shadow-lg text-center max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-orange-400 mb-4">
                Sign in required
              </h2>
              <p className="text-gray-300 mb-6">
                Please sign in to view your personalized dashboard and track
                your progress.
              </p>
              <a
                href="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded text-lg shadow transition duration-300"
              >
                Start Now
              </a>
            </div>
          </div>
        </>
      )}

      <section className="max-w-7xl mx-auto space-y-10 relative z-10">
        <header>
          <h1 className="text-4xl font-extrabold text-white mb-2 text-center pt-10">
            Your Progression Overview
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md text-center">
            <div className="text-gray-300">Progression Points:</div>
            <div className="text-4xl font-bold text-white">{progression}</div>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md text-center">
            <div className="text-gray-300">Progression Level:</div>
            <div className="text-4xl font-bold text-white">
              {getProgressionLabel(progression)}
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md text-center">
            <div className="text-gray-300">Progress to Next Level:</div>
            <div className="relative w-full h-4 bg-gray-700 rounded-full mt-2">
              <div
                className="absolute h-4 bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {pointsToNext} {pointsToNext === 1 ? "point" : "points"} to{" "}
              {nextLevel} Level
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Progression Over Time
          </h2>
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ fill: "#f97316" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Programs You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getRandomPrograms(programs, 3).map((program) => (
              <Link
                key={program.title}
                href={`/programs/${program.slug}`}
                className="bg-[#1a1a1a] p-5 rounded-xl shadow-md hover:shadow-orange-500 transition-shadow hover:cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-400 mb-3">{program.description}</p>
                </div>
                <span
                  className={`inline-block w-32 text-center ${levelColor(
                    program.level
                  )} text-black font-bold px-3 py-1 rounded-full text-sm mt-4`}
                >
                  {capitalizeFirstLetter(program.level)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="p-6 sm:p-8 md:p-10 lg:p-14 xl:p-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
          {programs.slice(0, visibleCount).map((program, index) => (
            <Card
              key={program._id ?? program.slug ?? index}
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
      </section>
    </main>
  );
};

export default DashboardPage;
