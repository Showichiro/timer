import type { PrimitiveAtom } from "jotai";
import type { FC } from "react";
import Title from "./Title";

export const CardTitle: FC<{
  titleAtom: PrimitiveAtom<string>;
  "onClick:deleteButton": () => void;
}> = ({ titleAtom, "onClick:deleteButton": onClickDeleteButton }) => (
  <div className="card-title pl-2 pt-2 flex">
    <Title titleAtom={titleAtom} />
    <div className="card-actions flex-none pr-2">
      <button
        onClick={onClickDeleteButton}
        type="button"
        className="btn btn-sm btn-circle timer-delete"
        aria-label="delete timer"
      >
        <svg
          role="img"
          aria-label="delete"
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
      </button>
    </div>
  </div>
);
