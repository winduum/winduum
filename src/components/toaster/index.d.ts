export interface ShowToastOptions {
    openAttribute?: string
    autoHide?: number | null
    heightProperty?: string
    close?: CloseToastOptions
}

export interface CloseToastOptions {
    closedAttribute?: string
    heightProperty?: string
}

export function closeToast(element: HTMLElement, options?: CloseToastOptions): Promise<void>
export function showToast(element: HTMLElement, options?: ShowToastOptions): Promise<void>
export function closeToaster(element: HTMLElement, options?: CloseToastOptions): Promise<void>
