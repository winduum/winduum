import { animationsFinished } from '../../common.js'

/**
 * @type {import("./").DefaultOptions}
*/
export const defaultOptions = {
    closedAttribute: 'data-closed',
    openAttribute: 'data-open',
    scrollbarWidthProperty: '--default-scrollbar-width',
    contentSelector: '.x-dialog-content',
    closable: true,
    remove: false
}

/**
 * Shows a dialog.
 * @param {HTMLDialogElement | HTMLElement} element - The dialog element to show.
 * @param {import("./").DefaultOptions} options - The options for showing the dialog.
 * @returns Promise<void>
 */
export const showDialog = async (element, options = {}) => {
    options = {
        ...defaultOptions,
        ...options
    }

    document.documentElement.style.setProperty(options.scrollbarWidthProperty, `${window.innerWidth - document.body.clientWidth}px`)

    if (!element?._dialogHasEvents) {
        element.addEventListener('cancel', e => {
            e.preventDefault()
            options.closable && closeDialog(element, options)
        })

        element.addEventListener('click', ({ target }) => {
            if (target.nodeName === 'DIALOG' && options.closable) {
                closeDialog(element, options)
            }
        })

        element._dialogHasEvents = true
    }

    element.showModal()
    element.scroll(0, 0)

    element.setAttribute(options.openAttribute, '')

    element.dispatchEvent(new CustomEvent('x-dialog:show'))
}

/**
 * Closes and dismisses a dialog.
 * @param {HTMLDialogElement | HTMLElement} element - The dialog element to dismiss.
 * @param {import("./").DefaultOptions} options - The options for closing the dialog.
 * @returns Promise<void>
 */
export const closeDialog = async (element, options = {}) => {
    options = {
        ...defaultOptions,
        ...options
    }

    element.close()

    animationsFinished(element).finally(() => {
        element.removeAttribute(options.openAttribute)

        element.dispatchEvent(new CustomEvent('x-dialog:close'))
        options.remove && element.remove()
    })
}
