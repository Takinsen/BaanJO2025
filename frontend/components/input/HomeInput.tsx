"use client";

import React, { useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { useStudent } from "../../contexts/StudentContext";

// Import data dynamically to reduce initial bundle size
const getStudentData = () => import("../../constants/data.json").then(m => m.default);

type HomeInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onValidation?: (isValid: boolean, studentData?: any) => void;
};

const HomeInput = memo(function HomeInput({ onValidation, ...props }: HomeInputProps) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const { setStudent } = useStudent();

  const handleInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue.length === 10) {
      try {
        // Dynamically load student data
        const studentsData = await getStudentData();
        const student = (studentsData as any)[inputValue];
        
        if (student) {
          // Store student data in context
          setStudent(student);
          onValidation?.(true, student);
          // Wait for animation then redirect (no URL parameters)
          setTimeout(() => {
            router.push("/group");
          }, 1500);
        } else {
          onValidation?.(false);
        }
      } catch (error) {
        console.error('Failed to load student data:', error);
        onValidation?.(false);
      }
    }
  }, [router, setStudent, onValidation]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        margin: "0 auto", // Center the container
        backgroundImage: 'url(/images/input.png)',
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease"
      }}
      className="transition-smooth"
    >
      <input
        {...props}
        value={value}
        onChange={handleInputChange}
        style={{
          position: "absolute",
          border: "none",
          background: "transparent",
          outline: "none",
          font: "inherit",
          width: "80%", // Reduced width to fit better in the input area
          height: "20%", // Responsive height relative to container
          textAlign: "center",
          fontSize: "clamp(1.5rem, 2.5vw, 1.5rem)", // Responsive font size
          zIndex: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Perfect centering
        }}
      />
    </div>
  );
});

export default HomeInput;