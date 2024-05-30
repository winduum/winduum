import { animationsFinished } from '../../common.js'

/**
 * @param {HTMLElement | Element} element
 * @param {HTMLElement | Element} popoverElement
 * @param {import("./").ShowPopoverOptions} options
 * @returns Promise<void>
 */
export const computePopover = async (element, popoverElement, options) => {
    const { computePosition, flip, shift, offset } = await import('@floating-ui/dom')

    popoverElement.classList.remove(popoverElement._placement)

    popoverElement.style.minWidth = `${element.offsetWidth / 16}rem`

    await computePosition(element, popoverElement, {
        placement: options?.placement,
        middleware: options?.middleware ?? [offset(12 ?? options?.offset), flip(options?.flip), shift({ padding: 8, ...options?.shift })]
    }).then(({ x, y, placement }) => {
        Object.assign(popoverElement.style, {
            inset: `${y}px auto auto ${x}px`
        })

        popoverElement._placement = placement
        popoverElement.classList.add(popoverElement._placement, options?.visibleClass ?? 'in')
    })
}

/**
 * @param {HTMLElement | Element} element - The HTML content to insert into the dialog.
 * @returns Promise<void>
 */
export const hidePopover = async (element) => {
    const popoverElement = document.getElementById(element.getAttribute('popovertarget'))

    popoverElement.classList.remove('in')
    await animationsFinished(popoverElement)
    popoverElement._cleanup && popoverElement._cleanup()
    popoverElement.hidePopover && popoverElement.hidePopover()

    element.ariaExpanded = 'false'
}

/**
 * @param {HTMLElement | Element} element
 * @param {import("./").ShowPopoverOptions} options
 * @returns Promise<void>
 */
export const showPopover = async (element, options) => {
    options = {
        visibleClass: 'in',
        compute: true,
        ...options
    }

    const { autoUpdate } = await import('@floating-ui/dom')

    const popoverElement = document.getElementById(element.getAttribute('popovertarget'))

    element.ariaExpanded = 'true'

    if (!element.ariaHasPopup) (element.ariaHasPopup = 'dialog')
    if (!popoverElement.role) (popoverElement.role = element.ariaHasPopup)

    popoverElement.showPopover && popoverElement.showPopover()

    if (!options.compute) {
        popoverElement.classList.add(options.visibleClass)
        return
    }

    popoverElement._cleanup = autoUpdate(
        element,
        popoverElement,
        async () => await computePopover(element, popoverElement, options)
    )
}

/**
 * @param {HTMLElement | Element} element
 * @param {import("./").ShowPopoverOptions} options
 * @returns Promise<void>
 */
export const togglePopover = async (element, options) => {
    if (element.ariaExpanded !== 'true') {
        await showPopover(element, options)
    } else {
        await hidePopover(element)
    }
}
