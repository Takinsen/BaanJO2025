import { memo } from 'react';
import Image from "next/image";

interface HormoneImageProps {
  imagePath?: string;
  hormone: string;
  group?: string;
  className?: string;
}

const HormoneImage = memo(function HormoneImage({ 
  imagePath, 
  hormone, 
  group,
  className = "" 
}: HormoneImageProps) {
  // Use provided imagePath or construct from group and hormone
  const finalImagePath = imagePath || `/images/${group}/${hormone}.jpg`;
  
  return (
    <div className={`flex justify-center animate-severe-zoom-in ${className}`}>
      <Image
        src={finalImagePath}
        alt={`${hormone} hormone`}
        width={1000}
        height={500}
        style={{ objectFit: "contain" }}
        priority
        className="transition-smooth hover:scale-105 drop-shadow-2xl"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
});

export default HormoneImage;
