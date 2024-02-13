export interface DefaultOptions {
    selector?: string
    summarySelector?: string
}

export const defaultOptions: DefaultOptions
export function showDetails(selector: HTMLInputElement | HTMLElement, options?: DefaultOptions): Promise<void>
export function closeDetails(selector: HTMLInputElement | HTMLElement, options?: DefaultOptions): Promise<void>
export function toggleDetails(selector: HTMLInputElement | HTMLElement, options?: DefaultOptions): Promise<void>
