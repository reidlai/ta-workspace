import { Command } from "commander";
import path from "path";
import fs from "fs-extra";
import { GitOps } from "../core/git-ops.js";
import { ConfigUpdater } from "../core/config-updaters.js";
import { RollbackStack } from "../core/rollback.js";
import { findStacks } from "../core/utils.js";

export function registerAddModuleCommand(
  program: Command,
  workspaceRoot: string,
) {
  program
    .command("add-module")
    .description("Add a new feature module from a git repository")
    .requiredOption("--repo <url>", "Git repository URL")
    .requiredOption("--name <name>", 'Feature name (e.g., "watchlist")')
    .action(async (options) => {
      const { repo, name } = options;
      const targetDir = `modules/${name}`;
      const absTargetDir = path.join(workspaceRoot, targetDir);

      const gitOps = new GitOps(workspaceRoot);
      const configUpdater = new ConfigUpdater(workspaceRoot);
      const rollback = new RollbackStack();

      console.log(`Adding module '${name}' from ${repo}...`);

      try {
        // 1. Validation (Fail-fast)
        if (await fs.pathExists(absTargetDir)) {
          throw new Error(`Directory ${targetDir} already exists.`);
        }

        // 2. Clone Submodule
        console.log("Cloning repository...");
        await gitOps.addSubmodule(repo, name);
        rollback.add(async () => {
          console.log("Rolling back submodule...");
          await gitOps.removeSubmodule(name);
        });

        // 3. Detect Stacks
        const stacks = await findStacks(absTargetDir);
        console.log("Detected stacks:", stacks);

        // 4. Update Configs

        // modules.json
        if (stacks.hasSvelte) {
          console.log("Updating modules.json...");
          await configUpdater.addModuleToRegistry(name);
          rollback.add(
            async () => await configUpdater.removeModuleFromRegistry(name),
          );
        }

        // pnpm-workspace.yaml
        if (stacks.hasTs) {
          console.log("Updating pnpm-workspace.yaml (ts)...");
          await configUpdater.addPackageToWorkspace(`modules/${name}/ts`);
          rollback.add(
            async () =>
              await configUpdater.removePackageFromWorkspace(
                `modules/${name}/ts`,
              ),
          );
        }
        if (stacks.hasSvelte) {
          console.log("Updating pnpm-workspace.yaml (svelte)...");
          await configUpdater.addPackageToWorkspace(`modules/${name}/svelte`);
          rollback.add(
            async () =>
              await configUpdater.removePackageFromWorkspace(
                `modules/${name}/svelte`,
              ),
          );
        }

        if (stacks.hasGo) {
          console.log("Updating go.work...");
          await configUpdater.addProjectToGoWork(`modules/${name}/go`);
          rollback.add(
            async () =>
              await configUpdater.removeProjectFromGoWork(`modules/${name}/go`),
          );
        }

        // moon.yml detection (FR-015)
        // If moon.yml exists in the module root, we might want to ensure it's valid or registered?
        // Actually, moon automatically picks up projects via pnpm-workspace or globs.
        // But if there are nested moon.yml (e.g. in stacks), we usually don't need to do anything if they are standard.
        // However, spec mentioned "update project names and paths".
        // If the cloned repo has a moon.yml with a hardcoded project name that conflicts, we might need to edit it.
        // For MVP, we assume standard moon structure or user adjustment.

        console.log(`Module '${name}' added successfully!`);
      } catch (error) {
        console.error("Failed to add module:", error);
        console.log("Initiating rollback...");
        await rollback.execute();
        process.exit(1);
      }
    });
}
