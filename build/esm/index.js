import chalk from 'chalk';
import { DateTime } from 'luxon';
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
export class Logger {
    logLevels;
    name;
    debugMode;
    data;
    customLogLevels = {};
    constructor(args) {
        this.data = args?.data;
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
                console.log(chalk
                    .rgb(123, 45, 67)
                    .underline('Invalid hex color: ' + color + ' | Defaulting to'), chalk.hex('#00FF00').underline('#00FF00'), chalk.rgb(123, 45, 67).underline('Please use a valid hex color code.'));
                // throw new Error('Invalid hex color: ' + color);
            }
        });
    }
    isValidHexColor(hex) {
        const regex = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
        return regex.test(hex);
    }
    getString(level, message) {
        const dt = DateTime.now();
        let colorMethod = this.logLevels[level];
        const colorOrMethod = this.logLevels[level];
        let formattedMessage;
        if (this.isValidHexColor(colorOrMethod)) {
            // If it's a hex color, use chalk.hex
            formattedMessage = chalk.hex(colorOrMethod)(`${level.toUpperCase()}: ${message}`);
        }
        else if (typeof chalk[colorOrMethod] === 'function') {
            // If it's a valid chalk method, use it directly
            formattedMessage = chalk[colorOrMethod](`${level.toUpperCase()}: ${message}`);
        }
        else {
            // Fallback to default formatting
            formattedMessage = `${level.toUpperCase()}: ${message}`;
        }
        return `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${formattedMessage}: ${message}`;
    }
    // createLogger(args: Args): IAvernixLogger {
    //     const logger = new Logger(args);
    //     return new Proxy(logger, {
    //         get(target, prop, receiver) {
    //             if (typeof prop === 'string' && prop in target.customLogLevels) {
    //                 return (message: string, data?: object) => {
    //                     const level = prop;
    //                     target.log(level, message, data); // Ensure log() accepts colorMethod
    //                 };
    //             }
    //             // Use explicit parameters instead of ...arguments
    //             return Reflect.get(target, prop, receiver);
    //         },
    //     });
    // }
    /**
     * Logs a message at the specified level with optional data. Filters out debug messages in production.
     *
     * @param {LogType} level - The severity level of the log message.
     * @param {string} message - The main log message to output.
     * @param {Object} [data] - Optional data to log alongside the message.
     * @returns {Log} The log object containing the level, message, and optional data.
     */
    log(level, message, data) {
        if (level === 'debug' && !this.debugMode) {
            return { level, message, data };
        }
        const dt = DateTime.now();
        let colorMethod = this.logLevels[level];
        const colorOrMethod = this.logLevels[level];
        let formattedMessage;
        if (this.isValidHexColor(colorOrMethod)) {
            // If it's a hex color, use chalk.hex
            formattedMessage = chalk.hex(colorOrMethod)(`${level.toUpperCase()}`);
        }
        else if (typeof chalk[colorOrMethod] === 'function') {
            // If it's a valid chalk method, use it directly
            formattedMessage = chalk[colorOrMethod](`${level.toUpperCase()}`);
        }
        else {
            // Fallback to default formatting
            formattedMessage = `${level.toUpperCase()}`;
        }
        // return `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${formattedMessage}: ${message}`;
        console.log(`${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${formattedMessage}: ${message}`);
        return { level, message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    info(message, data) {
        this.log('info', message, data);
        return { message, data };
    }
    /**
     * Logs a debug message with optional data. Debug messages are suppressed in production environment.
     *
     * @param {string} message - The debug message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    debug(message, data) {
        this.log('debug', message, data);
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    error(message, data) {
        this.log('error', message, data);
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    warn(message, data) {
        this.log('warn', message, data);
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    crit(message, data) {
        this.log('crit', message, data);
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    notice(message, data) {
        this.log('notice', message, data);
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    http(message, data) {
        this.log('http', message, data);
        return { message, data };
    }
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    danger(message, data) {
        this.log('danger', message, data);
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
export function createLogger(args) {
    const logger = new Logger(args);
    return new Proxy(logger, {
        get(target, prop, receiver) {
            if (typeof prop === 'string' && prop in target.customLogLevels) {
                return (message, data) => {
                    const level = prop;
                    // const colorMethod = target.customLogLevels[level] ?? '#FFFFFF'; // Default color
                    target.log(level, message, data); // Ensure log() accepts colorMethod
                };
            }
            // Use explicit parameters instead of ...arguments
            return Reflect.get(target, prop, receiver);
        },
    });
}
