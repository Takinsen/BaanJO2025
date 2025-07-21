import { memo } from 'react';
import Image from 'next/image';

interface ValidationMessageProps {
  isValid: boolean;
  message: string;
  className?: string;
}

const ValidationMessage = memo(function ValidationMessage({ 
  isValid, 
  message, 
  className = "" 
}: ValidationMessageProps) {
  return (
    <div 
      className={`flex justify-center absolute left-0 right-0 w-full text-md z-20 text-center ${
        isValid ? 'text-green-400' : 'text-red-400'
      } ${className}`}
      style={{
        top: "55%",
        transform: "translateY(calc(-50%))",
      }}
    >
      {isValid ? (
        <div className="text-xl font-normal text-black animate-fade-in">
          คู่ที่กำลังจะว้าวุ่นไปกับคุณคือ
        </div>
      ) : (
        <div className="text-xl font-bold jored animate-fade-in">
          {message}
        </div>
      )}
    </div>
  );
});

export default ValidationMessage;
