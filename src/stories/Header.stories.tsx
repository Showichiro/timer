import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Header } from "../components/Header";

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ["autodocs"],
  args: {
    addTimer: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
