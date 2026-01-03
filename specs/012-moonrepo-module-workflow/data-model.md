# Data Model: Virtual Module Structure

## Module Entity

A "Module" is not a single database record but a distributed set of files and configurations adhering to the Virtual Module Architecture.

### Directory Structure

```text
modules/
└── {feature_name}/          # Root of the module (Git Submodule)
    ├── go/                  # Backend Stack (Optional)
    │   ├── go.mod
    │   ├── design/          # Goa Design
    │   └── ...
    ├── ts/                  # TypeScript Logic Stack (Optional)
    │   ├── package.json
    │   └── src/
    ├── svelte/              # Frontend UI Stack (Optional)
    │   ├── package.json
    │   └── src/widgets/
    └── moon.yml             # Module Task Config (Optional/Recommended)
```

## Configuration Mappings

The CLI updates the following "tables" (config files):

| Config File                            | Key / Path               | Value / Structure                                                     |
| -------------------------------------- | ------------------------ | --------------------------------------------------------------------- |
| `apps/sv-appshell/static/modules.json` | `modules.{feature_name}` | `{ "id": "{feature_name}", "src": "/modules/{feature_name}/svelte" }` |
| `pnpm-workspace.yaml`                  | `packages` array         | `modules/{feature_name}/ts`, `modules/{feature_name}/svelte`          |
| `tsconfig.base.json`                   | `compilerOptions.paths`  | `"@modules/{feature_name}-ts/*": ["modules/{feature_name}/ts/src/*"]` |
| `go.work`                              | `use` array              | `modules/{feature_name}/go`                                           |
| `apps/ta-server/go.mod`                | `replace` directive      | `replace {module_path} => ../../modules/{feature_name}/go`            |
