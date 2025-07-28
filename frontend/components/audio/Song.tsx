"use client";

import React, { useRef, useEffect, useState } from "react";

export const Song = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [interactionTriggered, setInteractionTriggered] = useState(false);

  // Enhanced user interaction detection for mobile and desktop
  useEffect(() => {
    if (interactionTriggered) return;

    const handleUserInteraction = async (event: Event) => {
      if (interactionTriggered || !audioRef.current) return;

      console.log("User interaction detected:", event.type);

      try {
        const audio = audioRef.current;
        audio.volume = 0;
        await audio.play();
        setInteractionTriggered(true);

        // Fade in
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

        removeListeners(); // ✅ only after success
      } catch (err) {
        console.error("Audio play failed on user interaction:", err);
      }
    };

    const removeListeners = () => {
      // Mouse events
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("mousedown", handleUserInteraction);

      // Touch events (mobile)
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("touchend", handleUserInteraction);

      // Keyboard events
      document.removeEventListener("keydown", handleUserInteraction);

      // Scroll events (mobile)
      document.removeEventListener("scroll", handleUserInteraction);

      // Focus events
      document.removeEventListener("focus", handleUserInteraction, true);
    };

    // Add comprehensive event listeners for user interaction
    // Mouse events
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("mousedown", handleUserInteraction);

    // Touch events (mobile)
    document.addEventListener("touchstart", handleUserInteraction, {
      passive: true,
    });
    document.addEventListener("touchend", handleUserInteraction, {
      passive: true,
    });

    // Keyboard events
    document.addEventListener("keydown", handleUserInteraction);

    // Scroll events (mobile scrolling is a common first interaction)
    document.addEventListener("scroll", handleUserInteraction, {
      passive: true,
    });

    // Focus events (when user focuses on input, etc.)
    document.addEventListener("focus", handleUserInteraction, true);

    // Cleanup function
    return removeListeners;
  }, [interactionTriggered]);

  console.log("Audio component mounted");

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/main.mp3"
        loop
        preload="auto"
        onError={(e) => console.error("Audio error:", e)}
        className="w-full h-full absolute top-0 left-0"
      />
    </>
  );
};
