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
	return numbers.reduce((total, number) => total + number, 0);
}
