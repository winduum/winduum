/**
 * @param {HTMLElement | Element} element
 * @param {number} index
 * @returns void
 */
export const scrollTo = (element, index = 0) => {
    const scrollPaddingLeft = parseInt(getComputedStyle(element).scrollPaddingLeft)

    element.scroll({ left: element?.children[index]?.offsetLeft - (isNaN(scrollPaddingLeft) ? 0 : scrollPaddingLeft) })
}

/**
 * @param {HTMLElement | Element & { _activeIndex: number }} element
 * @returns void
 */
export const scrollPrev = (element) => {
    scrollTo(element, element._activeIndex - 1)
}

/**
 * @param {HTMLElement | Element & { _activeIndex: number }} element
 * @returns void
 */
export const scrollNext = (element) => {
    scrollTo(element, element._activeIndex + 1)
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
        if (mathRound(scrollWidth / (children.offsetWidth + (isNaN(gap) ? 0 : gap)), mathFloor) > count) {
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
        visibleClass: 'visible',
        observerOptions: {},
        ...options
    }

    element._observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle(options.visibleClass, entry.isIntersecting)
        })

        const activeElement = [...element.children].find(children => children.classList.contains(options.visibleClass))

        if (activeElement) {
            element._activeIndex = [...element.children].indexOf(activeElement)
        }
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
        delay: 4000,
        pauseElements: [],
        ...options
    }

    let paused

    options.pauseElements.forEach(element => {
        element?.addEventListener('mouseenter', () => (paused = true))
        element?.addEventListener('mouseleave', () => (paused = false))
    })

    setInterval(() => {
        if (paused) return

        if (element.scrollLeft < element.scrollWidth - element.clientWidth) {
            scrollNext(element)
        } else {
            scrollTo(element, 0)
        }
    }, options.delay)
}

/**
 * @param {HTMLElement | Element & { _activeIndex: number }} element
 * @param {import("./").DragCarouselOptions} options
 * @returns void
 */
export const dragCarousel = (element, options = {}) => {
    options = {
        activeClass: 'grabbing',
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

        scrollTo(element, element._activeIndex)

        clearTimeout(timeout)

        timeout = setTimeout(() => {
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
