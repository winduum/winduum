/**
 * Shows a ripple effect.
 * @param {MouseEvent} event - The dialog element to dismiss.
 * @param {HTMLElement} element - The options for closing the dialog.
 * @returns void
 */
export const showRipple = ({ currentTarget, offsetX, offsetY }, element = currentTarget.querySelector('.ripple')) => {
    if (!element) {
        currentTarget.insertAdjacentHTML('beforeend', "<div class='ripple'></div>")
        element = currentTarget.querySelector('.ripple')
    }

    element.classList.remove('animation-ripple')

    if (element.clientWidth === 0 && element.clientHeight === 0) {
        const d = Math.max(currentTarget.offsetWidth, currentTarget.offsetHeight)

        element.style.width = d + 'px'
        element.style.height = d + 'px'
    }

    element.style.top = offsetY - (element.clientHeight / 2) + 'px'
    element.style.left = offsetX - (element.clientWidth / 2) + 'px'
    element.classList.add('animation-ripple')
}
