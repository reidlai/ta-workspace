import { z } from "zod";

// DemoStateSchema is is based on rune in sveltekit/src/lib/runes/DemoState.svelte.ts
const DemoStateSchema = z.object({
  status: z.string().nullable(),
  count: z.number().min(0),
});

export const schemas = {
  DemoStateSchema,
};
