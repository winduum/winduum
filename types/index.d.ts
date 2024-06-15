declare module 'winduum' {
	import type { Plugin } from 'tailwindcss/types/config';
	export interface PluginOptions {
		colors?: string[]
		fontFamily?: string[],
		fontWeight?: string[],
		ease?: string[],
		zIndex?: string[],
		fontSize?: string[],
		spacing?: string[],
		borderRadius?: string[],
		animations?: string[],
		mask?: string[],
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
}

declare module 'winduum/src/components/carousel' {
	export interface ObserveCarouselOptions {
		visibleClass?: string
		observerOptions?: {
			rootMargin?: string
			threshold?: number | number[]
		}
	}

	export interface PaginationCarouselOptions {
		element?: HTMLElement | Element
		itemContent?: string
		activeClass?: string
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
		activeClass?: string
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
}

declare module 'winduum/src/components/compare' {
	export interface SetPositionOptions {
		selector?: string
		positionProperty?: string
	}

	export function setPosition(event: Event, options?: SetPositionOptions): void
	export function setKeyboardStep(event: KeyboardEvent, step?: string): void
	export function setMouseStep(event: MouseEvent, step?: string): void
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
}

declare module 'winduum/src/components/dialog' {
	export interface DefaultOptions {
		remove?: boolean | null
		closable?: boolean | null
		openClass?: string
		overflowClass?: string
		scrollbarWidthProperty?: string
	}

	export const defaultOptions: DefaultOptions
	export function showDialog(element: HTMLDialogElement | HTMLElement, options?: DefaultOptions): Promise<void>
	export function closeDialog(element: HTMLDialogElement | HTMLElement, options?: DefaultOptions): Promise<void>
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
	export function scrollDrawer(element: HTMLElement | Element, options?: ScrollDrawerOptions): void
}

declare module 'winduum/src/components/form' {
	export interface ValidateFormOptions {
		validateSelectors?: string
		validateOptions?: ValidateFieldOptions
		submitterLoadingClass?: string
	}

	export interface ValidateFieldOptions {
		validate?: boolean
		selector?: string
		ignoreMatch?: RegExp
		validitySelector?: string
		infoParentSelector?: string
		infoSelector?: string
		infoContent?: string
		endParentSelector?: string
		endSelector?: string
		endContent?: string
		validClass?: string
		validIcon?: string | null
		invalidClass?: string
		invalidIcon?: string
		activeClass?: string
	}

	export function validateForm(event: Event | SubmitEvent, options?: ValidateFormOptions): void
	export function validateField(element: HTMLElement | SubmitEvent, options?: ValidateFieldOptions): void
}

declare module 'winduum/src/components/tabs' {
	interface ToggleTabOptions {
		tabElements?: NodeListOf<Element>
		tabPanelElements?: NodeListOf<Element>
	}

	export function toggleTab(element: HTMLElement | Element, options?: ToggleTabOptions): void
}

declare module 'winduum/src/components/toaster' {
	export interface ShowToastOptions {
		visibleClass?: string
		autoHide?: number | null
		heightProperty?: string
		close?: CloseToastOptions
	}

	export interface CloseToastOptions {
		hiddenClass?: string
		heightProperty?: string
	}

	export interface InsertToasterOptions {
		classes?: string
	}

	export interface InsertToastOptions {
		classes?: string
		title?: string
		text?: string
		start?: string
		end?: string
		show?: ShowToastOptions
	}

	export function closeToast(element: HTMLElement, options?: CloseToastOptions): Promise<void>
	export function showToast(element: HTMLElement, options?: ShowToastOptions): Promise<void>
	export function insertToaster(element: HTMLElement, options?: InsertToasterOptions): Promise<void>
	export function insertToast(element: HTMLElement, options?: InsertToastOptions): Promise<void>
	export function closeToaster(element: HTMLElement, options?: CloseToastOptions): Promise<void>
}

declare module 'winduum/src/components/popover' {
	import type { FlipOptions, Middleware, OffsetOptions, Placement, ShiftOptions } from '@floating-ui/dom';
	export interface ShowPopoverOptions {
		visibleClass?: string
		compute?: boolean
		placement?: Placement
		middleware?: Array<Middleware | null | undefined | false>
		offset?: OffsetOptions
		flip?: FlipOptions
		shift?: ShiftOptions
	}

	export function showPopover(element: HTMLElement | Element, options?: ShowPopoverOptions): Promise<void>
	export function hidePopover(element: HTMLElement | Element): Promise<void>
	export function togglePopover(element: HTMLElement | Element, options?: ShowPopoverOptions): Promise<void>
}

declare module 'winduum/src/components/range' {
	export interface SetTrackPropertyOptions {
		element: HTMLElement | Element
		value: string
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
}

declare module 'winduum/src/utilities/ripple' {
	export function showRipple(event: MouseEvent, element?: HTMLElement): void
}

declare module 'winduum/src/utilities/swap' {
	export function toggleSwap(element: HTMLElement): void
}

//# sourceMappingURL=index.d.ts.map