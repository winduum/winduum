export interface Position {
    currentTarget: HTMLInputElement | EventTarget
}

export interface KeyboardStep {
    currentTarget: HTMLInputElement | EventTarget
    key: string
}

export interface MouseStep {
    currentTarget: HTMLInputElement | EventTarget
}

export interface PositionOptions {
    selector?: string
    positionProperty?: string
}
