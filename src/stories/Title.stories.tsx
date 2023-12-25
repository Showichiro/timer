import { Meta, StoryObj } from "@storybook/react";
import Title from "../components/Title";
import { atom } from "jotai";

const meta: Meta<typeof Title> = {
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    titleAtom: atom("timer"),
  },
};

export default meta;

export const Default: StoryObj<typeof Title> = {};
