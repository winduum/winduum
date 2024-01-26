const afterNextRepaint = () => {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resolve()
            })
        })
    })
}

export const showToast = async (selector, options = {}) => {
    options = {
        visibleClass: 'in',
        autoHide: false,
        toastHeightProperty: '--c-toast-height',
        ...options
    }

    selector.style.setProperty(options.toastHeightProperty, `${selector.offsetHeight}px`)
    selector.style.height = 0

    await Promise.all(selector.getAnimations().map(animation => animation.finished))

    selector.style.height = ''
    selector.classList.add(options.visibleClass)

    // if (options.autoHide) {
    //     setTimeout(() => {
    //         // LibNotification.hide(uid)
    //     }, 10000 * ((id + 1) / 2))
    // }
}

export const closeToast = async (element, options = {}) => {
    options = {
        hiddenClass: 'out',
        selector: '.c-toast',
        heightProperty: '--c-toast-height',
        ...options
    }

    element.style.setProperty(options.toastHeightProperty, `${element.offsetHeight}px`)

    await afterNextRepaint()

    element.classList.add(options.hiddenClass)

    await Promise.all(element.getAnimations().map(animation => animation.finished))

    element.remove()

    if ([...document.querySelectorAll(options.selector)].length < 1) {
        document.querySelector(options.selector).remove()
    }
}

export const insertToaster = async (element, options = {}) => {
    options = {
        selector: '.c-toaster',
        classes: [],
        content: '<div class="c-toaster"></div>',
        ...options
    }

    if (!document.querySelector(options.selector)) {
        element.insertAdjacentHTML('beforeend', options.content)
    }

    document.querySelector(options.selector).classList.add(...options.classes)
}

export const insertToast = async (element, options = {}) => {
    options = {
        content: null,
        classes: 'c-toast',
        title: '',
        text: '',
        slotStart: '',
        slotEnd: '',
        ...options
    }

    element.insertAdjacentHTML('beforeend', options.content || `
        <div class="${options.classes ?? ''}" role="status" aria-live="assertive" aria-atomic="true">
            <div class="shadow">
               ${options.slotStart}
                <div class="flex-col">
                    <div class="ui-title">${options.title}</div>           
                    <div class="ui-text">${options.text}</div>
                </div>
                ${options.slotEnd}
            </div>
        </div>
    `)

    await showToast(element.children[element.children.length - 1])
}

export const closeAll = async (options = {}) => {
    document.querySelectorAll('.c-toast .c-toast-item').forEach(toast =>
        closeToast(toast)
    )
}
