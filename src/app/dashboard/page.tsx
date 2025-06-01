"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import { getNextLevelInfo } from "../utils";

interface Program {
  id: string;
  title: string;
  description: string;
  level: string;
}

const suggestedPrograms: Program[] = [
  {
    id: "prog-1",
    title: "Beginner Full Body",
    description: "Start your journey with a full-body beginner program.",
    level: "Beginner",
  },
  {
    id: "prog-2",
    title: "Core Strength",
    description: "Focus on your core strength and stability.",
    level: "Intermediate",
  },
  {
    id: "prog-3",
    title: "Advanced Mobility",
    description: "Improve your flexibility and mobility.",
    level: "Advanced",
  },
];

const levelToNextPoints = (progression: number): number | null => {
  if (progression < 3) return 3 - progression;
  if (progression < 6) return 6 - progression;
  if (progression < 8) return 8 - progression;
  return null; // max level reached
};

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-black">
        Loading user data...
      </div>
    );
  }

  // Move nextLevelInfo call inside the component!
  const nextLevelInfo = getNextLevelInfo(user.progression);

  const pointsToNext = nextLevelInfo ? nextLevelInfo.pointsToNext : null;
  const nextLevel = nextLevelInfo ? nextLevelInfo.nextLevel : null;

  const progressPercent =
    pointsToNext !== null
      ? ((user.progression || 0) / ((user.progression || 0) + pointsToNext)) *
        100
      : 100;

  return (
    <main className="min-h-screen bg-[#121212] text-white p-8 font-sans">
      <section className="max-w-7xl mx-auto space-y-8">
        {/* Welcome */}
        <header>
          <h1 className="text-4xl font-extrabold mb-1">
            Welcome back,{" "}
            <span className="text-orange-500 drop-shadow-md">{user.name}</span>!
          </h1>
          <p className="text-lg text-gray-400">
            Keep pushing forward on your fitness journey 💪
          </p>
        </header>

        {/* Stats and Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Card */}
          <section className="bg-gray-900 rounded-xl shadow-lg p-5 flex flex-col justify-start space-y-4">
            <h2 className="text-2xl font-bold mb-2 border-b border-orange-600 pb-1">
              Your Stats
            </h2>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-300">
                Progression Level:
              </span>
              <span className="text-orange-500 font-bold text-lg">
                {user.progression || 0}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-gray-300">
                  Points to Next Level:
                </span>
                <span className="text-orange-500 font-bold text-lg">
                  {pointsToNext !== null ? pointsToNext : "Max Level"}
                </span>
              </div>

              {/* Next Level Text */}
              <div className="mb-1 text-orange-400 font-semibold text-sm">
                {nextLevel
                  ? `Next Level: ${nextLevel}`
                  : "You have reached the maximum progression level!"}
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="h-4 bg-green-500 rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-300">
                Programs Completed:
              </span>
              <span className="text-orange-500 font-bold text-lg">5</span>
            </div>
          </section>

          {/* Suggested Programs */}
          <section className="md:col-span-2 bg-gray-900 rounded-xl shadow-lg p-6 space-y-5">
            <h2 className="text-2xl font-bold mb-4 border-b border-orange-600 pb-1">
              Programs You Might Like
            </h2>
            <ul className="space-y-4">
              {suggestedPrograms.map((program) => (
                <li
                  key={program.id}
                  className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-orange-500 transition-shadow cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-1 text-orange-400">
                    {program.title}
                  </h3>
                  <p className="text-gray-400 mb-2">{program.description}</p>
                  <span className="inline-block bg-orange-500 text-black font-bold px-3 py-1 rounded-full text-sm select-none">
                    {program.level}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
