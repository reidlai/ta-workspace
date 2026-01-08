import type { Meta, StoryObj } from '@storybook/svelte';
import DemoWidget from './DemoWidget.svelte';

const meta = {
    title: 'Widgets/DemoWidget',
    component: DemoWidget,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    }
} satisfies Meta<DemoWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
