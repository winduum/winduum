export interface DialogElement extends HTMLDialogElement {
    _dialogHasEvents: boolean
}

export interface DefaultOptions {
    remove?: boolean | null
    closable?: boolean | null
    openClass?: string
    scrollbarWidthProperty?: string
}

export interface InsertDialogOptions {
    selector?: string | null
    class?: string | null
    append?: boolean | null
    show?: DefaultOptions
}

export interface FetchDialogOptions {
    url: string
    insert?: InsertDialogOptions
}

export const defaultOptions: DefaultOptions
export function dialogSelector(selector: string): HTMLDialogElement
export function dismissDialog(element: HTMLDialogElement, options?: DefaultOptions): Promise<void>
export function showDialog(element: DialogElement, options?: DefaultOptions): Promise<void>
export function closeDialog(element: HTMLDialogElement, options?: DefaultOptions): Promise<void>
export function insertDialog(content: string, options?: InsertDialogOptions): Promise<void>
export function fetchDialog({ url, insert }: FetchDialogOptions): Promise<void>
