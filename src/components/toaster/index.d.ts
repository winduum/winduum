export interface CloseToastOptions {
    closedAttribute?: string
    heightProperty?: string
}

export function closeToaster(element: HTMLElement, options?: CloseToastOptions): Promise<void>
export function toasterObserver(): MutationObserver
