import { FC } from "react";
import { Button, Card } from "react-daisyui";
import Title from "./Title";
import { PrimitiveAtom } from "jotai";

export const CardTitle: FC<{
  titleAtom: PrimitiveAtom<string>;
  "onClick:deleteButton": () => void;
}> = ({ titleAtom, "onClick:deleteButton": onClickDeleteButton }) => (
  <Card.Title className="pl-2 pt-2 flex">
    <Title titleAtom={titleAtom} />
    <Card.Actions className="flex-none pr-2">
      <Button
        onClick={onClickDeleteButton}
        size="sm"
        shape="circle"
        className="timer-delete"
        aria-label="delete timer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </Card.Actions>
  </Card.Title>
);
