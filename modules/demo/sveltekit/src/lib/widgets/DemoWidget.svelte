<script lang="ts">
  import { Button } from "../components/ui/button/index";
  import * as Card from "../components/ui/card/index";
  import { Input } from "../components/ui/input/index";
  import { Label } from "../components/ui/label/index";

  import type { IDemoWidgetStory } from "./DemoWidget.types";
  import { DemoState } from "../states/DemoState.svelte";

  let {
    status: statusProp,
    count: countProp,
    onIncrement,
    onStatusChange,
  }: IDemoWidgetStory = $props();

  let demoState = DemoState.getInstance();

  let status = $derived(statusProp ?? demoState.status ?? "");
  let count = $derived(countProp ?? demoState.count ?? 0);
  let isStorybook = $derived(!!onIncrement);

  function onIncrementCountButtonClick() {
    if (isStorybook) {
      onIncrement?.();
    } else {
      demoState.increment();
    }
  }

  function onStatusChangeHandler(value: string) {
    if (isStorybook) {
      onStatusChange?.(value);
    } else {
      demoState.setStatus(value);
    }
  }
</script>

<div class="p-4">
  <Card.Root>
    <Card.Header>
      <Card.Title>Shared State Demo</Card.Title>
      <Card.Description
        >Updates sync across all modules watching 'demoState.count'</Card.Description
      >
    </Card.Header>
    <Card.Content>
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="status">Current Status</Label>
        <Input
          type="text"
          id="status"
          placeholder="Status"
          value={status}
          oninput={(e) => onStatusChangeHandler(e.currentTarget.value)}
        />
      </div>
      <p class="text-sm">
        Global Count: <span class="text-primary font-bold text-lg">{count}</span
        >
      </p>
    </Card.Content>
    <Card.Footer>
      <Button onclick={onIncrementCountButtonClick} variant="default">
        Increment Global Counter
      </Button>
    </Card.Footer>
  </Card.Root>
</div>
