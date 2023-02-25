const defaultOptions = {
    openClass: 'is-lib-dialog-open',
    show: {
        content: undefined ?? null,
        selector: '.lib-dialog[data-type="dynamic"]' ?? null,
        remove: false ?? null,
        append: false ?? null,
        closable: true ?? null
    },
    close: {
        selector: '.lib-dialog[data-type="dynamic"]' ?? null,
        remove: false ?? null
    }
}

const dialogSelector = selector => typeof selector === 'string'
        ? document.querySelectorAll(selector)[document.querySelectorAll(selector).length - 1] ?? null
        : selector

const dialogDismiss = async (options) => {
    await Promise.allSettled(dialogSelector(options.selector).getAnimations().map(animation => animation.finished))
    options.remove && dialogSelector(options.selector).remove()
    dialogSelector(options.selector).setAttribute('inert', '')

    if (!document.querySelector('dialog[open]')) {
        document.documentElement.classList.remove(defaultOptions.openClass)
    }
}

const showDialog = async (options = defaultOptions.show) => {
    options = Object.assign({}, defaultOptions.show, options)

    if (options.content && !options.append && dialogSelector(options.selector)) {
        dialogSelector(options.selector)?.firstElementChild?.remove()
    }

    if (options.content && (options.append || !dialogSelector(options.selector))) {
        document.body.insertAdjacentHTML('beforeend', '<dialog class="lib-dialog" data-type="dynamic"></dialog>')
    }

    if (!dialogSelector(options.selector)._dialogHasEvents && options.closable) {
        dialogSelector(options.selector).addEventListener('keydown', async ({ key }) => {
            if (key === 'Escape') {
                setTimeout(() => dialogDismiss(options), 1)
            }
        })

        dialogSelector(options.selector).addEventListener('click', ({ target }) => {
            if (target.nodeName === 'DIALOG') {
                closeDialog(options)
            }
        })

        dialogSelector(options.selector)._dialogHasEvents = true
    }

    dialogSelector(options.selector).removeAttribute('inert')

    options.content &&
        dialogSelector(options.selector).insertAdjacentHTML('beforeend', options.content)

    document.documentElement.classList.add(defaultOptions.openClass)

    window.HTMLDialogElement
        ? dialogSelector(options.selector).showModal()
        : dialogSelector(options.selector).setAttribute('open', '')

    document.documentElement.style.setProperty('--lib-dialog-scrollbar-width', `${window.innerWidth - document.body.clientWidth}px`)
}

const closeDialog = async (options = defaultOptions.close) => {
    options = Object.assign({}, defaultOptions.close, options)

    window.HTMLDialogElement
        ? dialogSelector(options.selector).close()
        : dialogSelector(options.selector).removeAttribute('open')

    await dialogDismiss(options)
}

const fetchDialog = async ({ url, showOptions = {} }) => {
    await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(response => response.json())
        .then(async ({ content }) => await showDialog({ content, ...showOptions }))
}

export { showDialog, closeDialog, fetchDialog }
