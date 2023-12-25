import useTimerList from "./hooks/useTimerList";
import { SiteTour } from "./components/SiteTour";
import { useIsFirst } from "./hooks/useIsFirst";
import { Header } from "./components/Header";
import { themeChange } from "theme-change";
import { useEffect } from "react";
import { MainLayout } from "./components/MainLayout";
import { useClickSound } from "./hooks/useClickSound";
import { useTimeUpSound } from "./hooks/useTimeUpSound";
import TimerView from "./components/TimerView";
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
