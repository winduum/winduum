export interface ShowRippleEvent {
    currentTarget?: EventTarget | HTMLElement;
    offsetX: number;
    offsetY: number;
}

export function showRipple(event: MouseEvent | ShowRippleEvent, rippleElement?: HTMLElement): void
