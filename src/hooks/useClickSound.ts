import clickSound from "/clickSound.mp3";

import { useSound } from "./useSound";

/**
 * The useClickSound function returns a playClickSound function that can be used to play a click sound.
 * @returns The function `useClickSound` returns an object with a property `playClickSound`, which is a
 * function.
 */
export const useClickSound = () => {
  return useSound(clickSound);
};
