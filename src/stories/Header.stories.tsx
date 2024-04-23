import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../components/Header";

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ["autodocs"],
  argTypes: { addTimer: { action: "clicked" } },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
