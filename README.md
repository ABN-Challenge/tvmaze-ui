# tvmaze-ui

ABN-themed design-system remote for the TVmaze frontend assessment.

## Architecture

Components follow **atomic design**:

```text
src/components/
  atoms/       SkipLink, Button, RatingBadge, LoadingState
  molecules/   ShowCard, ShowCardGrid, SearchInput, ResponsiveSearch, EmptyState, ErrorBanner, SkeletonRow
  organisms/   AppHeader, AppFooter, AppShell, PageContainer, GenreRow, ShowHero
src/styles/    tokens.css (theme) + base.css
```

Theme tokens (`--tv-*`) live only here. Host and catalog import `tvmaze_ui/styles` and stay styling-agnostic.

## Module Federation exposes

Remote name: `tvmaze_ui`

| Expose | Description |
| --- | --- |
| `./theme` | CSS variables only |
| `./styles` | Theme + base + Tailwind utilities |
| `./SkipLink` `./Button` `./RatingBadge` `./LoadingState` | Atoms |
| `./SearchInput` `./ResponsiveSearch` `./ShowCard` `./ShowCardGrid` `./EmptyState` `./ErrorBanner` `./SkeletonRow` | Molecules |
| `./AppHeader` `./AppFooter` `./AppShell` `./PageContainer` `./GenreRow` `./ShowHero` | Organisms |

## Requirements

- Node.js `20.19.0+` (Storybook 10 requirement)
- npm `10.2.4+`

## Local development

```bash
npm install
npm run dev          # federation playground :5001
npm run storybook    # Storybook :6006
npm test
npm run lint
npm run build
npm run build-storybook
```

Remote entry (dev): `http://localhost:5001/remoteEntry.js`

## Storybook

Stories are grouped as `Atoms/*`, `Molecules/*`, `Organisms/*` with autodocs and controls.

ABN-themed Storybook chrome (green `#004d41`, yellow `#ffd200`).

## Production

GitHub Pages serves **Storybook as the site root**. Federation assets are published alongside it so the host can still load the remote.

- Storybook: `https://abn-challenge.github.io/tvmaze-ui/`
- Remote entry: `https://abn-challenge.github.io/tvmaze-ui/remoteEntry.js`

Enable **GitHub Pages → Source: GitHub Actions** on this repository.
