import { nextRepaint } from '../../common.js'

/**
 * @param {HTMLElement | Element} element
 * @param {number} distance
 * @param {'top' | 'left'} direction
 * @returns void
 */
export const showDrawer = async (element, distance = 0, direction = 'left') => {
    element.scroll({ [direction]: distance })
}

/**
 * @param {HTMLElement | Element} element
 * @param {number} distance
 * @param {'top' | 'left'} direction
 * @returns void
 */
export const closeDrawer = (element, distance = element.scrollWidth, direction = 'left') => {
    element.scroll({ [direction]: distance })
}

/**
 * @param {HTMLElement | Element} element
 * @param {number} distance
 * @param {'top' | 'left'} direction
 * @returns void
 */
export const scrollInitDrawer = async (element, distance = element.scrollWidth, direction = 'left') => {
    element.scroll({ [direction]: distance, behavior: 'instant' })
    await nextRepaint()
}

/**
 * @param {HTMLDialogElement | Element} element
 * @param {import("./").ScrollDrawerOptions} options
 * @returns void
 */
export const scrollDrawer = (element, options = {}) => {
    options = {
        snapClass: 'snap-x snap-mandatory',
        opacityProperty: '--background-color-opacity',
        opacityRatio: 1,
        scrollOpen: 0,
        scrollClose: element.scrollWidth - element.clientWidth,
        scrollSize: element.scrollWidth - element.clientWidth,
        scrollDirection: element.scrollLeft,
        ...options
    }

    element.style.setProperty(
        options.opacityProperty,
        `${Math.min(Math.abs((options.scrollDirection / options.scrollSize) - options.opacityRatio), 1)}`
    )

    if (options.scrollDirection === options.scrollOpen) {
        element.classList.add(...options.snapClass.split(/\s/))
        element.inert = false
        element.dispatchEvent(new CustomEvent('x-drawer:open'))
    }

    const closeDirection = options.scrollClose ? options.scrollDirection >= options.scrollClose : options.scrollDirection <= options.scrollClose

    if (closeDirection && !element.inert) {
        element.classList.remove(...options.snapClass.split(/\s/))
        element.inert = true
        element.close && element.close()
        element.dispatchEvent(new CustomEvent('x-drawer:close'))
    }
}
