/**
 * Shows a ripple effect.
 * @param {MouseEvent | import("./").ShowRippleEvent} options
 * @param {HTMLElement} rippleElement
 * @returns void
 */
export const showRipple = ({ currentTarget, clientX, clientY }, rippleElement = currentTarget.querySelector('.ripple')) => {
    if (!rippleElement) {
        currentTarget.insertAdjacentHTML('beforeend', "<div class='ripple'></div>")
        rippleElement = currentTarget.querySelector('.ripple')
    }

    rippleElement.classList.remove('animation-ripple')

    if (rippleElement.clientWidth === 0 && rippleElement.clientHeight === 0) {
        const d = Math.max(currentTarget.offsetWidth, currentTarget.offsetHeight)

        rippleElement.style.width = d + 'px'
        rippleElement.style.height = d + 'px'
    }

    rippleElement.style.top = clientY - (rippleElement.clientHeight / 2) + 'px'
    rippleElement.style.left = clientX - (rippleElement.clientWidth / 2) + 'px'
    rippleElement.classList.add('animation-ripple')
}
