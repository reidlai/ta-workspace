import type { Meta, StoryObj } from "@storybook/svelte";
import Page from "./+page.svelte";

const meta = {
  title: "Pages/Routing/Advanced/Lang/[[lang]]",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultEnglish: Story = {
  args: {
    data: {
      lang: "default",
    },
  },
};

export const French: Story = {
  args: {
    data: {
      lang: "fr",
    },
  },
};

export const Spanish: Story = {
  args: {
    data: {
      lang: "es",
    },
  },
};
