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
export function scrollInitDrawer(element: HTMLElement | Element, distance?: number, direction?: 'left' | 'top'): void
export function toggleDrawerAttributes(element: HTMLDialogElement | Element, state?: 'open' | 'close', snapClass?: string): void
export function scrollDrawerState(scrollState: number, scrollDirection: number): boolean
export function scrollDrawer(element: HTMLDialogElement | Element, options?: ScrollDrawerOptions): void
