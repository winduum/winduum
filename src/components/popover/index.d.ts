import type { ComputePositionConfig } from '@floating-ui/dom'
import type { Placement } from '@floating-ui/utils'

export declare function computePositionPopover(
  referenceElement: HTMLElement,
  floatingElement: HTMLElement & { $currentPlacement?: string },
  placement: Placement,
  options?: ComputePositionConfig | boolean
): Promise<void>

export declare function autoUpdatePopover(
  referenceElement: HTMLElement,
  floatingElement: HTMLElement,
  placement: Placement,
  options?: ComputePositionConfig | boolean
): Promise<() => void>
