/**
 * @param {HTMLInputElement | HTMLElement} selector
 * @returns Promise<void>
 */
export const toggleDetails = async (selector) => {
    const details = selector.closest('details')

    if (details._isHiding && !selector.checked) return

    if (selector.checked ?? !details.open) {
        await showDetails(selector)
    } else {
        await closeDetails(selector)
    }
}

/**
 * @param {HTMLInputElement | HTMLElement} selector
 * @returns Promise<void>
 */
export const showDetails = async (selector) => {
    const details = selector.closest('details')
    const { down } = await import('slide-element')
    const content = selector.closest('summary').nextElementSibling

    details._isHiding = false
    details.open = true

    await down(content, {
        display: ''
    })
}

/**
 * @param {HTMLInputElement | HTMLElement} selector
 * @returns Promise<void>
 */
export const closeDetails = async (selector) => {
    const details = selector.closest('details')
    const { up } = await import('slide-element')
    const content = selector.closest('summary').nextElementSibling

    details._isHiding = true

    await up(content, {
        display: ''
    })

    details._isHiding && (details.open = false)
    details._isHiding = false
}
