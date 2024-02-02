export interface ValidateFormOptions {
    validateSelectors?: string
    validateOptions?: ValidateFieldOptions
    submitterLoadingClass?: string
}

export interface ValidateFieldOptions {
    validate?: boolean
    selector?: string
    ignoreMatch?: string
    validitySelector?: string
    infoParentSelector?: string
    infoSelector?: string
    infoContent?: string
    endParentSelector?: string
    endSelector?: string
    endContent?: string
    validClass?: string
    validIcon?: string
    invalidClass?: string
    invalidIcon?: string
    activeClass?: string
}
