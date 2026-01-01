#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
    .name('module-workflow')
    .description('Utilities for managing virtual modules in the Moonrepo workspace')
    .version('0.0.1');

import { registerAddModuleCommand } from '../commands/add-module.js';
import { registerDeleteModuleCommand } from '../commands/delete-module.js';
import { registerRenameModuleCommand } from '../commands/rename-module.js';

const workspaceRoot = process.cwd();

registerAddModuleCommand(program, workspaceRoot);
registerDeleteModuleCommand(program, workspaceRoot);
registerRenameModuleCommand(program, workspaceRoot);

program.parse(process.argv);
