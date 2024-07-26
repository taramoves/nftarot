import type { Meta, StoryObj } from '@storybook/react';

import CardCarousel from '../components/Card/CardCarousel';

const meta: Meta<typeof CardCarousel> = {
  component: CardCarousel,
};

export default meta;
type Story = StoryObj<typeof CardCarousel>;

export const CustomCode: Story = {
  args: {
    label: 'Custom Code'
},
};