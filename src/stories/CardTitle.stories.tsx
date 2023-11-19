import { Meta, StoryObj } from "@storybook/react";
import { CardTitle } from "../components/CardTitle";

const meta: Meta<typeof CardTitle> = {
  component: CardTitle,
  argTypes: {
    "onEdit:title": { action: "edit title" },
    "onClick:deleteButton": { action: "delete button" },
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof CardTitle> = {};
