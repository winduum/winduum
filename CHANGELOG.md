## 0.3.1 (2023-31-07)
* feat: added option to disable `color-mix` in tailwindcss plugin as option `settings.colorMix` set to `false`

## 0.3.0 (2023-14-07)
* feat(bc): color `base` was renamed to `main` due to TailwindCSS naming conflict
* feat: added loading `skeleton` tailwind class
* feat: added foreground colors to color pallet
* feat: added file input to `ui-control`
* feat: removed floating class from `ui-control`, it's automatic via `:has` now
* feat: added loading skeleton to `ui-image`
* feat: improved TailwindCSS `textColor` and `accentColor`, each class now includes related CSS properties
* feat: added css properties tokens for `fontSize`

## 0.2.2 (2023-07-07)
* fix: package.json exports
* fix: `<hr>` border added color-mix

## 0.2.1 (2023-07-05)
* patch release

## 0.2.0 (2023-07-05)
* feat: restructure components to child files for better modularity
* feat: added `sq-` tailwind utility class
* feat(bc): new color pallet with `color-mix`, colors now have also `-rgb` variants for better compatibility
* feat(bc): removed `is-` prefix for most components
* feat(bc): following classes were also renamed - `text` -> `ghosted`, `outline` -> `bordered`, `underline` -> `underlined`
* feat(bc): `ui-select` and `ui-input` were replaced with `ui-control`
* feat(bc): `ui-radio` and `ui-checkbox` is now replaced with `ui-check`
* feat(bc): `ui-input-group`,`ui-btn-group` and `ui-badge-group` is now replaced with `ui-group`

## 0.1.18 (2023-04-12)
* feat: lib-ripple - fix values typo

## 0.1.17 (2023-04-11)
* feat: lib-ripple - fix incorrect values

## 0.1.16 (2023-04-11)
* feat: lib-dialog - export internal functions

## 0.1.15 (2023-04-06)
* initial preview release
