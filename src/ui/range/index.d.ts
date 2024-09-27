export interface SetTrackPropertyOptions {
    element: HTMLElement | Element
    value: string
    min?: number
    max?: number
}

export interface SetValueOptions {
    selector?: string
    track?: 'start' | 'end'
}

export interface SetOutputOptions {
    lang?: string
    formatOptions?: Intl.NumberFormatOptions
}

export function setTrackProperty(options: SetTrackPropertyOptions, track: 'start' | 'end'): void
export function setValue(element: HTMLInputElement, options?: SetValueOptions): void
export function setOutputValue(element: HTMLInputElement, outputElement: HTMLOutputElement | Element, options?: SetOutputOptions): void
