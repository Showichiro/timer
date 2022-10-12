import AddButton from "./components/AddButton";
import { Timer } from "./components/Timer";
import { useTimerList } from "./hooks/useTimerList";
import Footer from "./shared/Footer";

function App() {
  const { timerList, removeTimer, addNewTimer, updateTimer } = useTimerList();
  return (
    <>
      <main className="p-2">
        <h1 className="font-black text-3xl">Timer</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {timerList.map((timer) => (
            <Timer
              key={timer.id}
              id={timer.id}
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
      <Footer />
    </>
  );
}

export default App;
