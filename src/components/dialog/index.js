import { animationsFinished } from '../../common.js'

/**
 * @type {import("./").DefaultOptions}
*/
export const defaultOptions = {
    openClass: 'open',
    scrollbarWidthProperty: '--scrollbar-width',
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
        closable: true,
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

    window.HTMLDialogElement
        ? element.showModal()
        : element.setAttribute('open', '')

    element.classList.add(options.openClass)
    await animationsFinished(element.lastElementChild)
    element.dispatchEvent(new CustomEvent('c-dialog:show'))
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

    element.classList.remove(options.openClass)

    await animationsFinished(element.lastElementChild)

    window.HTMLDialogElement
        ? element.close()
        : element.removeAttribute('open')

    element.dispatchEvent(new CustomEvent('c-dialog:close'))
    options.remove && element.remove()
}
