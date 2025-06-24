"use client";
import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  getProgressionLabel,
  levelColor,
  getNextLevelInfo,
} from "../utils/level";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const getProgressionWidth = (points: number | undefined): number => {
  const maxPoints = 10;
  if (points === undefined) return 0;
  const clamped = Math.min(points, maxPoints);
  return (clamped / maxPoints) * 100;
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const { user } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const resetProgression = async (email: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/users/reset", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset progression");
      }

      const data = await response.json();
      console.log("Progression reset:", data);
      return data;
    } catch (error) {
      console.error("Error resetting progression:", error);
      return null;
    }
  };

  const handleReset = async () => {
    try {
      await resetProgression(user!.email);
      setShowResetModal(false);
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to reset:", err);
    }
  };

  const label = getProgressionLabel(user?.progression);
  const color = levelColor(getProgressionLabel(user?.progression));
  const width = getProgressionWidth(user?.progression);
  const nextLevelInfo = getNextLevelInfo(user?.progression);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
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
              {nextLevelInfo.pointsToNext} point
              {nextLevelInfo.pointsToNext > 1 ? "s" : ""} until{" "}
              <span className="font-semibold">{nextLevelInfo.nextLevel}</span>
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-x-3">
          <button
            onClick={onLogout}
            className="bg-gray-500 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded transition"
          >
            Log out
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded transition">
            <FontAwesomeIcon icon={faPenToSquare} className="pr-2" />
            Edit Profile
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded transition"
            onClick={() => setShowResetModal(true)}
          >
            Reset Profile
          </button>
        </div>

        {showResetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-sm text-center border border-red-500">
              <h2 className="text-xl font-semibold text-white mb-4">
                Are you sure you want to delete all your data?
              </h2>
              <div className="flex justify-center gap-x-4">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Yes, Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {resetSuccess && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
            Your profile has been reset.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
