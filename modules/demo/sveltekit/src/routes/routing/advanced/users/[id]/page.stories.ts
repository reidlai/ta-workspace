import type { Meta, StoryObj } from "@storybook/svelte";
import Page from "./+page.svelte";

const meta = {
  title: "Pages/Routing/Advanced/Users/[id]",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    data: {
      id: "123-mock-id",
    },
  },
};

export const AdminUser: Story = {
  args: {
    data: {
      id: "admin-001",
    },
  },
};
