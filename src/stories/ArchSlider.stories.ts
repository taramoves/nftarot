import type { Meta, StoryObj } from '@storybook/react';

import ArchSlider from '../components/Card/ArchSlider';

const meta: Meta<typeof ArchSlider> = {
  component: ArchSlider,
};

export default meta;
type Story = StoryObj<typeof ArchSlider>;

export const SwiperSlide: Story = {
  args: {
    label: 'ArchSlider'
  },
};