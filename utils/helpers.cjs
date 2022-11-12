'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
        result[`.accent-${color}`] = {
            '--color-accent': `var(--color-${color})`,
            'accent-color': 'rgb(var(--color-accent))'
        };
    });

    return result
};

const tailwindColorsCurrent = (colors = []) => {
    const result = {};

    colors.forEach(color => {
        result[`.text-${color}`] = {
            '--color-current': `var(--color-${color})`
        };
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

exports.tailwindAnimations = tailwindAnimations;
exports.tailwindColors = tailwindColors;
exports.tailwindColorsAccent = tailwindColorsAccent;
exports.tailwindColorsCurrent = tailwindColorsCurrent;
exports.tailwindVariables = tailwindVariables;
