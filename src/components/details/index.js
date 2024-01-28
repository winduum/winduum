/**
 * @param {HTMLInputElement | HTMLElement} element
 * @returns Promise<void>
 */
export const showDetails = async (element) => {
    const details = element.closest('details')
    const { down } = await import('slide-element')
    const content = element.closest('summary').nextElementSibling

    details._isHiding = false
    details.open = true

    await down(content, {
        display: ''
    })
}

/**
 * @param {HTMLInputElement | HTMLElement} element
 * @returns Promise<void>
 */
export const closeDetails = async (element) => {
    const details = element.closest('details')
    const { up } = await import('slide-element')
    const content = element.closest('summary').nextElementSibling

    details._isHiding = true

    await up(content, {
        display: ''
    })

    details._isHiding && (details.open = false)
    details._isHiding = false
}

/**
 * @param {HTMLInputElement | HTMLElement} element
 * @returns Promise<void>
 */
export const toggleDetails = async (element) => {
    const details = element.closest('details')

    if (details._isHiding && !element.checked) return

    if (element.checked ?? !details.open) {
        await showDetails(element)
    } else {
        await closeDetails(element)
    }
}

export default {
    showDetails,
    closeDetails,
    toggleDetails
}
