'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('tailwindcss/plugin');
var flattenColorPalette = require('tailwindcss/src/util/flattenColorPalette');
var withAlphaVariable = require('tailwindcss/src/util/withAlphaVariable');
var toColorValue = require('tailwindcss/src/util/toColorValue');

var FlexUtility = {
    '.flex-center': {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-sm)'
    },
    '.flex-between': {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 'var(--spacing-sm)'
    }
};

var DotUtility = {
    '.dot': {
        '--tw-bg-opacity': '1',
        display: 'inline-flex',
        width: '0.625rem',
        height: '0.625rem',
        borderRadius: 'var(--rounded-full)',
        backgroundColor: 'color-mix(in srgb, var(--color-accent) calc(var(--tw-bg-opacity) * 100%), transparent)',
        flexShrink: '0'
    }
};

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
 * @returns {[]}
 */
const tailwindColors = (colors = [], colorMix = true, rgb = false) => {
    colors.forEach(name => {
        if (rgb) {
            colors[name + '-rgb'] = `rgb(var(--color-${name}-rgb) / <alpha-value>)`;
        }

        colors[name] = colorMix
            ? `color-mix(in var(--space), var(--color-${name}) calc(<alpha-value> * 100%), transparent)`
            : `rgb(var(--color-${name}) / <alpha-value>)`;
    });

    return colors
};

/**
 * @param {string} type
 * @param {string[]} variables
 * @param {Object} values
 * @returns {Object}
 */
const tailwindVariables = (type, variables = [], values = {}) => {
    variables.forEach(name => {
        values[name] = `var(--${type}-${name})`;
    });

    return values
};

/**
 * @param {string} type
 * @param {string[]} variables
 * @param {Object} values
 * @returns {Object}
 */
const tailwindVariablesFont = (type, variables = [], values = {}) => {
    variables.forEach(name => {
        values[name] = [`var(--${type}-${name})`, `calc(var(--${type}-${name}) + 0.5rem)`];
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

    variables.forEach(name => {
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

    values.forEach(value => {
        result[`.animation-${value}`] = {
            'animation-name': value
        };
    });

    return result
};

/**
 * @type {import('./').PluginOptions} options.
 */
const defaultConfig = {
    colors: [
        'primary', 'accent',
        'warning', 'error', 'info', 'success', 'light', 'dark',
        'main', 'main-primary', 'main-secondary', 'main-tertiary',
        'body', 'body-primary', 'body-secondary', 'body-tertiary',
        'primary-foreground', 'accent-foreground', 'current-foreground',
        'warning-foreground', 'error-foreground', 'info-foreground', 'success-foreground', 'light-foreground', 'dark-foreground',
        'main-foreground', 'main-primary-foreground', 'main-secondary-foreground', 'main-tertiary-foreground',
        'body-foreground', 'body-primary-foreground', 'body-secondary-foreground', 'body-tertiary-foreground'
    ],
    fontFamily: ['primary', 'secondary'],
    fontWeight: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
    ease: ['linear', 'in', 'out', 'in-out'],
    zIndex: ['10', '20', '30', '40', '50', '60'],
    fontSize: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '3xl', '4xl', '5xl', '6xl', '7xl', '7xl', '8xl', '9xl'],
    spacing: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
    borderRadius: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full'],
    animations: ['fade-in', 'fade-out', 'fade-in-down', 'fade-out-up', 'ripple', 'spin', 'move-indeterminate'],
    mask: ['check', 'radio', 'angle-up', 'angle-down'],
    screens: {
        xs: '22.5em',
        sm: '26em',
        md: '48em',
        lg: '60em',
        xl: '76em',
        '2xl': '82em',
        '3xl': '88em',
        '4xl': '100em',
        xxl: '126em',
        '2xxl': '158em'
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
        addComponents(tailwindPropertyUtilities('mask', userConfig.mask));
        addComponents(divideGap({ theme, e }));
        addComponents({
            ...FlexUtility,
            ...DotUtility
        });
    }, {
        corePlugins: {
            preflight: false,
            textColor: false,
            accentColor: false
        },
        theme: {
            extend: {
                transitionProperty: {
                    DEFAULT: 'var(--transition)'
                },
                transitionDuration: {
                    DEFAULT: 'var(--duration)'
                },
                transitionTimingFunction: tailwindVariables('ease', userConfig.ease),
                colors: tailwindColors(userConfig.colors, settings.colorMix, settings.rgb),
                fontSize: tailwindVariablesFont('text', userConfig.fontSize),
                fontFamily: tailwindVariables('font', userConfig.fontFamily),
                fontWeight: tailwindVariables('font', userConfig.fontWeight),
                zIndex: tailwindVariables('z', userConfig.zIndex, {
                    0: 0,
                    auto: 'auto'
                }),
                spacing: tailwindVariables('spacing', userConfig.spacing),
                borderRadius: tailwindVariables('rounded', userConfig.borderRadius, {
                    DEFAULT: 'var(--rounded)'
                }),
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
