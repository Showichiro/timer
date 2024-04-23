import type { Meta, StoryObj } from "@storybook/react";
import { CardWapper } from "../components/CardWrapper";

const meta: Meta<typeof CardWapper> = {
  component: CardWapper,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof CardWapper> = {
  args: { isExpired: false, children: <div>test</div> },
};

export const IsExpired: StoryObj<typeof CardWapper> = {
  args: { isExpired: true, children: <div>test</div> },
};
