import AddButton from "./components/AddButton";
import { Timer } from "./components/Timer";
import { useTimerList } from "./hooks/useTimerList";
import { SiteTour } from "./components/SiteTour";
import { useIsFirst } from "./hooks/useIsFirst";

import "./i18n/configs";
import { Header } from "./components/Header";

function App() {
  const { timerList, removeTimer, addNewTimer, updateTimer } = useTimerList();
  const isFirst = useIsFirst();
  return (
    <>
      <Header />
      {isFirst && timerList.length !== 0 && <SiteTour />}
      <main className="p-2">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 pt-2">
          {timerList.map((timer) => (
            <Timer
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
          ))}
        </div>
        <AddButton onClick={addNewTimer} />
      </main>
    </>
  );
}

export default App;
