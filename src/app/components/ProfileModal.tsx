"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const getProgressionLabel = (level: number | undefined) => {
  if (level === undefined) return "Unknown";
  if (level < 3) return "Beginner";
  if (level < 7) return "Intermediate";
  return "Advanced";
};

const getProgressionColor = (level: number | undefined) => {
  if (level === undefined) return "bg-gray-400";
  if (level < 3) return "bg-green-500";
  if (level < 7) return "bg-yellow-500";
  if (level < 11) "bg-blue-600";
  return "bg-red-700";
};

const getProgressionWidth = (points: number | undefined): number => {
  const maxPoints = 10;
  if (points === undefined) return 0;
  const clamped = Math.min(points, maxPoints);
  return (clamped / maxPoints) * 100;
};

const getNextLevelInfo = (level: number | undefined) => {
  if (level === undefined) return null;
  if (level < 3) return { next: "Intermediate", pointsNeeded: 3 - level };
  if (level < 6) return { next: "Advanced", pointsNeeded: 6 - level };
  if (level < 8) return { next: "Expert", pointsNeeded: 8 - level };
  return null; // max level
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  const label = getProgressionLabel(user?.progression);
  const color = getProgressionColor(user?.progression);
  const width = getProgressionWidth(user?.progression);
  const nextLevelInfo = getNextLevelInfo(user?.progression);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative">
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          Your Profile
        </h2>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-orange-500 text-white text-2xl font-bold rounded-full flex items-center justify-center">
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <p className="mt-5 text-lg font-semibold text-black">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>

          <div className="mt-4 text-sm font-medium text-gray-800">
            Progression Level: {label}
          </div>

          {/* Progression Bar with Milestones */}
          <div className="relative mt-4 w-full">
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative">
              <div
                className={`h-full ${color} transition-all duration-500`}
                style={{ width: `${width}%` }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-gray-400"
                style={{ left: "30%" }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-gray-400"
                style={{ left: "60%" }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-gray-400"
                style={{ left: "80%" }}
              />
            </div>

            {/* Milestone labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
              <span>Expert</span>
            </div>
          </div>

          {nextLevelInfo && (
            <p className="text-sm text-gray-600 mt-1 italic">
              {nextLevelInfo.pointsNeeded} point
              {nextLevelInfo.pointsNeeded > 1 ? "s" : ""} until{" "}
              <span className="font-semibold">{nextLevelInfo.next}</span>
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-x-2">
          <button
            onClick={onLogout}
            className="bg-gray-500 hover:bg-gray-600 text-white text-sm py-1 px-4 rounded transition"
          >
            Log out
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-4 rounded transition">
            <FontAwesomeIcon icon={faPenToSquare} className="pr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
