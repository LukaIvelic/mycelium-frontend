
```
mycelium_frontend
├─ .zed
│  └─ settings.json
├─ mycelium-console
│  ├─ .env
│  ├─ .env.example
│  ├─ .next
│  │  └─ dev
│  │     └─ _events_23840.json
│  ├─ AGENTS.md
│  ├─ CLAUDE.md
│  ├─ components.json
│  ├─ eslint.config.mjs
│  ├─ knip.json
│  ├─ next-env.d.ts
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public
│  │  ├─ fonts
│  │  │  ├─ italic
│  │  │  │  ├─ satoshi-light.otf
│  │  │  │  ├─ satoshi-medium.otf
│  │  │  │  └─ satoshi-regular.otf
│  │  │  └─ normal
│  │  │     ├─ satoshi-light.otf
│  │  │     ├─ satoshi-medium.otf
│  │  │     └─ satoshi-regular.otf
│  │  └─ images
│  │     ├─ github_logo.png
│  │     ├─ google_logo.png
│  │     └─ shrooms
│  │        ├─ shroom_1.svg
│  │        ├─ shroom_2.svg
│  │        ├─ shroom_3.svg
│  │        ├─ shroom_4.svg
│  │        ├─ shroom_5.svg
│  │        └─ shroom_6.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ api
│  │  │  ├─ api-client.ts
│  │  │  ├─ services
│  │  │  │  ├─ api-key
│  │  │  │  │  ├─ api-key-service.ts
│  │  │  │  │  └─ api-key-service.types.ts
│  │  │  │  ├─ auth
│  │  │  │  │  ├─ auth-service.ts
│  │  │  │  │  └─ auth-service.types.ts
│  │  │  │  ├─ log
│  │  │  │  │  ├─ log-service.ts
│  │  │  │  │  └─ log-service.types.ts
│  │  │  │  ├─ project
│  │  │  │  │  ├─ project-service.ts
│  │  │  │  │  └─ project-service.types.ts
│  │  │  │  ├─ react-flow
│  │  │  │  │  ├─ react-flow-service.ts
│  │  │  │  │  └─ react-flow-service.types.ts
│  │  │  │  ├─ services
│  │  │  │  │  ├─ services-service.ts
│  │  │  │  │  └─ services-service.types.ts
│  │  │  │  └─ user
│  │  │  │     ├─ user-service.ts
│  │  │  │     └─ user-service.types.ts
│  │  │  └─ token-storage.ts
│  │  ├─ app
│  │  │  ├─ (app)
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ projects
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ page.tsx
│  │  │  │  └─ workspace
│  │  │  │     └─ settings
│  │  │  │        └─ page.tsx
│  │  │  ├─ auth
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ login
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ signup
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ _page.config.ts
│  │  │  ├─ globals.css
│  │  │  ├─ icon.svg
│  │  │  └─ layout.tsx
│  │  ├─ components
│  │  │  ├─ features
│  │  │  │  ├─ button.tsx
│  │  │  │  ├─ centered.tsx
│  │  │  │  ├─ input.tsx
│  │  │  │  ├─ mushroom-carousel.tsx
│  │  │  │  ├─ providers.tsx
│  │  │  │  ├─ react-flow
│  │  │  │  │  ├─ magic-ui-beam-edge.tsx
│  │  │  │  │  └─ project-node.tsx
│  │  │  │  ├─ tabs.tsx
│  │  │  │  └─ truncate.tsx
│  │  │  ├─ layout
│  │  │  │  ├─ app-header.tsx
│  │  │  │  ├─ right-sidebar
│  │  │  │  │  ├─ content
│  │  │  │  │  │  └─ requests.tsx
│  │  │  │  │  └─ right-sidebar.tsx
│  │  │  │  ├─ sheet
│  │  │  │  │  └─ sheet.tsx
│  │  │  │  └─ sidebar
│  │  │  │     ├─ app-sidebar-content.tsx
│  │  │  │     ├─ app-sidebar.tsx
│  │  │  │     ├─ content
│  │  │  │     │  ├─ content.config.ts
│  │  │  │     │  └─ entry-list.tsx
│  │  │  │     └─ footer
│  │  │  │        ├─ app-sidebar-footer.tsx
│  │  │  │        ├─ entry-list.tsx
│  │  │  │        ├─ footer.config.ts
│  │  │  │        ├─ footer.utils.ts
│  │  │  │        ├─ profile-card.tsx
│  │  │  │        ├─ profile-popup.tsx
│  │  │  │        └─ profile-trigger.tsx
│  │  │  ├─ pages
│  │  │  │  ├─ create-project
│  │  │  │  │  ├─ components
│  │  │  │  │  │  ├─ create-dialog
│  │  │  │  │  │  │  ├─ create-project-command.tsx
│  │  │  │  │  │  │  └─ _components
│  │  │  │  │  │  │     ├─ create-project-footer.tsx
│  │  │  │  │  │  │     ├─ create-project-form.tsx
│  │  │  │  │  │  │     └─ create-project-header.tsx
│  │  │  │  │  │  ├─ projects-view.tsx
│  │  │  │  │  │  └─ _header.tsx
│  │  │  │  │  ├─ create-project.tsx
│  │  │  │  │  └─ create-project.utils.tsx
│  │  │  │  └─ workspace-settings
│  │  │  │     ├─ components
│  │  │  │     │  └─ _header.tsx
│  │  │  │     ├─ create-project.tsx
│  │  │  │     ├─ create-project.utils.tsx
│  │  │  │     └─ tab-content
│  │  │  │        └─ api-access
│  │  │  │           ├─ api-access.tsx
│  │  │  │           └─ _components
│  │  │  │              ├─ api-usage.tsx
│  │  │  │              └─ generate-api-key
│  │  │  │                 ├─ generate-api-key.tsx
│  │  │  │                 └─ _components
│  │  │  │                    ├─ api-key-copy-field.tsx
│  │  │  │                    ├─ api-key-item.tsx
│  │  │  │                    ├─ api-key-name-input.tsx
│  │  │  │                    ├─ api-key-warning.tsx
│  │  │  │                    ├─ create-api-key-command.tsx
│  │  │  │                    ├─ create-api-key-footer.tsx
│  │  │  │                    ├─ create-api-key-form.tsx
│  │  │  │                    ├─ create-api-key-header.tsx
│  │  │  │                    ├─ generated-api-key-display.tsx
│  │  │  │                    └─ project-selector.tsx
│  │  │  └─ ui
│  │  │     ├─ animated-beam.tsx
│  │  │     ├─ button.tsx
│  │  │     ├─ combobox.tsx
│  │  │     ├─ command.tsx
│  │  │     ├─ dialog.tsx
│  │  │     ├─ input-group.tsx
│  │  │     ├─ input.tsx
│  │  │     ├─ separator copy.tsx
│  │  │     ├─ separator.tsx
│  │  │     ├─ sheet.tsx
│  │  │     ├─ sidebar.tsx
│  │  │     ├─ skeleton.tsx
│  │  │     ├─ spinner.tsx
│  │  │     ├─ textarea.tsx
│  │  │     ├─ toggle.tsx
│  │  │     └─ tooltip.tsx
│  │  ├─ hooks
│  │  │  ├─ use-api-keys.hook.ts
│  │  │  ├─ use-auth.hook.ts
│  │  │  ├─ use-logs.hook.ts
│  │  │  ├─ use-mobile.ts
│  │  │  ├─ use-projects.hook.ts
│  │  │  ├─ use-react-flow-layout.hook.ts
│  │  │  ├─ use-right-sidebar.ts
│  │  │  ├─ use-services.hook.ts
│  │  │  ├─ use-sheet.hook.ts
│  │  │  └─ use-users.hook.ts
│  │  ├─ lib
│  │  │  ├─ config
│  │  │  │  └─ satoshi.ts
│  │  │  ├─ constants
│  │  │  │  └─ routes.ts
│  │  │  ├─ status-code.ts
│  │  │  ├─ types
│  │  │  │  ├─ api-key.ts
│  │  │  │  ├─ log.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ user.ts
│  │  │  │  └─ web-api.ts
│  │  │  └─ utils.ts
│  │  ├─ proxy.ts
│  │  ├─ styles
│  │  │  ├─ button-styles.css
│  │  │  └─ text-input-styles.css
│  │  └─ _proxy.utils.ts
│  └─ tsconfig.json
└─ README.md

```