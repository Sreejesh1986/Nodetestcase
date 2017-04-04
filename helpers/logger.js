var bunyan = require('bunyan');
var ebLogger = require('express-bunyan-logger');
var path = require('path');
var uuid = require('node-uuid');
var moment = require('moment');

/**
 * Application Logger that is exported
 * @param {loggerType} loggerType Type of Logger ('info' or 'error')
 */
var getApplicationLogger = function (loggerType) {
  return (function (req, res, next) {
    try {
      if (loggerType !== 'info' && loggerType !== 'error') {
        throw new Error('\"' + loggerType + '\" logger not supported');
      }
      var logger = createLoggerObj(loggerType);
      var childLogger = req.id !== undefined ? logger.child({ req_id: req.id }) : logger;
      req[loggerType + 'Logger'] = childLogger;
      return next();
    } catch (err) {
      return next(err);
    }
  });
};

/**
 * Function to create the Application Logger
 * @param {string} loggerType Type of Logger ('info' or 'error')
 */
var createLoggerObj = function (loggerType) {

  loggerType = loggerType || 'info';
  var folderName = (process.env.NODE_ENV === 'production') ? 'production' : 'development';

  /**
   * Function to return the Logger Object
   * @param {_loggerType} _loggerType Type of Logger ('info' or 'error')
   */
  function getLoggerObj(_loggerType) {
    var name = 'ApplicationLogger';
    var logFileName = moment().format("YYYY-MM-DD");
    var stream;
    var logLevel;

    if (_loggerType === 'info') {
      logFileName = logFileName + '_info-log.json';
      stream = path.resolve(__dirname, '..', 'logs', folderName, 'info-logger', logFileName);
      logLevel = 'info';
    } else if (_loggerType === 'error') {
      logFileName = logFileName + '_error-log.json';
      stream = path.resolve(__dirname, '..', 'logs', folderName, 'error-logger', logFileName);
      logLevel = 'error';
    }
    // Return the Logger Object
    return {
      name: name,
      streams: [
        {
          path: stream,
          level: logLevel
        }
      ]
    };
  }
  // Return Bunyan Logger Object
  return bunyan.createLogger(getLoggerObj(loggerType));
};

/**
 * Request logger that is exported.
 * The function returned is an IIFE as per requirement
 */
var getRequestLogger = function () {
  return (function (req, res, next) {
    try {
      var requestLoggerFilename = moment().format("MM-DD-YYYY") + '_request-log.json';

      if (process.env.NODE_ENV === 'production') {
        logFilePath = path.resolve(__dirname, '..', 'logs', 'production', 'request-logger', requestLoggerFilename);
      } else {
        logFilePath = path.resolve(__dirname, '..', 'logs', 'development', 'request-logger', requestLoggerFilename);
      }

      var loggerObj = {
        name: 'request-logger',
        streams: [{
          level: 'info',
          path: logFilePath //process.stdout
        }],
        serializers: {
          req: reqSerializer,
          res: resSerializer
        },
        excludes: ['response-hrtime', 'req-headers', 'res-headers', 'incoming', 'user-agent'],
        parseUA: false,
        genReqId: generateCorrelationID
      }

      return ebLogger(loggerObj);
    } catch (err) {
      return (function (req, res, next) {
        return next(err);
      });
    }
  })();
};

/**
 * Create the correlation id to be used in logs as "req_id"
 * @param {object} request: Express request Object 
 */
function generateCorrelationID(request) {
  var requestId = uuid.v4();
  request.id = requestId.replace(/-/g, '');
  return request.id;
}

/**
 * The serializer for request objects in Bunyan
 * @param {object} req Express request Object 
 */
function reqSerializer(req) {
  return {
    headers: req.headers
  };
}

/**
 * The serializer for response objects in Bunyan
 * @param {object} res Express response Object 
 */
function resSerializer(res) {
  return {
    headers: res._headers
  };
}

module.exports = {
  requestLogger: getRequestLogger,
  applicationLogger: getApplicationLogger
}