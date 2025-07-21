import { memo } from 'react';
import Link from 'next/link';

interface NavigationButtonProps {
  onClick?: () => void;
  href?: string;
  isExiting?: boolean;
  children: React.ReactNode;
  className?: string;
}

const NavigationButton = memo(function NavigationButton({ 
  onClick, 
  href,
  isExiting = false, 
  children, 
  className = "" 
}: NavigationButtonProps) {
  const baseClasses = `mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-bounce hover:scale-105 active:scale-95 animate-slide-up animate-delay-500 shadow-lg hover:shadow-xl ${className}`;
  
  const content = (
    <span className={`${isExiting ? 'animate-fade-out' : 'animate-fade-in'}`}>
      {children}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses}
      disabled={isExiting}
    >
      {content}
    </button>
  );
});

export default NavigationButton;
