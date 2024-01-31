import withAlphaVariable from 'tailwindcss/src/util/withAlphaVariable'
import toColorValue from 'tailwindcss/src/util/toColorValue'

export const accentColor = ({ value }, settings) => {
    const matchValue = toColorValue(value).match(/var\((--color-.*?)\)/)
    const colorProperties = {}

    if (matchValue) {
        if (settings.rgb) {
            colorProperties['--color-accent-rgb'] =
                `var(${matchValue[1].includes('-rgb') ? matchValue[1] : matchValue[1] + '-rgb'})`
            colorProperties['--color-accent-foreground-rgb'] =
                `var(${matchValue[1].includes('-rgb') ? matchValue[1].replace('-rgb', '-foreground-rgb') : matchValue[1] + '-foreground-rgb, var(--color-light-rgb)'})`
        }

        if (toColorValue(value).includes('calc(1 * 100%)') || toColorValue(value).includes(' / 1')) {
            colorProperties['--color-accent'] = matchValue[0].replace('-rgb', '')
            colorProperties['--color-accent-foreground'] = `var(${matchValue[1].replace('-rgb', '')}-foreground, var(--color-light))`

            return {
                ...colorProperties,
                'accent-color': settings.colorMix ? 'var(--color-accent)' : 'rgb(var(--color-accent))'
            }
        } else {
            if (matchValue[1].includes('-rgb')) {
                colorProperties['--color-accent'] = toColorValue(value)
            } else {
                colorProperties['--color-accent'] = settings.rgb ? `rgb(var(--color-accent-rgb) / ${toColorValue(value).match(/calc\((.*?)\)/)[0]})` : toColorValue(value)
            }

            colorProperties['--color-accent-foreground'] = settings.rgb ? 'rgb(var(--color-accent-foreground-rgb))' : `var(${matchValue[1]}-foreground, var(--color-light))`

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
}

export const textColor = ({ value, corePlugins }, settings) => {
    const matchValue = toColorValue(value).match(/var\((--color-.*?)\)/)
    const withCurrentRgb = {}

    if (matchValue && settings.rgb) {
        withCurrentRgb['--tw-text-current-rgb'] = matchValue[1].includes('rgb') ? matchValue[0] : `var(${matchValue[1]}-rgb)`
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
}
