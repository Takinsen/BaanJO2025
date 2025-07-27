import { memo } from 'react';
import hormone from '../../constants/hormone.json';

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
      <p className="text-2xl mb-1 animate-fade-in animate-delay-400">
        ยินดีต้อนรับ <span className="font-bold text-yellow-400">{firstName} ({nickname})</span>
      </p>
      <p className="text-2xl animate-fade-in animate-delay-200">
        ฮอร์โมนของคุณคือ <span className="font-bold text-blue-400 animate-severe-hormone text-2xl drop-shadow-lg">{hormone}</span>
      </p>
    </div>
  );
});

export default StudentWelcome;
