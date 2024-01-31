/**
 * Shows a ripple effect.
 * @param {MouseEvent<HTMLElement>} event - The dialog element to dismiss.
 * @param {HTMLElement} selector - The options for closing the dialog.
 * @returns void
 */
export const showRipple = ({ currentTarget, offsetX, offsetY }, selector = currentTarget.querySelector('.ripple')) => {
    if (!selector) {
        currentTarget.insertAdjacentHTML('beforeend', "<div class='ripple'></div>")
        selector = currentTarget.querySelector('.ripple')
    }

    selector.classList.remove('animation-ripple')

    if (selector.clientWidth === 0 && selector.clientHeight === 0) {
        const d = Math.max(currentTarget.offsetWidth, currentTarget.offsetHeight)

        selector.style.width = d + 'px'
        selector.style.height = d + 'px'
    }

    selector.style.top = offsetY - (selector.clientHeight / 2) + 'px'
    selector.style.left = offsetX - (selector.clientWidth / 2) + 'px'
    selector.classList.add('animation-ripple')
}

export default {
    showRipple
}
