import { animationsFinished, nextRepaint } from '../../common.js'

/**
 * @param {HTMLElement} element
 * @param {import('./index').CloseToastOptions} options
 * @returns Promise<void>
 */
export const closeToast = async (element, options = {}) => {
    options = {
        closedAttribute: 'data-closed',
        heightProperty: '--x-toast-block-size',
        ...options
    }

    element.style.setProperty(options.heightProperty, `${element.offsetHeight}px`)

    await nextRepaint()

    element.setAttribute(options.closedAttribute, '')

    await animationsFinished(element)

    options.remove && element.remove()
}

/**
 * @param {HTMLElement} element
 * @param {import('./').ShowToastOptions} options
 * @returns Promise<void>
 */
export const showToast = async (element, options = {}) => {
    options = {
        openAttribute: 'data-open',
        autoHide: null,
        heightProperty: '--x-toast-block-size',
        close: {},
        ...options
    }

    element.style.setProperty(options.heightProperty, `${element.offsetHeight}px`)
    element.style.height = '0'

    await animationsFinished(element)

    element.style.height = ''
    element.setAttribute(options.openAttribute, '')

    if (options.autoHide) {
        setTimeout(() => closeToast(element, options.close), options.autoHide * ((element.parentElement.children.length + 1) / 2))
    }
}
