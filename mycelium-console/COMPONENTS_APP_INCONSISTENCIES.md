# Components And App Directory Inconsistencies

Scope reviewed on 2026-05-18:

- `src/components`
- `src/app`

Explicitly not reviewed or changed:

- `src/api`
- `src/hooks`

No source code was changed for this review.

## High-Level Findings

- `src/components/ui` contains large compound primitive files that are not split by feature, slot, props, config, or handlers. The worst cases are `ui/sidebar.tsx`, `ui/combobox.tsx`, `ui/command.tsx`, `ui/input-group.tsx`, `ui/dialog.tsx`, and `ui/sheet.tsx`.
- `src/components/features` mixes generic primitives, visual utilities, providers, hooks, and React Flow logic. It is not consistently feature-based.
- `src/components/pages` partially mirrors Next routes, while other route-specific features live directly under `src/app`. `create-project` and `workspace-settings` are component-page folders, but auth and project graph logic remain inside `src/app`.
- `src/app/(app)/projects/[id]/page.tsx` is doing page routing, force-directed graph layout, async service lookups, node transformation, edge transformation, event handling, and rendering in one file.
- `src/components/layout/sheet/_components/logs.tsx` is a log feature hidden inside layout code. It contains data fetching, manual refresh config, log list UI, detail fetching, JSON rendering, collapse animation, formatting helpers, and size formatting in one file.
- `_components` folder usage is inconsistent. It appears under `layout/sheet`, `create-dialog`, and `generate-api-key`, while other related helpers use `components`, `content`, or are colocated directly.
- File naming is inconsistent: `_header.tsx`, `separator copy.tsx`, `magic-ui-beam-edge.tsx`, snake_case variables such as `tabs_content`, `base_path`, and `mushroom_hrefs`.
- `src/components/ui/separator copy.tsx` appears to be a duplicate of `src/components/ui/separator.tsx`.
- `src/components/pages/workspace-settings/tab-content/region-locale/placeholder.tsx` is empty.
- Types and props are generally colocated inside component files instead of separate feature-local type files.
- Component handlers are generally inside component files instead of feature-local handler files.
- Visible config values are scattered through components instead of feature-local config files.

## Files Over 100 Lines

These files violate the file-size rule and should be split into same-feature directories:

| Lines | File |
| ---: | --- |
| 725 | `src/components/ui/sidebar.tsx` |
| 681 | `src/components/layout/sheet/_components/logs.tsx` |
| 299 | `src/components/ui/combobox.tsx` |
| 247 | `src/components/features/react-flow/magic-ui-beam-edge.tsx` |
| 235 | `src/app/(app)/projects/[id]/page.tsx` |
| 192 | `src/components/ui/command.tsx` |
| 191 | `src/components/ui/animated-beam.tsx` |
| 168 | `src/components/pages/create-project/components/projects-view.tsx` |
| 167 | `src/components/ui/input-group.tsx` |
| 166 | `src/app/globals.css` |
| 158 | `src/components/ui/dialog.tsx` |
| 136 | `src/components/ui/sheet.tsx` |

## Main Refactor Targets

`src/app/(app)/projects/[id]/page.tsx` should become a thin route file. Move graph types, layout constants, force-position helpers, node/edge builders, and React Flow handlers into a feature directory such as `src/components/features/project-graph`.

`src/components/layout/sheet/_components/logs.tsx` should become a feature directory. Split controls, list row, metadata row, details dropdown, detail section, JSON rendering, animated collapse, formatters, query config, handlers, and types.

`src/components/ui/sidebar.tsx` should be split into sidebar provider/context, sidebar layout primitives, menu primitives, menu button variants/config, skeleton, sub-menu components, and types.

`src/components/ui/combobox.tsx`, `command.tsx`, `dialog.tsx`, `sheet.tsx`, and `input-group.tsx` should be split into per-component files with separate props/type files and config files.

`src/components/pages/create-project/components/projects-view.tsx` should be split into project list, project card, project card actions, delete dialog, handlers, and card config.

## Cross-Cutting Rule Violations

- Untyped `useState` calls were found in 18 places.
- Overcrowded `useEffect` blocks were found in 6 places.
- Nested ternaries were found in `logs.tsx`.
- Ternaries returning `null` were found in 6 places and should use `&&` where appropriate.
- Inline JSX handlers were found in 25 places.
- Local `type` or `interface` declarations were found in 46 places.
- Prop typing often does not use the required `<ComponentName>Props` interface pattern.
- Nested object literals and nested/spread object construction exist in route/page logic and UI variant config.
- Magic numbers and visible config values are widespread, especially in graph layout, animation, Tailwind utility classes, dialog sizes, log formatting, and SVG gradients.
- Several hardcoded string values should become enums or constants, especially route paths, React Flow node/edge types, log query keys, integration prefixes, panel identifiers, keyboard keys, and status labels.

See `COMPONENTS_APP_NON_COMPLIANCE_DETAILS.md` for line-level details.
