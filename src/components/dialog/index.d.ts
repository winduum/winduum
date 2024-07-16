export interface DefaultOptions {
    remove?: boolean | null
    closable?: boolean | null
    openAttribute?: string
    closedAttribute?: string
    scrollbarWidthProperty?: string
}

export const defaultOptions: DefaultOptions
export function showDialog(element: HTMLDialogElement | HTMLElement, options?: DefaultOptions): Promise<void>
export function closeDialog(element: HTMLDialogElement | HTMLElement, options?: DefaultOptions): Promise<void>
