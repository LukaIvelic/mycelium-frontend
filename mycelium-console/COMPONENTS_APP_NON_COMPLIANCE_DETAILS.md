# Components And App Non-Compliance Details

Scope reviewed on 2026-05-18:

- `src/components`
- `src/app`

Explicitly excluded:

- `src/api`
- `src/hooks`

This file documents non-compliant code and structure only. No source files were changed.

## File Length Violations

Rule: no file should exceed 100 lines of code.

| Lines | File | Split Direction |
| ---: | --- | --- |
| 725 | `src/components/ui/sidebar.tsx` | Split into context/provider, layout primitives, group primitives, menu primitives, menu config, skeleton, submenu, and types. |
| 681 | `src/components/layout/sheet/_components/logs.tsx` | Split into logs feature folder: controls, list, row, detail dropdown, detail sections, JSON renderer, collapse, formatters, handlers, config, types. |
| 299 | `src/components/ui/combobox.tsx` | Split each compound slot into files and move props/types/config out. |
| 247 | `src/components/features/react-flow/magic-ui-beam-edge.tsx` | Split types, geometry helpers, beam config, and edge component. |
| 235 | `src/app/(app)/projects/[id]/page.tsx` | Make route thin; move graph layout, node/edge builders, constants, handlers, and types to a project graph feature. |
| 192 | `src/components/ui/command.tsx` | Split command slots and props/types. |
| 191 | `src/components/ui/animated-beam.tsx` | Split geometry calculation, resize observer handler, config, and component. |
| 168 | `src/components/pages/create-project/components/projects-view.tsx` | Split project list, card, actions menu, delete dialog, handlers, and props/types. |
| 167 | `src/components/ui/input-group.tsx` | Split input group root, addon, button, input, textarea, variants, and types. |
| 166 | `src/app/globals.css` | Split global tokens/base styles from component utility classes if those are feature-level styles. |
| 158 | `src/components/ui/dialog.tsx` | Split dialog slots and props/types. |
| 136 | `src/components/ui/sheet.tsx` | Split sheet slots and props/types. |

## Untyped useState Calls

Rule: every `useState` call must have explicit types.

- `src/app/(app)/projects/[id]/page.tsx:110`: `useState(false)`
- `src/components/features/input.tsx:19`: `useState(false)`
- `src/components/layout/sheet/_components/logs.tsx:39`: `useState(false)`
- `src/components/layout/sheet/_components/logs.tsx:364`: `useState(true)`
- `src/components/layout/sheet/_components/logs.tsx:502`: `useState(0)`
- `src/components/layout/sidebar/app-sidebar-content.tsx:27`: `useState(false)`
- `src/components/layout/sidebar/footer/app-sidebar-footer.tsx:15`: `useState(false)`
- `src/components/pages/create-project/components/_header.tsx:13`: `useState(false)`
- `src/components/pages/create-project/components/create-dialog/create-project-command.tsx:23`: `useState('')`
- `src/components/pages/create-project/components/create-dialog/create-project-command.tsx:24`: `useState('')`
- `src/components/pages/create-project/components/projects-view.tsx:57`: `useState(false)`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/api-key-copy-field.tsx:10`: `useState(false)`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/generate-api-key.tsx:14`: `useState(false)`
- `src/components/ui/animated-beam.tsx:53`: `useState('')`
- `src/components/ui/animated-beam.tsx:54`: `useState({ width: 0, height: 0 })`
- `src/components/ui/sidebar.tsx:69`: `React.useState(false)`
- `src/components/ui/sidebar.tsx:73`: `React.useState(defaultOpen)`
- `src/components/ui/sidebar.tsx:610`: `React.useState(() => { return ... })`

## useState Ordering Violations

Rule: at the top of a function, `useState` variables must be defined first, then destructured variables. Exceptions only when values depend on each other.

- `src/app/(app)/projects/[id]/page.tsx:115-125`: derived `visibleEdges` is declared before hook/destructured values such as `projectId`, `useFindByProjectId`, `findById`, and `openSheet`.
- `src/app/auth/page.tsx:14-17`: router, ref, and auth destructuring occur before `useState`.
- `src/app/auth/login/page.tsx:13-17`: router, refs, and auth destructuring occur before `useState`.
- `src/app/auth/signup/page.tsx:13-20`: router, refs, and auth destructuring occur before `useState`.
- `src/components/features/mushroom-carousel.tsx:16-17`: local display-time config is declared before `useState`.
- `src/components/layout/header/project-activities/project-activities.tsx:10-12`: route params and sidebar destructuring occur before `useState`.
- `src/components/layout/sheet/_components/logs.tsx:31-39`: query client, hooks, and fetched data are declared before `isRefreshing` state.
- `src/components/pages/create-project/components/projects-view.tsx:29-31`: router hook is declared before state.
- `src/components/ui/animated-beam.tsx:52-54`: `useId` is called before state declarations.
- `src/components/ui/sidebar.tsx:68-73`: `useIsMobile` is called before state declarations.

## Overcrowded Effects

Rule: `useEffect` should not be overcrowded with code.

- `src/app/(app)/projects/[id]/page.tsx:131`: 69-line effect fetches layout, computes force positions, resolves services, builds nodes, builds edges, and commits state.
- `src/components/layout/sheet/_components/logs.tsx:41`: 12-line effect computes log IDs and reconciles open log state.
- `src/components/layout/sheet/sheet.tsx:41`: 10-line effect maps fetched service data into local state.
- `src/components/layout/sidebar/footer/footer.utils.ts:14`: 23-line effect defines and manages pointer/keyboard listeners.
- `src/components/ui/animated-beam.tsx:71`: 55-line effect computes SVG geometry, creates resize observer, observes DOM, and cleans up.
- `src/components/ui/sidebar.tsx:98`: 14-line effect defines keyboard shortcut handler and listener lifecycle.

## Nested Ternaries And Null Ternaries

Rules: nested ternaries should be rewritten for readability. Conditional render with false value `null` should use `&&` where appropriate.

Nested ternaries:

- `src/components/layout/sheet/_components/logs.tsx:309`: `isLoading ? ... : hasHeaders || hasBody ? ... : ...`
- `src/components/layout/sheet/_components/logs.tsx:313`: nested conditional section rendering inside the detail dropdown.
- `src/components/layout/sheet/_components/logs.tsx:581`: header label uses `headerCount > 0 ? ... headerCount === 1 ? ... : ... : ...`

Ternaries returning `null`:

- `src/app/(app)/projects/[id]/page.tsx:228`: `hasMounted ? <Controls ... /> : null`
- `src/components/features/react-flow/magic-ui-beam-edge.tsx:175`: `endpoints ? calcBeamCoords(...) : null`
- `src/components/layout/sheet/_components/logs.tsx:315`: `hasHeaders ? <LogDetailSection ... /> : null`
- `src/components/layout/sheet/_components/logs.tsx:334`: `detail?.body ? <LogDetailSection ... /> : null`
- `src/components/layout/sheet/sheet.tsx:36`: `selectedId.startsWith(...) ? ... : null`
- `src/components/layout/sidebar/footer/app-sidebar-footer.tsx:24`: `open ? <ProfilePopup ... /> : null`

## Component Handlers In Component Files

Rule: component handlers should be in their own files in the same feature-based directory.

- `src/app/auth/page.tsx:19`: `handleContinueClick`
- `src/app/auth/login/page.tsx:19`: `handleLogin`
- `src/app/auth/signup/page.tsx:22`: `handleSignUp`
- `src/components/features/input.tsx:26`: `handleFocus`
- `src/components/features/input.tsx:31`: `handleBlur`
- `src/components/layout/header/project-activities/project-activities.tsx:14`: `togglePanel`
- `src/components/layout/sheet/_components/logs.tsx:60`: `handleToggleAll`
- `src/components/layout/sheet/_components/logs.tsx:70`: `handleToggleLog`
- `src/components/layout/sheet/_components/logs.tsx:84`: `handleRefresh`
- `src/components/layout/sidebar/footer/app-sidebar-footer.tsx:17`: `closePopup`
- `src/components/layout/sidebar/footer/footer.utils.ts:17`: `onPointerDown`
- `src/components/layout/sidebar/footer/footer.utils.ts:23`: `onEscape`
- `src/components/pages/create-project/components/projects-view.tsx:59`: `handleClick`
- `src/components/pages/create-project/components/projects-view.tsx:64`: `handleDelete`
- `src/components/pages/create-project/components/create-dialog/create-project-command.tsx:37`: `handleCreate`
- `src/components/pages/create-project/components/create-dialog/create-project-command.tsx:47`: `reset`
- `src/components/pages/create-project/components/create-dialog/create-project-command.tsx:52`: `handleOpenChange`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/api-key-copy-field.tsx:12`: `handleCopy`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/api-key-item.tsx:30`: `handleApiKeyRevoke`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/create-api-key-command.tsx:39`: `handleGenerateApiKey`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/create-api-key-command.tsx:47`: `handleOpenChange`
- `src/components/ui/sidebar.tsx:93`: `toggleSidebar`
- `src/components/ui/sidebar.tsx:99`: `handleKeyDown`

## Inline JSX Handlers

Rule: avoid inline lambdas except where clearly necessary, and keep handlers out of components.

- `src/app/(app)/projects/[id]/page.tsx:209`: `onEdgesChange={() => {}}`
- `src/app/(app)/projects/[id]/page.tsx:215`: `onNodeClick={(_, node) => { ... }}`
- `src/app/(app)/projects/[id]/page.tsx:219`: `onPaneClick={() => { ... }}`
- `src/app/(app)/projects/[id]/page.tsx:223`: `onNodesChange={(changes: NodeChange[]) => { ... }}`
- `src/app/auth/page.tsx:76`: alternative button `onClick={() => { ... }}`
- `src/components/features/tabs.tsx:46`: `onClick={() => setActiveTab?.(item)}`
- `src/components/layout/header/project-activities/project-activities.tsx:33`: `onClick={() => togglePanel(panel, content(projectId))}`
- `src/components/layout/sheet/_components/logs.tsx:131`: `onToggle={() => handleToggleLog(log.id)}`
- `src/components/layout/sheet/_components/logs.tsx:370`: `onClick={() => setIsOpen((open) => !open)}`
- `src/components/layout/sidebar/app-sidebar-content.tsx:49`: `onClick={() => setSettingsOpen((prev) => !prev)}`
- `src/components/layout/sidebar/content/entry-list.tsx:29`: `onClick={() => onClick?.(router)}`
- `src/components/layout/sidebar/footer/app-sidebar-footer.tsx:36`: `onClick={() => setOpen((prev) => !prev)}`
- `src/components/layout/sidebar/footer/entry-list.tsx:26`: `onClick={() => { onClick?.(router); onSelect?.(); }}`
- `src/components/pages/create-project/components/_header.tsx:30`: `onClick={() => setCreateOpen(true)}`
- `src/components/pages/create-project/components/create-dialog/_components/create-project-form.tsx:23`: `onChange={(e) => onProjectNameChange(e.target.value)}`
- `src/components/pages/create-project/components/create-dialog/_components/create-project-form.tsx:32`: `onChange={(e) => onDescriptionChange(e.target.value)}`
- `src/components/pages/create-project/components/create-dialog/create-project-command.tsx:74`: `onClose={() => handleOpenChange(false)}`
- `src/components/pages/create-project/components/projects-view.tsx:89`: `onClick={() => setIsDeleteDialogOpen(true)}`
- `src/components/pages/create-project/components/projects-view.tsx:151`: `onClick={() => setIsDeleteDialogOpen(false)}`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/api-key-name-input.tsx:12`: `onChange={(e) => onChange(e.target.value)}`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/create-api-key-command.tsx:84`: `onClose={() => handleOpenChange(false)}`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/generate-api-key.tsx:33`: `onClick={() => setCreateOpen(true)}`
- `src/components/ui/input-group.tsx:58`: inline `onClick`
- `src/components/ui/input-group.tsx:64`: inline `onKeyDown`
- `src/components/ui/sidebar.tsx:270`: inline `onClick`

## Local Types And Interfaces

Rule: types should be in their own file. If feature-based, they should stay in the same feature directory.

- `src/app/(app)/layout.tsx:12`: `AppLayoutProps`
- `src/app/(app)/projects/[id]/page.tsx:34`: `Props`
- `src/app/(app)/projects/[id]/page.tsx:42`: `GraphNode`
- `src/app/(app)/projects/[id]/page.tsx:50`: `GraphEdge`
- `src/app/(app)/projects/[id]/page.tsx:55`: `ForceNode`
- `src/app/auth/_page.config.ts:4`: `Alternative`
- `src/app/auth/layout.tsx:9`: `AuthLayoutProps`
- `src/app/layout.tsx:16`: `RootLayoutProps`
- `src/components/features/button.tsx:9`: `ButtonProps`
- `src/components/features/centered.tsx:3`: `CenteredProps`
- `src/components/features/input.tsx:6`: `InputProps`
- `src/components/features/mushroom-carousel.tsx:11`: `MushroomCarouselProps`
- `src/components/features/providers.tsx:7`: `ProvidersProps`
- `src/components/features/react-flow/magic-ui-beam-edge.tsx:11`: `MagicBeamEdgeData`
- `src/components/features/react-flow/magic-ui-beam-edge.tsx:22`: `EdgeEndpoints`
- `src/components/features/react-flow/magic-ui-beam-edge.tsx:72`: `BeamCoords`
- `src/components/features/react-flow/project-node.tsx:7`: `CustomNodeProps`
- `src/components/features/react-flow/project-node.tsx:46`: `NodeContentProps`
- `src/components/features/tabs.tsx:5`: `TabItemProps`
- `src/components/features/tabs.tsx:32`: `TabsProps`
- `src/components/features/truncate.tsx:11`: `TruncateProps`
- `src/components/layout/header/project-activities/project-activities.config.tsx:9`: `Panel`
- `src/components/layout/header/project-activities/project-activities.config.tsx:11`: `HeaderAction`
- `src/components/layout/right-sidebar/content/requests.tsx:18`: `RequestContentProps`
- `src/components/layout/sheet/_components/logs.tsx:17`: `LogsProps`
- `src/components/layout/sheet/_components/logs.tsx:21`: `JsonPrimitive`
- `src/components/layout/sheet/_components/logs.tsx:22`: `JsonValue`
- `src/components/layout/sidebar/app-sidebar-content.tsx:22`: `AppSidebarContentProps`
- `src/components/layout/sidebar/content/content.config.ts:12`: `SidebarEntry`
- `src/components/layout/sidebar/content/entry-list.tsx:12`: `EntryListProps`
- `src/components/layout/sidebar/footer/app-sidebar-footer.tsx:10`: `AppSidebarFooterProps`
- `src/components/layout/sidebar/footer/entry-list.tsx:12`: `EntryListProps`
- `src/components/layout/sidebar/footer/footer.config.ts:12`: `MenuEntry`
- `src/components/layout/sidebar/footer/profile-card.tsx:5`: `ProfileCardProps`
- `src/components/layout/sidebar/footer/profile-popup.tsx:11`: `ProfilePopupProps`
- `src/components/layout/sidebar/footer/profile-trigger.tsx:5`: `ProfileTriggerProps`
- `src/components/pages/create-project/components/create-dialog/_components/create-project-footer.tsx:4`: `CreateProjectFooterProps`
- `src/components/pages/create-project/components/create-dialog/_components/create-project-form.tsx:5`: `CreateProjectFormProps`
- `src/components/pages/create-project/components/create-dialog/create-project-command.tsx:14`: `CreateProjectCommandProps`
- `src/components/pages/create-project/components/projects-view.tsx:51`: `ProjectCardProps`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/api-usage.tsx:5`: `ApiUsageItemProps`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/create-api-key-command.tsx:16`: `CreateApiKeyCommandProps`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/create-api-key-form.tsx:8`: `CreateApiKeyFormProps`
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/project-selector.tsx:12`: `ProjectSelectorProps`
- `src/components/ui/animated-beam.tsx:9`: `AnimatedBeamProps`
- `src/components/ui/sidebar.tsx:34`: `SidebarContextProps`

## Props Interface Pattern Violations

Rule: components should use a dedicated interface named `<ComponentName>Props`, then use destructuring like `function Component({ field }: ComponentProps)`.

- `src/app/(app)/projects/[id]/page.tsx:109`: `Page` uses `Props`, not `PageProps`.
- `src/app/layout.tsx:20`: `RootLayout` uses `Readonly<RootLayoutProps>`, not direct `RootLayoutProps`.
- `src/components/features/react-flow/magic-ui-beam-edge.tsx:133`: `MagicBeamEdge` uses an inline intersection type.
- `src/components/features/tabs.tsx:11`: `TabItem` uses `TabItemProps & { className?: string }`.
- `src/components/layout/right-sidebar/content/requests.tsx:22`: `RequestsContent` uses `RequestContentProps`, but component name is plural and type name is singular.
- `src/components/layout/sheet/_components/logs.tsx:140`: `LogsControls` uses an inline object type.
- `src/components/layout/sheet/_components/logs.tsx:184`: `LogMetaRow` uses an inline object type.
- `src/components/layout/sheet/_components/logs.tsx:250`: `LogDetailsDropdown` uses an inline object type.
- `src/components/layout/sheet/_components/logs.tsx:355`: `LogDetailSection` uses an inline object type.
- `src/components/layout/sheet/_components/logs.tsx:397`: `LogDetailKeyValueRow` uses an inline object type.
- `src/components/layout/sheet/_components/logs.tsx:412`: `LogDetailBodyContent` uses an inline object type.
- `src/components/layout/sheet/_components/logs.tsx:436`: `LogDetailJsonValue` uses an inline object type.
- `src/components/layout/sheet/_components/logs.tsx:474`: `LogDetailPrimitiveValue` uses an inline object type.
- `src/components/layout/sheet/_components/logs.tsx:492`: `AnimatedCollapse` uses an inline object type.
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/api-key-copy-field.tsx:9`: `ApiKeyCopyField` uses an inline object type.
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/api-key-item.tsx:12`: `ApiKeyItem` uses an inline object type.
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/api-key-name-input.tsx:4`: `ApiKeyNameInput` uses an inline object type.
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/create-api-key-footer.tsx:4`: `CreateApiKeyFooter` uses an inline object type.
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/generated-api-key-display.tsx:6`: `GeneratedApiKeyDisplay` uses an inline object type.
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/project-selector.tsx:52`: `ProjectComboboxItem` uses an inline object type.
- `src/components/ui/animated-beam.tsx:31`: `AnimatedBeam` is a `React.FC` arrow function and does not use function parameter typing in the required form.
- `src/components/ui/button.tsx:43`: `Button` uses primitive and variant types inline instead of `ButtonProps`.
- `src/components/ui/combobox.tsx`: all compound components use primitive prop types inline instead of `<ComponentName>Props`.
- `src/components/ui/command.tsx`: all compound components use primitive or inline prop types instead of `<ComponentName>Props`.
- `src/components/ui/dialog.tsx`: all compound components use primitive or inline prop types instead of `<ComponentName>Props`.
- `src/components/ui/dropdown-menu.tsx`: all compound components use primitive or inline prop types instead of `<ComponentName>Props`.
- `src/components/ui/hover-card.tsx`: all compound components use primitive or inline prop types instead of `<ComponentName>Props`.
- `src/components/ui/input-group.tsx`: all compound components use primitive or inline prop types instead of `<ComponentName>Props`.
- `src/components/ui/input.tsx:6`: `Input` uses `React.ComponentProps<'input'>`.
- `src/components/ui/kbd.tsx`: `Kbd` and `KbdGroup` use primitive prop types.
- `src/components/ui/separator copy.tsx:7`: `Separator` uses primitive prop types.
- `src/components/ui/separator.tsx:7`: `Separator` uses primitive prop types.
- `src/components/ui/sheet.tsx`: all compound components use primitive or inline prop types instead of `<ComponentName>Props`.
- `src/components/ui/sidebar.tsx`: all compound components use primitive, inline, or intersection prop types instead of `<ComponentName>Props`.
- `src/components/ui/skeleton.tsx:3`: `Skeleton` uses primitive prop types.
- `src/components/ui/spinner.tsx:5`: `Spinner` uses primitive prop types.
- `src/components/ui/textarea.tsx:5`: `Textarea` uses primitive prop types.
- `src/components/ui/toggle.tsx:30`: `Toggle` uses primitive and variant types inline.
- `src/components/ui/tooltip.tsx`: all compound components use primitive or inline prop types instead of `<ComponentName>Props`.

## Nested Objects And Object Spreads

Rules: avoid nested object literals where extractable. Avoid nested spread operators where unnecessary.

Nested object literals:

- `src/app/(app)/projects/[id]/page.tsx:147`: node object contains nested `data` and nested `service`.
- `src/app/(app)/projects/[id]/page.tsx:168`: node object contains nested `data` and nested `service`.
- `src/components/ui/button.tsx:8`: `buttonVariants` contains nested `variants`, `variant`, `size`, and `defaultVariants`.
- `src/components/ui/input-group.tsx:27`: `inputGroupAddonVariants` contains nested variant config.
- `src/components/ui/input-group.tsx:79`: `inputGroupButtonVariants` contains nested variant config.
- `src/components/ui/sidebar.tsx:400`: `useRender` call contains nested render config and nested state object.
- `src/components/ui/sidebar.tsx:424`: `useRender` call contains nested render config and nested state object.
- `src/components/ui/sidebar.tsx:481`: `sidebarMenuButtonVariants` contains nested variant config.
- `src/components/ui/sidebar.tsx:515`: `SidebarMenuButton` render config contains nested props and state.
- `src/components/ui/sidebar.tsx:564`: `SidebarMenuAction` render config contains nested props and state.
- `src/components/ui/sidebar.tsx:679`: `SidebarMenuSubButton` render config contains nested props and state.
- `src/components/ui/toggle.tsx:10`: `toggleVariants` contains nested variant config.

Object spreads:

- `src/app/(app)/projects/[id]/page.tsx:147`: outer node spread `...n`.
- `src/app/(app)/projects/[id]/page.tsx:151`: nested data spread `...n.data`.
- `src/app/(app)/projects/[id]/page.tsx:168`: outer node spread `...n`.
- `src/app/(app)/projects/[id]/page.tsx:172`: nested data spread `...n.data`.
- `src/app/(app)/projects/[id]/page.tsx:189`: edge spread `...e`.
- `src/components/ui/sidebar.tsx:136`: style object spreads `...style` into CSS variables.

## Visible Config Values In Component Files

Rule: visible config values should move to feature-local config files. If config values require props, expose config factories/functions that accept prop data.

- `src/app/(app)/projects/[id]/page.tsx:38`: `edgeTypes` lives in the page file.
- `src/app/(app)/projects/[id]/page.tsx:65-96`: force graph constants and simulation settings live in the page file.
- `src/app/(app)/projects/[id]/page.tsx:142-144`: integration prefix parsing is inline.
- `src/app/(app)/projects/[id]/page.tsx:153` and `174`: microservice counts are hardcoded.
- `src/app/(app)/projects/[id]/page.tsx:202-212`: canvas size and zoom settings are inline.
- `src/components/features/mushroom-carousel.tsx:6-17`: image base path, image count, filename convention, and display time live in the component.
- `src/components/features/react-flow/magic-ui-beam-edge.tsx:139-149`: beam defaults, colors, opacity, width, duration, and radius live in the component.
- `src/components/features/react-flow/project-node.tsx:13`: `SIDES` config lives in the component file.
- `src/components/features/react-flow/project-node.tsx:82`: `nodeTypes` config lives in the component file.
- `src/components/layout/sheet/sheet.tsx:17-30`: tab labels and tab content live in the component and depend on selected integration ID. This should become a config factory.
- `src/components/layout/sheet/_components/logs.tsx:23-28`: `manualRefreshQueryOptions` lives in the component file.
- `src/components/layout/sheet/_components/logs.tsx:552-632`: log detail summary item config is built inline.
- `src/components/layout/header/project-activities/project-activities.config.tsx:18-37`: actions are in a config file, but panel IDs should be enum values and null content actions should be explicit disabled/placeholder config.
- `src/components/layout/sidebar/content/content.config.ts:19-41`: routes and labels are config, but route strings and labels should use constants/enums where non-content.
- `src/components/layout/sidebar/footer/footer.config.ts:19-40`: menu config calls a hook inside an action; this is not safe config.
- `src/components/pages/workspace-settings/tab-content/api-access/_components/api-usage.tsx:34-45`: usage metrics are hardcoded visible config.
- `src/components/ui/button.tsx`, `input-group.tsx`, `sidebar.tsx`, and `toggle.tsx`: CVA variant objects are config inside component files.

## Magic Numbers

Rule: no magic numbers ever.

High-impact examples:

- `src/app/(app)/projects/[id]/page.tsx:65`: `80`, `240`
- `src/app/(app)/projects/[id]/page.tsx:67`: `2`
- `src/app/(app)/projects/[id]/page.tsx:84-90`: `340`, `0.35`, `-900`, `220`, `0.06`, `0`
- `src/app/(app)/projects/[id]/page.tsx:94`: `220`
- `src/app/(app)/projects/[id]/page.tsx:140`: `{ x: 0, y: 0 }`
- `src/app/(app)/projects/[id]/page.tsx:153`: `0`
- `src/app/(app)/projects/[id]/page.tsx:174`: `10`
- `src/app/(app)/projects/[id]/page.tsx:211-212`: `1`, `0.75`
- `src/components/features/mushroom-carousel.tsx:7-17`: `6`, `1`, `500`, `0`
- `src/components/features/mushroom-carousel.tsx:36-37`: image dimensions `100`
- `src/components/features/react-flow/magic-ui-beam-edge.tsx:32-36`: `0`, `2`
- `src/components/features/react-flow/magic-ui-beam-edge.tsx:88-96`: `1`, `0.5`
- `src/components/features/react-flow/magic-ui-beam-edge.tsx:140-146`: `1.5`, `0`, `2.5`, `0.25`, `16`
- `src/components/features/react-flow/magic-ui-beam-edge.tsx:239-242`: gradient offsets `0%`, `20%`, `67.5%`, `100%`
- `src/components/features/react-flow/project-node.tsx:65-66`: icon size and truncate max `12`, `30`
- `src/components/layout/sheet/_components/logs.tsx:302`, `384`: icon size `14`
- `src/components/layout/sheet/_components/logs.tsx:659-673`: byte thresholds `1024`, precision `1`
- `src/components/ui/animated-beam.tsx:36-50`: defaults `0`, `5`, `2`, `0.2`, `Infinity`
- `src/components/ui/animated-beam.tsx:82-94`: center math uses `2`
- `src/components/ui/animated-beam.tsx:174`: easing array values `0.16`, `1`, `0.3`, `1`
- `src/components/ui/sidebar.tsx:27-32`: cookie age and sidebar sizes are inline constants; these should be in sidebar config.
- `src/components/ui/sidebar.tsx:610-611`: random skeleton width uses `40` and `50`.
- Tailwind arbitrary values such as `w-81.25`, `w-300`, `min-w-150`, `w-69`, `text-[20px]`, `left-[calc(50%+8rem)]`, `translate-y-[calc(25vh/2)]`, and color hex values are widespread and should be design tokens/config constants if the rule is enforced literally.

## Hardcoded Strings That Should Be Enums Or Constants

Rule: hardcoded strings that could be enums should be enums, excluding real site/html content.

- `src/app/(app)/projects/[id]/page.tsx:38-40`: React Flow edge type `magic`.
- `src/app/(app)/projects/[id]/page.tsx:142-144`: integration ID prefix `integration:`.
- `src/app/(app)/projects/[id]/page.tsx:150` and `171`: node type `custom`.
- `src/app/(app)/page.tsx:8`: route string `/projects`.
- `src/app/(app)/layout.tsx:21`: project detail route regex.
- `src/app/auth/_page.config.ts:14`: action title can remain content, but route enum is already correct.
- `src/components/features/react-flow/project-node.tsx:13-17`: side IDs `l`, `r`, `t`, `b`.
- `src/components/features/react-flow/project-node.tsx:82-84`: node type key `custom`.
- `src/components/layout/header/project-activities/project-activities.config.tsx:9`: `requests`, `notifications`, `ai_assistant` should be enum values.
- `src/components/layout/sheet/_components/logs.tsx:93-99`: query keys `logs`, `services`.
- `src/components/layout/sheet/_components/logs.tsx:317`, `336`, `559-620`: log detail/status labels such as `headers`, `body`, `loading`, `unavailable`, `completed`, `aborted`, `idempotent`.
- `src/components/layout/sheet/sheet.tsx:19-29`: tab keys `Logs`, `General Settings`, `Performance Metrics`, `Communication`.
- `src/components/layout/sidebar/content/content.config.ts:23`, `34`: route strings `/projects`, `/workspace/settings`.
- `src/components/layout/sidebar/footer/footer.utils.ts:24`: keyboard key `Escape`.
- `src/components/ui/input-group.tsx:65`: keyboard keys `Enter` and space.
- `src/components/ui/sidebar.tsx:27`: cookie name `sidebar_state`.
- `src/components/ui/sidebar.tsx:32`: keyboard shortcut `b`.
- `src/components/ui/sidebar.tsx:34-35`: context states `expanded`, `collapsed`.
- `src/components/ui/sidebar.tsx:163-165`: sidebar side, variant, and collapsible string unions should be enums if this rule is applied strictly.

## Field Values Calling Functions

Rule: when defining field values, calling functions should be avoided if not necessary; define the value outside the object.

- `src/components/layout/sheet/_components/logs.tsx:195-217`: `items` array contains `statusCodeColor(log.statusCode)` and string-building in field values.
- `src/components/layout/sheet/_components/logs.tsx:576-608`: summary `items` array builds labels and class names inline and calls `formatLogContentTypeLabel` and `formatLogDetailSize` during object creation.
- `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/api-key-item.tsx:20-28`: `fields` array calls `dateFormat(apiKey.createdAt)` and creates JSX in `value`.
- `src/components/layout/sheet/sheet.tsx:17-30`: `tabs_content` map creates JSX values and computes `integrationId` via chained string calls inside the object/map value.
- `src/app/(app)/projects/[id]/page.tsx:147-185`: node object values create JSX and build service objects inline.
- `src/components/layout/header/project-activities/project-activities.config.tsx:23`: config field calls JSX factory inline in `content`.

## Feature-Based Code In Wrong Places

Rule: feature-based code should stay in the same feature directory.

- Project graph code is split between `src/app/(app)/projects/[id]/page.tsx` and `src/components/features/react-flow`.
- Log/request functionality is split across `src/components/layout/right-sidebar/content/requests.tsx`, `src/components/layout/sheet/_components/logs.tsx`, and imported log types/status helpers outside the feature folder.
- Create project UI is under `src/components/pages/create-project`, but the actual route is `src/app/(app)/projects/page.tsx`.
- Workspace settings UI is under `src/components/pages/workspace-settings`, but the route is `src/app/(app)/workspace/settings/page.tsx`.
- Auth page config is under `src/app/auth/_page.config.ts`, while auth handlers and shared form structure are duplicated across route pages.
- Sidebar menu code is duplicated between `layout/sidebar/content` and `layout/sidebar/footer` with separate `EntryList` and config types.
- `src/components/layout/sidebar/footer/footer.utils.ts` contains a hook-like utility and styling helper in the same file.

## Helper Component Placement

Rule: if helper components are only used by the main component, put them below the main component only if the file remains under 100 lines.

- `src/components/layout/sheet/_components/logs.tsx`: helper components are below `Logs`, but the file is 681 lines, so they should be split.
- `src/components/pages/create-project/components/projects-view.tsx`: `ProjectCard` is below `ProjectsView`, but the file is 168 lines, so it should be split.
- `src/components/pages/workspace-settings/tab-content/api-access/_components/api-usage.tsx`: `ApiUsageItem` is above `ApiUsage`; if retained in one file, helper should be below the main component.
- `src/components/features/tabs.tsx`: `TabItem` and `Tabs` are helper-like internals above `useTabs`; the file is under 100 lines, but the ownership is unclear because the file exports a hook from `components/features`.
- `src/components/ui/*`: compound slot helpers are bundled in files that exceed 100 lines and should be split instead of relying on helper placement.

## Additional Structural And Correctness Issues

- `src/components/ui/separator copy.tsx` is likely an accidental duplicate of `src/components/ui/separator.tsx`.
- `src/components/pages/workspace-settings/tab-content/region-locale/placeholder.tsx` is empty.
- `src/components/layout/sidebar/footer/footer.config.ts:35-38` calls `useAuth()` inside a config callback. Because it is a hook-like function, this is likely a Rules of Hooks violation and should not live in config.
- `src/components/features/truncate.tsx:22` and `src/components/pages/workspace-settings/tab-content/api-access/_components/generate-api-key/_components/api-key-item.tsx:25-27` show mojibake-style rendered characters in command output for ellipsis/dash values. Verify encoding before refactor.
- `src/components/features/tabs.tsx` exports `useTabs` from a components directory. If hooks are meant to live in `src/hooks`, this is a structural exception that should be made explicit.
- `src/components/features/providers.tsx` contains app-level provider setup inside `components/features`; this does not fit the feature directory naming.
- `src/components/features/button.tsx` and `src/components/ui/button.tsx` both define button components with overlapping names and different design systems.
- `src/components/features/input.tsx` and `src/components/ui/input.tsx` both define input components with overlapping names and different behavior.
- `src/components/layout/right-sidebar/content/requests.tsx` uses `useEffect` to mirror query data into local state, which creates derived state that likely does not need to exist.
- `src/components/layout/sidebar/app-sidebar.tsx` mirrors `userData` into local `user` state with `useEffect`; this is likely avoidable derived state.
- `src/components/pages/create-project/components/projects-view.tsx` mirrors project query data into local state with `useEffect`; this is likely avoidable derived state.
