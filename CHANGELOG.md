## 0.5.1 (2024-01-02)
* feat: changed `ui-image` from `flex` to `inline-flex`
* feat: improved underline utilities
* fix: rgb compatibility

## 0.5.0 (2023-12-23)
* feat(bc): refactor of all components and CSS Properties, improved specificity
* feat(bc): removed `rgb` colors from default configuration, if you want compatibility use `-rgb.css`
* feat(bc): removed `container` utility class
* feat(bc): removed `tailwindcss/gutters.css`
* feat(bc): removed skeleton from `ui-image`, use `before:skeleton` to add it manually
* feat(bc): removed `ui-link`, use `underline` on any text content for link interactivity
* feat(bc): `ui-control` elements `icon-l` and `icon-r` were renamed to `icon-s` and `icon-e`
* feat(bc): `base/icon.css` was renamed to `base/config/mask.css` and TailwindCSS mask utility was added
* feat(bc): removed `sq` TailwindCSS utility, use `size` from tw v3.4 now
* feat(js): added `onCloseStart` and `onCloseEnd` to `lib-dialog` show options
* feat(plugin): removed lodash dependency in TailwindCSS plugin
* feat(plugin): added new `divide-gap` TailwindCSS utility
* feat(plugin): transition CSS Properties are now unified with TailwindCSS
* feat: added `text-wrap: balance` to most of the components
* feat: updated compatibility for TailwindCSS v3.4
* feat: added new `grid-cols-container` utility class for doing containers via grid
* feat: added new utilities such us `underline`, `flex-center`, `flex-between`
* feat: `config.css` was split into multiple files for better modularity
* feat: `reset.css` was updated to v1.11.2
* feat: added `color-scheme` to `default.css`
* feat: utilities are using `@layer components` for lower specificity
* feat: colors were changed to TailwindCSS counterparts
* feat: remove use of `overflow:hidden` from all files

## 0.4.0 (2023-11-08)
* feat(bc): ui-control - refactor, styles are now applied on parent, should go better together with custom selects like [Headless UI](https://headlessui.com/react/listbox)
* feat(bc): ui-control - icon refactor, it's much simplified now
* feat: ui-control - added support for `input[type="color"]`, control now supports all input types!
* feat: ui-control - improved webkit styles
* feat: improved support for web components - `:root` selector is now `:root, :host`
* feat: other small improvements

## 0.3.4 (2023-10-09)
* fix: missing placeholder on ui-control
* feat: improved ui-btn, ui-badge variants code

## 0.3.3 (2023-10-04)
* fix: ui-title typo

## 0.3.2 (2023-08-27)
* fix: dark mode colors mismatch

## 0.3.1 (2023-07-31)
* feat: added option to disable `color-mix` in tailwindcss plugin as option `settings.colorMix` set to `false`

## 0.3.0 (2023-07-14)
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
