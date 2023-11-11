import { CountDownTimer } from "./components/CountDownTimer";
import { useTimerList } from "./hooks/useTimerList";
import { SiteTour } from "./components/SiteTour";
import { useIsFirst } from "./hooks/useIsFirst";
import { Header } from "./components/Header";
import { themeChange } from "theme-change";
import { useEffect } from "react";
import { StopWatch } from "./components/StopWatch";
import "./i18n/configs";

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
      <main className="p-2">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 pt-2">
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
        </div>
      </main>
    </>
  );
}

export default App;
