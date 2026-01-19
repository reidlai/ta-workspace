import type { Meta, StoryObj } from "@storybook/svelte";
import DemoWidget from "./DemoWidget.svelte";
import type { IDemoWidgetStory } from "./DemoWidget.types";
const meta = {
  title: "Widgets/DemoWidget",
  component: DemoWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: "text",
      description: "Status text",
    },
    count: {
      control: "number",
      description: "Counter value",
    },
    onIncrement: { action: "incremented" },
    onStatusChange: { action: "statusChanged" },
  },
} satisfies Meta<IDemoWidgetStory>;

import { useArgs } from '@storybook/preview-api';

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "Story Ready",
    count: 10,
  },
  render: (args: IDemoWidgetStory) => {
    const [{ count }, updateArgs] = useArgs();

    function onIncrement() {
      updateArgs({ count: (count ?? 0) + 1 });
      args.onIncrement?.();
    }

    function onStatusChange(newStatus: string) {
      updateArgs({ status: newStatus });
      args.onStatusChange?.(newStatus);
    }

    return {
      Component: DemoWidget,
      props: {
        ...args,
        onIncrement,
        onStatusChange,
      },
    };
  },
};
