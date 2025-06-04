"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import { getNextLevelInfo, getProgressionLabel } from "../utils";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

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

const progressData = [
  { month: "Jan 2024", points: 100 },
  { month: "Feb 2024", points: 150 },
  { month: "Mar 2024", points: 250 },
  { month: "Apr 2024", points: 400 },
  { month: "May 2024", points: 700 },
  { month: "Jun 2024", points: 1250 },
];

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-800">
        Loading user data...
      </div>
    );
  }

  const nextLevelInfo = getNextLevelInfo(user.progression);
  const pointsToNext = nextLevelInfo ? nextLevelInfo.pointsToNext : 0;
  const nextLevel = nextLevelInfo ? nextLevelInfo.nextLevel : null;

  const progressPercent =
    pointsToNext !== null
      ? ((user.progression || 0) / ((user.progression || 0) + pointsToNext)) *
        100
      : 100;

  return (
    <main className=" text-white p-6">
      <section className="max-w-7xl mx-auto space-y-10">
        <header>
          <h1 className="text-4xl font-bold text-orange-500 mb-2 text-center pt-10">
            Your Progression Overview
          </h1>
        </header>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md text-center">
            <div className="text-gray-300">Progression Points:</div>
            <div className="text-4xl font-bold text-orange-500">
              {user.progression}
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md text-center">
            <div className="text-gray-300">Progression Level:</div>
            <div className="text-4xl font-bold text-orange-500">
              {getProgressionLabel(user.progression)}
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md text-center">
            <div className="text-gray-300">Progress to Next Level:</div>
            <div className="relative w-full h-4 bg-gray-700 rounded-full mt-2">
              <div
                className="absolute h-4 bg-orange-500 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {pointsToNext} {pointsToNext < 2 ? "point" : "points"} to{" "}
              {nextLevel} Level
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-4">
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
          <h2 className="text-2xl font-bold text-orange-500 mb-4">
            Programs You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-[#1a1a1a] p-5 rounded-xl shadow-md hover:shadow-orange-500 transition-shadow"
              >
                <h3 className="text-xl font-semibold text-orange-400 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-400 mb-3">{program.description}</p>
                <span className="inline-block bg-orange-500 text-black font-bold px-3 py-1 rounded-full text-sm">
                  {program.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
