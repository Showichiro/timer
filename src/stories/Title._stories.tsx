import type { Meta, StoryObj } from "@storybook/react";
import { atom } from "jotai";
import Title from "../components/Title";

const meta: Meta<typeof Title> = {
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    titleAtom: atom("timer"),
  },
};

export default meta;

export const Default: StoryObj<typeof Title> = {};
