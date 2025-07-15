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
 * @param {HTMLElement | Element} element
 * @param {'open' | 'close'} state
 * @param {string} snapClass
 * @returns void
 */
export const toggleDrawerAttributes = (element, state = 'open', snapClass) => {
    element.classList[state === 'open' ? 'add' : 'remove'](...snapClass.split(/\s/))
    element.inert = state === 'close'
    element.dispatchEvent(new CustomEvent(`x-drawer:${state}`))
}

/**
 * @param {number} scrollState
 * @param {number} scrollDirection
 * @returns boolean
 */
export const scrollDrawerState = (scrollState, scrollDirection) => {
    return scrollState ? Math.ceil(scrollDirection) >= scrollState : Math.floor(scrollDirection) <= scrollState
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

    if (scrollDrawerState(options.scrollOpen, options.scrollDirection)) {
        toggleDrawerAttributes(element, 'open', options.snapClass)
    }

    if (scrollDrawerState(options.scrollClose, options.scrollDirection) && !element.inert) {
        toggleDrawerAttributes(element, 'close', options.snapClass)
        element.close && element.close()
    }
}
