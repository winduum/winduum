import { closeToast } from '../toast/index.js'

/**
 * @param {HTMLElement} element
 * @param {import('./').CloseToastOptions} options
 * @returns Promise<void>
 */
export const closeToaster = (element, options = {}) => {
    [...element.children].forEach(toast =>
        closeToast(toast, options)
    )
}
