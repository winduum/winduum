export const Behavior: 'smooth' | 'instant' | 'auto'

export interface ScrollCarouselOptions {
    activeClass?: string
}

export interface SetScrollCarouselOptions {
    scroll?: ScrollCarouselOptions
    pagination?: PaginationCarouselOptions
    progressElement?: HTMLProgressElement
    counterMinElement?: HTMLElement
}

export interface PaginationCarouselOptions {
    paginationElement?: HTMLElement
    paginationItemClass?: string
    paginationActiveClass?: string
}

export interface AutoplayCarouselOptions {
    autoplay?: number
    pauseElements?: HTMLElement[]
    behavior?: typeof Behavior
}

export interface DragCarouselOptions {
    dragActiveClass?: string,
}

export interface InitCarouselOptions {
    fade?: boolean
    autoplay?: AutoplayCarouselOptions
    pagination?: PaginationCarouselOptions
    setScroll?: SetScrollCarouselOptions
}
