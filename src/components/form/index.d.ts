export interface ValidateFormOptions {
    validateSelector?: string
    validateOptions?: ValidateFieldOptions
    validateField?: typeof validateField
    scrollOptions?: ScrollIntoViewOptions
    submitterLoadingAttribute?: string
}

export interface ValidateFieldOptions {
    validate?: boolean
    validationMessage?: string
    selector?: string
    validitySelector?: string
    infoContent?: string
    endParentSelector?: string
    endSelector?: string
    endContent?: string
    invalidIcon?: string
}

export function validateForm(event: Event | SubmitEvent, options?: ValidateFormOptions): void
export function validateField(element: HTMLElement, options?: ValidateFieldOptions): void
