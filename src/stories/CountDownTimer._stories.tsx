import type { Meta, StoryObj } from "@storybook/react";
import { CountDownTimer } from "../components/CountDownTimer";

const meta: Meta<typeof CountDownTimer> = {
  component: CountDownTimer,
  tags: ["autodocs"],
  args: {},
  argTypes: {
    onClickDelete: { action: "delete button clicked" },
  },
};

export default meta;

export const Default: StoryObj<typeof CountDownTimer> = {};
