/**
 * Shows a ripple effect.
 * @param {HTMLElement} element - The dialog element to dismiss.
 * @returns void
 */
export const toggleSwap = (element) => {
  const ariaVisible = element.querySelector('[aria-hidden="false"]')
  const ariaHidden = element.querySelector('[aria-hidden="true"]')

  ariaVisible.ariaHidden = 'true'
  ariaHidden.ariaHidden = 'false'
}
