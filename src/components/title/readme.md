# [Title](https://winduum.dev/docs/ui/title.html)

## Installation
```shell
npm i winduum
```
Learn more how to set up Winduum [here](https://winduum.dev/docs/).
Include CSS either globally or to your component _([you can't use TailwindCSS layers in per-component CSS](https://tailwindcss.com/docs/adding-custom-styles#layers-and-per-component-css))_

```css
@import "winduum/src/ui/title/index.css" layer(components);
```

or modular (you can use your own props or CSS)

```css
@import "winduum/src/ui/title/default.css" layer(components);
@import "winduum/src/ui/title/default-props.css" layer(components);
@import "winduum/src/ui/title/sm.css" layer(components);
@import "winduum/src/ui/title/lg.css" layer(components);

```

### Local imports
By default, imports are directly from `npm` so you can leverage updates.
You can also copy and paste the code from this directory to your project and remap the imports to local.

```css
@import "@/components/ui/title/assets/index.css" layer(components);
```

### Docs
Visit [docs](https://winduum.dev/docs/ui/title.html) to learn more about usage examples.
