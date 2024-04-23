import { useEffect } from "react";
import { themeChange } from "theme-change";
import { Header } from "./components/Header";
import { MainLayout } from "./components/MainLayout";
import { SiteTour } from "./components/SiteTour";
import TimerView from "./components/TimerView";
import { useClickSound } from "./hooks/useClickSound";
import { useIsFirst } from "./hooks/useIsFirst";
import { useTimeUpSound } from "./hooks/useTimeUpSound";
import useTimerList from "./hooks/useTimerList";
import "./i18n/configs";

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
