"use client";

import { useStudent } from "../../contexts/StudentContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Suspense, lazy } from "react";

// Lazy load components for better performance
const HormoneImage = lazy(() => import("./HormoneImage"));
const StudentWelcome = lazy(() => import("./StudentWelcome"));
const NavigationButton = lazy(() => import("../ui/NavigationButton"));
const LoadingSpinner = lazy(() => import("../ui/LoadingSpinner"));

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
    <div className={`min-h-screen flex flex-col w-full ${isExiting ? 'animate-page-exit' : 'animate-page-enter'}`}>
      {/* Image container at top with severe zoom animation */}
      <Suspense fallback={<div className="flex justify-center h-96 bg-gray-800 animate-pulse"></div>}>
        <HormoneImage 
          imagePath={imagePath}
          hormone={hormone}
        />
      </Suspense>
    
      {/* Content section below with improved animations */}
      <div className="flex-1 flex flex-col items-center text-white text-center">
        <Suspense fallback={<div className="animate-pulse">Loading content...</div>}>
          <StudentWelcome
            firstName={firstName}
            nickname={nickname}
            hormone={hormone}
          />
        </Suspense>
        
        <Suspense fallback={<div className="mt-6 w-32 h-12 bg-blue-600 rounded-lg animate-pulse"></div>}>
          <NavigationButton
            onClick={handleBackToHome}
            isExiting={isExiting}
          >
            หน้าหลัก
          </NavigationButton>
        </Suspense>
      </div>
    </div>
  );
}
