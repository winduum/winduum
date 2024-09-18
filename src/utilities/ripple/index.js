/**
 * Shows a ripple effect.
 * @param {import("./").ShowRippleOptions} options
 * @param {HTMLElement} rippleElement
 * @returns void
 */
export const showRipple = ({ element, x, y }, rippleElement = element.querySelector('.ripple')) => {
    if (!rippleElement) {
        element.insertAdjacentHTML('beforeend', "<div class='ripple'></div>")
        rippleElement = element.querySelector('.ripple')
    }

    rippleElement.classList.remove('animation-ripple')

    if (rippleElement.clientWidth === 0 && rippleElement.clientHeight === 0) {
        const d = Math.max(element.offsetWidth, element.offsetHeight)

        rippleElement.style.width = d + 'px'
        rippleElement.style.height = d + 'px'
    }

    rippleElement.style.top = y - (rippleElement.clientHeight / 2) + 'px'
    rippleElement.style.left = x - (rippleElement.clientWidth / 2) + 'px'
    rippleElement.classList.add('animation-ripple')
}
