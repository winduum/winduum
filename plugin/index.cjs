'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('tailwindcss/plugin');
var flattenColorPalette = require('tailwindcss/src/util/flattenColorPalette');
var withAlphaVariable = require('tailwindcss/src/util/withAlphaVariable');
var toColorValue = require('tailwindcss/src/util/toColorValue');

var DotUtility = {
    '.dot': {
        display: 'inline-flex',
        inlineSize: '0.5rem',
        blockSize: '0.5rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'currentColor',
        flexShrink: '0',
        justifyContent: 'center',
        alignItems: 'center'
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
 * @returns {Object}
 */
const tailwindColors = (colors = [], colorMix = true, rgb = false) => {
    const result = {
        current: 'color-mix(in var(--default-color-space), currentcolor calc(<alpha-value> * 100%), transparent)'
    };

    colors.forEach(name => {
        if (rgb) {
            result[name + '-rgb'] = `rgb(var(--color-${name}-rgb) / <alpha-value>)`;
        }

        result[name] = colorMix
            ? `color-mix(in var(--default-color-space), var(--color-${name}) calc(<alpha-value> * 100%), transparent)`
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
        'primary-foreground', 'accent-foreground',
        'warning-foreground', 'error-foreground', 'info-foreground', 'success-foreground', 'light-foreground', 'dark-foreground',
        'main-foreground', 'main-primary-foreground', 'main-secondary-foreground', 'main-tertiary-foreground',
        'body-foreground', 'body-primary-foreground', 'body-secondary-foreground', 'body-tertiary-foreground'
    ],
    fontFamily: ['primary', 'secondary'],
    fontWeight: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
    ease: ['linear', 'in', 'out', 'in-out'],
    zIndex: ['10', '20', '30', '40', '50', '60'],
    fontSize: [
        {
            value: 'xs',
            initial: '0.75rem'
        },
        {
            value: 'sm',
            initial: '0.875rem'
        },
        {
            value: 'base',
            initial: '1rem'
        },
        {
            value: 'lg',
            initial: '1.125rem'
        },
        {
            value: 'xl',
            initial: '1.25rem'
        },
        {
            value: '2xl',
            initial: '1.5rem'
        },
        {
            value: '3xl',
            initial: '1.875rem'
        },
        {
            value: '4xl',
            initial: '2.25rem'
        },
        {
            value: '5xl',
            initial: '3rem'
        },
        {
            value: '6xl',
            initial: '3.75rem'
        },
        {
            value: '7xl',
            initial: '4.5rem'
        },
        {
            value: '8xl',
            initial: '6rem'
        },
        {
            value: '9xl',
            initial: '8rem'
        }
    ],
    spacing: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
    borderRadius: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full'],
    animations: ['ripple', 'spin', 'move-indeterminate'],
    mask: ['check', 'radio', 'angle-up', 'angle-down'],
    screens: {
        xs: '22.5rem',
        sm: '26rem',
        md: '46.5rem',
        lg: '60rem',
        xl: '76rem',
        '2xl': '82rem',
        '3xl': '88rem',
        '4xl': '100rem',
        xxl: '126rem',
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
        addComponents(tailwindPropertyUtilities('mask', userConfig.mask));
        addComponents(divideGap({ theme, e }));
        addComponents({
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
                    DEFAULT: 'var(--default-transition-property)'
                },
                transitionDuration: {
                    DEFAULT: 'var(--default-transition-duration)'
                },
                transitionTimingFunction: tailwindVariables('transition-timing-function', userConfig.ease),
                colors: tailwindColors(userConfig.colors, settings.colorMix, settings.rgb),
                fontSize: tailwindVariablesFont('font-size', userConfig.fontSize),
                fontFamily: tailwindVariables('font-family', userConfig.fontFamily),
                fontWeight: tailwindVariables('font-weight', userConfig.fontWeight),
                zIndex: tailwindVariables('z-index', userConfig.zIndex, {
                    0: 0,
                    auto: 'auto'
                }),
                spacing: tailwindVariables('spacing', userConfig.spacing),
                borderRadius: tailwindVariables('radius', userConfig.borderRadius, {
                    DEFAULT: 'var(--radius)'
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
