"use client";

import React, { useRef, useEffect, useState } from "react";

export const Song = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const playAudio = async () => {
    if (audioRef.current && audioLoaded) {
      try {
        const audio = audioRef.current;
        audio.volume = 0; // Start with volume at 0
        
        await audio.play();
        setIsPlaying(true);
        console.log("Audio playing successfully");
        
        // Linear fade-in over 3 seconds
        const fadeInDuration = 3000; // 3 seconds
        const targetVolume = 0.5; // Target volume (50% of max)
        const fadeInSteps = 60; // 60 steps for smooth transition
        const volumeIncrement = targetVolume / fadeInSteps;
        const stepInterval = fadeInDuration / fadeInSteps;
        
        let currentStep = 0;
        const fadeInInterval = setInterval(() => {
          if (currentStep < fadeInSteps && audio && !audio.paused) {
            audio.volume = Math.min(volumeIncrement * currentStep, targetVolume);
            currentStep++;
          } else {
            clearInterval(fadeInInterval);
            if (audio && !audio.paused) {
              audio.volume = targetVolume; // Ensure final volume is set
            }
          }
        }, stepInterval);
        
      } catch (error) {
        console.log("Audio play failed:", error);
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted && audioLoaded) {
        setUserInteracted(true);
        playAudio();
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    // Try autoplay when audio is loaded
    if (audioLoaded && !isPlaying) {
      playAudio();
    }

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [audioLoaded, userInteracted, isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/main.mp3"
        loop
        preload="auto"
        onLoadedData={() => {
          console.log("Audio loaded");
          setAudioLoaded(true);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => console.error("Audio error:", e)}
        style={{ position: "absolute", left: "-9999px" }}
      />
      
      {/* Show audio control if not playing */}
      {audioLoaded && !isPlaying && (
        <button
          onClick={playAudio}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '25px',
            fontSize: '14px',
            cursor: 'pointer',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
          className="hover:bg-opacity-90"
        >
          🎵 Enable Audio
        </button>
      )}
    </>
  );
};
