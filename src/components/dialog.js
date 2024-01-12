/**
 * @type {import("./dialog").DefaultOptions}
*/
export const defaultOptions = {
    openClass: 'is-c-dialog-open',
    scrollbarWidthProperty: '--c-dialog-scrollbar-width',
    closable: true ?? null,
    remove: false ?? null
}

/**
 * @param {string} selector.
 */
export const dialogSelector = selector => document.querySelectorAll(selector)[document.querySelectorAll(selector).length - 1]

/**
 * Dismisses a dialog.
 * @param {HTMLDialogElement} selector - The dialog element to dismiss.
 * @param {import("./dialog").DefaultOptions} options - The options for closing the dialog.
 * @returns Promise<void>
 */
export const dismissDialog = async (selector, options = defaultOptions) => {
    await Promise.allSettled(selector.getAnimations().map(animation => animation.finished))
    selector.inert = true
    selector.dispatchEvent(new CustomEvent('c-dialog:dismiss'))

    options.remove && selector.remove()

    if (!document.querySelector('dialog[open]')) {
        document.documentElement.style.removeProperty(options.scrollbarWidthProperty)
        document.documentElement.classList.remove(options.openClass)
    }
}

/**
 * Shows a dialog.
 * @param {import("./dialog").DialogElement} selector - The dialog element to show.
 * @param {import("./dialog").DefaultOptions} options - The options for showing the dialog.
 * @returns Promise<void>
 */
export const showDialog = async (selector, options = {}) => {
    options = {
        ...defaultOptions,
        ...options
    }

    document.documentElement.style.setProperty(options.scrollbarWidthProperty, `${window.innerWidth - document.body.clientWidth}px`)

    if (!selector?._dialogHasEvents && options.closable) {
        selector.addEventListener('keydown', ({ key }) => {
            if (key === 'Escape') {
                requestAnimationFrame(() => dismissDialog(selector, options))
            }
        })

        selector.addEventListener('click', ({ target }) => {
            if (target.nodeName === 'DIALOG') {
                closeDialog(selector, options)
            }
        })

        selector._dialogHasEvents = true
    }

    selector.inert = false

    document.documentElement.classList.add(options.openClass)

    window.HTMLDialogElement
        ? selector.showModal()
        : selector.setAttribute('open', '')
}

/**
 * Closes and dismisses a dialog.
 * @param {HTMLDialogElement} selector - The dialog element to dismiss.
 * @param {import("./dialog").DefaultOptions} options - The options for closing the dialog.
 * @returns Promise<void>
 */
export const closeDialog = async (selector, options = {}) => {
    options = {
        ...defaultOptions,
        ...options
    }

    window.HTMLDialogElement
        ? selector.close()
        : selector.removeAttribute('open')

    await dismissDialog(selector, options)
}

/**
 * Inserts a dialog into the DOM.
 * @param {string} content - The HTML content to insert into the dialog.
 * @param {import("./dialog").InsertOptions} options - The options for inserting the dialog.
 * @returns Promise<void>
 */
export const insertDialog = async (content, options = {}) => {
    options = {
        selector: '.c-dialog.is-inserted' ?? null,
        class: 'c-dialog is-inserted' ?? null,
        remove: true ?? null,
        append: false ?? null,
        show: {},
        ...options
    }

    if (!dialogSelector(options.selector) || options.append) {
        document.body.insertAdjacentHTML('beforeend', `<dialog class="${options.class}">${content}</dialog>`)
    } else {
        dialogSelector(options.selector)?.firstElementChild?.remove()
        dialogSelector(options.selector).insertAdjacentHTML('beforeend', content)
    }

    await showDialog(dialogSelector(options.selector), options.show)
}

/**
 * Fetches a dialog from a URL and inserts it into the DOM.
 * @param {import("./dialog").FetchOptions} options - The options for fetching and inserting the dialog.
 */
export const fetchDialog = async ({ url, insert = {} }) => {
    await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(response => response.json())
        .then(async ({ content }) => await insertDialog(content, insert))
}

export default {
    defaults: defaultOptions,
    dismiss: dismissDialog,
    show: showDialog,
    close: closeDialog,
    insert: insertDialog,
    fetch: fetchDialog
}