interface ToggleTabOptions {
    tabElements?: NodeListOf<Element>
    tabPanelElements?: NodeListOf<Element>
}

export function toggleTab(element: HTMLElement | Element, options?: ToggleTabOptions): void
