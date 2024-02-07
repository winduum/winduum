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
    activeClass?: string
    scrollOptions?: ScrollIntoViewOptions
}

export interface DragCarouselOptions {
    activeClass?: string
    visibleSelector?: string
    scrollOptions?: ScrollIntoViewOptions
}

export interface InitCarouselOptions {
    fade?: boolean
    autoplay?: AutoplayCarouselOptions
    pagination?: PaginationCarouselOptions
    scroll?: ScrollCarouselOptions
}

export function scrollPrev(element: HTMLElement | Element, visibleSelector?: string, scrollOptions?: ScrollIntoViewOptions): void
export function scrollNext(element: HTMLElement | Element, visibleSelector?: string, scrollOptions?: ScrollIntoViewOptions): void
export function scrollTo(element: HTMLElement | Element, selected?: number, scrollOptions?: ScrollIntoViewOptions): void
export function getItemCount(element: HTMLElement | Element, scrollWidth?: number, mathFloor?: boolean): number
export function observeCarousel(element: HTMLElement | Element, options?: ObserveCarouselOptions): void
export function scrollCarousel(element: HTMLElement | Element, options?: ScrollCarouselOptions): void
export function paginationCarousel(element: HTMLElement | Element, options?: PaginationCarouselOptions): void
export function autoplayCarousel(element: HTMLElement | Element, options?: AutoplayCarouselOptions): void
export function dragCarousel(element: HTMLElement | Element, options?: DragCarouselOptions): void
export function initCarousel(element: HTMLElement | Element, options?: InitCarouselOptions): void
