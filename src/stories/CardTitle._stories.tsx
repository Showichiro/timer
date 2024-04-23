import type { Meta, StoryObj } from "@storybook/react";
import { atom } from "jotai";
import { CardTitle } from "../components/CardTitle";

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
