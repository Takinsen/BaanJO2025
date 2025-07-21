"use client";

import { useStudent } from "../../contexts/StudentContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Suspense, lazy } from "react";

// Lazy load components for better performance
import HormoneImage from "./HormoneImage";
import StudentWelcome from "./StudentWelcome";
import NavigationButton from "../ui/NavigationButton";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function ClientGroupPage() {
  const { student, clearStudent } = useStudent();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  // Redirect to home if no student data
  useEffect(() => {
    if (!student) {
      router.push("/");
    }
  }, [student, router]);

  const handleBackToHome = useCallback(() => {
    setIsExiting(true);
    // Clear student data and wait for exit animation
    setTimeout(() => {
      clearStudent();
      router.push("/");
    }, 600);
  }, [clearStudent, router]);

  if (!student) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingSpinner message="Loading..." />
      </Suspense>
    );
  }

  const { group, hormone, firstName, nickname } = student;

  // Construct the image path
  const imagePath = `/images/${group}/${hormone}.jpg`;

  return (
    <div
      className={`overflow-y-auto min-h-screen flex flex-col w-full transition-all duration-700 ease-out ${
        isExiting ? "animate-page-exit" : "animate-page-enter"
      }`}
    >
      {/* Image container at top with severe zoom animation */}
      <div className="relative flex-shrink-0 animate-severe-zoom-in">
        <HormoneImage imagePath={imagePath} hormone={hormone} />
      </div>

      {/* Content section below with improved animations */}
      <div className="flex-1 flex flex-col items-center text-white text-center px-6 pb-8 space-y-6">
        <div className="animate-slide-up animate-delay-300">
          <StudentWelcome
            firstName={firstName}
            nickname={nickname}
            hormone={hormone}
          />
        </div>

        <div className="animate-slide-up animate-delay-500 w-full max-w-md">
          <NavigationButton 
            onClick={handleBackToHome} 
            isExiting={isExiting}
            className="w-full py-4 px-8 text-lg font-bold transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {"← หน้าแรก"}
          </NavigationButton>
        </div>
      </div>
    </div>
  );
}
