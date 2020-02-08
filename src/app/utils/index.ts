const utils = {
    /**
     * Check if string valid
     * @param str {string} - String to check if valid
     * @returns {boolean}
     */
    isStrValid(str: string | null): boolean {
        return str !== null && str !== '';
    },
    /**
     * Check if string is invalid
     * @param str {string} - String to check if invalid
     */
    isStrInvalid(str: string | null): boolean {
        return str === null || str === '';
    }
}

export default utils;