import { Registry } from "virtual-module-core/registry";
import type { DIContainer } from "virtual-module-core/di";

export const gadgetRegistry = Registry.getInstance();

export let appContainer: DIContainer | null = null;

export function setAppContainer(container: DIContainer) {
  appContainer = container;
}
