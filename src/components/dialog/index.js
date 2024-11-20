import { animationsFinished, nextRepaint } from '../../common.js'

/**
 * @type {import("./").DefaultOptions}
*/
export const defaultOptions = {
    openClass: 'visible',
    scrollbarWidthProperty: '--c-dialog-scrollbar-width',
    remove: false
}

/**
 * @param {string} selector.
 * @return HTMLDialogElement
 */
export const dialogSelector = selector => document.querySelectorAll(selector)[document.querySelectorAll(selector).length - 1]

/**
 * Dismisses a dialog.
 * @param {HTMLDialogElement} element - The dialog element to dismiss.
 * @param {import("./").DefaultOptions} options - The options for closing the dialog.
 * @returns Promise<void>
 */
export const dismissDialog = async (element, options = defaultOptions) => {
    await animationsFinished(element)
    element.inert = true
    element.classList.remove(options.openClass)
    element.dispatchEvent(new CustomEvent('c-dialog:dismiss'))

    options.remove && element.remove()

    if (!document.querySelector('dialog[open]')) {
        document.documentElement.style.removeProperty(options.scrollbarWidthProperty)
    }
}

/**
 * Shows a dialog.
 * @param {HTMLDialogElement | import("./").DialogElement} element - The dialog element to show.
 * @param {import("./").DefaultOptions} options - The options for showing the dialog.
 * @returns Promise<void>
 */
export const showDialog = async (element, options = {}) => {
    options = {
        closable: true,
        modal: true,
        ...defaultOptions,
        ...options
    }

    document.documentElement.style.setProperty(options.scrollbarWidthProperty, `${window.innerWidth - document.body.clientWidth}px`)

    if (!element?._dialogHasEvents) {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                options.closable && closeDialog(element, options)
            }
        })

        element.addEventListener('click', ({ target }) => {
            if (target.nodeName === 'DIALOG' && options.closable) {
                closeDialog(element, options)
            }
        })

        element._dialogHasEvents = true
    }

    element.inert = false
    element.classList.add(options.openClass)

    await nextRepaint()

    window.HTMLDialogElement
        ? options.modal ? element.showModal() : element.show()
        : element.setAttribute('open', '')
}

/**
 * Closes and dismisses a dialog.
 * @param {HTMLDialogElement} element - The dialog element to dismiss.
 * @param {import("./").DefaultOptions} options - The options for closing the dialog.
 * @returns Promise<void>
 */
export const closeDialog = async (element, options = {}) => {
    options = {
        ...defaultOptions,
        ...options
    }

    element.dispatchEvent(new CustomEvent('c-dialog:close'))

    window.HTMLDialogElement
        ? element.close()
        : element.removeAttribute('open')

    await dismissDialog(element, options)
}

/**
 * Inserts a dialog into the DOM.
 * @param {string} content - The HTML content to insert into the dialog.
 * @param {import("./").InsertDialogOptions} options - The options for inserting the dialog.
 * @returns Promise<void>
 */
export const insertDialog = async (content, options = {}) => {
    options = {
        selector: 'dialog.inserted',
        class: 'inserted',
        append: false,
        show: {
            remove: true
        },
        ...options
    }

    const dialog = new DOMParser().parseFromString(content, 'text/html').body.firstElementChild
    dialog.classList.add(options.class)

    if (!dialogSelector(options.selector) || options.append) {
        document.body.insertAdjacentHTML('beforeend', dialog.outerHTML)
    } else {
        dialogSelector(options.selector).outerHTML = dialog.outerHTML
    }

    await showDialog(dialogSelector(options.selector), options.show)
}

/**
 * Fetches a dialog from a URL and inserts it into the DOM.
 * @param {import("./").FetchDialogOptions} options - The options for fetching and inserting the dialog.
 */
export const fetchDialog = async ({ url, insert = {} }) => {
    await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(response => response.json())
        .then(async ({ content }) => await insertDialog(content, insert))
}
