export interface ValidateFormOptions {
    validateSelectors?: string
    validateOptions?: ValidateFieldOptions
    submitterLoadingClass?: string
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
    validClass?: string
    validIcon?: string | null
    invalidClass?: string
    invalidIcon?: string
    activeClass?: string
}

export function validateForm(event: Event | SubmitEvent, options?: ValidateFormOptions): void
export function validateField(element: HTMLElement | SubmitEvent, options?: ValidateFieldOptions): void
