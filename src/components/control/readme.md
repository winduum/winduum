# [Control](https://winduum.dev/docs/components/control.html)

## Installation
```shell
npm i winduum
```
Learn more how to set up Winduum [here](https://winduum.dev/docs/).
Include CSS either globally or to your component _([you can't use TailwindCSS layers in per-component CSS](https://tailwindcss.com/docs/adding-custom-styles#layers-and-per-component-css))_

```css
@import "winduum/src/components/control/index.css" layer(components);
```

or modular (you can use your own props or CSS)

```css
@import "winduum/src/components/control/props/default.css" layer(components);
@import "winduum/src/components/control/props/color.css" layer(components);
@import "winduum/src/components/control/props/icon.css" layer(components);
@import "winduum/src/components/control/props/floating.css" layer(components);
@import "winduum/src/components/control/props/select.css" layer(components);
@import "winduum/src/components/control/default.css" layer(components);
@import "winduum/src/components/control/interactive.css" layer(components);
@import "winduum/src/components/control/invalid.css" layer(components);
@import "winduum/src/components/control/color.css" layer(components);
@import "winduum/src/components/control/icon.css" layer(components);
@import "winduum/src/components/control/file.css" layer(components);
@import "winduum/src/components/control/floating.css" layer(components);
@import "winduum/src/components/control/floating-interactive.css" layer(components);
@import "winduum/src/components/control/select.css" layer(components);
@import "winduum/src/components/control/select-multiple.css" layer(components);
```

### Local imports
By default, imports are directly from `npm` so you can leverage updates.
You can also copy and paste the code from this directory to your project and remap the imports to local.

```css
@import "@/components/control/assets/index.css" layer(components);
```

### Docs
Visit [docs](https://winduum.dev/docs/components/control.html) to learn more about usage examples.
