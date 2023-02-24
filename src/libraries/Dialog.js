const SELECTOR_DEFAULT = '.lib-dialog[data-type="dynamic"]'

const SHOW_DEFAULT = {
    content: undefined ?? null,
    selector: SELECTOR_DEFAULT ?? null,
    remove: false ?? null,
    append: false ?? null
}

const CLOSE_DEFAULT = {
    selector: SELECTOR_DEFAULT ?? null,
    remove: false ?? null
}

const dialogSelector = selector => typeof selector === 'string'
        ? document.querySelectorAll(selector)[document.querySelectorAll(selector).length - 1] ?? null
        : selector

const removeDialog = async (selector = SELECTOR_DEFAULT) => {
    await Promise.allSettled(dialogSelector(selector).getAnimations().map(animation => animation.finished))
    dialogSelector(selector).remove()
}

const showDialog = async (options = SHOW_DEFAULT) => {
    options = Object.assign(SHOW_DEFAULT, options)

    if (!options.append && options.content) {
        dialogSelector(options.selector)?.firstElementChild?.remove()
    }

    if (!dialogSelector(options.selector) || options.append || (options.selector && !options.content)) {
        options.content &&
            document.body.insertAdjacentHTML('beforeend', '<dialog class="lib-dialog" data-type="dynamic"></dialog>')

        if (!dialogSelector(options.selector)._dialogHasEvents) {
            dialogSelector(options.selector)._dialogHasEvents = true

            dialogSelector(options.selector).addEventListener('keydown', async ({ key }) => {
                if (key === 'Escape') {
                    dialogSelector(options.selector).setAttribute('inert', '')

                    options.remove && setTimeout(removeDialog, 1)
                }
            })

            dialogSelector(options.selector).addEventListener('mousedown', ({ target }) => {
                if (target.nodeName === 'DIALOG') {
                    hideDialog(options)
                }
            })
        }
    }

    dialogSelector(options.selector).removeAttribute('inert')

    options.content &&
        dialogSelector(options.selector).insertAdjacentHTML('beforeend', options.content)

    window.HTMLDialogElement
        ? dialogSelector(options.selector).showModal()
        : dialogSelector(options.selector).setAttribute('open', '')

    document.documentElement.style.setProperty('--lib-dialog-offset-r', `${window.innerWidth - document.body.clientWidth}px`)
}

const hideDialog = async (options = CLOSE_DEFAULT) => {
    options = Object.assign(CLOSE_DEFAULT, options)

    window.HTMLDialogElement
        ? dialogSelector(options.selector).close()
        : dialogSelector(options.selector).removeAttribute('open')

    dialogSelector(options.selector).setAttribute('inert', '')
    options.remove && await removeDialog()
}

const fetchDialog = async ({ url }) => {
    fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(response => response.json())
        .then(({ dialog }) => showDialog(dialog))
}

export { showDialog, hideDialog, fetchDialog }
