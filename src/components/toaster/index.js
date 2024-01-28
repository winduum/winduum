import { animationsFinished, nextRepaint } from '../../common.js'

/**
 * @param {HTMLElement} element
 * @param {import('./index').ShowToastOptions} options
 * @returns Promise<void>
 */
export const showToast = async (element, options = {}) => {
    options = {
        visibleClass: 'in',
        autoHide: null,
        heightProperty: '--c-toast-height',
        close: {},
        ...options
    }

    element.style.setProperty(options.heightProperty, `${element.offsetHeight}px`)
    element.style.height = '0'

    await animationsFinished(element)

    element.style.height = ''
    element.classList.add(options.visibleClass)

    if (options.autoHide) {
        setTimeout(() => closeToast(element, options.close), options.autoHide * ((element.parentElement.children.length + 1) / 2))
    }
}

/**
 * @param {HTMLElement} element
 * @param {import('./index').CloseToastOptions} options
 * @returns Promise<void>
 */
export const closeToast = async (element, options = {}) => {
    options = {
        hiddenClass: 'out',
        heightProperty: '--c-toast-height',
        ...options
    }

    const toaster = element.parentElement

    element.style.setProperty(options.toastHeightProperty, `${element.offsetHeight}px`)

    await nextRepaint()

    element.classList.add(options.hiddenClass)

    await animationsFinished(element)

    element.remove()

    if (toaster.children.length < 1) toaster.remove()
}

/**
 * @param {HTMLElement} element
 * @param {import('./index').InsertToasterOptions} options
 * @returns Promise<void>
 */
export const insertToaster = async (element, options = {}) => {
    options = {
        classes: '',
        ...options
    }

    if (!document.querySelector('.c-toaster')) {
        element.insertAdjacentHTML('beforeend', `<div class="c-toaster ${options.classes}"></div>`)
    }
}

/**
 * @param {HTMLElement} element
 * @param {import('./index').InsertToastOptions} options
 * @returns Promise<void>
 */
export const insertToast = async (element, options = {}) => {
    options = {
        classes: '',
        title: '',
        text: '',
        start: '',
        end: '',
        show: {},
        ...options
    }

    element.insertAdjacentHTML('beforeend', `
        <div class="c-toast ${options.classes}" role="status" aria-live="assertive" aria-atomic="true">
            <div class="c-toast-content">
               ${options.start}
                <div class="flex-col">
                    <div class="ui-title">${options.title}</div>           
                    <div class="ui-text">${options.text}</div>
                </div>
                ${options.end}
            </div>
        </div>
    `)

    await showToast(element.children[element.children.length - 1], options.show)
}

/**
 * @param {HTMLElement} element
 * @param {import('./index').CloseToastOptions} options
 * @returns Promise<void>
 */
export const closeToaster = (element, options = {}) => {
    [...element.children].forEach(toast =>
        closeToast(toast, options)
    )
}
