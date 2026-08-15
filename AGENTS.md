# AGENTS.md

Guidance for AI agents working in this repository.

## Project Overview

Expo / React Native vaccine tracking app ("Vaccine Tracker"). Manages family
vaccination records, QR-code vaccine scanning, and vaccination campaigns with a
map. Uses a backend API via Axios.

## Tech Stack

- React Native 0.81 + Expo 54, TypeScript (strict)
- React Navigation (stack) with signed/sign-out stacks
- styled-components for styling
- SWR for data fetching
- i18next (pt-BR + en-US)
- Formik + Yup for forms
- Axios for HTTP (single shared instance)
- State managed via React Context

## Commands

- `yarn start` — start Expo dev server
- `yarn lint` — run ESLint (`eslint . --ext .js,.jsx,.ts,.tsx`)
- `npx tsc --noEmit` — typecheck (tsconfig exists, but no script is defined)
- `yarn ios` / `yarn android` — run on device/simulator
- `yarn web` — start web build

There is no test suite. TypeScript is compiled through the bundler; use
`npx tsc --noEmit` to typecheck.

## Conventions

- TypeScript throughout. New files must be `.ts` (non-component) or `.tsx`
  (components/pages).
- Pages live in `src/pages/<Name>/index.tsx` + `styles.ts` (styled-components).
- Components live in `src/components/<Name>/index.tsx` + `styles.ts`.
- Shared types live in `src/@types/` (`models.ts`, `navigation.ts`,
  `declarations.d.ts`). Navigation params are typed via `RootStackParamList` in
  `src/@types/navigation.ts`; use `RouteProps`/`NavigationProp` helpers.
- Use `import type` for type-only imports (`verbatimModuleSyntax` is enabled).
- Navigation routes are defined in `src/routes`.
- API calls go through `src/services/<domain>/<name>.service.ts` (thin
  functions) using the shared `httpClient` from `src/lib/httpClient.ts`; use
  SWR hooks to consume them.
- All user-facing strings must use i18n keys via `useTranslation()` and live in
  `src/i18n/locales/{en-US,pt-BR}/translation.json`. Keep both locales in sync.
- Forms use Formik + Yup, with validation messages from i18n keys.
- Authentication state lives in `src/contexts/auth.tsx`; the Axios instance
  keeps the Bearer token in its default headers.
- Imports follow the pattern: react, third-party libs, local modules, then assets.
- Named imports for pages/views (`function Login()`), default export at end.

## Environment

- Copy `environment.example.ts` to `environment.ts` and set `apiUrl`.
- `environment.ts` is gitignored.

## Git

- Commits follow conventional-ish style, e.g. `feat:`, `fix:`, `chore:`,
  `refactor:` with a short scope note. Recent history uses `(#<PR>)` suffixes.

## Local Backlog

- `BACKLOG.local.md` is a gitignored personal backlog; don't commit it.
