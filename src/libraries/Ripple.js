const showRipple = ({ currentTarget, pageX, pageY }) => {
    if (currentTarget.querySelector('.lib-ripple') === null) {
        currentTarget.insertAdjacentHTML('beforeend', "<div class='lib-ripple'></div>")
    }

    const ripple = currentTarget.querySelector('.lib-ripple')

    ripple.classList.remove('animation-ripple')

    if (ripple.clientWidth === 0 && ripple.clientHeight === 0) {
        const d = Math.max(currentTarget.offsetWidth, currentTarget.offsetHeight)

        ripple.style.width = d + 'px'
        ripple.style.height = d + 'px'
    }

    let x, y

    x = pageX - currentTarget.offsetLeft - (ripple.clientWidth / 2)
    y = pageY - currentTarget.offsetTop - (ripple.clientHeight / 2)

    ripple.style.top = y + 'px'
    ripple.style.left = x + 'px'
    ripple.classList.add('animation-ripple')
}

export { showRipple }
