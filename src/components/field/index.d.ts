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

export function validateField(element: HTMLElement, options?: ValidateFieldOptions): void
