export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export function isVerticalDrawer(placement: DrawerPlacement): boolean
export function scrollDrawer(element: HTMLElement | Element, placement: DrawerPlacement, reverse?: boolean, behavior?: 'auto' | 'instant'): void
export function showDrawer(element: HTMLElement | Element, placement: DrawerPlacement): Promise<void>
export function closeDrawer(element: HTMLElement | Element, placement: DrawerPlacement): void
export function drawerEvents(element: HTMLDialogElement | Element, contentElement: HTMLElement | Element, placement: DrawerPlacement, signal?: AbortSignal): void
export function drawerObserver(element: HTMLDialogElement | Element, placement: DrawerPlacement): IntersectionObserver
export function drawerProperties(element: HTMLElement | Element, placement: DrawerPlacement): ['top' | 'left', number, number]
