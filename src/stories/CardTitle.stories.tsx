import { Meta, StoryObj } from "@storybook/react";
import { CardTitle } from "../components/CardTitle";
import { atom } from "jotai";

const meta: Meta<typeof CardTitle> = {
  component: CardTitle,
  argTypes: {
    titleAtom: atom("timer"),
    "onClick:deleteButton": { action: "delete button" },
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof CardTitle> = {};
