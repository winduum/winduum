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

	export default function createPlugin(userConfig: PluginOptions): Plugin
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
	export interface DialogElement extends HTMLDialogElement {
		_dialogHasEvents: boolean
	}

	export interface DefaultOptions {
		remove?: boolean | null
		closable?: boolean | null
		openClass?: string
		scrollbarWidthProperty?: string
	}

	export interface InsertDialogOptions {
		selector?: string | null
		class?: string | null
		append?: boolean | null
		show?: DefaultOptions
	}

	export interface FetchDialogOptions {
		url: string
		insert?: InsertDialogOptions
	}

	export const defaultOptions: DefaultOptions
	export function dialogSelector(selector: string): HTMLDialogElement
	export function dismissDialog(element: HTMLDialogElement, options?: DefaultOptions): Promise<void>
	export function showDialog(element: DialogElement, options?: DefaultOptions): Promise<void>
	export function closeDialog(element: HTMLDialogElement, options?: DefaultOptions): Promise<void>
	export function insertDialog(content: string, options?: InsertDialogOptions): Promise<void>
	export function fetchDialog({ url, insert }: FetchDialogOptions): Promise<void>
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
		ignoreMatch?: string
		validitySelector?: string
		infoParentSelector?: string
		infoSelector?: string
		infoContent?: string
		endParentSelector?: string
		endSelector?: string
		endContent?: string
		validClass?: string
		validIcon?: string
		invalidClass?: string
		invalidIcon?: string
		activeClass?: string
	}

	export function validateForm(event: Event | SubmitEvent, options?: ValidateFormOptions): void
	export function validateField(element: HTMLElement | SubmitEvent, options?: ValidateFieldOptions): void
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

declare module 'winduum/src/ui/range' {
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
	export function showRipple(event: MouseEvent, element: HTMLElement): void
}

declare module 'winduum/src/utilities/swap' {
	export function toggleSwap(element: HTMLElement): void
}

//# sourceMappingURL=index.d.ts.map