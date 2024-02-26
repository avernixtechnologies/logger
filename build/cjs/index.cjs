"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.Logger = void 0;
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
 * const logger = new Logger({ name: 'MyApp', debugMode: process.env.NODE_ENV === 'development' ? true : false });
 * logger.info('Application started', { pid: process.pid });
 * logger.log('info', 'Application started', { pid: process.pid })
 * logger.error('An error occurred', { error: err });
 * ```
 * @class Logger
 * @param {Object} args - Configuration options for the logger.
 * @param {string} [args.name] - Optional name for the logger instance, included in log output.
 * @param {boolean} [args.debugMode] - Setting for debugMode, used to control log output.
 * @param {object} [args.customLogLevels] - Allows extra log levels to be added with chalk color support.
 */
class Logger {
    logLevels;
    name;
    debugMode;
    customLogLevels = {};
    constructor(args) {
        this.name = args.name;
        this.debugMode = args.debugMode ?? true;
        // Default log levels
        const defaultLogLevels = {
            info: '#00FF00',
            debug: '#0000FF',
            error: '#FF0000',
            http: '#D3D3D3',
            notice: '#00FFFF',
            warn: '#FFFF00',
            crit: '#FF00FF',
            ignore: '#FFFFFF',
            danger: '#FF4000',
        };
        this.customLogLevels = args.customLogLevels ?? {};
        // Merge default log levels with custom levels provided by the user
        this.logLevels = { ...defaultLogLevels, ...this.customLogLevels };
        Object.values(this.logLevels).forEach((color) => {
            if (!this.isValidHexColor(color)) {
                console.log(chalk_1.default
                    .rgb(123, 45, 67)
                    .underline('Invalid hex color: ' + color + ' | Defaulting to'), chalk_1.default.hex('#00FF00').underline('#00FF00'), chalk_1.default.rgb(123, 45, 67).underline('Please use a valid hex color code.'));
                // throw new Error('Invalid hex color: ' + color);
            }
        });
    }
    isValidHexColor(hex) {
        const regex = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
        return regex.test(hex);
    }
    getString(level, message) {
        const dt = luxon_1.DateTime.now();
        let colorMethod = this.logLevels[level];
        const colorOrMethod = this.logLevels[level];
        let formattedMessage;
        if (this.isValidHexColor(colorOrMethod)) {
            // If it's a hex color, use chalk.hex
            formattedMessage = chalk_1.default.hex(colorOrMethod)(`${level.toUpperCase()}`);
        }
        else if (typeof chalk_1.default[colorOrMethod] === 'function') {
            // If it's a valid chalk method, use it directly
            formattedMessage = chalk_1.default[colorOrMethod](`${level.toUpperCase()}`);
        }
        else {
            // Fallback to default formatting
            formattedMessage = `${level.toUpperCase()}`;
        }
        return `${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${formattedMessage}:${message ? ' ' + message : ''}`;
    }
    /**
     * Logs a message at the specified level with optional data. Filters out debug messages in production.
     *
     * @param {LogType} level - The severity level of the log message.
     * @param {string} message - The main log message to output.
     * @param {Object} [data] - Optional data to log alongside the message.
     * @returns {Log} The log object containing the level, message, and optional data.
     */
    log(level, messageOrData, dataIfMessage) {
        let message = typeof messageOrData === 'string' ? messageOrData : undefined;
        let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;
        if (level === 'debug' && !this.debugMode) {
            return { level, messageOrData, dataIfMessage };
        }
        console.log(`${this.getString(level, message)}`, data ? data : '');
        return { level, messageOrData, dataIfMessage };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    info(messageOrData, dataIfMessage) {
        let message = typeof messageOrData === 'string' ? messageOrData : undefined;
        let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;
        this.log('info', message, data);
        return { messageOrData, dataIfMessage };
    }
    /**
     * Logs a debug message with optional data. Debug messages are suppressed in production environment.
     *
     * @param {string} message - The debug message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    debug(messageOrData, dataIfMessage) {
        let message = typeof messageOrData === 'string' ? messageOrData : undefined;
        let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;
        this.log('info', message, data);
        return { messageOrData, dataIfMessage };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    error(messageOrData, dataIfMessage) {
        let message = typeof messageOrData === 'string' ? messageOrData : undefined;
        let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;
        this.log('info', message, data);
        return { messageOrData, dataIfMessage };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    warn(messageOrData, dataIfMessage) {
        let message = typeof messageOrData === 'string' ? messageOrData : undefined;
        let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;
        this.log('info', message, data);
        return { messageOrData, dataIfMessage };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    crit(messageOrData, dataIfMessage) {
        let message = typeof messageOrData === 'string' ? messageOrData : undefined;
        let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;
        this.log('info', message, data);
        return { messageOrData, dataIfMessage };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    notice(messageOrData, dataIfMessage) {
        let message = typeof messageOrData === 'string' ? messageOrData : undefined;
        let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;
        this.log('info', message, data);
        return { messageOrData, dataIfMessage };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    http(messageOrData, dataIfMessage) {
        let message = typeof messageOrData === 'string' ? messageOrData : undefined;
        let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;
        this.log('info', message, data);
        return { messageOrData, dataIfMessage };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    danger(messageOrData, dataIfMessage) {
        let message = typeof messageOrData === 'string' ? messageOrData : undefined;
        let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;
        this.log('info', message, data);
        return { messageOrData, dataIfMessage };
    }
    /**
     * Logs no information, best use case for empty .then() blocks.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    ignore(messageOrData, dataIfMessage) { }
}
exports.Logger = Logger;
function createLogger(args) {
    const logger = new Logger(args);
    return new Proxy(logger, {
        get(target, prop, receiver) {
            if (typeof prop === 'string' && prop in target.customLogLevels) {
                return (messageOrData, dataIfMessage) => {
                    let message = typeof messageOrData === 'string' ? messageOrData : undefined;
                    let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;
                    target.log(prop, message, data);
                };
            }
            return Reflect.get(target, prop, receiver);
        },
    });
}
exports.createLogger = createLogger;
