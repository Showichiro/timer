import { Meta, StoryObj } from "@storybook/react";
import { StopWatch } from "../components/StopWatch";

const meta: Meta<typeof StopWatch> = {
  component: StopWatch,
  tags: ["autodocs"],
  argTypes: {
    onClickDelete: { action: "delete button clicked" },
    onEditTitle: { action: "edit title" },
  },
};

export default meta;

export const Default: StoryObj<typeof StopWatch> = {};
