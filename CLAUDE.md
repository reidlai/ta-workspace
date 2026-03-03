# CLAUDE.md

> Derived from `AGENTS.md` — the Single Source of Truth (SSOT) for all AI agents on the `vibetics-cloudedge` project.

## 1. Identity & Configuration

| Agent Identity  | Command Path        | Config Dir | Instruction Source |
| :-------------- | :------------------ | :--------- | :----------------- |
| **Claude Code** | `.claude/commands/` | `.claude`   | `CLAUDE.md`        |

Wherever documentation refers to `{COMMAND_DIR}`, substitute `.claude/commands/`.

---

## 2. Project Overview

This repository uses a **Spec-Driven Development (SDD)** workflow. Feature development flows through structured phases:

```
specification → clarification → planning → task generation → implementation
```

---

## 3. Workflow Commands

Commands are invoked with `/speckit.<command>` syntax.

### Feature Development Lifecycle

1. **`/speckit.constitution [principles]`** — Create or update `.specify/memory/constitution.md`
   - Defines non-negotiable development principles
   - Uses semantic versioning (MAJOR.MINOR.PATCH)

2. **`/speckit.specify <feature description>`** — Create `specs/###-feature/spec.md`
   - Focus: **WHAT** and **WHY** (business requirements, user scenarios)
   - Avoid: **HOW** (no tech stack, APIs, or implementation details)

3. **`/speckit.clarify`** — Resolve spec ambiguities (**run BEFORE** `/speckit.plan`)
   - Asks up to 5 targeted clarification questions
   - Updates `spec.md` with answers in `## Clarifications` section

4. **`/speckit.plan [context]`** — Generate design artifacts from completed `spec.md`
   - Creates: `research.md`, `data-model.md`, `contracts/`, `quickstart.md`
   - Validates against constitution principles
   - Does **NOT** create `tasks.md` — use `/speckit.tasks` next

5. **`/speckit.tasks [context]`** — Generate `tasks.md` from completed `plan.md`
   - Tasks marked `[P]` can run in parallel
   - Sequential tasks must run in order

6. **`/speckit.analyze`** — Cross-artifact consistency validation (**run AFTER** `/speckit.tasks`)
   - **Read-only** — never modifies files
   - Detects: duplications, ambiguities, coverage gaps, constitution violations
   - Severity levels: CRITICAL, HIGH, MEDIUM, LOW

7. **`/speckit.implement`** — Execute tasks from `tasks.md`
   - Phases: Setup → Tests → Core → Integration → Polish
   - Marks completed tasks with `[X]` in `tasks.md`

### Execution Order

```
/speckit.constitution   # if not already defined
/speckit.specify        # create feature spec
/speckit.clarify        # resolve ambiguities
/speckit.plan           # generate design artifacts
/speckit.tasks          # create task breakdown
/speckit.analyze        # optional: validate consistency
/speckit.implement      # execute tasks
```

---

## 4. Repository Structure

```
.specify/
├── memory/
│   └── constitution.md         # Project constitution (template)
├── scripts/bash/               # Helper scripts
│   ├── check-prerequisites.sh
│   ├── create-new-feature.sh
│   ├── setup-plan.sh
│   └── common.sh
└── templates/                  # Artifact templates
    ├── spec-template.md
    ├── plan-template.md
    ├── tasks-template.md
    └── agent-file-template.md

specs/###-feature/              # Generated per feature
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md

apps/                           # Applications (moonrepo)
packages/
├── node/
├── sveltekit/
├── nextjs/
├── go/
└── rust/

features/                       # Cucumber BDD scenarios (@smoke, @integration, @api)
tests/
├── unit/                       # Isolated unit tests (mocks only)
├── integration/                # Playwright integration tests
└── contract/                   # API contract tests

.github/workflows/              # CI/CD pipelines (ci.yaml, cd-{env}.yaml)
deploy/docker/                  # Dockerfile, entrypoint.sh
threat_modelling/reports/       # Security scan outputs
```

---

## 5. Key Workflow Scripts

All scripts must be run from the repository root.

```bash
# Check prerequisites — returns FEATURE_DIR, AVAILABLE_DOCS, BRANCH, REPO_ROOT
.specify/scripts/bash/check-prerequisites.sh --json
.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks
.specify/scripts/bash/check-prerequisites.sh --json --paths-only

# Create new feature branch and initialize spec file — returns BRANCH_NAME, SPEC_FILE
.specify/scripts/bash/create-new-feature.sh --json "feature description"

# Set up plan — returns FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH
.specify/scripts/bash/setup-plan.sh --json
```

---

## 6. Development Principles

### Constitution Authority
- The constitution (`.specify/memory/constitution.md`) is **non-negotiable**
- All design artifacts must validate against constitution principles
- Violations are flagged as CRITICAL during `/speckit.analyze`
- **All implementations must follow 12-Factor and SOLID principles**

### Test-Driven Development (TDD)
- Tests are written first, user-approved, then confirmed failing before implementation begins
- Test tasks appear before implementation tasks in `tasks.md`

### Artifact Separation
| Artifact    | Audience                    | Focus              |
| :---------- | :-------------------------- | :----------------- |
| `spec.md`   | Non-technical stakeholders  | Business requirements |
| `plan.md`   | Developers                  | Technical architecture |
| `tasks.md`  | Execution                   | Implementation steps |

---

## 7. Tech Stack

| Layer      | Technology                              |
| :--------- | :-------------------------------------- |
| Monorepo   | moonrepo (`apps/`, `packages/`)         |
| Frontend   | SvelteKit or Next.js                    |
| Backend    | Go or Rust                              |
| CI         | GitHub Actions (multi-env promotion)    |
| CD         | Cloud provider deployment tool          |

### Security Tools
| Concern   | Tool        |
| :-------- | :---------- |
| Secrets   | gitleaks    |
| SCA       | checkov     |
| SAST      | Semgrep     |
| Container | Trivy       |
| DAST      | OWASP ZAP   |

---

## 8. Important Notes

- All file paths returned by scripts are **absolute paths**
- `/speckit.plan` does **NOT** create `tasks.md` — always follow with `/speckit.tasks`
- `/speckit.analyze` is **read-only** and never modifies files
- Run `/speckit.clarify` **before** `/speckit.plan` to reduce rework
- Templates contain placeholders like `[FEATURE_NAME]` replaced at execution time
- **Out of scope**: Cloud infrastructure settings for other projects
