"use client";

import React from "react";
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
import {
  getNextLevelInfo,
  getProgressionLabel,
  levelColor,
} from "../utils/utils";
import { capitalizeFirstLetter } from "../utils/string";

interface Program {
  _id: string;
  slug: string;
  title: string;
  description: string;
  level: "Unknown" | "Beginner" | "Intermediate" | "Advanced" | "Expert";
  images: { imgSrc: string; alt: string }[];
}

interface DashboardProps {
  programs: Program[];
  progressData: { month: string; points: number }[];
  progression: number;
}

function getRandomPrograms(programs: Program[], count: number): Program[] {
  const shuffled = [...programs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const Dashboard = ({ programs, progressData, progression }: DashboardProps) => {
  const nextLevelInfo = getNextLevelInfo(progression);
  const pointsToNext = nextLevelInfo?.pointsToNext ?? 0;
  const nextLevel = nextLevelInfo?.nextLevel ?? "";

  const progressPercent =
    pointsToNext !== 0
      ? (progression / (progression + pointsToNext)) * 100
      : 100;

  return (
    <section className="max-w-7xl mx-auto space-y-10 relative z-10">
      <header>
        <h1 className="text-4xl font-extrabold text-white mb-2 text-center pt-10">
          Your Progression Overview
        </h1>
      </header>

      {/* Cards Section */}
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

      {/* Line Chart */}
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

      {/* Suggested Programs */}
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
  );
};

export default Dashboard;
