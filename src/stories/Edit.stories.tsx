import type { Meta, StoryObj } from "@storybook/react";
import { Edit } from "../components/Edit";

const meta: Meta<typeof Edit> = {
  component: Edit,
  argTypes: {
    "onClick:cancel": { action: "cancel" },
    "onClick:confirm": { action: "confirm" },
  },
  args: {
    defaultValues: {
      hours: 1,
      minutes: 20,
      seconds: 30,
    },
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Edit> = {};
