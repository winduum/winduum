interface ToggleTabOptions {
    tabElements?: NodeListOf<Element> | Element[]
    tabPanelElements?: NodeListOf<Element> | Element[]
}

export function toggleTab(element: HTMLElement | Element, options?: ToggleTabOptions): void
