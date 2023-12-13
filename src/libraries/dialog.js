export const defaultOptions = {
    openClass: 'is-lib-dialog-open',
    scrollbarWidthProperty: '--lib-dialog-scrollbar-width',
    show: {
        closable: true ?? null,
        onCloseStart: () => null,
        onCloseEnd: () => null
    },
    close: {
        remove: false ?? null
    },
    insert: {
        selector: '.lib-dialog.is-inserted' ?? null,
        class: 'lib-dialog is-inserted' ?? null,
        remove: true ?? null,
        append: false ?? null
    }
}

export const dialogSelector = selector => document.querySelectorAll(selector)[document.querySelectorAll(selector).length - 1]

/**
 * Dismisses a dialog.
 * @type {typeof import("./dialog").dismissDialog}
 * @param selector - The dialog element to dismiss.
 * @param options - The options for closing the dialog.
 */
export const dismissDialog = async (selector, options = defaultOptions.close) => {
    await Promise.allSettled(selector.getAnimations().map(animation => animation.finished))
    selector.setAttribute('inert', '')
    options.remove && selector.remove()

    if (!document.querySelector('dialog[open]')) {
        document.documentElement.classList.remove(defaultOptions.openClass)
    }
}

/**
 * Shows a dialog.
 * @type {typeof import("./dialog").showDialog}
 * @param selector - The dialog element to show.
 * @param options - The options for showing the dialog.
 */
export const showDialog = async (selector, options = defaultOptions.show) => {
    options = Object.assign({}, defaultOptions.show, options)

    document.documentElement.style.setProperty(defaultOptions.scrollbarWidthProperty, `${window.innerWidth - document.body.clientWidth}px`)

    if (!selector?._dialogHasEvents && options.closable) {
        selector.addEventListener('keydown', async ({ key }) => {
            if (key === 'Escape') {
                setTimeout(async () => {
                    options.onCloseStart()
                    await dismissDialog(selector, options)
                    options.onCloseEnd()
                }, 1)
            }
        })

        selector.addEventListener('click', async ({ target }) => {
            if (target.nodeName === 'DIALOG') {
                options.onCloseStart()
                await closeDialog(selector, options)
                options.onClose()
            }
        })

        selector._dialogHasEvents = true
    }

    selector.removeAttribute('inert')

    document.documentElement.classList.add(defaultOptions.openClass)

    window.HTMLDialogElement
        ? selector.showModal()
        : selector.setAttribute('open', '')
}

/**
 * Closes and dismisses a dialog.
 * @type {typeof import("./dialog").closeDialog}
 * @param selector - The dialog element to dismiss.
 * @param options - The options for closing the dialog.
 */
export const closeDialog = async (selector, options = defaultOptions.close) => {
    options = Object.assign({}, defaultOptions.close, options)

    window.HTMLDialogElement
        ? selector.close()
        : selector.removeAttribute('open')

    await dismissDialog(selector, options)
}

/**
 * Inserts a dialog into the DOM.
 * @type {typeof import("./dialog").insertDialog}
 * @param content - The HTML content to insert into the dialog.
 * @param options - The options for inserting the dialog.
 */
export const insertDialog = async (content, options = defaultOptions.insert) => {
    options = Object.assign({}, defaultOptions.insert, options)

    if (!dialogSelector(options.selector) || options.append) {
        document.body.insertAdjacentHTML('beforeend', `<dialog class="${options.class}">${content}</dialog>`)
    } else {
        dialogSelector(options.selector)?.firstElementChild?.remove()
        dialogSelector(options.selector).insertAdjacentHTML('beforeend', content)
    }

    await showDialog(dialogSelector(options.selector), options)
}

/**
 * Fetches a dialog from a URL and inserts it into the DOM.
 * @type {typeof import("./dialog").fetchDialog}
 * @param options - The options for fetching and inserting the dialog.
 */
export const fetchDialog = async ({ url, insertOptions = {} }) => {
    await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(response => response.json())
        .then(async ({ content }) => await insertDialog(content, insertOptions))
}

export default {
    defaults: defaultOptions,
    dismiss: dismissDialog,
    show: showDialog,
    close: closeDialog,
    insert: insertDialog,
    fetch: fetchDialog
}
