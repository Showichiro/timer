import useSound from "use-sound";
import timeUpSound from "../assets/timeUpSound.mp3";

export const useTimeUpSound = () => {
  const [playTimeUpSound] = useSound(timeUpSound);
  return { playTimeUpSound };
};
