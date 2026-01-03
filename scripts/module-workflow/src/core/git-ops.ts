import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

export class GitOps {
  constructor(private workspaceRoot: string) {}

  /**
   * Adds a git submodule. Supports interactive auth passthrough.
   */
  async addSubmodule(repoUrl: string, moduleName: string): Promise<void> {
    const targetPath = `modules/${moduleName}`;

    // We use stdio: 'inherit' to allow interactive auth (SSH password, etc.)
    await execa("git", ["submodule", "add", "--force", repoUrl, targetPath], {
      cwd: this.workspaceRoot,
      stdio: "inherit",
    });
  }

  /**
   * Removes a git submodule and its config entries
   */
  async removeSubmodule(moduleName: string): Promise<void> {
    const targetPath = `modules/${moduleName}`;

    // De-init
    await execa("git", ["submodule", "deinit", "-f", targetPath], {
      cwd: this.workspaceRoot,
      reject: false, // Ignore if already de-inited
    });

    // Remove from git/modules directory (internal git storage)
    const gitModulesDir = path.join(
      this.workspaceRoot,
      ".git/modules/modules",
      moduleName,
    );
    await fs.remove(gitModulesDir);

    // Remove from git index
    await execa("git", ["rm", "-f", targetPath], {
      cwd: this.workspaceRoot,
      reject: false,
    });

    // Clean up physical directory if it remains
    await fs.remove(path.join(this.workspaceRoot, targetPath));
  }

  async moveDirectory(oldPath: string, newPath: string): Promise<void> {
    // For submodules, standard 'mv' might corrupt git index if not handled carefully.
    // But since we are likely treating it as a folder rename, we typically:
    // 1. git mv old new
    await execa("git", ["mv", oldPath, newPath], {
      cwd: this.workspaceRoot,
    });
  }
}
