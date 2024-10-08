export interface ValidateFormOptions {
    validateSelectors?: string
    validateOptions?: ValidateFieldOptions
    scrollOptions?: ScrollIntoViewOptions
    submitterLoadingAttribute?: string
}

export interface ValidateFieldOptions {
    validate?: boolean
    selector?: string
    ignoreMatch?: RegExp
    validitySelector?: string
    infoParentSelector?: string
    infoSelector?: string
    infoContent?: string
    endParentSelector?: string
    endSelector?: string
    endContent?: string
    validAttribute?: string
    validIcon?: string | null
    invalidAttribute?: string
    invalidIcon?: string
    activeAttribute?: string
}

export function validateForm(event: Event | SubmitEvent, options?: ValidateFormOptions): void
export function validateField(element: HTMLElement | SubmitEvent, options?: ValidateFieldOptions): void
