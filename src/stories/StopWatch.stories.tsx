import { Meta, StoryObj } from "@storybook/react";
import { StopWatch } from "../components/StopWatch";

const meta: Meta<typeof StopWatch> = {
  component: StopWatch,
  tags: ["autodocs"],
  argTypes: {
    onClickDelete: { action: "delete button clicked" },
  },
};

export default meta;

export const Default: StoryObj<typeof StopWatch> = {};
