/**
 * Converts the first character of a string to uppercase and the rest to their original case.
 * @param {string} word - The word to be capitalized.
 * @returns {string} The capitalized word.
 */
export function toCapitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
