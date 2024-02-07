/**
 * @param {HTMLElement | Element} element
 * @param {string} visibleSelector
 * @param {ScrollIntoViewOptions} scrollOptions
 * @returns void
 */
export const scrollPrev = (element, visibleSelector = '.visible', scrollOptions = {}) => {
    (element.querySelector(visibleSelector)?.previousElementSibling ?? element.querySelector(visibleSelector))
        ?.scrollIntoView({
            inline: 'start',
            ...scrollOptions
        })
}

/**
 * @param {HTMLElement | Element} element
 * @param {string} visibleSelector
 * @param {ScrollIntoViewOptions} scrollOptions
 * @returns void
 */
export const scrollNext = (element, visibleSelector = '.visible', scrollOptions = {}) => {
    (element.querySelector(visibleSelector)?.nextElementSibling ?? element.querySelector(visibleSelector))
        ?.scrollIntoView({
            inline: 'start',
            ...scrollOptions
        })
}

/**
 * @param {HTMLElement | Element} element
 * @param {number} selected
 * @param {ScrollIntoViewOptions} scrollOptions
 * @returns void
 */
export const scrollTo = (element, selected = 0, scrollOptions = {}) => {
    element.children[selected]?.scrollIntoView({
        inline: 'start',
        ...scrollOptions
    })
}

/**
 * @param {HTMLElement | Element} element
 * @param {number} scrollWidth
 * @param {boolean} mathFloor
 * @returns number
 */
export const getItemCount = (element, scrollWidth = element.scrollWidth - element.clientWidth, mathFloor = false) => {
    const gap = parseInt(getComputedStyle(element).rowGap)
    const mathRound = (value, floor) => floor ? Math.floor(value) : Math.ceil(value)

    return [...element.children].reduce((count, children) => {
        if (mathRound(scrollWidth / (children.offsetWidth + gap), mathFloor) > count) {
            return count + 1
        } else {
            return count
        }
    }, 0) + 1
}

/**
 * @param {HTMLElement | Element} element
 * @param {import("./").ObserveCarouselOptions} options
 * @returns void
 */
export const observeCarousel = (element, options = {}) => {
    options = {
        activeClass: 'visible',
        observerOptions: {},
        ...options
    }

    element._observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.isIntersecting
                ? entry.target.classList.add(options.activeClass)
                : entry.target.classList.remove(options.activeClass)
        })
    }, {
        root: element,
        threshold: 0.75,
        ...options.observerOptions
    })

    ;[...element.children].forEach(children => element._observer.observe(children))
}

/**
 * @param {HTMLElement | Element} element
 * @param {import("./").ScrollCarouselOptions} options
 * @returns void
 */
export const scrollCarousel = (element, options = {}) => {
    options.pagination = {
        activeClass: 'active',
        ...options.pagination
    }

    const activeItem = getItemCount(element, element.scrollLeft, element.scrollLeft < element._lastScrollLeft)
    const activeItemMax = getItemCount(element)

    if (options?.pagination?.element) {
        ;[...options.pagination.element.children].forEach(children => children.classList.remove(options.pagination.activeClass))

        options.pagination.element.children[activeItem - 1]?.classList.add(options.pagination.activeClass)
    }

    if (options.progressElement) {
        options.progressElement.value = activeItem / activeItemMax * 100
    }

    if (options.counterMinElement) {
        options.counterMinElement.innerHTML = `${activeItem}`
    }

    if (options.counterMaxElement) {
        options.counterMaxElement.innerHTML = `${activeItemMax}`
    }

    element._lastScrollLeft = element.scrollLeft <= 0 ? 0 : element.scrollLeft
}

/**
 * @param {HTMLElement | Element} element
 * @param {import("./").PaginationCarouselOptions} options
 * @returns void
 */
export const paginationCarousel = (element, options = {}) => {
    options = {
        itemContent: '<div aria-hidden="true"></div>',
        activeClass: 'active',
        ...options
    }

    if (!options.element) return

    options.element.insertAdjacentHTML('beforeend', [...Array(getItemCount(element))].map(
        () => options.itemContent
    ).join(''))

    ;[...options.element.children].forEach((children, i) => {
        (i === 0) && children.classList.add(options.activeClass)
        children.addEventListener('click', ({ currentTarget }) => {
            scrollTo(element, [...options.element.children].indexOf(currentTarget))
        })
    })
}

/**
 * @param {HTMLElement | Element} element
 * @param {import("./").AutoplayCarouselOptions} options
 * @returns void
 */
export const autoplayCarousel = (element, options = {}) => {
    options = {
        elements: [],
        ...options
    }

    if (!options.delay) return

    let paused

    options.elements.forEach(element => {
        element?.addEventListener('mouseenter', () => (paused = true))
        element?.addEventListener('mouseleave', () => (paused = false))
    })

    setInterval(() => {
        if (paused) return

        if (element.scrollLeft < element.scrollWidth - element.clientWidth) {
            scrollNext(element, options.activeClass, options.scrollOptions)
        } else {
            scrollTo(element, 0, options.scrollOptions)
        }
    }, options.delay)
}

/**
 * @param {HTMLElement | Element} element
 * @param {import("./").DragCarouselOptions} options
 * @returns void
 */
export const dragCarousel = (element, options = {}) => {
    options = {
        activeClass: 'grabbing',
        visibleSelector: '.visible',
        scrollOptions: {
            inline: 'start',
            behavior: 'smooth'
        },
        ...options
    }

    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return
    }

    let isDown
    let startX
    let scrollLeft
    let timeout

    const endGrabbing = () => {
        isDown = false
        element.classList.remove(options.activeClass)
        element.querySelector(options.visibleSelector).scrollIntoView(options.scrollOptions)

        clearTimeout(timeout)

        timeout = setTimeout(() => {
            element.classList.remove(options.activeClass)
            element.style.scrollSnapType = ''
        }, 300)
    }

    element.addEventListener('mouseleave', endGrabbing)

    element.addEventListener('mouseup', endGrabbing)

    element.addEventListener('mousedown', ({ pageX }) => {
        isDown = true
        startX = pageX - element.offsetLeft
        scrollLeft = element.scrollLeft
    })

    element.addEventListener('mousemove', e => {
        if (!isDown) return
        e.preventDefault()

        const x = e.pageX - element.offsetLeft

        element.classList.add(options.activeClass)
        element.style.scrollSnapType = 'unset'
        element.scroll({ left: scrollLeft - ((x - startX) * 1.25), behavior: 'instant' })
        element.ondragstart = e => e.preventDefault()
    })
}

/**
 * @param {HTMLElement | Element} element
 * @param {import("./").InitCarouselOptions} options
 * @returns void
 */
export const initCarousel = (element, options = {}) => {
    if (!options.fade) {
        dragCarousel(element)
    }

    observeCarousel(element)

    paginationCarousel(element, options.pagination)

    autoplayCarousel(element, options.autoplay)

    scrollCarousel(element, options.scroll)

    element.addEventListener('scroll', () => scrollCarousel(element, options.scroll), { passive: true })
}
