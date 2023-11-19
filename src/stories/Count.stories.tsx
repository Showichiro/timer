import { Meta, StoryObj } from "@storybook/react";
import { Count } from "../components/Count";

const meta: Meta<typeof Count> = {
  component: Count,
  args: {
    hours: 1,
    minutes: 2,
    seconds: 3,
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Count> = {
  args: { isExpired: false },
};

export const Expired: StoryObj<typeof Count> = {
  args: { isExpired: true },
};
