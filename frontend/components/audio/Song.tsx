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
      document.removeEventListener("mouseup", handleUserInteraction);
      document.removeEventListener("mousemove", handleUserInteraction);
      document.removeEventListener("mouseenter", handleUserInteraction);
      document.removeEventListener("mouseleave", handleUserInteraction);
      document.removeEventListener("mouseover", handleUserInteraction);
      document.removeEventListener("contextmenu", handleUserInteraction);
      document.removeEventListener("dblclick", handleUserInteraction);

      // Touch events (mobile)
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("touchend", handleUserInteraction);
      document.removeEventListener("touchmove", handleUserInteraction);
      document.removeEventListener("touchcancel", handleUserInteraction);

      // Pointer events (modern touch/mouse)
      document.removeEventListener("pointerdown", handleUserInteraction);
      document.removeEventListener("pointerup", handleUserInteraction);
      document.removeEventListener("pointermove", handleUserInteraction);
      document.removeEventListener("pointerenter", handleUserInteraction);
      document.removeEventListener("pointerleave", handleUserInteraction);
      document.removeEventListener("pointercancel", handleUserInteraction);

      // Page events
      window.removeEventListener("pageshow", handleUserInteraction);
      window.removeEventListener("pagehide", handleUserInteraction);
    };

    // Add comprehensive event listeners for user interaction
    // Mouse events
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("mousedown", handleUserInteraction);
    document.addEventListener("mouseup", handleUserInteraction);
    document.addEventListener("mousemove", handleUserInteraction, { passive: true });
    document.addEventListener("mouseenter", handleUserInteraction, { passive: true });
    document.addEventListener("mouseleave", handleUserInteraction, { passive: true });
    document.addEventListener("mouseover", handleUserInteraction, { passive: true });
    document.addEventListener("contextmenu", handleUserInteraction);
    document.addEventListener("dblclick", handleUserInteraction);

    // Touch events (mobile)
    document.addEventListener("touchstart", handleUserInteraction, { passive: true });
    document.addEventListener("touchend", handleUserInteraction, { passive: true });
    document.addEventListener("touchmove", handleUserInteraction, { passive: true });
    document.addEventListener("touchcancel", handleUserInteraction, { passive: true });

    // Pointer events (modern touch/mouse unified)
    document.addEventListener("pointerdown", handleUserInteraction);
    document.addEventListener("pointerup", handleUserInteraction);
    document.addEventListener("pointermove", handleUserInteraction, { passive: true });
    document.addEventListener("pointerenter", handleUserInteraction, { passive: true });
    document.addEventListener("pointerleave", handleUserInteraction, { passive: true });
    document.addEventListener("pointercancel", handleUserInteraction, { passive: true });

    // Page lifecycle events
    window.addEventListener("pageshow", handleUserInteraction, { passive: true });
    window.addEventListener("pagehide", handleUserInteraction, { passive: true });

    // Cleanup function
    return removeListeners;
  }, [interactionTriggered, audioRef]);

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
