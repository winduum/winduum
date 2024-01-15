export interface DialogElement extends HTMLDialogElement {
    _dialogHasEvents: boolean
}

export interface DefaultOptions {
    remove?: boolean | null
    closable?: boolean | null
    openClass?: string
    scrollbarWidthProperty?: string
}

export interface InsertOptions {
    selector?: string | null
    remove?: boolean | null
    append?: boolean | null
    show?: DefaultOptions
}

export interface FetchOptions {
    url: string
    insert?: InsertOptions
}
