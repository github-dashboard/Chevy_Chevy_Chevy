const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const moment = require('moment');

const logging = {
  logFileDirName: 'logs',
  console: {
    level: 'degug',
    colorize: true,
    handleExceptions: true,
    json: false
  },
  file: {
    timestamp: true,
    json: false,
    datePattern: 'YYYY-MM-DD',
    filename: 'seagate', // log prefix  filename_ex: 2020-06-02-seagate.log | OPTIONAL
    maxfiles: '14d',
    maxsize: 10000000, // 10MB
    level: 'info', // TO run application logs in debug mode add 'debug'
    zippedArchive: false
  }
}

const logDir = logging.logFileDirName;

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/**
 * Logger filename configuration.
 */
const logConfig = logging.file;
logConfig.filename = logConfig.filename
  ? `${logDir}/%DATE%-${logConfig.filename}.log`
  : `${logDir}/%DATE%.log`;

/**
 * Fomatter
 */
const MESSAGE = Symbol.for('message');
const jsonFormatter = logEntry => {
  const base = { timestamp: moment().format('MMMM Do YYYY, h:mm:ss A; ') };
  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};

/**
 * Logger Class
 */
class Logger {
  /**
   * Creates a new logger instance.
   */
  constructor() {
    // Create new winston logger instance and make it log to the console
    this.winston = winston.createLogger({
      format: winston.format(jsonFormatter)(),
      transports: [
        new winston.transports.Console(logging.console),
        new DailyRotateFile(logConfig)
      ],
      exitOnError: false
    });
  }

  /**
   * Logs a new message to the console.
   *
   * @param level Logging level to be used (silly | debug | verbose | info | warn | error).
   * @param message The message to be logged.
   * @param meta Optional meta data that will be attached to the message.
   */

  log(level, message, meta) {
    if (meta) {
      this.winston.log(level, message, meta);
    } else {
      this.winston.log(level, message);
    }
  }

  /**
   * Logs a new message with logging level 'error'.
   *
   * @param message The message to be logged.
   * @param meta Optional meta data that will be attached to the message.
   */

  error(message, meta) {
    this.log('error', message, meta);
  }

  /**
   * Logs a new message with logging level 'warn'.
   *
   * @param message The message to be logged.
   * @param meta Optional meta data that will be attached to the message.
   */

  warn(message, meta) {
    this.log('warn', message, meta);
  }

  /**
   * Logs a new message with logging level 'info'.
   *
   * @param message The message to be logged.
   * @param meta Optional meta data that will be attached to the message.
   */

  info(message, meta) {
    this.log('info', message, meta);
  }

  /**
   * Logs a new message with logging level 'verbose'.
   *
   * @param message The message to be logged.
   * @param meta Optional meta data that will be attached to the message.
   */

  verbose(message, meta) {
    this.log('verbose', message, meta);
  }

  /**
   * Logs a new message with logging level 'debug'.
   *
   * @param message The message to be logged.
   * @param meta Optional meta data that will be attached to the message.
   */

  debug(message, meta) {
    this.log('debug', message, meta);
  }

  /**
   * Logs a new message with logging level 'silly'.
   *
   * @param message The message to be logged.
   * @param meta Optional meta data that will be attached to the message.
   */

  silly(message, meta) {
    this.log('silly', message, meta);
  }
}

/*!
 * Export logger as singleton.
 */

module.exports = new Logger();
