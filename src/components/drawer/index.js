import { waitFor } from '../../common.js'

/**
 * @param {HTMLDialogElement | Element} element
 * @param {[number, number]} distance
 * @param {'top' | 'left'} direction
 * @returns void
 */
export const showDrawer = async (element, distance = () => [0, element.scrollWidth], direction = 'left') => {
    element.showModal()

    if (!element._scrollInitialized) {
        element.scroll({ [direction]: distance()[1], behavior: 'instant' })
        await waitFor(50)
        element._scrollInitialized = true
    }

    element.scroll({ [direction]: distance()[0] })
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
 * @param {HTMLDialogElement | Element} element
 * @param {import("./").ScrollDrawerOptions} options
 * @returns void
 */
export const scrollDrawer = (element, options = {}) => {
    if (!element._scrollInitialized) return

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

    if ((options.scrollDirection === options.scrollClose) && !element.inert) {
        element.classList.remove(...options.snapClass.split(/\s/))
        element.inert = true
        element.close()
        element.dispatchEvent(new CustomEvent('x-drawer:close'))
    }
}
