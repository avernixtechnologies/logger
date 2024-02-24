"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const luxon_1 = require("luxon");
/**
 * A versatile logging class for handling various levels of log messages with colored output.
 * Supports dynamic log levels such as info, debug, error, warn, crit, and more.
 *
 * The logger formats messages with a timestamp, optional logger name, and supports additional data logging.
 * It provides a convenient way to control log output based on the environment, especially useful for distinguishing
 * between development and production logs.
 *
 * Usage:
 * ```javascript
 * const logger = new Logger({ name: 'MyApp', env: process.env.NODE_ENV });
 * logger.info('Application started', { pid: process.pid });
 * logger.error('An error occurred', { error: err });
 * ```
 *
 * @class Logger
 * @param {Object} args - Configuration options for the logger.
 * @param {string} [args.name] - Optional name for the logger instance, included in log output.
 * @param {string} [args.env] - The current environment (e.g., 'development', 'production'), used to control log output.
 */
class Logger {
    name;
    env;
    constructor(args) {
        this.name = args.name;
        this.env = args.env;
    }
    logLevel = {
        info: 'green',
        debug: 'blue',
        error: 'red',
        http: 'gray',
        notice: 'cyan',
        warn: 'yellow',
        crit: 'magenta',
        ignore: 'white',
        danger: 'redBright',
    };
    /**
     * Logs a message at the specified level with optional data. Filters out debug messages in production.
     *
     * @param {LogType} level - The severity level of the log message.
     * @param {string} message - The main log message to output.
     * @param {Object} [data] - Optional data to log alongside the message.
     * @returns {Log} The log object containing the level, message, and optional data.
     */
    log(level, message, data) {
        const dt = luxon_1.DateTime.now();
        if (level !== 'ignore') {
            const colorMethod = this.logLevel[level] || 'green';
            const chalkMethod = chalk_1.default[colorMethod];
            if (typeof chalkMethod === 'function') {
                if (level === 'debug' && this.env === 'production') {
                    return { level, message, data };
                }
                console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalkMethod(`${level.toUpperCase()}`)}: ${message}`, data ? data : '');
            }
            else {
                console.error('Invalid log level or chalk method not callable');
            }
        }
        return { level, message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    info(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['green']('INFO')}: ${message}`, data ? data : '');
        return { message, data };
    }
    /**
     * Logs a debug message with optional data. Debug messages are suppressed in production environment.
     *
     * @param {string} message - The debug message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    debug(message, data) {
        const dt = luxon_1.DateTime.now();
        if (this.env === 'production') {
            return { message, data };
        }
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['blue']('DEBUG')}: ${message}`, data ? data : '');
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    error(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['red']('ERROR')}: ${message}`, data ? data : '');
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    warn(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['yellow']('WARN')}: ${message}`, data ? data : '');
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    crit(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['magenta']('CRIT')}: ${message}`, data ? data : '');
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    notice(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['cyan']('NOTICE')}: ${message}`, data ? data : '');
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    http(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['gray']('HTTP')}: ${message}`, data ? data : '');
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    danger(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['redBright']('DANGER')}: ${message}`, data ? data : '');
        return { message, data };
    }
    /**
     * Logs no information, best use case for empty .then() blocks.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    ignore(message, data) {
        return { message, data };
    }
}
exports.default = Logger;
// export default Logger;
