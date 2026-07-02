/**
 * @param {SubmitEvent & { target: HTMLFormElement }} event
 * @param {import("./").ValidateFormOptions} options
 * @returns void
 */
export const validateForm = (event, options = {}) => {
  options = {
    validateSelector: '.x-field',
    validateOptions: {},
    validateField,
    submitterLoadingAttribute: 'data-loading',
    scrollOptions: { behavior: 'smooth', block: 'center' },
    ...options,
  }

  if (!event.target.checkValidity()) {
    event.preventDefault()
    event.stopImmediatePropagation()

    event.target.querySelector(':invalid').scrollIntoView(options.scrollOptions)
    event.target.querySelector(':invalid').focus()
  }
  else if (options.submitterLoadingAttribute) {
    event?.submitter?.setAttribute(options.submitterLoadingAttribute, '')
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
    selector: ':is(input:not([type="hidden"]), textarea, select):not([readonly], [data-novalidate])',
    validitySelector: '[data-validity]',
    infoContent: '<div class="x-info text-error" data-validity></div>',
    iconParentSelector: '.x-control',
    iconSelector: '.ms-auto',
    iconContent: '<div class="ms-auto"></div>',
    validIcon: null,
    invalidIcon: '<svg class="text-error" data-validity aria-hidden="true"><use href="#heroicons-outline/exclamation-circle"></use></svg>',
    ...options,
  }

  const validationElements = [...element.querySelectorAll(options.selector)]

  if (!validationElements.length) return

  element.querySelectorAll(options.validitySelector).forEach(el => el.remove())

  const invalidElements = validationElements.filter(validationElement => !validationElement.checkValidity())

  validationElements.forEach((validationElement) => {
    const icon = invalidElements.includes(validationElement) ? options.invalidIcon : options.validIcon
    const iconParentElement = validationElement.closest(options.iconParentSelector)

    if (!iconParentElement || !icon) return

    if (!iconParentElement.querySelector(options.iconSelector)) {
      iconParentElement.insertAdjacentHTML('beforeend', options.iconContent)
    }

    iconParentElement.querySelector(options.iconSelector).insertAdjacentHTML('afterbegin', icon)
  })

  if (!invalidElements.length) return

  element.insertAdjacentHTML('beforeend', options.infoContent)
  element.lastElementChild.textContent = options.validationMessage ?? invalidElements[0].dataset.validationMessage ?? invalidElements[0].validationMessage
}

export default {
  validateForm,
  validateField,
}
