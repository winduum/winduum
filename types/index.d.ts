declare module 'winduum' {
	import type { Plugin } from 'tailwindcss/types/config';
	export interface PluginOptions {
		colors?: string[] | string
		fontFamily?: string[] | string,
		fontWeight?: string[] | string,
		ease?: string[] | string,
		zIndex?: string[] | string,
		fontSize?: string[] | string,
		spacing?: string[] | string,
		borderRadius?: string[] | string,
		mask?: string[] | string,
		animations?: string[],
		screens?: {
			[key: string]: string
		},
		settings?: {
			rgb?: boolean,
			colorMix?: boolean
		}
	}

	export const defaultConfig: PluginOptions

	export default function createPlugin(userConfig?: PluginOptions): Plugin

	export {};
}

declare module 'winduum/supports' {
	export const supportsTimelineTrigger: boolean;

	export const supportsInterestFor: boolean;

	export const supportsScrollInitialTarget: boolean;

	export const supportsAnimationTimeline: boolean;

	export const supportsScrollSnapEvents: boolean;

	export {};
}

declare module 'winduum/src/components/carousel' {
	export interface ObserveCarouselOptions {
		visibleAttribute?: string
		observerOptions?: {
			rootMargin?: string
			threshold?: number | number[]
		}
	}

	export interface PaginationCarouselOptions {
		element?: HTMLElement | Element
		itemContent?: string
		activeAttribute?: string
	}

	export interface ScrollCarouselOptions {
		observe?: ObserveCarouselOptions
		pagination?: PaginationCarouselOptions
		progressElement?: HTMLProgressElement | Element
		counterMinElement?: HTMLElement | Element
		counterMaxElement?: HTMLElement | Element
	}

	export interface AutoplayCarouselOptions {
		delay?: number
		pauseElements?: HTMLElement[] | Element[]
	}

	export interface DragCarouselOptions {
		activeAttribute?: string
	}

	export function scrollPrev(element: HTMLElement | Element): void
	export function scrollNext(element: HTMLElement | Element): void
	export function scrollTo(element: HTMLElement | Element, selected?: number): void
	export function getItemCount(element: HTMLElement | Element, scrollWidth?: number, mathFloor?: boolean): number
	export function observeCarousel(element: HTMLElement | Element, options?: ObserveCarouselOptions): IntersectionObserver
	export function scrollCarousel(element: HTMLElement | Element, options?: ScrollCarouselOptions): void
	export function paginationCarousel(element: HTMLElement | Element, options?: PaginationCarouselOptions): void
	export function autoplayCarousel(element: HTMLElement | Element, options?: AutoplayCarouselOptions): void
	export function dragCarousel(element: HTMLElement | Element, options?: DragCarouselOptions): void

	export {};
}

declare module 'winduum/src/components/carousel-experimental' {
	export type CarouselPlacement = 'left' | 'right' | 'top' | 'bottom'

	export interface ScrollByOptions {
		direction?: number
		vertical?: boolean
		ratio?: number
	}

	export interface ToggleScrollStateOptions {
		prevElement?: HTMLButtonElement | null
		nextElement?: HTMLButtonElement | null
		vertical?: boolean
	}

	export function scrollBy(element: HTMLElement, options?: ScrollByOptions): void
	export function toggleScrollState(element: HTMLElement, options?: ToggleScrollStateOptions): void
	export function setCurrentAttribute(element: HTMLElement, index: number, attributeName?: string): void
	export function setSnappedAttribute(element: HTMLElement, target: HTMLElement, markerGroupElement?: HTMLElement | null): void
	export function scrollToMarker(element: HTMLElement, target: HTMLElement, markerGroupElement: HTMLElement, scrollIntoViewOptions?: ScrollIntoViewOptions): void

	export {};
}

declare module 'winduum/src/components/compare' {
	export interface SetPositionOptions {
		selector?: string
		positionProperty?: string
	}

	export function setPosition(element: HTMLInputElement, options?: SetPositionOptions): void
	export function setKeyboardStep(element: HTMLInputElement, key: string, step?: string): void
	export function setMouseStep(element: HTMLInputElement, step?: string): void

	export {};
}

declare module 'winduum/src/components/dialog' {

	export {};
}

declare module 'winduum/src/components/drawer' {
	export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

	export function isVerticalDrawer(placement: DrawerPlacement): boolean
	export function scrollDrawer(element: HTMLElement | Element, placement: DrawerPlacement, reverse?: boolean, behavior?: 'auto' | 'instant'): void
	export function showDrawer(element: HTMLElement | Element, placement: DrawerPlacement): Promise<void>
	export function closeDrawer(element: HTMLElement | Element, placement: DrawerPlacement): void
	export function drawerEvents(element: HTMLDialogElement | Element, contentElement: HTMLElement | Element, placement: DrawerPlacement, signal?: AbortSignal): void
	export function drawerObserver(element: HTMLDialogElement | Element, placement: DrawerPlacement): IntersectionObserver
	export function drawerProperties(element: HTMLElement | Element, placement: DrawerPlacement): ['top' | 'left', number, number]

	export {};
}

declare module 'winduum/src/components/field' {
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

	export {};
}

declare module 'winduum/src/components/form' {
	export interface ValidateFormOptions {
		validateSelector?: string
		validateOptions?: ValidateFieldOptions
		validateField?: typeof validateField
		scrollOptions?: ScrollIntoViewOptions
		submitterLoadingAttribute?: string
	}

	export function validateForm(event: Event | SubmitEvent, options?: ValidateFormOptions): void
	interface ValidateFieldOptions {
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

	function validateField(element: HTMLElement, options?: ValidateFieldOptions): void

	export {};
}

declare module 'winduum/src/components/tabs' {
	interface ToggleTabOptions {
		tabElements?: NodeListOf<Element> | Element[]
		tabPanelElements?: NodeListOf<Element> | Element[]
	}

	export function toggleTab(element: HTMLElement | Element, options?: ToggleTabOptions): void

	export {};
}

declare module 'winduum/src/components/toast' {
	export interface ShowToastOptions {
		openAttribute?: string
		autoHide?: number | null
		heightProperty?: string
		close?: CloseToastOptions
	}

	export interface CloseToastOptions {
		closedAttribute?: string
		heightProperty?: string
		remove?: boolean
	}

	export function closeToast(element: HTMLElement, options?: CloseToastOptions): Promise<void>
	export function showToast(element: HTMLElement, options?: ShowToastOptions): Promise<void>

	export {};
}

declare module 'winduum/src/components/toaster' {
	export interface CloseToastOptions {
		closedAttribute?: string
		heightProperty?: string
	}

	export function closeToaster(element: HTMLElement, options?: CloseToastOptions): Promise<void>
	export function toasterObserver(): MutationObserver

	export {};
}

declare module 'winduum/src/components/popover' {
	import type { ComputePositionConfig } from '@floating-ui/dom';
	import type { Placement } from '@floating-ui/utils';
  export function computePositionPopover(
	referenceElement: HTMLElement,
	floatingElement: HTMLElement & { $currentPlacement?: string },
	placement: Placement,
	options?: ComputePositionConfig | boolean
  ): Promise<void>

  export function autoUpdatePopover(
	referenceElement: HTMLElement,
	floatingElement: HTMLElement,
	placement: Placement,
	options?: ComputePositionConfig | boolean
  ): Promise<() => void>

	export {};
}

declare module 'winduum/src/components/range' {
	export interface SetTrackPropertyOptions {
		element: HTMLElement | Element
		value: string
		min?: number
		max?: number
	}

	export interface SetValueOptions {
		selector?: string
		track?: 'start' | 'end'
	}

	export interface SetOutputOptions {
		lang?: string
		formatOptions?: Intl.NumberFormatOptions
	}

	export function setTrackProperty(options: SetTrackPropertyOptions, track: 'start' | 'end'): void
	export function setValue(element: HTMLInputElement, options?: SetValueOptions): void
	export function setOutputValue(element: HTMLInputElement, outputElement: HTMLOutputElement | Element, options?: SetOutputOptions): void

	export {};
}

declare module 'winduum/src/utilities/ripple' {
	export interface ShowRippleEvent {
		currentTarget?: EventTarget | HTMLElement;
		offsetX: number;
		offsetY: number;
	}

	export function showRipple(event: MouseEvent | ShowRippleEvent, rippleElement?: HTMLElement): void

	export {};
}

declare module 'winduum/src/utilities/swap' {
	export function toggleSwap(element: HTMLElement): void

	export {};
}

//# sourceMappingURL=index.d.ts.map