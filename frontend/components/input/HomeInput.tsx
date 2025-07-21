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
    <input
      {...props}
      value={value}
      onChange={handleInputChange}
      style={{
        border: "none",
        background: "none",
        outline: "none",
        font: "inherit",
        color: "inherit",
      }}
    />
  );
});

export default HomeInput;