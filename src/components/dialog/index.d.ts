export interface DefaultOptions {
    remove?: boolean | null
    closable?: boolean | null
    modal?: boolean
    openAttribute?: string
    closedAttribute?: string
    contentSelector?: string
    scrollbarWidthProperty?: string | null
}

export const defaultOptions: DefaultOptions
export function showDialog(element: HTMLDialogElement | HTMLElement, options?: DefaultOptions): Promise<void>
export function closeDialog(element: HTMLDialogElement | HTMLElement, options?: DefaultOptions): Promise<void>
