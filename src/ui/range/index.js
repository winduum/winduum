/**
 * @param {import("./").SetTrackPropertyOptions} options
 * @param {'start' | 'end'} track
 * @returns void
 */
export const setTrackProperty = ({ element, value, min, max }, track = 'start') => {
    element.style.setProperty('--ui-range-track-' + track, `${(((value - min) / (max - min)) * 100).toString()}%`)
}

/**
 * @param {HTMLInputElement} element
 * @param {import("./").SetValueOptions} options
 * @returns void
 */
export const setValue = (element, options = {}) => {
    const { selector, track } = {
        selector: '.ui-range',
        track: 'start',
        ...options
    }

    const parentElement = element.closest(selector)

    if (!parentElement._trackValues) {
        parentElement._trackValues = {
            start: 0,
            end: Infinity
        }
    }

    if (Object.keys(parentElement._trackValues).length > 1) {
        if (
            (track === 'start' && element.value < parentElement._trackValues.end) ||
            (track === 'end' && parentElement._trackValues.start < element.value)
        ) {
            parentElement._trackValues[track] = Number(element.value)
        }

        element.value = parentElement._trackValues[track]
    }

    setTrackProperty({
        element: parentElement,
        value: element.value,
        min: Number(element.min) || 0,
        max: Number(element.max) || 100
    }, track)
}

/**
 * @param {HTMLInputElement} element
 * @param {HTMLOutputElement | Element} outputElement
 * @param {import("./").SetOutputOptions} options
 * @returns void
 */
export const setOutputValue = (element, outputElement, options = {}) => {
    options = {
        lang: document.documentElement.lang,
        formatOptions: {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        },
        ...options
    }

    outputElement.innerHTML = Number(element.value).toLocaleString(options.lang, options.formatOptions)
}
