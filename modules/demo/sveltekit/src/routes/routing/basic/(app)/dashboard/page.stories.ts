import type { Meta, StoryObj } from "@storybook/svelte";
import Page from "./+page.svelte";

const meta = {
  title: "Pages/Routing/Basic/App/Dashboard",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
