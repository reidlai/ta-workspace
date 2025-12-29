# Constitutional Amendment: SvelteKit Exception

**Date**: 2025-12-27  
**Amendment Type**: Tech Stack Expansion  
**Section Modified**: Monorepo Architecture & Stack Strategy → Authorized Tech Stack  
**Label**: `constitution-change`

## Change Summary

Add **SvelteKit** as an authorized framework option for modular application shells while maintaining **Next.js** as the primary mandate for new web applications.

## Rationale

### Business Need
- Existing `apps/sv-appshell` is implemented in SvelteKit with a working module loading system (`@ts/registry`)
- SvelteKit's reactive state management and lightweight runtime make it well-suited for plugin/module architectures
- Discarding existing working infrastructure would waste 3-4 weeks of development effort

### Technical Justification
- **Use Case Differentiation**: 
  - Next.js excels at traditional web applications, SSR, and SEO-focused pages
  - SvelteKit excels at highly interactive, component-driven shells with dynamic module loading
- **Architectural Pattern**: Application shells act as hosts for feature modules, a pattern where SvelteKit's compiler-based approach and smaller runtime footprint provide advantages
- **Scope Limitation**: Exception applies only to modular application shells, not general web applications

### Risk Mitigation
- Amendment includes clear criteria: SvelteKit is limited to "modular application shells that implement a plugin/module architecture"
- New standalone applications must still use Next.js unless approved via existing waiver process
- Both frameworks use TypeScript, share testing infrastructure (Cucumber, Vitest), and integrate with Moonrepo

## Amendment Text

**Before**:
```markdown
- **Frontend Layer**: **Next.js** is the mandated framework for all web interfaces and client-side applications.
```

**After**:
```markdown
- **Frontend Layer**: **Next.js** is the mandated framework for all web interfaces and client-side applications.
  - **Exception**: **SvelteKit** is authorized for modular application shells that implement a plugin/module architecture (e.g., `apps/sv-appshell`), where the shell serves as a host for dynamically loaded feature modules. New standalone web applications MUST use Next.js unless approved via waiver.
```

## Approval Requirements

Per constitution section "Governance":
- ☐ **Security Lead** approval
- ☐ **Product Owner (PO)** approval  
- ☐ **Maintainer** approval
- ☐ PR labeled with `constitution-change`
- ☐ CI policy jobs pass

## Impact Assessment

### Affected Systems
- `apps/sv-appshell` (already SvelteKit, now compliant)
- `packages/ts/svelte/features/*` (feature modules for sv-appshell)

###Not Affected
- Future web applications (must use Next.js)
- Backend services (still Golang)
- Build system (still Moonrepo)
- Testing (still Cucumber + Vitest)

### Enforcement
- Constitution check in `/speckit.plan` will now pass for SvelteKit when used in modular shell context
- Code review checklist updated to verify framework choice aligns with use case
- New applications requiring SvelteKit outside of modular shells must follow waiver process

## Alternatives Considered

1. **Maintain Next.js-only mandate, rewrite sv-appshell**: Rejected due to 3-4 week cost and loss of working code
2. **Case-by-case waivers**: Rejected to avoid repeated waiver requests for the same architectural pattern
3. **This amendment**: Accepted as it provides clarity for a valid architectural pattern while preserving Next.js primacy

## Enforcement Date

Effective immediately upon:
1. PR approval by required stakeholders
2. CI policy jobs passing
3. Merge to main branch
