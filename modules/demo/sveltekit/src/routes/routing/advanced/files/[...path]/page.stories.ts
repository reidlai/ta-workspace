import type { Meta, StoryObj } from "@storybook/svelte";
import Page from "./+page.svelte";

const meta = {
  title: "Pages/Routing/Advanced/Files/[...path]",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeepNestedPath: Story = {
  args: {
    data: {
      path: "docs/work/2024/reports",
      segments: ["docs", "work", "2024", "reports"],
    },
  },
};

export const RootFile: Story = {
  args: {
    data: {
      path: "readme.txt",
      segments: ["readme.txt"],
    },
  },
};
