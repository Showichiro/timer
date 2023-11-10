import { FC } from "react";
import { Button, Card } from "react-daisyui";
import Title from "./Title";

export const CardTitle: FC<{
  defaultTitle: string | undefined;
  "onEdit:title": (title: string) => void;
  "onClick:deleteButton": () => void;
}> = ({
  defaultTitle,
  "onEdit:title": onEditTitle,
  "onClick:deleteButton": onClickDeleteButton,
}) => (
  <Card.Title className="pl-2 pt-2 flex">
    <Title defaultTitle={defaultTitle} onEditTitle={onEditTitle} />
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
