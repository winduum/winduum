# [Control](https://winduum.dev/docs/ui/control.html)

## Installation
```shell
npm i winduum
```
Learn more how to set up Winduum [here](https://winduum.dev/docs/).
Include CSS either globally or to your component _([you can't use TailwindCSS layers in per-component CSS](https://tailwindcss.com/docs/adding-custom-styles#layers-and-per-component-css))_

```css
@import "winduum/src/ui/control/index.css" layer(components);
```

or modular (you can use your own props or CSS)

```css
@import "winduum/src/ui/control/default-props.css" layer(components);
@import "winduum/src/ui/control/default.css" layer(components);
@import "winduum/src/ui/control/interactive.css" layer(components);
@import "winduum/src/ui/control/interactive-props.css" layer(components);
@import "winduum/src/ui/control/invalid.css" layer(components);
@import "winduum/src/ui/control/color-props.css" layer(components);
@import "winduum/src/ui/control/color.css" layer(components);
@import "winduum/src/ui/control/icon.css" layer(components);
@import "winduum/src/ui/control/icon-props.css" layer(components);
@import "winduum/src/ui/control/file.css" layer(components);
@import "winduum/src/ui/control/floating-props.css" layer(components);
@import "winduum/src/ui/control/floating.css" layer(components);
@import "winduum/src/ui/control/floating-interactive.css" layer(components);
@import "winduum/src/ui/control/select-props.css" layer(components);
@import "winduum/src/ui/control/select.css" layer(components);
@import "winduum/src/ui/control/select-multiple.css" layer(components);
```

### Local imports
By default, imports are directly from `npm` so you can leverage updates.
You can also copy and paste the code from this directory to your project and remap the imports to local.

```css
@import "@/components/ui/control/assets/index.css" layer(components);
```

### Docs
Visit [docs](https://winduum.dev/docs/ui/control.html) to learn more about usage examples.
