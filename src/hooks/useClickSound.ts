import useSound from "use-sound";

import clickSound from "../assets/clickSound.mp3";

/**
 * The useClickSound function returns a playClickSound function that can be used to play a click sound.
 * @returns The function `useClickSound` returns an object with a property `playClickSound`, which is a
 * function.
 */
export const useClickSound = () => {
  const [playClickSound] = useSound(clickSound);
  return { playClickSound };
};
