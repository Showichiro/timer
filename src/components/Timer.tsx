import { FC, useCallback, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import { Button, Card } from "react-daisyui";
import { TimerValue } from "../types/TimerValue";
import timeUpSound from "../assets/timeUpSound.mp3";
import clickSound from "../assets/clickSound.mp3";
import useSound from "use-sound";
import Title from "./Title";
import { Edit } from "./Edit";
import { Count } from "./Count";
import { useTranslation } from "react-i18next";

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
    now + hours * 60 * 60 * weight + minutes * 60 * weight + seconds * weight,
  );
};

export const Timer: FC<TimerProps> = ({
  id,
  defaultTimerValue = {
    hours: 0,
    minutes: 6,
    seconds: 0,
  },
  defaultTitle,
  onClickDelete,
  onEditTimerValue,
  onEditTitle,
}) => {
  const timerValueRef = useRef(defaultTimerValue);
  const [playTimeUpSound] = useSound(timeUpSound);
  const [playClickSound] = useSound(clickSound);
  const { hours, minutes, seconds, isRunning, pause, start, restart, resume } =
    useTimer({
      expiryTimestamp: convertTimeValueToTimeStamp(timerValueRef.current),
      autoStart: false,
      onExpire: () => {
        playTimeUpSound();
      },
    });

  const startRef = useRef(false);
  const handleClickStart = useCallback(() => {
    playClickSound();
    startRef.current = true;
    start();
  }, [start]);

  const isExpired = !(hours > 0 || minutes > 0 || seconds > 0);

  const handleClickReset = useCallback(() => {
    startRef.current = false;
    restart(convertTimeValueToTimeStamp(timerValueRef.current), false);
  }, [timerValueRef.current]);

  const [isEditing, setIsEditing] = useState(false);

  const { t } = useTranslation();

  return (
    <Card
      className={`border-2 ${
        isExpired ? "border-red-700" : "border-black dark:border-slate-400"
      }`}
      bordered={false}
    >
      <Card.Title className="pl-2 pt-2 flex">
        <Title defaultTitle={defaultTitle} onEditTitle={onEditTitle} />
        <Card.Actions className="flex-none pr-2">
          <Button
            onClick={onClickDelete}
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
      <Card.Body>
        {isEditing && (
          <Edit
            id={id}
            defaultValues={{ hours, minutes, seconds }}
            onClick:cancel={() => setIsEditing(false)}
            onClick:confirm={(timerValue) => {
              timerValueRef.current = timerValue;
              startRef.current = false;
              onEditTimerValue(timerValue);
              restart(convertTimeValueToTimeStamp(timerValue), false);
              setIsEditing(false);
            }}
          />
        )}
        {!isEditing && (
          <>
            <div onClick={() => setIsEditing(true)} className="timer-count">
              <Count
                isExpired={isExpired}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
              />
            </div>
            <Card.Actions className="timer-action grid grid-cols-3 xl:grid-cols-3 pt-0.5 gap-x-6 gap-y-6 xl:gap-x-2">
              {startRef.current ? (
                <Button
                  onClick={resume}
                  disabled={isRunning}
                  size="md"
                  color="primary"
                >
                  {t("timer.action.resume")}
                </Button>
              ) : (
                <Button
                  onClick={handleClickStart}
                  disabled={isRunning}
                  size="md"
                  color="primary"
                >
                  {t("timer.action.start")}
                </Button>
              )}
              <Button
                onClick={pause}
                disabled={!isRunning}
                size="md"
                color="secondary"
              >
                {t("timer.action.pause")}
              </Button>
              <Button onClick={handleClickReset} size="md" color="accent">
                {t("timer.action.reset")}
              </Button>
            </Card.Actions>
          </>
        )}
      </Card.Body>
    </Card>
  );
};
