/**
 * @param {HTMLElement | Element} element - The dialog element to show.
 * @param {import("./").ToggleTabOptions} options - The options for showing the dialog.
 * @returns void
 */
export const toggleTab = (element, options = {}) => {
    options.tabElements?.forEach(element => (element.ariaSelected = 'false'))
    options.tabPanelElements?.forEach(target => (target.ariaHidden = 'true'))
    element.ariaSelected = 'true'

    const ariaControls = document.getElementById(element.getAttribute('aria-controls'))
    if (ariaControls) (ariaControls.ariaHidden = 'false')
}
