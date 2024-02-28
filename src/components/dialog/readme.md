# [Dialog](https://winduum.dev/docs/components/dialog.html)

## Installation
```shell
npm i winduum
```

Include CSS either globally or to your component _([you can't use TailwindCSS layers in per-component CSS](https://tailwindcss.com/docs/adding-custom-styles#layers-and-per-component-css))_

```css
@import "winduum/src/components/dialog/index.css" layer(components);
```

or modular (you can use your own props or CSS)

```css
@import "winduum/src/components/dialog/default-props.css" layer(components);
@import "winduum/src/components/dialog/default.css" layer(components);
@import "winduum/src/components/dialog/content-props.css" layer(components);
@import "winduum/src/components/dialog/content.css" layer(components);
```


### Local imports
By default, imports are directly from `npm` so you can leverage updates.
You can also copy and paste the code from this directory to your project and remap the imports to local.

```css
@import "@/components/dialog/assets/index.css" layer(components);
```

```js
import { showDialog } from '@/components/dialog/assets/index.js'
```

### Docs
Visit [docs](https://winduum.dev/docs/components/dialog.html) to learn more about Javascript API and see usage examples.

### Frameworks
* [winduum/winduum-vue](https://github.com/winduum/winduum-vue/blob/main/src/components/popover)
* [winduum/winduum-react](https://github.com/winduum/winduum-react/blob/main/src/components/popover)
