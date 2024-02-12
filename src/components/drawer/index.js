export const showDrawer = (element) => {
    element.classList.add('active')
    element.scroll({ left: 0 })
}

export const closeDrawer = (element) => {
    element.classList.remove('has-snap')
    element.scroll({ left: element.scrollWidth })
}

export const scrollDrawer = ({ target }) => {
    if (target.scrollLeft < parseFloat(getComputedStyle(target).width)) {
        const opacity = target.scrollLeft / (target.children[0].clientWidth + parseFloat(getComputedStyle(target.children[0]).marginLeft))

        target.style.setProperty('--c-drawer-opacity', opacity > 1 ? 1 : `${opacity}`)
    }

    if (target.scrollWidth - target.scrollLeft === parseFloat(getComputedStyle(target).width)) {
        target.classList.add('has-snap')
    }

    if (target.scrollWidth < scrollDrawer.last && !target.classList.contains('snap-x') && target.classList.contains('has-snap')) {
        target.classList.add('snap-x')
    }

    if ((target.scrollLeft < scrollDrawer.last && target.scrollLeft <= 0)) {
        target.classList.remove('has-snap', 'snap-y', 'active')
    }

    scrollDrawer.last = target.scrollLeft <= 0 ? 0 : target.scrollLeft
}
