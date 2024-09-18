export interface SetPositionOptions {
    selector?: string
    positionProperty?: string
}

export function setPosition(element: HTMLInputElement, options?: SetPositionOptions): void
export function setKeyboardStep(element: HTMLInputElement, key: string, step?: string): void
export function setMouseStep(element: HTMLInputElement, step?: string): void
