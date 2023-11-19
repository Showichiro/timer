import { Meta, StoryObj } from "@storybook/react";
import Title from "../components/Title";

const meta: Meta<typeof Title> = {
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    onEditTitle: { action: "edit title" },
  },
};

export default meta;

export const Default: StoryObj<typeof Title> = {};
