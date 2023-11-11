import useSound from "use-sound";

import clickSound from "../assets/clickSound.mp3";

export const useClickSound = () => {
  const [playClickSound] = useSound(clickSound);
  return { playClickSound };
};
