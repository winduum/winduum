export interface ShowToastOptions {
    visibleClass?: string
    autoHide?: number | null
    heightProperty?: string
    close?: CloseToastOptions
}

export interface CloseToastOptions {
    hiddenClass?: string
    heightProperty?: string
}

export interface InsertToasterOptions {
    classes?: string
}

export interface InsertToastOptions {
    classes?: string
    title?: string
    text?: string
    start?: string
    end?: string
    show?: ShowToastOptions
}

export function closeToast(element: HTMLElement, options?: CloseToastOptions): Promise<void>
export function showToast(element: HTMLElement, options?: ShowToastOptions): Promise<void>
export function insertToaster(element: HTMLElement, options?: InsertToasterOptions): Promise<void>
export function insertToast(element: HTMLElement, options?: InsertToastOptions): Promise<void>
export function closeToaster(element: HTMLElement, options?: CloseToastOptions): Promise<void>
