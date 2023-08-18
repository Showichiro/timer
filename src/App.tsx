import AddButton from "./components/AddButton";
import { Timer } from "./components/Timer";
import { useTimerList } from "./hooks/useTimerList";
import { SiteTour } from "./components/SiteTour";
import { useIsFirst } from "./hooks/useIsFirst";
import { useTranslation } from "react-i18next";

import "./i18n/configs";

function App() {
  const { timerList, removeTimer, addNewTimer, updateTimer } = useTimerList();
  const isFirst = useIsFirst();
  const { t } = useTranslation();
  return (
    <>
      {isFirst && timerList.length !== 0 && <SiteTour />}
      <main className="p-2">
        <h1 className="font-black text-3xl">{t("title")}</h1>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 pt-2">
          {timerList.map((timer) => (
            <Timer
              id={timer.id}
              key={timer.id}
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
