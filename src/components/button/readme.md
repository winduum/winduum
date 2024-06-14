# [Button](https://winduum.dev/docs/components/button.html)

## Installation
```shell
npm i winduum
```
Learn more how to set up Winduum [here](https://winduum.dev/docs/).
Include CSS either globally or to your component _([you can't use TailwindCSS layers in per-component CSS](https://tailwindcss.com/docs/adding-custom-styles#layers-and-per-component-css))_

```css
@import "winduum/src/button/index.css" layer(components);
```

or modular (you can use your own props or CSS)

```css
@import "winduum/src/button/default.css" layer(components);
@import "winduum/src/button/props/default.css" layer(components);
@import "winduum/src/button/interactive.css" layer(components);
@import "winduum/src/button/props/interactive.css" layer(components);
@import "winduum/src/button/sm.css" layer(components);
@import "winduum/src/button/lg.css" layer(components);
@import "winduum/src/button/bordered.css" layer(components);
@import "winduum/src/button/ghosted.css" layer(components);
@import "winduum/src/button/fill.css" layer(components);
@import "winduum/src/button/muted.css" layer(components);
@import "winduum/src/button/raised.css" layer(components);
@import "winduum/src/button/square.css" layer(components);
@import "winduum/src/button/circle.css" layer(components);
```


### Local imports
By default, imports are directly from `npm` so you can leverage updates.
You can also copy and paste the code from this directory to your project and remap the imports to local.

```css
@import "@/components/button/assets/index.css" layer(components);
```

### Docs
Visit [docs](https://winduum.dev/docs/components/button.html) to learn more about usage examples.

### Frameworks
* [winduum/winduum-vue](https://github.com/winduum/winduum-vue/blob/main/src/button)
* [winduum/winduum-react](https://github.com/winduum/winduum-react/blob/main/src/button)
