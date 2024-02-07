export const Behavior: 'smooth' | 'instant' | 'auto'

export interface ObserveCarouselOptions {
    activeClass?: string
    observerOptions?: {
        rootMargin?: string
        threshold?: number | number[]
    }
}

export interface PaginationCarouselOptions {
    element?: HTMLElement | Element
    itemContent?: string
    activeClass?: string
}

export interface ScrollCarouselOptions {
    observe?: ObserveCarouselOptions
    pagination?: PaginationCarouselOptions
    progressElement?: HTMLProgressElement | Element
    counterMinElement?: HTMLElement | Element
    counterMaxElement?: HTMLElement | Element
}

export interface AutoplayCarouselOptions {
    delay?: number
    elements?: HTMLElement[] | Element[]
    behavior?: typeof Behavior
}

export interface DragCarouselOptions {
    activeClass?: string,
}

export interface InitCarouselOptions {
    fade?: boolean
    autoplay?: AutoplayCarouselOptions
    pagination?: PaginationCarouselOptions
    scroll?: ScrollCarouselOptions
}
