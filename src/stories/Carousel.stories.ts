import type { Meta, StoryObj } from "@storybook/react";

import Carousel from "../components/Card/Carousel";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const CustomSlider: Story = {
  args: {
    label: "Custom Swiper Slide",
  },
};
