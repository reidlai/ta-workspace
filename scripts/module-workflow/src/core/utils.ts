import fs from "fs-extra";
import path from "path";

export interface ModuleStacks {
  hasGo: boolean;
  hasTs: boolean;
  hasSvelte: boolean;
  hasMoon: boolean;
}

export async function findStacks(modulePath: string): Promise<ModuleStacks> {
  const stacks: ModuleStacks = {
    hasGo: false,
    hasTs: false,
    hasSvelte: false,
    hasMoon: false,
  };

  if (await fs.pathExists(path.join(modulePath, "go"))) {
    stacks.hasGo = true;
  }

  if (await fs.pathExists(path.join(modulePath, "ts"))) {
    stacks.hasTs = true;
  }

  if (await fs.pathExists(path.join(modulePath, "svelte"))) {
    stacks.hasSvelte = true;
  }

  if (await fs.pathExists(path.join(modulePath, "moon.yml"))) {
    stacks.hasMoon = true;
  }

  return stacks;
}
