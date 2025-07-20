"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getNextLevelInfo, mapLevel } from "../utils/level";

import { fetchAllPrograms } from "../utils/api";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Card from "../components/Card";
import Dashboard from "../components/Dashboard";

interface Program {
  _id: string;
  slug: string;
  title: string;
  description: string;
  level: "Unknown" | "Beginner" | "Intermediate" | "Advanced" | "Expert";
  images: { imgSrc: string; alt: string }[];
}

const DashboardPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [elevateVisible, setElevateVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [progressData, setProgressData] = useState([]);
  const { user } = useAuth();

  const progression = user?.progression || 0;
  const nextLevelInfo = getNextLevelInfo(progression);
  const pointsToNext = nextLevelInfo?.pointsToNext ?? 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllPrograms();
        setPrograms(data);

        if (user) {
          const response = await fetch(
            `http://localhost:8080/api/progression/history/${user.email}`
          );
          const progressData = await response.json();
          setProgressData(progressData);
        }

        // UI visibility logic
        setIsVisible(true);
        const timer = setTimeout(() => setElevateVisible(true), 1000);
        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    // Disable scroll when user is not logged in
    if (!user) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [user]);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, programs.length));
  };

  const bottomRef = useInfiniteScroll(loadMore);

  return (
    <main className="relative text-white p-4 min-h-screen">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-top bg-cover z-[-10]"
        style={{
          backgroundImage: "url('/images/circle-scatter-haikei.svg')",
          backgroundAttachment: "scroll",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
        }}
      />

      {/* Sign in overlay if no user */}
      {!user && (
        <>
          <div className="absolute inset-0 backdrop-blur-md bg-black/40 z-20 " />
          <div className="absolute inset-0 z-30 flex items-center justify-center ">
            <div className="bg-[#1a1a1a] border border-orange-500 p-10 rounded-xl shadow-lg text-center max-w-md mx-auto overflow-hidden">
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

      {/* Main dashboard content */}
      <div className="relative z-10 min-h-screen">
        {user && (
          <div className="text-2xl font-semibold text-white text-center pt-6 pb-4">
            Welcome, {user.name ?? user.email ?? "User"}!
          </div>
        )}
        <Dashboard
          programs={programs}
          progressData={progressData}
          progression={user?.progression || 0}
        />
        <section>
          <h1 className="underline text-4xl font-bold text-white text-center pt-10">
            Additional Programs
          </h1>
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
      </div>
    </main>
  );
};

export default DashboardPage;
