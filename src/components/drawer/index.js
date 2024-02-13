export const showDrawer = (element) => {
    element.scroll({ left: 0 })
}

export const closeDrawer = (element) => {
    element.scroll({ left: element.scrollWidth })
}

export const scrollDrawer = (element, options = {}) => {
    options = {
        snapClass: 'snap-x snap-mandatory',
        opacityProperty: '--tw-bg-opacity',
        ...options
    }

    const scrollRatio = Math.abs((element.scrollLeft / (element.scrollWidth - element.clientWidth)) - 1)

    if (element.scrollLeft < element.clientWidth) {
        element.style.setProperty(options.opacityProperty, Math.min(scrollRatio, 1))
    }

    if (element.scrollLeft === 0) {
        element.classList.add(...options.snapClass.split(/\s/))
    }

    if ((element.scrollLeft >= (element.scrollWidth - element.clientWidth))) {
        element.classList.remove(...options.snapClass.split(/\s/))
        element.inert = true
    } else {
        element.inert = false
    }
}
