## 1.2.5 (2024-12-09)
* feat: added custom validationMessage to c-form validateField

## 1.2.4 (2024-10-23)
* feat: c-dialog as modal option

## 1.2.3 (2024-10-23)
* fix: npm version

## 1.2.2 (2024-10-22)
* feat: added dialog close custom event

## 1.2.1 (2024-06-03)
* fix: tw plugin build

## 1.2.0 (2024-05-31)
* feat: added Popover API for `c-popover`
* feat: replaced `[href]` with `:any-link`
* feat: changed most of the `text-wrap` from `balance` to `pretty`
* feat: added more customization fro `ui-control` invalid variant
* feat: added center align for `dot` utility class
* feat: added text-current` opacity variants with color-mix
* feat(bc): `c-popover` now has to have `focus` token class to work on focus, similar as hover
`
## 1.1.1 (2024-05-02)
* feat: added more css properties for `ui-btn` hover and focus

## 1.1.0 (2024-05-02)
* feat: replaced dialog animations with transitions
* feat(bc): removed keyframe animations fade-in, fade-out, fade-in-down, fade-out-up, skeleton-wave
* feat(bc): removed most of --*-accent-color properties in favour of individual style properties
* feat: added ui-link interactive-props.css
* feat(bc): `utilities/container.css` moved to `container/index.css`, props are now separated
* feat(bc): `utilities/skeleton.css` moved to `skeleton/index.css`, added skeleton props
* feat(bc): `utilities/ripple.css` moved to `ripple/index.css`
* feat(bc): `utilities/underline.css` class `decoration-transparent` was changed to `underline-transparent`
* feat: added `--c-toast-bg` and `--c-toast-color` props for `c-toast`
* feat: changed default line-height calculation from lh to rem units

## 1.0.1 (2024-03-01)
* fix: disabled state for `ui-control`

## 1.0.0 (2024-02-29)
* feat: stable 1.0 release

## 0.10.0 (2024-02-28)
* feat(bc): CSS properties changes across components, mainly fixes for CSS layers
* feat(bc): `hover-fill` variant of `ui-btn` renamed to `fill`
* feat: examples updated, added solidjs example
* feat: added readme for components
* fix: missing `interactive-props.css` in `index.css` for `ui-control`

## 0.9.4 (2024-02-21)
* feat: minor fixes for `c-carousel`

## 0.9.3 (2024-02-20)
* feat: changed `ui-image` avatar cqw to cqi

## 0.9.2 (2024-02-20)
* feat: added `ui-image` avatar variant

## 0.9.1 (2024-02-16)
* fix: `--ui-switch-icon-size` typo

## 0.9.0 (2024-02-16)
* feat: added new component `c-table`
* feat: added new component `c-tabs`
* feat: added new component `c-breadcrumb`
* feat: added new component `c-pagination`
* feat: added table revert to css reset

## 0.8.0 (2024-02-13)
* feat: added new component `c-form`
* feat: added new component `c-carousel`
* feat: added new component `c-drawer`
* feat: improved types and typescript support
* feat: added `:user-invalid` for `ui-control`
* feat: added transition for `ui-progress` bar
* fix: `ui-control` select icon

## 0.7.2 (2024-02-01)
* feat: added javascript options for `c-details`
* feat: added rounded corners for `ui-progress`

## 0.7.1 (2024-01-31)
* fix: ui-check and ui-link typos

## 0.7.0 (2024-01-31)
* feat(bc): removed `--color-current` css property, `currentColor` is now used
* feat(bc): minor component refactor with removal `--color-current`, some css properties were removed
* feat(bc): `ui-control` elements `start` and `end` were renamed in favour of tw classes `me-auto` and `ms-auto` (now it's final)
* feat(bc): removed `-rgb` component variants, postcss plugin will be used in the future
* feat: added new component `c-toaster`, `c-toast` and `c-toast-content`
* feat: added new component `c-popover` and `c-popover-content`
* feat: added new component `c-tooltip`
* feat: added new ui component `ui-color`
* feat: added new utility `swap`
* feat: added new utility `divider`
* feat: added types to tailwindcss plugin and minor refactor
* feat: nesting and css refactor

## 0.6.0 (2024-01-17)
_This should be last version with such major breaking changes and is much closer to **1.0**_
* feat(bc): `lib-dialog` was renamed to `c-dialog`, `c-dialog` was renamed to `c-dialog-content`
* feat(bc): major `c-dialog` refactor, js api was changed a bit
* feat(bc): `ui-control` elements `icon-s` and `icon-e` were renamed to `start` and `end` (final change)
* feat(bc): interactive class was removed, `cursor: pointer` is now optional on elements via `--cursor` CSS property in `base/defaults.css`
* feat(bc): major paths refactor, a lot of components has `*-props.css` variants now
* feat(bc): `base/default.css` was renamed to `base/defaults.css`
* feat(bc): tailwindcss utilities were moved to separate directory utilities
* feat(bc): `lib-ripple` was renamed to `ripple` and moved to utilities directory
* feat(bc): `ui-control` grid area includes `c-` prefix now
* feat(bc): removed `onCloseStart` and `onCloseEnd` from `c-dialog` show options, use `close` and `c-dialog:dismiss` events on dialog instead
* feat: added new ui component `ui-range` input slider
* feat: added new ui component `ui-rating` input checkbox based
* feat: added new component `c-card`
* feat: added new component `c-compare`
* feat: added new component `c-details` for smooth toggle animations
* feat: added new utility `dot` for little dots
* feat: added new P3 color space theme
* feat: added new modern css reset, improved compatibility with lit
* feat: added experimental lit example demo
* feat: added `ui-link` component removed in previous version
* feat: improved `ui-group` component, now includes `vertical` variant
* feat: foreground color classes are now included in tailwindcss plugin and were renamed from `fg` to `foreground` for better compatibility
* fix: `tw-opacity` classes defaults to all components
* fix: missing `align-items: center` on `ui-control` select

## 0.5.3 (2024-01-05)
* feat: added indeterminate checkbox, radio, switch
* feat: added meter html element variant for ui-progress

## 0.5.2 (2024-01-03)
* fix: tailwindcss utilities and specificity

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
