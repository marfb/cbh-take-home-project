/**
 * @name validateObject
 * @description Evaluates if given value is of type Object.
 * @param {any} value
 * @returns {boolean}
 */
exports.validateObject = (value) => !!(value && value.constructor === Object);

/**
 * @name validateString
 * @description Evaluates if given value is of type String.
 * @param {any} value
 * @returns {boolean}
 */
exports.validateString = (value) => typeof value === "string";
