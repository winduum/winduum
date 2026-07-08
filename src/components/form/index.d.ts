import { validateField, type ValidateFieldOptions } from "../field";

export interface ValidateFormOptions {
    validateSelector?: string
    validateOptions?: ValidateFieldOptions
    validateField?: typeof validateField
    scrollOptions?: ScrollIntoViewOptions
    submitterLoadingAttribute?: string
}

export function validateForm(event: Event | SubmitEvent, options?: ValidateFormOptions): void
