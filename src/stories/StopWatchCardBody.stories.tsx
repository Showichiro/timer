import { Meta, StoryObj } from "@storybook/react";
import { StopWatchCardBody } from "../components/StopWatchCardBody";

const meta: Meta<typeof StopWatchCardBody> = {
  component: StopWatchCardBody,
  tags: ["autodocs"],
  args: {
    currentValues: {
      hours: 1,
      minutes: 2,
      seconds: 3,
    },
    "isVisible:start": true,
    "isVisible:resume": false,
    "disabled:pause": true,
    "disabled:reset": true,
    "disabled:resume": true,
    "disabled:start": false,
  },
  argTypes: {
    "onClick:start": { action: "onClick:start" },
    "onClick:pause": { action: "onClick:pause" },
    "onClick:reset": { action: "onClick:reset" },
    "onClick:resume": { action: "onClick:resume" },
  },
};

export default meta;

export const Default: StoryObj<typeof StopWatchCardBody> = {};

export const Running: StoryObj<typeof StopWatchCardBody> = {
  args: {
    "isVisible:start": false,
    "isVisible:resume": true,
    "disabled:pause": false,
    "disabled:resume": true,
    "disabled:reset": false,
  },
};

export const Paused: StoryObj<typeof StopWatchCardBody> = {
  args: {
    "isVisible:start": false,
    "isVisible:resume": true,
    "disabled:pause": true,
    "disabled:reset": false,
    "disabled:resume": false,
    "disabled:start": false,
  },
};
