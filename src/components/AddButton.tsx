import { FC } from "react";
import { Button } from "react-daisyui";

type AddButtonProps = {
  onClick: () => void;
};

const AddButton: FC<AddButtonProps> = ({ onClick }) => (
  <Button
    onClick={onClick}
    shape="circle"
    className="timer-add inline-block p-3 font-medium leading-tight bottom-5 right-5"
    style={{ position: "fixed" }}
    aria-label="add timer"
  >
    +
  </Button>
);
export default AddButton;
