/**
 * This is a paliative solution for the
 * case when data is not found
 */

const msgs = require("../constants/messages");
const httpStatusCodes = require("../constants/httpStatusCodes");

module.exports = value => {
  if (!value) {
    const err = new Error(msgs.NOT_FOUND);
    err.status = httpStatusCodes.NOT_FOUND;
    throw err;
  }
};
