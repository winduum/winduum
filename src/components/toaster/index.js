import { animationsFinished, nextRepaint } from '../../common.js'

/**
 * @param {HTMLElement} element
 * @param {import('./index').CloseToastOptions} options
 * @returns Promise<void>
 */
export const closeToast = async (element, options = {}) => {
    options = {
        hiddenClass: 'out',
        heightProperty: '--toast-block-size',
        ...options
    }

    const toaster = element.parentElement

    element.style.setProperty(options.heightProperty, `${element.offsetHeight}px`)

    await nextRepaint()

    element.classList.add(options.hiddenClass)

    await animationsFinished(element)

    element.remove()

    if (toaster.children.length < 1) toaster.remove()
}

/**
 * @param {HTMLElement} element
 * @param {import('./').ShowToastOptions} options
 * @returns Promise<void>
 */
export const showToast = async (element, options = {}) => {
    options = {
        visibleClass: 'in',
        autoHide: null,
        heightProperty: '--toast-block-size',
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
 * @param {import('./').InsertToasterOptions} options
 * @returns Promise<void>
 */
export const insertToaster = async (element, options = {}) => {
    options = {
        classes: '',
        ...options
    }

    if (!document.querySelector('.toaster')) {
        element.insertAdjacentHTML('beforeend', `<ol class="toaster ${options.classes}"></ol>`)
    }
}

/**
 * @param {HTMLElement} element
 * @param {import('./').InsertToastOptions} options
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
        <li class="toast ${options.classes}" role="status" aria-live="assertive" aria-atomic="true">
            <div class="toast-content">
               ${options.start}
                <div class="flex-col">
                    <div class="ui-title">${options.title}</div>           
                    <div class="ui-text">${options.text}</div>
                </div>
                ${options.end}
            </div>
        </li>
    `)

    await showToast(element.children[element.children.length - 1], options.show)
}

/**
 * @param {HTMLElement} element
 * @param {import('./').CloseToastOptions} options
 * @returns Promise<void>
 */
export const closeToaster = (element, options = {}) => {
    [...element.children].forEach(toast =>
        closeToast(toast, options)
    )
}
