import { CountDownTimer } from "./components/CountDownTimer";
import useTimerList, { Timer } from "./hooks/useTimerList";
import { SiteTour } from "./components/SiteTour";
import { useIsFirst } from "./hooks/useIsFirst";
import { Header } from "./components/Header";
import { themeChange } from "theme-change";
import { FC, useEffect, useRef } from "react";
import { StopWatch } from "./components/StopWatch";
import "./i18n/configs";
import { MainLayout } from "./components/MainLayout";
import { useClickSound } from "./hooks/useClickSound";
import { useTimeUpSound } from "./hooks/useTimeUpSound";
import { PrimitiveAtom, useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";

const TimerView: FC<{
  timerAtom: PrimitiveAtom<Timer>;
  onClickDelete: () => void;
  playClickSound: () => void;
  playTimeUpSound: () => void;
}> = ({ timerAtom, onClickDelete, playClickSound, playTimeUpSound }) => {
  const timerTypeAtomRef = useRef(
    focusAtom(timerAtom, (optic) => optic.prop("type")),
  );
  const timerType = useAtomValue(timerTypeAtomRef.current);
  const titleAtomRef = useRef(
    focusAtom(timerAtom, (optic) => optic.prop("title")),
  );
  return timerType === "stopwatch" ? (
    <StopWatch
      titleAtom={titleAtomRef.current}
      onClickDelete={onClickDelete}
      playClickSound={playClickSound}
    />
  ) : (
    <CountDownTimer
      timerAtom={timerAtom}
      onClickDelete={onClickDelete}
      playClickSound={playClickSound}
      playTimeUpSound={playTimeUpSound}
    />
  );
};

function App() {
  const { timerAtomList, insertTimer, removeTimer } = useTimerList();
  const isFirst = useIsFirst();
  useEffect(() => {
    themeChange(false);
  }, []);
  const {
    audio: clickSoundAudio,
    control: { play: playClickSound },
  } = useClickSound();
  const {
    audio: timeupSoundAudio,
    control: { play: playTimeUpSound },
  } = useTimeUpSound();
  return (
    <>
      {clickSoundAudio}
      {timeupSoundAudio}
      <Header addTimer={(type) => insertTimer({ type })} />
      {isFirst && timerAtomList.length !== 0 && <SiteTour />}
      <MainLayout>
        {timerAtomList.map((timerAtom) => (
          <TimerView
            key={timerAtom.toString()}
            timerAtom={timerAtom}
            onClickDelete={() => removeTimer(timerAtom)}
            playClickSound={playClickSound}
            playTimeUpSound={playTimeUpSound}
          />
        ))}
      </MainLayout>
    </>
  );
}

export default App;
