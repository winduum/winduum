/**
 * @param {Event | SubmitEvent} event
 * @param {import("./").ValidateFormOptions} options
 * @returns void
 */
export const validateForm = (event, options = {}) => {
    options = {
        validateSelectors: '.control, .check, .switch, .rating, .color',
        validateOptions: {},
        submitterLoadingClass: 'loading',
        ...options
    }

    if (!event.target.checkValidity()) {
        event.preventDefault()
        event.stopImmediatePropagation()

        event.target.querySelector(':invalid').scrollIntoView({ behavior: 'smooth', block: 'center' })
        event.target.querySelector(':invalid').focus()
    } else {
        event?.submitter?.classList.add(options.submitterLoadingClass)
    }

    event.target.querySelectorAll(options.validateSelectors).forEach(element => {
        validateField(element, options.validateOptions)
    })
}

/**
 * @param {HTMLElement} element
 * @param {import("./").ValidateFieldOptions} options
 * @returns void
 */
export const validateField = (element, options = {}) => {
    options = {
        validate: true,
        selector: 'input:not([type="hidden"]), textarea, select',
        ignoreMatch: /(data-novalidate|readonly)/,
        validitySelector: '.validity',
        infoParentSelector: '.field',
        infoSelector: '.info',
        infoContent: '<div class="info text-error validity"></div>',
        endParentSelector: '.control',
        endSelector: '.ms-auto',
        endContent: '<div class="ms-auto"></div>',
        validClass: 'valid',
        validIcon: null,
        invalidClass: 'invalid',
        invalidIcon: '<svg class="text-error validity" aria-hidden="true"><use href="#icon-exclamation-circle"></use></svg>',
        activeClass: 'active',
        ...options
    }

    if (!element.querySelector(options.selector)) return

    const validationElement = element.querySelector(options.selector)
    const validationMessage = validationElement.dataset.validationMessage ?? validationElement.validationMessage
    const infoParentElement = validationElement?.closest(options.infoParentSelector)
    const endParentElement = validationElement.closest(options.endParentSelector)
    const infoSelector = options.infoSelector + options.validitySelector
    const endSelector = `${options.endSelector} ${options.validitySelector}`

    const insertIcon = icon => {
        if (!endParentElement || !icon) return

        if (!element?.querySelector(options.endSelector)) {
            element?.insertAdjacentHTML('beforeend', options.endContent)
        }

        element.querySelector(options.endSelector).insertAdjacentHTML('afterbegin', icon)
    }

    if (validationElement.value !== '') {
        element.classList.add(options.activeClass)
    } else {
        element.classList.remove(options.activeClass)
    }

    if (!validationElement.outerHTML.match(options.ignoreMatch) && options.validate) {
        element?.classList?.remove(options.validClass, options.invalidClass)

        infoParentElement?.querySelector(infoSelector)?.remove()
        endParentElement?.querySelector(endSelector)?.remove()

        if (validationElement.checkValidity()) {
            element.classList.add(options.validClass)

            insertIcon(options.validIcon)
        } else {
            element.classList.add(options.invalidClass)

            insertIcon(options.invalidIcon)

            if (infoParentElement) {
                infoParentElement.insertAdjacentHTML('beforeend', options.infoContent)
                infoParentElement.querySelector(infoSelector).textContent = validationMessage
            }
        }
    }
}

export default {
    validateForm,
    validateField
}
