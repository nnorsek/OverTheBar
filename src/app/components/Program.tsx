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
  switch (level) {
    case "Beginner":
      return 1;
    case "Intermediate":
      return 2;
    case "Advanced":
      return 3;
    case "Expert":
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

  // Fetch program completion status from backend
  useEffect(() => {
    if (!user) return;

    const checkIfFinished = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/users/program-status`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              programTitle: title,
            }),
          }
        );

        if (!res.ok) throw new Error("Failed to fetch program status");

        const { finished } = await res.json();
        setIsFinished(finished);
      } catch (error) {
        console.error("Error checking program status:", error);
      }
    };

    checkIfFinished();
  }, [title, user]);

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

  const handleFinish = async () => {
    if (!user || isFinished) return;

    const newProgression = (user.progression || 0) + levelPoints;

    try {
      // First update progression and add completed program on backend
      const res = await fetch(`http://localhost:8080/api/users/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          progression: newProgression,
          // Remove completedProgram from this call if your backend doesn't support it here
        }),
      });

      if (!res.ok) throw new Error("Failed to update progression");

      // Now call complete-program endpoint to add program title to user's completedPrograms
      const completeRes = await fetch(
        `http://localhost:8080/api/users/complete-program`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            programTitle: title,
          }),
        }
      );

      if (!completeRes.ok) throw new Error("Failed to mark program complete");

      // Get updated user after both calls
      const updatedUser = await completeRes.json();

      setUser(updatedUser);
      setIsFinished(true);

      alert(`You've earned ${levelPoints} point${levelPoints > 1 ? "s" : ""}!`);
    } catch (error) {
      console.error("Error updating progression or completing program:", error);
      alert("Something went wrong saving your progress.");
    }
  };

  return (
    <div className="min-h-screen bg-[url('/pattern.svg')] bg-cover text-white p-8 font-sans">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-sm text-gray-300 hover:text-white underline"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-300 mb-2">{description}</p>
          <p className="text-sm text-purple-300 mb-6 uppercase tracking-widest">
            LEVEL: {level}
          </p>

          <div className="bg-black/60 text-yellow-400 p-4 rounded shadow-inner mb-6 border border-yellow-500">
            ✅ Complete all the sections below to unlock{" "}
            <strong>
              {levelPoints} progression point{levelPoints > 1 ? "s" : ""}
            </strong>{" "}
            and advance your journey!
          </div>

          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xl border border-gray-700">
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
        <div className="bg-black/60 rounded-xl p-6 shadow-lg border border-gray-700 space-y-6">
          <h2 className="text-2xl font-bold text-white">Program Sections</h2>

          <ul className="space-y-3">
            {sections.map((section, index) => (
              <li key={index} className="flex justify-between items-center">
                <button
                  onClick={() => seekTo(section.time)}
                  className="text-left text-white hover:underline w-full"
                >
                  {section.label}
                </button>
                <button
                  onClick={() => toggleCompleted(index)}
                  disabled={isFinished}
                  className={`ml-4 px-3 py-1 rounded-full text-sm font-bold transition ${
                    completed[index]
                      ? "bg-green-600 text-white"
                      : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                  }`}
                >
                  {completed[index] ? "✓" : "✓"}
                </button>
              </li>
            ))}
          </ul>

          <button
            disabled={!allCompleted || isFinished}
            onClick={handleFinish}
            className={`w-full py-3 mt-4 rounded-lg text-lg font-semibold transition ${
              allCompleted && !isFinished
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            {isFinished ? "✅ Program Completed" : "Finish Program"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Program;
