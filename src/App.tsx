import AddButton from "./components/AddButton";
import { Timer } from "./components/Timer";
import { useTimerIdList } from "./hooks/useTimerIdList";

function App() {
  const { idList, removeId, addNewId } = useTimerIdList();
  return (
    <div className="p-2">
      <h1 className="font-black text-3xl">タイマー</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {idList.map((id) => (
          <Timer
            key={id}
            onClickDelete={() => {
              removeId(id);
            }}
          />
        ))}
      </div>
      <AddButton onClick={addNewId} />
    </div>
  );
}

export default App;
