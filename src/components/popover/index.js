import { animationsFinished } from '../../common.js'

export const computePopover = async (element, popover, options) => {
    const { computePosition, flip, shift, offset } = await import('@floating-ui/dom')

    popover.classList.remove(popover._placement)

    popover.style.minWidth = `${element.offsetWidth / 16}rem`

    await computePosition(element, popover, {
        placement: options?.placement,
        middleware: options?.middleware ?? [offset(12 ?? options?.offset), flip(), shift({ padding: 8, ...options?.shift })]
    }).then(({ x, y, placement }) => {
        Object.assign(popover.style, {
            inset: `${y}px auto auto ${x}px`
        })

        popover._placement = placement
        popover.classList.add(popover._placement, options?.visibleClass ?? 'in')
    })
}

export const closePopover = async (element) => {
    const popoverElement = document.getElementById(element.getAttribute('popovertarget'))

    popoverElement.classList.remove('in')
    await animationsFinished(popoverElement)
    popoverElement._cleanup && popoverElement._cleanup()
    popoverElement.hidePopover && popoverElement.hidePopover()

    element.ariaExpanded = false
}

export const showPopover = async (element, options) => {
    options = {
        visibleClass: 'in',
        compute: true,
        ...options
    }

    const { autoUpdate } = await import('@floating-ui/dom')

    const popoverElement = document.getElementById(element.getAttribute('popovertarget'))

    element.ariaExpanded = true

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

export const togglePopover = async (element, options) => {
    if (element.ariaExpanded !== 'true') {
        await showPopover(element, options)
    } else {
        await closePopover(element)
    }
}
