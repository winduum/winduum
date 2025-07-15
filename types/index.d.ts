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
	export function observeCarousel(element: HTMLElement | Element, options?: ObserveCarouselOptions): void
	export function scrollCarousel(element: HTMLElement | Element, options?: ScrollCarouselOptions): void
	export function paginationCarousel(element: HTMLElement | Element, options?: PaginationCarouselOptions): void
	export function autoplayCarousel(element: HTMLElement | Element, options?: AutoplayCarouselOptions): void
	export function dragCarousel(element: HTMLElement | Element, options?: DragCarouselOptions): void

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

declare module 'winduum/src/components/details' {
	export interface DefaultOptions {
		selector?: string
		summarySelector?: string
	}

	export const defaultOptions: DefaultOptions
	export function showDetails(selector: HTMLInputElement | HTMLElement, options?: DefaultOptions): Promise<void>
	export function closeDetails(selector: HTMLInputElement | HTMLElement, options?: DefaultOptions): Promise<void>
	export function toggleDetails(selector: HTMLInputElement | HTMLElement, options?: DefaultOptions): Promise<void>

	export {};
}

declare module 'winduum/src/components/dialog' {
	export interface DefaultOptions {
		remove?: boolean | null
		closable?: boolean | null
		modal?: boolean
		openAttribute?: string
		closedAttribute?: string
		contentSelector?: string
		scrollbarWidthProperty?: string
	}

	export const defaultOptions: DefaultOptions
	export function showDialog(element: HTMLDialogElement | HTMLElement, options?: DefaultOptions): Promise<void>
	export function closeDialog(element: HTMLDialogElement | HTMLElement, options?: DefaultOptions): Promise<void>

	export {};
}

declare module 'winduum/src/components/drawer' {
	export interface ScrollDrawerOptions {
		snapClass?: string
		opacityProperty?: string
		opacityRatio?: number
		scrollOpen?: number
		scrollClose?: number
		scrollSize?: number
		scrollDirection?:number
	}

	export function showDrawer(element: HTMLElement | Element, distance?: number, direction?: 'left' | 'top'): void
	export function closeDrawer(element: HTMLElement | Element, distance?: number, direction?: 'left' | 'top'): void
	export function scrollInitDrawer(element: HTMLElement | Element, distance?: number, direction?: 'left' | 'top'): void
	export function toggleDrawerAttributes(element: HTMLDialogElement | Element, state?: 'open' | 'close', snapClass?: string): void
	export function scrollDrawerState(scrollState: number, scrollDirection: number): boolean
	export function scrollDrawer(element: HTMLDialogElement | Element, options?: ScrollDrawerOptions): void

	export {};
}

declare module 'winduum/src/components/form' {
	export interface ValidateFormOptions {
		validateSelectors?: string
		validateOptions?: ValidateFieldOptions
		validateField?: typeof validateField
		scrollOptions?: ScrollIntoViewOptions
		submitterLoadingAttribute?: string
	}

	export interface ValidateFieldOptions {
		validate?: boolean
		validationMessage?: string
		selector?: string
		ignoreMatch?: RegExp
		validitySelector?: string
		infoParentSelector?: string
		infoSelector?: string
		infoContent?: string
		endParentSelector?: string
		endSelector?: string
		endContent?: string
		validAttribute?: string
		validIcon?: string | null
		invalidAttribute?: string
		invalidIcon?: string
		activeAttribute?: string
	}

	export function validateForm(event: Event | SubmitEvent, options?: ValidateFormOptions): void
	export function validateField(element: HTMLElement | SubmitEvent, options?: ValidateFieldOptions): void

	export {};
}

declare module 'winduum/src/components/tabs' {
	interface ToggleTabOptions {
		tabElements?: NodeListOf<Element>
		tabPanelElements?: NodeListOf<Element>
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

	export {};
}

declare module 'winduum/src/components/popover' {
	import type { FlipOptions, Middleware, OffsetOptions, Placement, ShiftOptions } from '@floating-ui/dom';
	export interface ShowPopoverOptions {
		anchorSelector: string,
		openAttribute?: string
		compute?: boolean
		placement?: Placement
		middleware?: Array<Middleware | null | undefined | false>
		offset?: OffsetOptions
		flip?: FlipOptions
		shift?: ShiftOptions
	}

	export interface HidePopoverOptions {
		openAttribute?: string
	}

	export function showPopover(element: HTMLElement | Element, options?: ShowPopoverOptions): Promise<void>
	export function hidePopover(element: HTMLElement | Element): Promise<void>
	export function togglePopover(element: HTMLElement | Element, options?: ShowPopoverOptions): Promise<void>

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