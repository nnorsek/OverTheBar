"use client";

import React, { useEffect, useRef, useState } from "react";
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

  // Load finished state from localStorage
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

    // Save finished state in localStorage
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
    <div className="flex p-10 text-white bg-[#1f1f1f] min-h-screen gap-10">
      {/* Left Side */}
      <div className="flex flex-col flex-grow max-w-4xl">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-4">{description}</p>
        <div className="mt-4 text-sm text-gray-300 uppercase">
          Level: {level}
        </div>
        <div className="mt-6 relative w-full aspect-video">
          <iframe
            ref={iframeRef}
            src={`${videoSrc}?enablejsapi=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 border-l border-gray-700 pl-6">
        <h2 className="text-xl font-semibold mb-4">Sections</h2>
        <ul className="space-y-4">
          {sections.map((section, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer"
            >
              <button
                onClick={() => seekTo(section.time)}
                className="text-left hover:underline"
              >
                {section.label}
              </button>
              <input
                type="checkbox"
                checked={completed[index]}
                onChange={() => toggleCompleted(index)}
                className="ml-2"
              />
            </li>
          ))}
        </ul>

        <button
          disabled={!allCompleted || isFinished}
          onClick={handleFinish}
          className={`mt-6 w-full py-2 rounded text-white font-semibold transition ${
            allCompleted && !isFinished
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {isFinished ? "Completed" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default Program;
