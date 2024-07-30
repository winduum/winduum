import { FlipOptions, Middleware, OffsetOptions, Placement, ShiftOptions } from "@floating-ui/dom";

export interface ShowPopoverOptions {
    openAttribute?: string
    compute?: boolean
    placement?: Placement
    middleware?: Array<Middleware | null | undefined | false>
    offset?: OffsetOptions
    flip?: FlipOptions
    shift?: ShiftOptions
}

export interface HidePopoverOptions {
    openAttribute?: string
}

export function showPopover(element: HTMLElement | Element, options?: ShowPopoverOptions): Promise<void>
export function hidePopover(element: HTMLElement | Element): Promise<void>
export function togglePopover(element: HTMLElement | Element, options?: ShowPopoverOptions): Promise<void>
