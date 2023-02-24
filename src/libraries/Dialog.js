const dialogSelector = selector =>
    typeof selector === 'string'
    ? document.querySelectorAll(selector)[document.querySelectorAll(selector).length - 1] ?? null
    : selector

const removeDialog = async () => {
    await Promise.allSettled(dialogSelector('.lib-dialog').getAnimations().map(animation => animation.finished))
    dialogSelector('.lib-dialog').remove()
}

const showDialogInline = async (selector, options = { remove: true, append: false }) => {
    return new Promise(resolve => {
        if (!dialogSelector(selector)._hasDialogEvents) {
            dialogSelector(selector)._hasDialogEvents = true

            dialogSelector(selector).addEventListener('keydown', async ({ key }) => {
                if (key === 'Escape') {
                    dialogSelector(selector).setAttribute('inert', '')
                }
            })

            dialogSelector(selector).addEventListener('mousedown', ({ target }) => {
                if (target.nodeName === 'DIALOG') {
                    window.HTMLDialogElement
                        ? dialogSelector(selector).close()
                        : dialogSelector(selector).removeAttribute('open')

                    dialogSelector(selector).setAttribute('inert', '')
                }
            })
        }

        dialogSelector(selector).removeAttribute('inert')

        window.HTMLDialogElement
            ? dialogSelector(selector).showModal()
            : dialogSelector(selector).setAttribute('open', '')

        document.documentElement.style.setProperty('--lib-dialog-offset-r', `${window.innerWidth - document.body.clientWidth}px`)

        resolve()
    })
}

const showDialog = async (content, options = { remove: true, append: false }) => {
    return new Promise(resolve => {
        if (!options.append) {
            dialogSelector('.lib-dialog')?.firstElementChild?.remove()
        }

        if (!dialogSelector('.lib-dialog') || options.append) {
            document.body.insertAdjacentHTML('beforeend', '<dialog class="lib-dialog"></dialog>')

            dialogSelector('.lib-dialog').addEventListener('keydown', async ({ key }) => {
                if (key === 'Escape') {
                    dialogSelector('.lib-dialog').setAttribute('inert', '')

                    options.remove && setTimeout(removeDialog, 1)
                }
            })

            dialogSelector('.lib-dialog').addEventListener('mousedown', ({ target }) => {
                if (target.nodeName === 'DIALOG') {
                    hideDialog(options)
                }
            })
        }

        dialogSelector('.lib-dialog').removeAttribute('inert')
        dialogSelector('.lib-dialog').insertAdjacentHTML('beforeend', content)

        window.HTMLDialogElement
            ? dialogSelector('.lib-dialog').showModal()
            : dialogSelector('.lib-dialog').setAttribute('open', '')

        document.documentElement.style.setProperty('--lib-dialog-offset-r', `${window.innerWidth - document.body.clientWidth}px`)

        resolve()
    })
}

const hideDialog = async (options = { remove: true }) => {
    return new Promise(async resolve => {
        window.HTMLDialogElement
            ? dialogSelector('.lib-dialog').close()
            : dialogSelector('.lib-dialog').removeAttribute('open')

        dialogSelector('.lib-dialog').setAttribute('inert', '')
        options.remove && await removeDialog()

        resolve()
    })
}

const fetchDialog = async ({ url }) => {
    fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(response => response.json())
        .then(({ dialog }) => showDialog(dialog))
}

export { showDialog, hideDialog, fetchDialog, showDialogInline }
