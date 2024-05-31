import { createBundle } from 'dts-buddy'

await createBundle({
    project: 'tsconfig.json',
    output: 'types/index.d.ts',
    modules: {
        winduum: 'plugin/index.js',
        'winduum/src/components/carousel': 'src/components/carousel/index.js',
        'winduum/src/components/compare': 'src/components/compare/index.js',
        'winduum/src/components/details': 'src/components/details/index.js',
        'winduum/src/components/dialog': 'src/components/dialog/index.js',
        'winduum/src/components/drawer': 'src/components/drawer/index.js',
        'winduum/src/components/form': 'src/components/form/index.js',
        'winduum/src/components/tabs': 'src/components/tabs/index.js',
        'winduum/src/components/toaster': 'src/components/toaster/index.js',
        'winduum/src/components/popover': 'src/components/popover/index.js',
        'winduum/src/ui/range': 'src/ui/range/index.js',
        'winduum/src/utilities/ripple': 'src/utilities/ripple/index.js',
        'winduum/src/utilities/swap': 'src/utilities/swap/index.js'
    }
})
