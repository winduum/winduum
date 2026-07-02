/**
 * @param {SubmitEvent & { target: HTMLFormElement }} event
 * @param {import("./").ValidateFormOptions} options
 * @returns void
 */
export const validateForm = (event, options = {}) => {
  options = {
    validateSelector: '.x-field',
    validateOptions: {
      validate: true,
    },
    validateField,
    submitterLoadingAttribute: 'data-loading',
    scrollOptions: { behavior: 'smooth', block: 'center' },
    ...options,
  }

  if (options.validateOptions.validate) {
    if (!event.target.checkValidity()) {
      event.preventDefault()
      event.stopImmediatePropagation()

      event.target.querySelector(':invalid').scrollIntoView(options.scrollOptions)
      event.target.querySelector(':invalid').focus()
    }
    else if (options.submitterLoadingAttribute) {
      event?.submitter?.setAttribute(options.submitterLoadingAttribute, '')
    }
  }

  event.target.querySelectorAll(options.validateSelector).forEach((element) => {
    options.validateField(element, options.validateOptions)
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
    selector: ':is(input:not([type="hidden"]), textarea, select):not([readonly], [data-novalidate])',
    validitySelector: '[data-validity]',
    infoContent: '<div class="x-info text-error" data-validity></div>',
    endParentSelector: '.x-control',
    endSelector: '.ms-auto',
    endContent: '<div class="ms-auto"></div>',
    invalidIcon: '<svg class="text-error" data-validity aria-hidden="true"><use href="#icon-exclamation-circle"></use></svg>',
    ...options,
  }

  const validationElements = /** @type {HTMLInputElement[]} */ ([...element.querySelectorAll(options.selector)])

  if (!validationElements.length || !options.validate) return

  element.querySelectorAll(options.validitySelector).forEach(el => el.remove())

  const invalidElements = validationElements.filter(validationElement => !validationElement.checkValidity())

  if (!invalidElements.length) return

  invalidElements.forEach((validationElement) => {
    const endParentElement = validationElement.closest(options.endParentSelector)

    if (!endParentElement || !options.invalidIcon) return

    if (!endParentElement.querySelector(options.endSelector)) {
      endParentElement.insertAdjacentHTML('beforeend', options.endContent)
    }

    endParentElement.querySelector(options.endSelector).insertAdjacentHTML('afterbegin', options.invalidIcon)
  })

  element.insertAdjacentHTML('beforeend', options.infoContent)
  element.lastElementChild.textContent = options.validationMessage ?? invalidElements[0].dataset.validationMessage ?? invalidElements[0].validationMessage
}

export default {
  validateForm,
  validateField,
}
