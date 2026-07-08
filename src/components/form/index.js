import { validateField } from '../field/index.js'

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

export default {
  validateForm,
}
