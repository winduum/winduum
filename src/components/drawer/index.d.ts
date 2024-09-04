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
export function scrollInitDrawer(element: HTMLElement | Element, distance?: number, direction?: 'left' | 'top', timeout?: number): void
export function scrollDrawer(element: HTMLDialogElement | Element, options?: ScrollDrawerOptions): void
