/**
 * @type {import("./").DefaultOptions}
 */
export const defaultOptions = {
    selector: 'details',
    summarySelector: 'summary'
}

/**
 * @param {HTMLInputElement | HTMLElement} element
 * @param {import("./").DefaultOptions} options
 * @returns Promise<void>
 */
export const showDetails = async (element, options = {}) => {
    options = {
        ...defaultOptions,
        ...options
    }

    const details = element.closest(options.selector)
    const { down } = await import('slide-element')
    const content = details.querySelector(options.summarySelector).nextElementSibling

    details._isHiding = false
    details.open = true

    await down(content, {
        display: ''
    })
}

/**
 * @param {HTMLInputElement | HTMLElement} element
 * @param {import("./").DefaultOptions} options
 * @returns Promise<void>
 */
export const closeDetails = async (element, options = {}) => {
    options = {
        ...defaultOptions,
        ...options
    }

    const details = element.closest(options.selector)
    const { up } = await import('slide-element')
    const content = details.querySelector(options.summarySelector).nextElementSibling

    details._isHiding = true

    await up(content, {
        display: ''
    })

    details._isHiding && (details.open = false)
    details._isHiding = false
}

/**
 * @param {HTMLInputElement | HTMLElement} element
 * @param {import("./").DefaultOptions} options
 * @returns Promise<void>
 */
export const toggleDetails = async (element, options = {}) => {
    options = {
        ...defaultOptions,
        ...options
    }

    const details = element.closest(options.selector)

    if (details._isHiding && !element.checked) return

    if (element.checked ?? !details.open) {
        await showDetails(element, options)
    } else {
        await closeDetails(element, options)
    }
}
