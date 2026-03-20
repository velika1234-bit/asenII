import { useState, useRef, useEffect } from "react";

export function useMedievalAmbience() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearFade() {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }

  function getOrCreateAudio() {
    if (!audioRef.current) {
      const audio = new Audio("/audio/medieval-ambient.mp3");
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
    }
    return audioRef.current;
  }

  function fadeIn() {
    clearFade();
    const audio = getOrCreateAudio();
    audio.play().catch(() => {});
    fadeRef.current = setInterval(() => {
      if (!audioRef.current) { clearFade(); return; }
      audioRef.current.volume = Math.min(0.72, audioRef.current.volume + 0.025);
      if (audioRef.current.volume >= 0.72) clearFade();
    }, 80);
  }

  function fadeOut() {
    clearFade();
    if (!audioRef.current) return;
    fadeRef.current = setInterval(() => {
      if (!audioRef.current) { clearFade(); return; }
      audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.035);
      if (audioRef.current.volume <= 0) {
        audioRef.current.pause();
        clearFade();
      }
    }, 80);
  }

  function toggle() {
    if (playing) {
      fadeOut();
      setPlaying(false);
    } else {
      fadeIn();
      setPlaying(true);
    }
  }

  useEffect(() => {
    return () => {
      clearFade();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { playing, toggle };
}
