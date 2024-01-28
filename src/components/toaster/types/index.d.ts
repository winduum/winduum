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

