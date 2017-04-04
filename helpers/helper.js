/**
 * Function to get the Standard response Object.
 * To be used for any response sent from the middleware
 * @param {string} status Status of the response ('OK' or 'Error')
 * @param {number} code HTTP status code of the response
 * @param {string} message Message to be sent in the response
 */
function getResponseObject(status, code, message) {
  return {
    Status: status,
    Code: code,
    Message: message
  }
};

/**
 * Logic to properly format Javascript Objects
 * Sometimes help in cleaning special characters
 * @param {object} jsonObject Object which can a JavascriptObject or Null
 */
function cleanJSON(jsonObject) {
  var jsonObject = jsonObject || null;
  if (jsonObject) {
    var jsonStr = JSON.stringify(jsonObject).trim();
    var jsonObj = JSON.parse(jsonStr);
    return jsonObj;
  } else {
    return null;
  }

};

module.exports = {
  getResponseObject: getResponseObject,
  cleanJSON: cleanJSON
};