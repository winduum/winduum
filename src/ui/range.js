/**
 * @type {import("./range").DefaultOptions}
 */
export const defaultOptions = {
    selector: '.ui-range',
    track: 'start'
}

/**
 * @param {import("./range").TrackOptions} options
 * @param {'start' | 'end'} track
 * @returns void
 */
export const setTrackProperty = ({ element, value, max }, track = defaultOptions.track) => {
    element.style.setProperty('--ui-range-track-' + track, `${(value / max * 100).toString()}%`)
}

/**
 * @param {HTMLInputElement} target
 * @param {import("./range").DefaultOptions} options
 * @returns void
 */
export const setValue = (target, options = {}) => {
    const { selector, track } = {
        ...defaultOptions,
        ...options
    }

    const element = target.closest(selector)

    if (!element._trackValues) {
        element._trackValues = {
            start: 0,
            end: Infinity
        }
    }

    if (Object.keys(element._trackValues).length > 1) {
        if (
            (track === 'start' && target.value < element._trackValues.end) ||
            (track === 'end' && element._trackValues.start < target.value)
        ) {
            element._trackValues[track] = Number(target.value)
        }

        target.value = element._trackValues[track]
    }

    setTrackProperty({
        element,
        value: target.value,
        max: target.max || 100
    }, track)
}

/**
 * @param {HTMLInputElement} target
 * @param {import("./range").OutputOptions} options
 * @returns void
 */
export const setOutputValue = (target, options = {}) => {
    const { element, lang, formatOptions } = {
        element: null,
        lang: document.documentElement.lang,
        formatOptions: {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        },
        ...options
    }

    element.innerHTML = Number(target.value).toLocaleString(lang, formatOptions)
}
