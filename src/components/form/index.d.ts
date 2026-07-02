export interface ValidateFormOptions {
    validateSelector?: string
    validateOptions?: ValidateFieldOptions
    validateField?: typeof validateField
    scrollOptions?: ScrollIntoViewOptions
    submitterLoadingAttribute?: string
}

export interface ValidateFieldOptions {
    validationMessage?: string
    selector?: string
    validitySelector?: string
    infoContent?: string
    iconParentSelector?: string
    iconSelector?: string
    iconContent?: string
    validIcon?: string | null
    invalidIcon?: string
}

export function validateForm(event: Event | SubmitEvent, options?: ValidateFormOptions): void
export function validateField(element: HTMLElement, options?: ValidateFieldOptions): void
