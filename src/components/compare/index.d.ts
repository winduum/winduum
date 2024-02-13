export interface SetPositionOptions {
    selector?: string
    positionProperty?: string
}

export function setPosition(event: Event, options?: SetPositionOptions): void
export function setKeyboardStep(event: KeyboardEvent, step?: string): void
export function setMouseStep(event: MouseEvent, step?: string): void
