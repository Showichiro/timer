import { useAudio } from "react-use";
import timeUpSound from "/timeUpSound.mp3";

/**
 * The function `useTimeUpSound` returns a hook that plays a time up sound when called.
 * @returns The function `useTimeUpSound` returns an object with a property `playTimeUpSound`, which is
 * a function that can be used to play the time up sound.
 */
export const useTimeUpSound = () => {
  const [audio, , control] = useAudio({ src: timeUpSound });

  return { audio, control };
};
