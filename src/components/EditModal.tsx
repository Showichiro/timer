import { FC, memo, useCallback } from "react";
import { Button, Modal } from "react-daisyui";
import { useForm } from "react-hook-form";
import { TimerValue } from "../types/TimerValue";

type ModalProps = {
  id: string;
  isOpen: boolean;
  defaultValues: TimerValue;
  onClickClose: () => void;
  onClickComplete: (data: TimerValue) => void;
};

const HourOption = memo(() => (
  <>
    {[...Array(100)].map((_, i) => (
      <option key={`hours-${i}`} value={i}>
        {i}
      </option>
    ))}
  </>
));

const MinutesOption = memo(() => (
  <>
    {[...Array(60)].map((_, i) => (
      <option key={`minutes-${i}`} value={i}>
        {i}
      </option>
    ))}
  </>
));

const SecondsOption = memo(() => (
  <>
    {[...Array(60)].map((_, i) => (
      <option key={`minutes-${i}`} value={i}>
        {i}
      </option>
    ))}
  </>
));

const SubmitButton = memo(() => (
  <Modal.Actions>
    <Button size="sm" type="submit">
      complete
    </Button>
  </Modal.Actions>
));

const EditModal: FC<ModalProps> = ({
  id, isOpen,
  defaultValues,
  onClickClose,
  onClickComplete,
}) => {
  const {
    handleSubmit: onSubmit,
    reset,
    register,
  } = useForm<TimerValue>({
    defaultValues,
  });

  const handleClickClose = useCallback(() => {
    onClickClose();
    reset();
  }, [onClickClose, reset]);

  const handleSubmit = useCallback(
    (formData: TimerValue) => {
      onClickComplete(formData);
      onClickClose();
    },
    [onClickClose]
  );

  return (
    <Modal open={isOpen}>
      <Button
        onClick={handleClickClose}
        size="sm"
        shape="circle"
        className="absolute top-2 right-2"
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
      <Modal.Body>
        <form onSubmit={onSubmit(handleSubmit)}>
          <div className="grid grid-cols-3 gap-3 py-6">
            <label htmlFor={`${id}-hours`}>
              <select
                id={`${id}-hours`}
                className="w-2/3 border-gray border-2"
                {...register("hours")}
              >
                <HourOption />
              </select>
              <span className="pl-1">h</span>
            </label>
            <label htmlFor={`${id}-minutes`}>
              <select
                id={`${id}-minutes`}
                className="w-2/3 border-gray border-2"
                {...register("minutes")}
              >
                <MinutesOption />
              </select>
              <span className="pl-1">m</span>
            </label>
            <label htmlFor={`${id}-seconds`}>
              <select
                id={`${id}-seconds`}
                className="w-2/3 border-gray border-2"
                {...register("seconds")}
              >
                <SecondsOption />
              </select>
              <span className="pl-1">s</span>
            </label>
          </div>
          <SubmitButton />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
