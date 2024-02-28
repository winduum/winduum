# [Compare](https://winduum.dev/docs/components/compare.html)

## Dependencies
* [Button](https://github.com/winduum/winduum/tree/next/src/ui/button)

## Installation
```shell
npm i winduum
```
Learn more how to set up Winduum [here](https://winduum.dev/docs/).
Include CSS either globally or to your component _([you can't use TailwindCSS layers in per-component CSS](https://tailwindcss.com/docs/adding-custom-styles#layers-and-per-component-css))_

```css
@import "winduum/src/components/compare/index.css" layer(components);
```

or modular (you can use your own props or CSS)

```css
@import "winduum/src/components/compare/default.css" layer(components);
```

### Local imports
By default, imports are directly from `npm` so you can leverage updates.
You can also copy and paste the code from this directory to your project and remap the imports to local.

```css
@import "@/components/compare/assets/index.css" layer(components);
```

```js
import { setPosition } from '@/components/compare/assets/index.js'
```

### Docs
Visit [docs](https://winduum.dev/docs/components/compare.html) to learn more about Javascript API and see usage examples.
