/**
 * @param {HTMLInputElement} element
 * @param {import("./").ToggleDetailsOptions} options
 * @returns void
 */
export const toggleDetails = (element, options = {}) => {
  const { selector } = {
    selector: 'details',
    ...options,
  }

  element?.closest(selector)?.toggleAttribute('open', element.checked)
}
