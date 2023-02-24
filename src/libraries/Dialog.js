const DEFAULTS = {
    openClass: 'is-lib-dialog-open',
    show: {
        content: undefined ?? null,
        selector: '.lib-dialog[data-type="dynamic"]' ?? null,
        remove: false ?? null,
        append: false ?? null
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
        document.documentElement.classList.remove(DEFAULTS.openClass)
    }
}

const showDialog = async (options = DEFAULTS.show) => {
    options = Object.assign({}, DEFAULTS.show, options)

    if (options.content && !options.append && dialogSelector(options.selector)) {
        dialogSelector(options.selector)?.firstElementChild?.remove()
    }

    if (options.content && (options.append || !dialogSelector(options.selector))) {
        document.body.insertAdjacentHTML('beforeend', '<dialog class="lib-dialog" data-type="dynamic"></dialog>')
    }

    if (!dialogSelector(options.selector)._dialogHasEvents) {
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

    window.HTMLDialogElement
        ? dialogSelector(options.selector).showModal()
        : dialogSelector(options.selector).setAttribute('open', '')

    document.documentElement.classList.add(DEFAULTS.openClass)
    document.documentElement.style.setProperty('--lib-dialog-scrollbar-width', `${window.innerWidth - document.body.clientWidth}px`)
}

const closeDialog = async (options = DEFAULTS.close) => {
    options = Object.assign({}, DEFAULTS.close, options)

    window.HTMLDialogElement
        ? dialogSelector(options.selector).close()
        : dialogSelector(options.selector).removeAttribute('open')

    await dialogDismiss(options)
}

const fetchDialog = async ({ url }) => {
    fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(response => response.json())
        .then(({ dialog }) => showDialog(dialog))
}

export { showDialog, closeDialog, fetchDialog }
