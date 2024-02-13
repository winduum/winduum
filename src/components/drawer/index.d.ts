export interface ScrollDrawerOptions {
    snapClass?: string
    opacityProperty?: string
    opacityRatio?: number
    scrollOpen?: number
    scrollClose?: number
    scrollSize?: number
    scrollDirection?:number
}

export function showDrawer(element: HTMLElement | Element, distance?: number, direction?: 'left' | 'top'): void
export function closeDrawer(element: HTMLElement | Element, distance?: number, direction?: 'left' | 'top'): void
export function scrollDrawer(element: HTMLElement | Element, options?: ScrollDrawerOptions): void
