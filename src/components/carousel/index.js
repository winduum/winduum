/**
 * @param {HTMLElement} element
 * @param {import("./").Behavior} behavior
 * @param {number} multiplier
 * @returns void
 */
export const scrollNext = (element, behavior = 'smooth', multiplier = 1) => {
    element.scroll({ left: element.scrollLeft - element.children[0].clientWidth * multiplier, behavior })
}

/**
 * @param {HTMLElement} element
 * @param {import("./").Behavior} behavior
 * @param {number} multiplier
 * @returns void
 */
export const scrollPrev = (element, behavior = 'smooth', multiplier = 1) => {
    element.scroll({ left: element.scrollLeft + element.children[0].clientWidth * multiplier, behavior })
}

/**
 * @param {HTMLElement} element
 * @param {number} selected
 * @param {import("./").Behavior} behavior
 * @returns void
 */
export const scrollTo = (element, selected = 0, behavior = 'smooth') => {
    const position = element.scrollLeft / element.children[0].clientWidth

    if (position - selected <= 0) {
        scrollPrev(element, behavior, selected - 1 - position)
    } else {
        scrollNext(element, behavior, position - selected + 1)
    }
}

/**
 * @param {HTMLElement} element
 * @returns number
 */
export const getItemCount = element => {
    return element.clientWidth > element.children[0].clientWidth
        ? [...element.children].reduce((item, children) =>
            (element.scrollWidth - element.clientWidth > item.itemsWidth + children.clientWidth / 2)
                ? { itemsWidth: item.itemsWidth + children.clientWidth, count: item.count + 1 }
                : item, { itemsWidth: 0, count: 0 }).count + 1
        : Math.ceil((element.scrollWidth) / element.children[0].clientWidth)
}

/**
 * @param {HTMLElement} element
 * @returns number
 */
export const getProgressValue = element => {
    return Number(((element.scrollLeft + element.clientWidth) / element.scrollWidth * 100).toFixed(2))
}

/**
 * @param {HTMLElement} element
 * @param {import("./").ScrollCarouselOptions} options
 * @returns void
 */
export const scrollCarousel = (element, options = {}) => {
    options = {
        activeClass: 'active',
        ...options
    }

    function isElementInViewport (element, carouselElement) {
        const rect = element.getBoundingClientRect()
        const carouselRect = carouselElement.getBoundingClientRect()

        return (
            rect.left >= carouselRect.left &&
            rect.right <= carouselRect.right
        )
    }

    for (const children of [...element.children]) {
        if (isElementInViewport(children, element)) {
            children.classList.add(options.activeClass)
        } else {
            children.classList.remove(options.activeClass)
        }
    }
}

/**
 * @param {HTMLElement} element
 * @param {import("./").SetScrollCarouselOptions} options
 * @returns void
 */
export const setScrollCarousel = (element, options = {}) => {
    const activeItem = Number((element.scrollLeft / element.children[0].clientWidth).toFixed(0))

    scrollCarousel(element, options.scroll)

    if (options?.pagination?.paginationElement) {
        [...options.pagination.paginationElement.children].forEach(children => children.classList.remove(options.pagination.paginationActiveClass))

        options.paginationElement.children[activeItem].classList.add(options.pagination.paginationActiveClass)
    }

    if (options.progressElement) {
        options.progressElement.value = getProgressValue(element)
    }

    if (options.counterMinElement) {
        options.counterMinElement.innerHTML = `${activeItem + 1}`
    }
}

/**
 * @param {HTMLElement} element
 * @param {import("./").PaginationCarouselOptions} options
 * @returns void
 */
export const paginationCarousel = (element, options = {}) => {
    options = {
        paginationItemClass: '',
        paginationActiveClass: 'active',
        ...options
    }

    if (!options.paginationElement) return

    const itemsCount = getItemCount(element)

    options.paginationElement.insertAdjacentHTML('beforeend', [...Array(itemsCount)].map((_, i) => `
        <div class="${options.paginationItemClass} ${i === 0 ? options.paginationActiveClass : ''}"></div>
    `).join(''))

    ;[...options.paginationElement.children].forEach(children => {
        children.addEventListener('click', ({ currentTarget }) => {
            scrollTo(element, [...options.paginationElement.children].indexOf(currentTarget) + 1)
        })
    })
}

/**
 * @param {HTMLElement} element
 * @param {import("./").AutoplayCarouselOptions} options
 * @returns void
 */
export const autoplayCarousel = (element, options = {}) => {
    options = {
        behavior: 'smooth',
        pauseElements: [],
        ...options
    }

    if (!options.autoplay) return

    let paused

    options.pauseElements.forEach(element => {
        element?.addEventListener('mouseenter', () => (paused = true))
        element?.addEventListener('mouseleave', () => (paused = false))
    })

    setInterval(() => {
        if (paused) return

        if (element.scrollLeft < element.children[0].clientWidth * (element.children.length - 1)) {
            scrollNext(element, options.behavior)
        } else {
            scrollTo(element, 0, options.behavior)
        }
    }, options.autoplay)
}

/**
 * @param {HTMLElement} element
 * @param {import("./").DragCarouselOptions} options
 * @returns void
 */
export const dragCarousel = (element, options = {}) => {
    options = {
        dragActiveClass: 'grabbing',
        ...options
    }

    let isDown
    let startX
    let scrollLeft

    const grabbing = () => {
        if (isDown) {
            element.scrollLeft = element.scrollLeft - 1
        }

        isDown = false
        element.classList.remove(options.dragActiveClass)
    }

    element.addEventListener('mouseleave', grabbing)

    element.addEventListener('mouseup', grabbing)

    element.addEventListener('mousedown', ({ pageX }) => {
        isDown = true
        startX = pageX - element.offsetLeft
        scrollLeft = element.scrollLeft
    })

    element.addEventListener('mousemove', e => {
        if (!isDown) return
        e.preventDefault()

        const x = e.pageX - element.offsetLeft
        const walk = (x - startX) * 1.25

        element.classList.add(options.dragActiveClass)
        element.scrollLeft = scrollLeft - walk

        element.ondragstart = e => e.preventDefault()
    })
}

/**
 * @param {HTMLElement} element
 * @param {import("./").InitCarouselOptions} options
 * @returns void
 */
export const initCarousel = (element, options = {}) => {
    if (!options.fade) {
        dragCarousel(element)
    }

    paginationCarousel(element, options.pagination)

    autoplayCarousel(element, options.autoplay)

    setScrollCarousel(element, options.setScroll)

    element.addEventListener('scroll', () => setScrollCarousel(element, options), { passive: true })
}
