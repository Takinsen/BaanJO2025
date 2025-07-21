"use client";

import { useState, useCallback, Suspense, lazy } from "react";

// Lazy load components for better performance
const HomeInput = lazy(() => import("../input/HomeInput"));
const ValidationMessage = lazy(() => import("./ValidationMessage"));

export default function ClientHomePage() {
  const [showText, setShowText] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleValidation = useCallback((valid: boolean, studentData?: any) => {
    setIsValid(valid);
    
    if (valid) {
      setValidationMessage("ยินดีต้อนรับ!");
      setShowText(true);
    } else {
      setValidationMessage("ไม่พบรหัสนิสิต");
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
      {/* Input container with enhanced animation */}
      <div
        className="absolute left-0 right-0 w-full text-lg text-white z-10 animate-fade-in"
        style={{
          top: "48.5%",
          transform: "translateY(calc(-0%))",
        }}
      >
        <Suspense fallback={<div className="text-center">...</div>}>
          <HomeInput
            placeholder="รหัสนิสิต"
            type="text"
            inputMode="numeric"
            maxLength={10}
            className="w-full text-center transition-smooth"
            onValidation={handleValidation}
          />
        </Suspense>
      </div>

      {/* Validation message with improved animations */}
      {showText && (
        <Suspense fallback={null}>
          <ValidationMessage 
            isValid={isValid ?? false}
            message={validationMessage}
            className="top-[55%]"
          />
        </Suspense>
      )}
    
    </>
  );
}
