import type { Meta, StoryObj } from "@storybook/svelte";
import DemoPage from "./+page.svelte";

const meta = {
  title: "Pages/Home",
  component: DemoPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DemoPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
