import { supportsAnchor } from '../../common.js'

/**
 * @param {HTMLElement} referenceElement
 * @param {HTMLElement & { $currentPlacement?: string }} floatingElement
 * @param {import('@floating-ui/utils').Placement} placement
 * @param {import('@floating-ui/dom').ComputePositionConfig | boolean} [options={}]
 * @returns {Promise<void>}
 */
export const computePositionPopover = async (
  referenceElement,
  floatingElement,
  placement,
  options = {},
) => {
  const { computePosition, flip } = await import('@floating-ui/dom')

  const autoUpdate = options === true
  const middleware = autoUpdate ? [flip()] : []

  floatingElement.classList.remove(floatingElement.$currentPlacement ?? placement)
  floatingElement.style.setProperty('--anchor-size', !supportsAnchor ? `${referenceElement.offsetWidth}px` : '')

  await computePosition(referenceElement, floatingElement, {
    middleware,
    placement,
    ...(autoUpdate ? {} : options),
  }).then(({ x, y, placement }) => {
    floatingElement.style.inset = !supportsAnchor ? `${y}px auto auto ${x}px` : ''
    floatingElement.classList.add(placement)
    floatingElement.$currentPlacement = placement
  })
}

/**
 * @param {HTMLElement} referenceElement
 * @param {HTMLElement} floatingElement
 * @param {import('@floating-ui/utils').Placement} placement
 * @param {import('@floating-ui/dom').ComputePositionConfig | boolean} [options={}]
 * @returns {Promise<() => void>}
 */
export const autoUpdatePopover = async (
  referenceElement,
  floatingElement,
  placement,
  options = {},
) => {
  const { autoUpdate } = await import('@floating-ui/dom')

  return autoUpdate(referenceElement, floatingElement, () =>
    computePositionPopover(referenceElement, floatingElement, placement, options),
  )
}
