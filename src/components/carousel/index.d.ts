export type CarouselPlacement = 'left' | 'right' | 'top' | 'bottom'

export interface ScrollByOptions {
    direction?: number
    vertical?: boolean
    ratio?: number
}

export interface ToggleScrollStateOptions {
    prevElement?: HTMLButtonElement | null
    nextElement?: HTMLButtonElement | null
    vertical?: boolean
}

export function scrollBy(element: HTMLElement, options?: ScrollByOptions): void
export function toggleScrollState(element: HTMLElement, options?: ToggleScrollStateOptions): void
export function setCurrentAttribute(element: HTMLElement, index: number, attributeName?: string): void
export function setSnappedAttribute(element: HTMLElement, target: HTMLElement, markerGroupElement?: HTMLElement | null): void
export function scrollToMarker(element: HTMLElement, target: HTMLElement, markerGroupElement: HTMLElement, scrollIntoViewOptions?: ScrollIntoViewOptions): void
