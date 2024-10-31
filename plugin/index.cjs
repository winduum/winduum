'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('tailwindcss/plugin');
var flattenColorPalette = require('tailwindcss/src/util/flattenColorPalette');
var withAlphaVariable = require('tailwindcss/src/util/withAlphaVariable');
var toColorValue = require('tailwindcss/src/util/toColorValue');
var node_fs = require('node:fs');
var node_url = require('node:url');
var node_path = require('node:path');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function divideGap ({ theme, e }) {
    return [
        ...Object.entries(theme('spacing')).map(([key, value]) => {
            return {
                [`.${e(`divide-gap-x-${key}`)}`]: {
                    '& > :where(*:not(:first-child))': {
                        paddingLeft: value,
                        marginLeft: value
                    }
                },
                [`.${e(`divide-gap-y-${key}`)}`]: {
                    '& > :where(*:not(:first-child))': {
                        paddingTop: value,
                        marginTop: value
                    }
                }
            }
        })
    ]
}

const accentColor = ({ value }, settings) => {
    const matchValue = toColorValue(value).match(/var\((--color-.*?)\)/);
    const colorProperties = {};

    if (matchValue) {
        if (settings.rgb) {
            colorProperties['--color-accent-rgb'] =
                `var(${matchValue[1].includes('-rgb') ? matchValue[1] : matchValue[1] + '-rgb'})`;
            colorProperties['--color-accent-foreground-rgb'] =
                `var(${matchValue[1].includes('-rgb') ? matchValue[1].replace('-rgb', '-foreground-rgb') : matchValue[1] + '-foreground-rgb, var(--color-light-rgb)'})`;
        }

        if (toColorValue(value).includes('calc(1 * 100%)') || toColorValue(value).includes(' / 1')) {
            colorProperties['--color-accent'] = matchValue[0].replace('-rgb', '');
            colorProperties['--color-accent-foreground'] = `var(${matchValue[1].replace('-rgb', '')}-foreground, var(--color-light))`;

            return {
                ...colorProperties,
                'accent-color': settings.colorMix ? 'var(--color-accent)' : 'rgb(var(--color-accent))'
            }
        } else {
            if (matchValue[1].includes('-rgb')) {
                colorProperties['--color-accent'] = toColorValue(value);
            } else {
                colorProperties['--color-accent'] = settings.rgb ? `rgb(var(--color-accent-rgb) / ${toColorValue(value).match(/calc\((.*?)\)/)[0]})` : toColorValue(value);
            }

            colorProperties['--color-accent-foreground'] = settings.rgb ? 'rgb(var(--color-accent-foreground-rgb))' : `var(${matchValue[1]}-foreground, var(--color-light))`;

            return {
                ...colorProperties,
                'accent-color': settings.colorMix ? 'var(--color-accent)' : 'rgb(var(--color-accent))'
            }
        }
    }

    return {
        '--color-accent': toColorValue(value),
        'accent-color': 'var(--color-accent)'
    }
};

const textColor = ({ value, corePlugins }, settings) => {
    const matchValue = toColorValue(value).match(/var\((--color-.*?)\)/);
    const withCurrentRgb = {};

    if (matchValue && settings.rgb) {
        withCurrentRgb['--tw-text-current-rgb'] = matchValue[1].includes('rgb') ? matchValue[0] : `var(${matchValue[1]}-rgb)`;
    }

    if (!corePlugins('textOpacity')) {
        return {
            ...withCurrentRgb,
            color: toColorValue(value)
        }
    }

    return {
        ...withCurrentRgb,
        ...withAlphaVariable({
            color: value,
            property: 'color',
            variable: '--tw-text-opacity'
        })
    }
};

/**
 * @param {[]} colors
 * @param {boolean} colorMix
 * @param {boolean} rgb
 * @returns {Object}
 */
const tailwindColors = (colors = [], colorMix = true, rgb = false) => {
    const result = {
        current: 'color-mix(in var(--default-color-space), currentcolor calc(<alpha-value> * 100%), var(--default-color-mix, transparent))'
    };

    colors.forEach((name) => {
        if (rgb) {
            result[name + '-rgb'] = `rgb(var(--color-${name}-rgb) / <alpha-value>)`;
        }

        result[name] = colorMix
            ? `color-mix(in var(--default-color-space), var(--color-${name}) calc(<alpha-value> * 100%), var(--default-color-mix, transparent))`
            : `rgb(var(--color-${name}) / <alpha-value>)`;
    });

    return result
};

/**
 * @param {string} type
 * @param {string[]} variables
 * @param {Object} values
 * @returns {Object}
 */
const tailwindVariables = (type, variables = [], values = {}) => {
    if (!Array.isArray(variables)) {
        return values
    }

    variables.forEach((name) => {
        values[name] = `var(--${type}-${name.replace(/\./g, '_')})`;
    });

    return values
};

const tailwindParseVariables = (type, file, customValues = {}, customPath, initialValues = true) => {
    const parseFile = (fileContent) => {
        const regex = /(--[\w-]+):\s*([^;]+);/g;
        const matches = [...fileContent.matchAll(regex)];
        const variables = matches.map(match => [match[1], match[2]]);
        const values = {};

        variables.forEach((match, index) => {
            if (!match[0].startsWith(`--${type}-`) || match[0].endsWith('--line-height')) {
                return
            }

            const name = match[0].replace(`--${type}-`, '');

            values[name.replace(/_/g, '.')] = type === 'font-size' ? [`var(${match})`, `var(${variables[index + 1]})`] : `var(${initialValues ? match : match[0]})`;
        });

        return values
    };

    const fileContent = node_fs.readFileSync(file).toString();
    const values = parseFile(fileContent);

    if (customPath && !Array.isArray(customPath)) {
        const customFileContent = node_fs.readFileSync(node_path.resolve(process.cwd(), customPath)).toString();
        customValues = { ...customValues, ...parseFile(customFileContent) };
    }

    return { ...values, ...customValues }
};

/**
 * @param {string} type
 * @param {string[]} variables
 * @param {Object} values
 * @returns {Object}
 */
const tailwindVariablesFont = (type, variables = [], values = {}) => {
    variables.forEach(({ value, initial }) => {
        values[value] = [`var(--${type}-${value}, ${initial})`, `calc(var(--${type}-${value}) + 0.5rem)`];
    });

    return values
};

/**
 * @param {string} type
 * @param {string[]} variables
 * @returns {Object}
 */
const tailwindPropertyUtilities = (type, variables = []) => {
    const result = {};

    variables.forEach((name) => {
        result[`.${type}-${name}`] = {
            [type]: `var(--${type}-${name})`
        };
    });

    return result
};

/**
 * @param {string[]} values
 * @returns {Object}
 */
const tailwindAnimations = (values) => {
    const result = {};

    values.forEach((value) => {
        result[`.animation-${value}`] = {
            'animation-name': value
        };
    });

    return result
};

const relativePath = file => node_path.resolve(node_path.dirname(node_url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href)))), file);

/**
 * @type {import('./').PluginOptions} options.
 */
const defaultConfig = {
    animations: ['ripple', 'spin', 'move-indeterminate', 'fade-in', 'fade-out'],
    screens: {
        'xs': '22.5rem',
        'sm': '26rem',
        'md': '46.5rem',
        'lg': '60rem',
        'xl': '76rem',
        '2xl': '82rem',
        '3xl': '88rem',
        '4xl': '100rem',
        'xxl': '126rem',
        '2xxl': '158rem'
    },
    settings: {
        rgb: false,
        colorMix: true
    }
};

/**
 * @param {import('./').PluginOptions} userConfig
 */
const createPlugin = (userConfig = {}) => {
    const settings = {
        ...defaultConfig.settings,
        ...userConfig.settings
    };

    userConfig = {
        ...defaultConfig,
        ...userConfig,
        settings
    };

    return plugin(({ addComponents, matchUtilities, theme, e, corePlugins }) => {
        matchUtilities(
            {
                accent: value => accentColor({ value }, userConfig.settings)
            },
            { values: flattenColorPalette(theme('accentColor')), type: ['color', 'any'] }
        );
        matchUtilities(
            {
                text: value => textColor({ value, corePlugins }, userConfig.settings)
            },
            { values: flattenColorPalette(theme('textColor')), type: ['color', 'any'] }
        );
        addComponents(tailwindAnimations(userConfig.animations));
        addComponents(tailwindPropertyUtilities('mask', Object.keys(tailwindParseVariables('mask', relativePath('../src/theme/config/mask.css'), {
            ...tailwindVariables('mask', userConfig.mask ?? [])
        }, userConfig.mask, false))));
        addComponents(divideGap({ theme, e }));
    }, {
        corePlugins: {
            preflight: false,
            textColor: false,
            accentColor: false
        },
        theme: {
            extend: {
                transitionProperty: {
                    DEFAULT: 'var(--default-transition-property)'
                },
                transitionDuration: {
                    DEFAULT: 'var(--default-transition-duration)'
                },
                transitionTimingFunction: tailwindParseVariables('transition-timing-function', relativePath('../src/theme/config/transition.css'), {
                    ...tailwindVariables('transition-timing-function', userConfig.ease ?? [])
                }, userConfig.ease),
                colors: tailwindColors(Object.keys(tailwindParseVariables('color', relativePath('../src/theme/default.css'), {
                    ...tailwindVariables('color', userConfig.colors ?? [])
                }, userConfig.colors)), settings.colorMix, settings.rgb),
                fontSize: tailwindParseVariables('font-size', relativePath('../src/theme/config/font.css'), {
                    ...tailwindVariables('font-size', userConfig.fontSize ?? [])
                }, userConfig.fontSize),
                fontFamily: tailwindParseVariables('font-family', relativePath('../src/theme/config/font.css'), {
                    ...tailwindVariables('font-family', userConfig.fontFamily ?? [])
                }, userConfig.fontFamily),
                fontWeight: tailwindParseVariables('font-weight', relativePath('../src/theme/config/font.css'), {
                    ...tailwindVariables('font-weight', userConfig.fontWeight ?? [])
                }, userConfig.fontWeight),
                zIndex: tailwindParseVariables('z-index', relativePath('../src/theme/config/z.css'), {
                    ...tailwindVariables('z-index', userConfig.zIndex ?? []),
                    0: 0,
                    auto: 'auto'
                }, userConfig.zIndex),
                spacing: tailwindParseVariables('spacing', relativePath('../src/theme/config/spacing.css'), {
                    ...tailwindVariables('spacing', userConfig.spacing ?? [])
                }, userConfig.spacing),
                borderRadius: tailwindParseVariables('radius', relativePath('../src/theme/config/radius.css'), {
                    ...tailwindVariables('radius', userConfig.borderRadius ?? []),
                    DEFAULT: 'var(--radius)'
                }, userConfig.borderRadius),
                screens: userConfig.screens
            }
        }
    })
};

exports.createPlugin = createPlugin;
exports.default = createPlugin;
exports.defaultConfig = defaultConfig;
exports.tailwindAnimations = tailwindAnimations;
exports.tailwindColors = tailwindColors;
exports.tailwindPropertyUtilities = tailwindPropertyUtilities;
exports.tailwindVariables = tailwindVariables;
exports.tailwindVariablesFont = tailwindVariablesFont;
