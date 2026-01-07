import { writable } from "svelte/store";
import type { IThemeConfig } from "virtual-module-core/types";

const initialState: IThemeConfig = {
  mode: "system",
  primaryColor: "slate",
  radius: 0.5,
  style: "default",
};

function createThemeStore() {
  const { subscribe, update, set } = writable<IThemeConfig>(initialState);

  return {
    subscribe,
    setMode: (mode: IThemeConfig["mode"]) => update((s) => ({ ...s, mode })),
    setPrimaryColor: (color: string) =>
      update((s) => ({ ...s, primaryColor: color })),
    reset: () => set(initialState),
  };
}

export const themeStore = createThemeStore();
