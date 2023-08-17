import Joyride from "react-joyride";
import { FC } from "react";

export const SiteTour: FC = () => {
  return (
    <Joyride
      steps={[
        {
          content: (
            <>
              <h2>Thanks for using the timer app.</h2>
              <h3>I'll show you how to use it.</h3>
            </>
          ),
          placement: "center",
          target: "body",
        },
        {
          content: (
            <h2>You can start, stop, and reset the timer by operating here.</h2>
          ),
          target: ".timer-action",
        },
        {
          content: <h2>You can change the name of the timer.</h2>,
          target: ".timer-title",
        },
        {
          content: (
            <h2>You can change the time by touching the time on the timer.</h2>
          ),
          target: ".timer-count",
        },
        {
          content: <h2>You can delete the timer by clicking here.</h2>,
          target: ".timer-delete",
        },
        {
          content: <h2>You can add more timers by clicking here.</h2>,
          target: ".timer-add",
        },
      ]}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
    />
  );
};
