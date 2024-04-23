import type { Meta, StoryObj } from "@storybook/react";
import { CountDownCardBody } from "../components/CountDownCardBody";
import { fn } from "@storybook/test";

const meta: Meta<typeof CountDownCardBody> = {
  component: CountDownCardBody,
  tags: ["autodocs"],
  args: {
    currentValues: { hours: 0, minutes: 1, seconds: 2 },
    defaultValues: {
      hours: 10,
      minutes: 11,
      seconds: 12,
    },
    isEditing: false,
    "isVisible:start": true,
    "disabled:pause": true,
    "disabled:reset": false,
    "disabled:resume": false,
    "disabled:start": false,
    "isVisible:resume": false,
    isExpired: false,
    "onClick:count": fn(),
    "onClick:start": fn(),
    "onClick:editCancel": fn(),
    "onClick:editConfirm": fn(),
    "onClick:pause": fn(),
    "onClick:reset": fn(),
    "onClick:resume": fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof CountDownCardBody> = {};

export const Running: StoryObj<typeof CountDownCardBody> = {
  args: {
    isEditing: false,
    isExpired: false,
    "isVisible:resume": true,
    "isVisible:start": false,
    "disabled:pause": false,
    "disabled:resume": true,
    "disabled:reset": false,
    "disabled:start": false,
  },
};

export const Paused: StoryObj<typeof CountDownCardBody> = {
  args: {
    isEditing: false,
    isExpired: false,
    "isVisible:start": false,
    "isVisible:resume": true,
    "disabled:pause": true,
    "disabled:reset": false,
    "disabled:resume": false,
    "disabled:start": false,
  },
};

export const IsExpired: StoryObj<typeof CountDownCardBody> = {
  args: {
    currentValues: { hours: 0, minutes: 0, seconds: 0 },
    isExpired: true,
    isEditing: false,
    "isVisible:resume": true,
    "isVisible:start": false,
    "disabled:pause": true,
    "disabled:reset": false,
    "disabled:resume": true,
    "disabled:start": true,
  },
};

export const IsEditing: StoryObj<typeof CountDownCardBody> = {
  args: {
    isEditing: true,
  },
};
