const crypto = require("crypto");
const { validateString } = require("./validators");
const TRIVIAL_PARTITION_KEY = "0";

/**
 * @name deterministicPartitionKey
 * @description returns hashKey for received event. Event may or may not have partitionKey. In that case hash is formed with strigified event.
 * @param {object} event
 * @param {string} event.partitionKey
 * @returns {string}
 */
exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  const { partitionKey = "" } = event;

  const candidate = partitionKey || JSON.stringify(event);
  const stringifiedCandidate = validateString(candidate)
    ? candidate
    : JSON.stringify(candidate);

  const hashFromCandidate = crypto
    .createHash("sha3-512")
    .update(stringifiedCandidate)
    .digest("hex");

  return hashFromCandidate;
};
