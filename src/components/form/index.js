/**
 * @param {Event | SubmitEvent} event
 * @param {import("./").ValidateFormOptions} options
 * @returns void
 */
export const validateForm = (event, options = {}) => {
    options = {
        validateSelectors: '.x-control, .x-check, .x-switch, .x-rating, .x-color',
        validateOptions: {},
        submitterLoadingAttribute: 'data-loading',
        scrollOptions: { behavior: 'smooth', block: 'center' },
        ...options
    }

    if (!event.target.checkValidity()) {
        event.preventDefault()
        event.stopImmediatePropagation()

        event.target.querySelector(':invalid').scrollIntoView(options.scrollOptions)
        event.target.querySelector(':invalid').focus()
    } else {
        event?.submitter?.setAttribute(options.submitterLoadingAttribute, '')
    }

    event.target.querySelectorAll(options.validateSelectors).forEach((element) => {
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
        infoParentSelector: '.x-field',
        infoSelector: '.x-info',
        infoContent: '<div class="x-info text-error validity"></div>',
        endParentSelector: '.x-control',
        endSelector: '.ms-auto',
        endContent: '<div class="ms-auto"></div>',
        validAttribute: 'data-valid',
        validIcon: null,
        invalidAttribute: 'data-invalid',
        invalidIcon: '<svg class="text-error validity" aria-hidden="true"><use href="#icon-exclamation-circle"></use></svg>',
        activeAttribute: 'data-active',
        ...options
    }

    if (!element.querySelector(options.selector)) return

    const validationElement = element.querySelector(options.selector)
    const validationMessage = validationElement.dataset.validationMessage ?? validationElement.validationMessage
    const infoParentElement = validationElement?.closest(options.infoParentSelector)
    const endParentElement = validationElement.closest(options.endParentSelector)
    const infoSelector = options.infoSelector + options.validitySelector
    const endSelector = `${options.endSelector} ${options.validitySelector}`

    const insertIcon = (icon) => {
        if (!endParentElement || !icon) return

        if (!element?.querySelector(options.endSelector)) {
            element?.insertAdjacentHTML('beforeend', options.endContent)
        }

        element.querySelector(options.endSelector).insertAdjacentHTML('afterbegin', icon)
    }

    if (validationElement.value !== '') {
        element.setAttribute(options.activeAttribute, '')
    } else {
        element.removeAttribute(options.activeAttribute)
    }

    if (!validationElement.outerHTML.match(options.ignoreMatch) && options.validate) {
        element?.removeAttribute(options.validAttribute)
        element?.removeAttribute(options.invalidAttribute)

        infoParentElement?.querySelector(infoSelector)?.remove()
        endParentElement?.querySelector(endSelector)?.remove()

        if (validationElement.checkValidity()) {
            element.setAttribute(options.validAttribute, '')

            insertIcon(options.validIcon)
        } else {
            element.setAttribute(options.invalidAttribute, '')

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
