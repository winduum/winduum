/**
 * Shows a ripple effect.
 * @type {typeof import("./ripple").showRipple}
 */
const showRipple = ({ currentTarget, pageX, pageY }, selector = currentTarget.querySelector('.lib-ripple')) => {
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

    selector.style.top = pageX - currentTarget.offsetLeft - (selector.clientWidth / 2) + 'px'
    selector.style.left = pageY - currentTarget.offsetTop - (selector.clientHeight / 2) + 'px'
    selector.classList.add('animation-ripple')
}

export { showRipple }

export default {
    show: showRipple
}
