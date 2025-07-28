"use client";

import React, { useRef, useEffect, useState } from "react";

export const Song = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interactionTriggered, setInteractionTriggered] = useState(false);

  const playAudio = async () => {
    if (!audioRef.current || !audioLoaded) return;
    try {
      const audio = audioRef.current;
      audio.volume = 0;
      await audio.play();
      setIsPlaying(true);

      // Fade-in effect
      const duration = 3000;
      const steps = 60;
      const targetVolume = 0.5;
      const increment = targetVolume / steps;
      const interval = duration / steps;

      let currentStep = 0;
      const fade = setInterval(() => {
        if (audio.paused || currentStep >= steps) {
          clearInterval(fade);
          audio.volume = targetVolume;
        } else {
          audio.volume = Math.min(increment * currentStep, targetVolume);
          currentStep++;
        }
      }, interval);
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  };

  // Set up listener for first user interaction
  useEffect(() => {
    if (!audioLoaded || interactionTriggered) return;

    const handleUserInteraction = () => {
      setInteractionTriggered(true);
      playAudio();
      removeListeners();
    };

    const removeListeners = () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return removeListeners;
  }, [audioLoaded, interactionTriggered]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/main.mp3"
        loop
        preload="auto"
        onLoadedData={() => {
          setAudioLoaded(true);
          console.log("Audio loaded and ready.");
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => console.error("Audio error:", e)}
        style={{ display: "none" }}
      />
    </>
  );
};
