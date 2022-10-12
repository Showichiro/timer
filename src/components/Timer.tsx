import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import { Countdown, Button, Card } from "react-daisyui";
import { TimerValue } from "../types/TimerValue";
import EditModal from "./EditModal";
import { sound } from "./sound";
import useSound from "use-sound";
import Title from "./Title";

type TimerProps = {
  id: string;
  defaultTimerValue?: TimerValue;
  defaultTitle?: string;
  onClickDelete: () => void;
  onEditTimerValue: (timerValue: TimerValue) => void;
  onEditTitle: (title: string) => void;
};

const convertTimeValueToTimeStamp = ({
  hours,
  minutes,
  seconds,
}: TimerValue) => {
  const weight = 1000;
  const now = Date.now();
  return new Date(
    now + hours * 60 * 60 * weight + minutes * 60 * weight + seconds * weight
  );
};

export const Timer: FC<TimerProps> = ({
  defaultTimerValue = {
    hours: 0,
    minutes: 6,
    seconds: 0,
  }, id,
  defaultTitle = "タイマー",
  onClickDelete,
  onEditTimerValue,
  onEditTitle,
}) => {
  const [editing, setEditing] = useState(false);
  const timerValueRef = useRef(defaultTimerValue);
  const [play] = useSound(`data:audio/wav;base64,${sound}`, {
    volume: 0.5,
  });
  const { hours, minutes, seconds, isRunning, pause, start, restart, resume } =
    useTimer({
      expiryTimestamp: convertTimeValueToTimeStamp(timerValueRef.current),
      autoStart: false,
      onExpire: () => {
        play();
      },
    });
  const startRef = useRef(false);
  const handleClickStart = useCallback(() => {
    startRef.current = true;
    start();
  }, [start]);

  const isExpired = !(hours > 0 || minutes > 0 || seconds > 0);

  const handleClickReset = useCallback(() => {
    startRef.current = false;
    restart(convertTimeValueToTimeStamp(timerValueRef.current), false);
  }, [timerValueRef.current]);

  const handleClickEdit = useCallback(() => setEditing(true), []);
  const handleClickClose = useCallback(() => setEditing(false), []);

  const handleClickComplete = useCallback((data: TimerValue) => {
    timerValueRef.current = data;
    startRef.current = false;
    onEditTimerValue(data);
    restart(convertTimeValueToTimeStamp(data), false);
  }, []);

  return (
    <>
      <Card
        className={`border-2 ${isExpired ? "border-red-700" : "border-black"}`}
        bordered={false}
      >
        <Card.Title className="pl-2 pt-2 flex">
          <Title defaultTitle={defaultTitle} onEditTitle={onEditTitle} />
          <Card.Actions className="flex-none pr-2">
            <Button onClick={onClickDelete} size="sm" shape="circle" aria-label="delete timer">
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
        <Card.Body>
          <div
            className={`flex justify-center ${isExpired ? "text-red-700" : ""}`}
          >
            <Countdown
              value={hours}
              className="text-4xl md:text-6xl lg:text-8xl"
            />
            h
            <Countdown
              value={minutes}
              className="text-4xl md:text-6xl lg:text-8xl"
            />
            m
            <Countdown
              value={seconds}
              className="text-4xl md:text-6xl lg:text-8xl"
            />
            s
          </div>
          <Card.Actions className="grid grid-cols-2 lg:grid-cols-4 pt-0.5">
            {startRef.current ? (
              <Button onClick={resume} disabled={isRunning} size="md">
                resume
              </Button>
            ) : (
              <Button onClick={handleClickStart} disabled={isRunning} size="md">
                start
              </Button>
            )}
            <Button onClick={pause} disabled={!isRunning} size="md">
              pause
            </Button>
            <Button onClick={handleClickReset} size="md">
              reset
            </Button>
            <Button onClick={handleClickEdit} disabled={isRunning} size="md">
              edit
            </Button>
          </Card.Actions>
        </Card.Body>
      </Card>
      <EditModal
        id={id}
        defaultValues={{ hours, minutes, seconds }}
        isOpen={editing}
        onClickClose={handleClickClose}
        onClickComplete={handleClickComplete}
      />
    </>
  );
};
