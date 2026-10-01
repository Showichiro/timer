import { useCallback, useMemo, useRef } from "react";

/** Shared native audio controls; blocked playback must not interrupt a timer. */
export const useSound = (src: string) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      // Repeated actions should replay the click instead of waiting for it to end.
      audio.currentTime = 0;
      void audio.play()?.catch(() => {});
    } catch {
      // Audio may be unavailable or disallowed by the browser.
    }
  }, []);
  const control = useMemo(() => ({ play }), [play]);
  return {
    audio: (
      // biome-ignore lint/a11y/useMediaCaption: Click and alarm effects contain no speech; timer status is displayed visually.
      <audio ref={audioRef} src={src} preload="auto" />
    ),
    control,
  };
};
