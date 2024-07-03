# [Badge](https://winduum.dev/docs/ui/badge.html)

## Installation
```shell
npm i winduum
```
Learn more how to set up Winduum [here](https://winduum.dev/docs/).
Include CSS either globally or to your component _([you can't use TailwindCSS layers in per-component CSS](https://tailwindcss.com/docs/adding-custom-styles#layers-and-per-component-css))_

```css
@import "winduum/src/ui/badge/index.css" layer(components);
```

or modular (you can use your own props or CSS)

```css
@import "winduum/src/ui/badge/props/default.css" layer(components);
@import "winduum/src/ui/badge/default.css" layer(components);
@import "winduum/src/ui/badge/sm.css" layer(components);
@import "winduum/src/ui/badge/lg.css" layer(components);
@import "winduum/src/ui/badge/bordered.css" layer(components);
@import "winduum/src/ui/badge/muted.css" layer(components);
@import "winduum/src/ui/badge/square.css" layer(components);
@import "winduum/src/ui/badge/circle.css" layer(components);

```

### Local imports
By default, imports are directly from `npm` so you can leverage updates.
You can also copy and paste the code from this directory to your project and remap the imports to local.

```css
@import "@/components/ui/badge/assets/index.css" layer(components);
```

### Docs
Visit [docs](https://winduum.dev/docs/ui/badge.html) to learn more about usage examples.
