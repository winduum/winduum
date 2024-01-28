export interface DefaultOptions {
    selector?: string
    track?: 'start' | 'end'
}

export interface OutputOptions {
    element?: HTMLOutputElement
    lang?: string
    formatOptions?: Intl.NumberFormatOptions
}

export interface TrackOptions {
    element: HTMLElement | Element
    value: string
    max?: number
}
