/**
 * Ensures the provided element is not null, otherwise throws an error.
 * @param element - The HTMLElement to check.
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
 * @throws Will throw an error if the element is not found.
 */
export function selectElement(selector: string): HTMLElement {
	const element = document.querySelector<HTMLElement>(selector);
	return scanElement(element);
}

/**
 * Selects all HTMLElements based on the provided CSS selector.
 * @param selector - The CSS selector string.
 */
export function selectAllElements(selector: string): NodeListOf<HTMLElement> {
	return document.querySelectorAll<HTMLElement>(selector);
}

/**
 * Creates a function to select a single HTMLElement within a parent element.
 * @param parentNode - The parent HTMLElement to query within.
 * @param selector - The CSS selector string.
 * @throws Will throw an error if the element is not found.
 */
export function selectElementInParent(parentNode: HTMLElement, selector: string): HTMLElement {
	const element = parentNode.querySelector<HTMLElement>(selector);
	return scanElement(element);
}
