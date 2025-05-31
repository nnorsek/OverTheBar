"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

interface Section {
  label: string;
  time: number;
}

interface ProgramProps {
  title: string;
  description: string;
  videoSrc: string;
  level: string;
  sections: Section[];
}

const levelToPoints = (level: string): number => {
  switch (level.toLowerCase()) {
    case "beginner":
      return 1;
    case "intermediate":
      return 2;
    case "advanced":
      return 3;
    case "expert":
      return 4;
    default:
      return 0;
  }
};

const Program: React.FC<ProgramProps> = ({
  title,
  description,
  videoSrc,
  level,
  sections,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [completed, setCompleted] = useState<boolean[]>(
    new Array(sections.length).fill(false)
  );
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const { user, setUser } = useAuth();

  const allCompleted = completed.every(Boolean);
  const levelPoints = levelToPoints(level);

  useEffect(() => {
    const finishedKey = `finished_${title}`;
    const hasFinished = localStorage.getItem(finishedKey) === "true";
    if (hasFinished) setIsFinished(true);
  }, [title]);

  const seekTo = (seconds: number) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: "seekTo",
        args: [seconds, true],
      }),
      "*"
    );
  };

  const toggleCompleted = (index: number) => {
    setCompleted((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleFinish = () => {
    if (!user || isFinished) return;

    const newProgression = (user.progression || 0) + levelPoints;
    setUser({ ...user, progression: newProgression });
    localStorage.setItem(`finished_${title}`, "true");
    setIsFinished(true);
    alert(`You've earned ${levelPoints} point(s)!`);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white underline"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg mb-2">{description}</p>
          <p className="text-sm text-gray-400 mb-6 uppercase">Level: {level}</p>

          <p className="text-yellow-400 mb-6">
            ✅ Complete all sections below to earn{" "}
            <strong>
              {levelPoints} progression point
              {levelPoints > 1 ? "s" : ""}
            </strong>{" "}
            toward your fitness journey!
          </p>

          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              ref={iframeRef}
              src={`${videoSrc}?enablejsapi=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-[#1f1f1f] rounded-lg p-6 shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Program Sections</h2>

          <ul className="space-y-4">
            {sections.map((section, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <button
                  onClick={() => seekTo(section.time)}
                  className="hover:underline text-left flex-1"
                >
                  {section.label}
                </button>
                <input
                  type="checkbox"
                  checked={completed[index]}
                  onChange={() => toggleCompleted(index)}
                  className="ml-3"
                />
              </li>
            ))}
          </ul>

          <button
            disabled={!allCompleted || isFinished}
            onClick={handleFinish}
            className={`mt-6 w-full py-2 rounded font-semibold transition ${
              allCompleted && !isFinished
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {isFinished ? "✅ Completed" : "Finish Program"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Program;
