'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('tailwindcss/plugin');
var flattenColorPalette = require('tailwindcss/src/util/flattenColorPalette');
var toColorValue = require('tailwindcss/src/util/toColorValue');
var color = require('tailwindcss/src/util/color');
var twColors = require('tailwindcss/colors');
var lodash = require('lodash');

function withAlphaVariable ({ color: color$1, property, variable }) {
    const properties = [].concat(property);
    if (typeof color$1 === 'function') {
        return {
            ...Object.fromEntries(
                properties.map((p) => {
                    return [p, color$1({ opacityVariable: variable, opacityValue: `var(${variable}, 1)` })]
                })
            )
        }
    }

    const parsed = color.parseColor(color$1);

    if (parsed === null) {
        return Object.fromEntries(properties.map((p) => [p, color$1]))
    }

    if (parsed.alpha !== undefined) {
        // Has an alpha value, return color as-is
        return Object.fromEntries(properties.map((p) => [p, color$1]))
    }

    return {
        ...Object.fromEntries(
            properties.map((p) => {
                return [p, color.formatColor({ ...parsed, alpha: `var(${variable}, 1)` })]
            })
        )
    }
}

const defaultConfig = {
    colors: [
        'primary', 'accent',
        'warning', 'error', 'info', 'success', 'light', 'dark',
        'main', 'main-primary', 'main-secondary', 'main-tertiary',
        'body', 'body-primary', 'body-secondary', 'body-tertiary'
    ],
    fontFamily: ['primary', 'secondary'],
    fontWeight: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
    zIndex: [10, 20, 30, 40, 50, 60],
    fontSize: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '3xl', '4xl', '5xl', '6xl', '7xl', '7xl', '8xl', '9xl'],
    spacing: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'section'],
    borderRadius: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full'],
    animations: ['fade-in', 'fade-out', 'fade-in-down', 'fade-out-up', 'ripple', 'spin', 'move-indeterminate'],
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
        rgbFallback: true
    }
};

const hexToRgb = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));

const getTailwindColors = (twColors) => {
    const accentColors = [];

    Object.keys(twColors).forEach(color => {
        if (color.match(/(lightBlue|warmGray|trueGray|coolGray|blueGray)/)) {
            return
        }

        if (typeof twColors[color] === 'object') {
            Object.keys(twColors[color]).forEach(variant => {
                accentColors.push([`${color.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}-${variant}`, twColors[color][variant]]);
            });
        } else {
            accentColors.push([color, twColors[color]]);
        }
    });

    return accentColors
};

const tailwindColors = (colors = []) => {
    colors.forEach(name => {
        if (defaultConfig.settings.rgbFallback) {
            colors[name + '-rgb'] = `rgb(var(--color-${name}-rgb) / <alpha-value>)`;
        }

        colors[name] = `color-mix(in sRGB, var(--color-${name}) calc(<alpha-value> * 100%), transparent)`;
    });

    return colors
};

const tailwindColorsAccent = (colors = []) => {
    const result = {};

    colors.forEach(color => {
        if (Array.isArray(color)) {
            const rgb = hexToRgb(color[1]);

            result[`.accent-${color[0]}`] = Object.assign(defaultConfig.settings.rgbFallback
                ? {
                    '--color-accent-rgb': `${rgb[0]} ${rgb[1]} ${rgb[2]}`,
                    '--color-accent-current-rgb': `var(--color-${color}-current-rgb, var(--color-light-rgb))`
                }
                : {}, {
                '--color-accent': `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`,
                '--color-accent-current': `var(--color-${color}-current, var(--color-light))`
            });
        } else {
            result[`.accent-${color}`] = Object.assign(defaultConfig.settings.rgbFallback
                ? {
                    '--color-accent-rgb': `var(--color-${color}-rgb)`,
                    '--color-accent-current-rgb': `var(--color-${color}-current-rgb, var(--color-light-rgb))`
                }
                : {}, {
                '--color-accent': `var(--color-${color})`,
                '--color-accent-current': `var(--color-${color}-current, var(--color-light))`
            });
        }
    });

    return result
};

const tailwindVariables = (type, variables = [], values = {}) => {
    variables.forEach(name => {
        values[name] = `var(--${type}-${name})`;
    });

    return values
};

const tailwindVariablesFont = (type, variables = [], values = {}) => {
    variables.forEach(name => {
        values[name] = [`var(--${type}-${name})`, `calc(var(--${type}-${name}) + 0.5rem)`];
    });

    return values
};

const tailwindAnimations = (values) => {
    const result = {};

    values.forEach(value => {
        result[`.animation-${value}`] = {
            'animation-name': value
        };
    });

    return result
};

const createPlugin = (userConfig = {}) => {
    userConfig = lodash.merge(defaultConfig, userConfig);

    return plugin(({ addUtilities, matchUtilities, theme, variants, e, corePlugins }) => {
        addUtilities(Object.assign(tailwindColorsAccent(getTailwindColors(twColors)), tailwindColorsAccent(userConfig.colors)));
        matchUtilities(
            {
                text: (value, extra) => {
                    const matchValue = toColorValue(value).match(/var\((.*?)\)/);
                    const fallbackRgb = matchValue && matchValue[0].includes('-rgb');

                    const colorProperties = {};

                    if (fallbackRgb) {
                        colorProperties['--color-body-current-rgb'] = matchValue[0];
                    }

                    if (!corePlugins('textOpacity')) {
                        return {
                            ...colorProperties,
                            '--color-body-current': toColorValue(value),
                            color: toColorValue(value)
                        }
                    }

                    return {
                        ...colorProperties,
                        '--color-body-current': toColorValue(value),
                        ...withAlphaVariable({
                            color: value,
                            property: 'color',
                            variable: '--tw-text-opacity'
                        })
                    }
                }
            },
            { values: flattenColorPalette(theme('textColor')), type: ['color', 'any'] }
        );
        addUtilities(tailwindAnimations(userConfig.animations));
        addUtilities([
            Object.entries(theme('spacing')).map(([key, value]) => {
                return {
                    [`.${e(`sq-${key}`)}`]: {
                        width: value,
                        height: value
                    }
                }
            })
        ], variants('sq'));
    }, {
        corePlugins: {
            preflight: false,
            container: false,
            textColor: false
        },
        theme: {
            extend: {
                colors: tailwindColors(userConfig.colors),
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
exports.getTailwindColors = getTailwindColors;
exports.hexToRgb = hexToRgb;
exports.tailwindAnimations = tailwindAnimations;
exports.tailwindColors = tailwindColors;
exports.tailwindColorsAccent = tailwindColorsAccent;
exports.tailwindVariables = tailwindVariables;
exports.tailwindVariablesFont = tailwindVariablesFont;
