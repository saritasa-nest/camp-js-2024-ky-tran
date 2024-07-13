/**
 * Ensures the provided element is not null, otherwise throws an error.
 * @param element - The HTMLElement to check.
 * @returns The same HTMLElement if not null.
 * @throws Will throw an error if the element is null.
 */
function scanElement(element: HTMLElement | null): HTMLElement {
	if (!element) {
		throw new Error('Element not found!');
	}

	return element;
}

/**
 * Selects a single HTMLElement based on the provided CSS selector.
 * @param selector - The CSS selector string.
 * @returns The HTMLElement matching the selector.
 * @throws Will throw an error if the element is not found.
 */
export function $(selector: string): HTMLElement {
	const element = document.querySelector<HTMLElement>(selector);
	return scanElement(element);
}

/**
 * Selects all HTMLElements based on the provided CSS selector.
 * @param selector - The CSS selector string.
 * @returns A NodeList of HTMLElements matching the selector.
 */
export function $$(selector: string): NodeListOf<HTMLElement> {
	return document.querySelectorAll<HTMLElement>(selector);
}

/**
 * Creates a function to select a single HTMLElement within a parent element.
 * @param parentNode - The parent HTMLElement to query within.
 * @returns A function that takes a CSS selector string and returns the matching HTMLElement.
 * @throws Will throw an error if the element is not found.
 */
export function $_(parentNode: HTMLElement) {
	return function(selector: string): HTMLElement {
		const element = parentNode.querySelector<HTMLElement>(selector);
		return scanElement(element);
	};
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random integer between min and max.
 */
export function getRandomInt(min: number, max: number): number {
	const randomBuffer = new Uint32Array(1);
	window.crypto.getRandomValues(randomBuffer);
	const randomNumber = randomBuffer[0] / (0xffffffff + 1);
	return Math.floor(randomNumber * (max - min + 1)) + min;
}

/**
 * Calculates the sum of an array of numbers.
 * @param numbers - The array of numbers to sum.
 * @returns The total sum of the numbers.
 */
export function sum(numbers: number[]): number {
	return numbers.reduce((total, number) => total + number);
}
