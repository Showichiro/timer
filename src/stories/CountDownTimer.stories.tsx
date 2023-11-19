import { Meta, StoryObj } from "@storybook/react";
import { CountDownTimer } from "../components/CountDownTimer";

const meta: Meta<typeof CountDownTimer> = {
  component: CountDownTimer,
  tags: ["autodocs"],
  args: {
    id: "1",
  },
  argTypes: {
    onClickDelete: { action: "delete button clicked" },
    onEditTimerValue: { action: "edit timer value" },
    onEditTitle: { action: "edit title" },
  },
};

export default meta;

export const Default: StoryObj<typeof CountDownTimer> = {};
