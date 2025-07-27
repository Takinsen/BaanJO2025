"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

// Lazy load components for better performance
import HomeInput from "../input/HomeInput";

export default function ClientHomePage() {
  const [showText, setShowText] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInput(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleValidation = useCallback((valid: boolean, studentData?: any) => {
    setIsValid(valid);
    
    if (valid) {
      setValidationMessage("ยินดีต้อนรับ!");
      setShowText(true);
    } else {
      setValidationMessage("ไม่พบข้อมูล");
      setShowText(true);
      // Hide error message after 3 seconds
      setTimeout(() => {
        setShowText(false);
        setIsValid(null);
      }, 3000);
    }
  }, []);

  return (
    <>
      {/* Input container with enhanced animation - only show after 3 seconds */}
      {showInput && (
        <div
          className="absolute left-0 right-0 top-1/2 w-full z-10 animate-fade-in"
          style={{
            height: "100%",
            transform: "translateY(-50%)"
          }}
        >
          <HomeInput
            placeholder="0xxxxxxxxx"
            type="text"
            inputMode="numeric"
            maxLength={10}
            className="transition-smooth text-white"
            onValidation={handleValidation}
          />
        </div>
      )}

      {/* Validation message with improved animations */}
      {isValid ? (
        <Image
          src="/images/loading-text.png"
          alt="main"
          fill
          style={{ objectFit: "contain" }}
          className="transition-smooth animate-fade-in"
          priority
        />
      ) : (
        showText && (
          <div className="absolute left-0 right-0 top-1/2 flex items-center justify-center z-20" style={{ transform: "translateY(100%)" }}>
            <div className={`text-lg font-semibold ${isValid ? "text-green-600" : "text-red-600"} animate-fade-in`}>
              {validationMessage}
            </div>
          </div>
        )
      )}
    </>
  );
}
