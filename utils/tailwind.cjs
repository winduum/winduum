'use strict';


var plugin = require('tailwindcss/plugin');
var twColors = require('tailwindcss/colors');
var lodash = require('lodash');

const defaultConfig = {
    colors: [
        'background', 'default', 'light', 'dark', 'primary', 'secondary',
        'warning', 'error', 'info', 'success', 'accent', `current`
    ],
    fontFamily: ['primary', 'secondary'],
    fontWeight: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
    zIndex: [10, 20, 30, 40, 50, 60],
    spacing: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'section'],
    borderRadius: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    animations: ['fade-in', 'fade-out'],
    screens: {
        'xs': '22.5em',
        'sm': '26em',
        'md': '48em',
        'lg': '60em',
        'xl': '76em',
        '2xl': '82em',
        '3xl': '88em',
        '4xl': '100em',
        'xxl': '126em',
        '2xxl': '158em'
    }
};

const hexToRgb = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));

const getTailwindColors = (twColors) => {
    const accentColors = [];

    Object.keys(twColors).forEach(color => {
        if (color.match(/(lightBlue|warmGray|trueGray|coolGray|blueGray)/)) {
            return
        }

        if (typeof twColors[color] === "object") {
            Object.keys(twColors[color]).forEach(variant => {
                accentColors.push([`${color.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}-${variant}`, twColors[color][variant]]);
            });
        } else {
            accentColors.push([color, twColors[color]]);
        }
    });

    return accentColors
};

const tailwindColors = (colors = []) => {
    colors.forEach(name => {
        colors[name] = ({ opacityValue }) => {
            if (opacityValue === undefined) {
                return `rgb(var(--color-${name}))`
            }
            return `rgb(var(--color-${name}) / ${opacityValue})`
        };
    });

    return colors
};

const tailwindColorsAccent = (colors = []) => {
    const result = {};

    colors.forEach(color => {
        if (Array.isArray(color)) {
            const rgb = hexToRgb(color[1]);

            result[`.accent-${color[0]}`] = {
                '--color-accent': `${rgb[0]} ${rgb[1]} ${rgb[2]}`
            };
        } else {
            result[`.accent-${color}`] = {
                '--color-accent': `var(--color-${color})`
            };
        }
    });

    return result
};

const tailwindColorsCurrent = (colors = []) => {
    const result = {};

    colors.forEach(color => {
        if (Array.isArray(color)) {
            const rgb = hexToRgb(color[1]);

            result[`.text-${color[0]}`] = {
                '--color-current': `${rgb[0]} ${rgb[1]} ${rgb[2]}`
            };
        } else {
            result[`.text-${color}`] = {
                '--color-current': `var(--color-${color})`
            };
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

    return plugin(({addUtilities}) => {
        addUtilities(Object.assign(tailwindColorsAccent(getTailwindColors(twColors)), tailwindColorsAccent(userConfig.colors)));
        addUtilities(Object.assign(tailwindColorsCurrent(getTailwindColors(twColors)), tailwindColorsCurrent(userConfig.colors)));
        addUtilities(tailwindAnimations(userConfig.animations));
    }, {
        corePlugins: {
            preflight: false,
            container: false
        },
        theme: {
            extend: {
                colors: tailwindColors(userConfig.colors),
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
            },
        }
    })
};

module.exports.createPlugin = createPlugin;
module.exports = createPlugin;
module.exports.defaultConfig = defaultConfig;
module.exports.getTailwindColors = getTailwindColors;
module.exports.hexToRgb = hexToRgb;
module.exports.tailwindAnimations = tailwindAnimations;
module.exports.tailwindColors = tailwindColors;
module.exports.tailwindColorsAccent = tailwindColorsAccent;
module.exports.tailwindColorsCurrent = tailwindColorsCurrent;
module.exports.tailwindVariables = tailwindVariables;
