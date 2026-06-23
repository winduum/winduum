import { closeToast } from '../toast/index.js'

/**
 * @param {HTMLElement} element
 * @param {import('./').CloseToastOptions} options
 * @returns Promise<void>
 */
export const closeToaster = (element, options = {}) => {
  [...element.children].forEach(toast =>
    closeToast(toast, options),
  )
}

/**
 * @returns MutationObserver
 */
export const toasterObserver = () => {
  return new MutationObserver((mutations) => {
    for (const { target } of mutations) {
      if (target.children.length > 0) {
        if (!target.matches(':popover-open')) {
          target?.showPopover?.()
        }
      }
      else {
        target?.hidePopover?.()
      }
    }
  })
}
