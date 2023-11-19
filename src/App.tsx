import { CountDownTimer } from "./components/CountDownTimer";
import { useTimerList } from "./hooks/useTimerList";
import { SiteTour } from "./components/SiteTour";
import { useIsFirst } from "./hooks/useIsFirst";
import { Header } from "./components/Header";
import { themeChange } from "theme-change";
import { useEffect } from "react";
import { StopWatch } from "./components/StopWatch";
import "./i18n/configs";
import { MainLayout } from "./components/MainLayout";

function App() {
  const { timerList, removeTimer, addNewTimer, updateTimer } = useTimerList();
  const isFirst = useIsFirst();
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <>
      <Header addTimer={addNewTimer} />
      {isFirst && timerList.length !== 0 && <SiteTour />}
      <MainLayout>
        {timerList.map((timer) =>
          timer.type === "stopwatch" ? (
            <StopWatch
              key={`${timer.id}-${timer.title}`}
              onClickDelete={() => removeTimer(timer.id)}
              onEditTitle={(title) => updateTimer({ ...timer, title })}
            />
          ) : (
            <CountDownTimer
              id={timer.id}
              key={`${timer.id}-${timer.timerValue?.hours}-${timer.timerValue?.minutes}-${timer.timerValue?.seconds}-${timer.timerValue?.seconds}-${timer.title}`}
              defaultTimerValue={timer.timerValue}
              defaultTitle={timer.title}
              onClickDelete={() => removeTimer(timer.id)}
              onEditTimerValue={(timerValue) =>
                updateTimer({ ...timer, timerValue })
              }
              onEditTitle={(title) => updateTimer({ ...timer, title })}
            />
          ),
        )}
      </MainLayout>
    </>
  );
}

export default App;
