import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../components/Header";
import { fn } from "@storybook/test";

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
