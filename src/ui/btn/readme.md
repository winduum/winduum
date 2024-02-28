# [Button](https://winduum.dev/docs/ui/button.html)

## Installation
```shell
npm i winduum
```

Include CSS either globally or to your component _([you can't use TailwindCSS layers in per-component CSS](https://tailwindcss.com/docs/adding-custom-styles#layers-and-per-component-css))_

```css
@import "winduum/src/ui/btn/index.css" layer(components);
```

or modular (you can use your own props or CSS)

```css
@import "winduum/src/ui/btn/default.css" layer(components);
@import "winduum/src/ui/btn/default-props.css" layer(components);
@import "winduum/src/ui/btn/interactive.css" layer(components);
@import "winduum/src/ui/btn/interactive-props.css" layer(components);
@import "winduum/src/ui/btn/sm.css" layer(components);
@import "winduum/src/ui/btn/lg.css" layer(components);
@import "winduum/src/ui/btn/loading.css" layer(components);
@import "winduum/src/ui/btn/loading-props.css" layer(components);
@import "winduum/src/ui/btn/wide.css" layer(components);
@import "winduum/src/ui/btn/bordered.css" layer(components);
@import "winduum/src/ui/btn/ghosted.css" layer(components);
@import "winduum/src/ui/btn/hover-fill.css" layer(components);
@import "winduum/src/ui/btn/gradient.css" layer(components);
@import "winduum/src/ui/btn/gradient-bordered.css" layer(components);
@import "winduum/src/ui/btn/muted.css" layer(components);
@import "winduum/src/ui/btn/raised.css" layer(components);
@import "winduum/src/ui/btn/square.css" layer(components);
@import "winduum/src/ui/btn/circle.css" layer(components);
```


### Local imports
By default, imports are directly from `npm` so you can leverage updates.
You can also copy and paste the code from this directory to your project and remap the imports to local.

```css
@import "@/components/ui/btn/assets/index.css" layer(components);
```

### Docs

Visit [docs](https://winduum.dev/docs/ui/button.html) to learn more about usage examples.
