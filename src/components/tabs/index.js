export const toggleTabs = (element, options = {}) => {
    options = {
        activeClass: '',
        inactiveClass: '',
        tabControlElements: null,
        tabPanelElements: null
    }

    if (!options.tabPanelElements) return

    options.tabPanelElements.forEach(target => (target.ariaHidden = 'true'))

    const ariaControls = document.getElementById(element.getAttribute('aria-controls'))

    if (ariaControls) (ariaControls.ariaHidden = 'false')
}

export const removeActiveClasses = () => {

}

export const addActiveClasses = () => {

}
