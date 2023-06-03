/**
 * Shows a ripple effect.
 * @type {typeof import("./ripple").showRipple}
 */
export const showRipple = ({ currentTarget, layerX, layerY }, selector = currentTarget.querySelector('.lib-ripple')) => {
    if (!selector) {
        currentTarget.insertAdjacentHTML('beforeend', "<div class='lib-ripple'></div>")
        selector = currentTarget.querySelector('.lib-ripple')
    }

    selector.classList.remove('animation-ripple')

    if (selector.clientWidth === 0 && selector.clientHeight === 0) {
        const d = Math.max(currentTarget.offsetWidth, currentTarget.offsetHeight)

        selector.style.width = d + 'px'
        selector.style.height = d + 'px'
    }

    selector.style.top = layerY - (selector.clientHeight / 2) + 'px'
    selector.style.left = layerX - (selector.clientWidth / 2) + 'px'
    selector.classList.add('animation-ripple')
}

export default {
    show: showRipple
}
