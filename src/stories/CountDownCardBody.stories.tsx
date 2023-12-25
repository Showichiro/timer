import { Meta, StoryObj } from "@storybook/react";
import { CountDownCardBody } from "../components/CountDownCardBody";

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
  },
  argTypes: {
    "onClick:count": { action: "onClick:count" },
    "onClick:start": { action: "onClick:start" },
    "onClick:editCancel": { action: "onClick:editcCancel" },
    "onClick:editConfirm": { action: "onClick:editConfirm" },
    "onClick:pause": { action: "onClick:pause" },
    "onClick:reset": { action: "onClick:reset" },
    "onClick:resume": { action: "onClick:resume" },
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
