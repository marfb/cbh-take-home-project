const crypto = require("crypto");
const { validateObject, validateString } = require("./validators");

/*
  refactor: there are some type validations at the function's body. Applied
  this way can lead to errors. One way to solve this is to define a module where
  all types validations functions are declared and the same criteria to validate
  types are unified.
*/

/*
  refactor: the next constant can be defined outside the function
  block in case we need to use the same values in other functions
  within this file in the future. Also improve redability by
  reducing the amout of lines of the deterministicPartitionKey function. 
*/
const TRIVIAL_PARTITION_KEY = "0";

/*
  refactor: added default value for event
*/
/**
 * @name deterministicPartitionKey
 * @description returns hashKey for received event. Event may or may not have partitionKey. In that case hash is formed with strigified event.
 * @param {object} event
 * @param {string} event.partitionKey
 * @returns {string}
 */
exports.deterministicPartitionKey = (event = {}) => {
  /* 
    refactor: added validation in case event is not an object or if is an empty object and return "0";
  */
  if (!validateObject(event) || !Object.keys(event).length)
    return TRIVIAL_PARTITION_KEY;

  /*
    refactor: I removed the let variable declaration in orden to improve redability
    and to reduce errors derived from the implmentation of too many reassigments.
    Also I added a new variable stringifiedCandidate that helps understand the
    type of value that is stored.
    This implemantation and refactor helps me get rid of all the if/else blocks
    that sometimes are difficult to read.
  */

  const candidate = event.partitionKey || JSON.stringify(event);
  const stringifiedCandidate = validateString(candidate)
    ? candidate
    : JSON.stringify(candidate);

  const hashFromCandidate = crypto
    .createHash("sha3-512")
    .update(stringifiedCandidate)
    .digest("hex");

  /*
    refactor: finally I believe that the constant MAX_PARTITION_KEY_LENGTH was used
    only when candidate was assigned the strigified value of event when event didn't
    have partitionKey. In my implementation I believe this is not necessary.
  */

  return hashFromCandidate;
};
