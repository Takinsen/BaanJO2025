import { memo } from 'react';

interface StudentWelcomeProps {
  firstName: string;
  nickname: string;
  hormone: string;
  className?: string;
}

const StudentWelcome = memo(function StudentWelcome({ 
  firstName, 
  nickname, 
  hormone, 
  className = "" 
}: StudentWelcomeProps) {
  return (
    <div className={`animate-slide-up animate-delay-300 ${className}`}>
      <p className="text-lg mb-2 animate-fade-in animate-delay-500">
        ยินดีต้อนรับ <span className="font-bold text-yellow-400">{firstName} ({nickname})</span>
      </p>
      <p className="text-xl animate-fade-in animate-delay-200">
        ฮอร์โมนของคุณคือ <span className="font-bold text-blue-400 animate-severe-hormone text-2xl drop-shadow-lg">{hormone}</span>
      </p>
    </div>
  );
});

export default StudentWelcome;
