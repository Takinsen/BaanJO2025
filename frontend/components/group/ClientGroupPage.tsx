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
      className={`overflow-y-auto flex flex-col w-full mb-[100px] ${
        isExiting ? "animate-page-exit" : "animate-page-enter"
      }`}
    >
      {/* Image container at top with severe zoom animation */}

      <HormoneImage imagePath={imagePath} hormone={hormone} />

      {/* Content section below with improved animations */}
      <div className="flex-1 flex flex-col items-center text-white text-center">
        <StudentWelcome
          firstName={firstName}
          nickname={nickname}
          hormone={hormone}
        />

        <NavigationButton onClick={handleBackToHome} isExiting={isExiting}>
          หน้าหลัก
        </NavigationButton>
      </div>
    </div>
  );
}
