import chalk from 'chalk';
import { DateTime } from 'luxon';

interface Log {
    level: LogType;
    message: string;
    data?: object;
}
interface LogSet {
    message: string;
    data?: object;
}

interface Args {
    name?: string;
    env?: string;
}

type LogType =
    | 'info'
    | 'debug'
    | 'error'
    | 'warn'
    | 'crit'
    | 'ignore'
    | 'http'
    | 'notice'
    | 'danger'
    | string;
type ChalkColorMethod = keyof typeof chalk;

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
export default class Logger {
    name?: string;
    env?: string;
    constructor(args: Args) {
        this.name = args.name;
        this.env = args.env;
    }
    logLevel: { [key in LogType]: ChalkColorMethod } = {
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
    log(level: LogType, message: string, data?: object): Log {
        const dt = DateTime.now();
        if (level !== 'ignore') {
            const colorMethod = this.logLevel[level] || 'green';

            const chalkMethod = chalk[colorMethod] as Function;
            if (typeof chalkMethod === 'function') {
                if (level === 'debug' && this.env === 'production') {
                    return { level, message, data };
                }

                console.log(
                    `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalkMethod(`${level.toUpperCase()}`)}: ${message}`,
                    data ? data : '',
                );
            } else {
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
    info(message: string, data: object): LogSet {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['green']('INFO')}: ${message}`,
            data ? data : '',
        );
        return { message, data };
    }

    /**
     * Logs a debug message with optional data. Debug messages are suppressed in production environment.
     *
     * @param {string} message - The debug message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    debug(message: string, data: object): LogSet {
        const dt = DateTime.now();
        if (this.env === 'production') {
            return { message, data };
        }
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['blue']('DEBUG')}: ${message}`,
            data ? data : '',
        );
        return { message, data };
    }

    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    error(message: string, data: object): LogSet {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['red']('ERROR')}: ${message}`,
            data ? data : '',
        );
        return { message, data };
    }

    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    warn(message: string, data: object): LogSet {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['yellow']('WARN')}: ${message}`,
            data ? data : '',
        );
        return { message, data };
    }

    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    crit(message: string, data: object): LogSet {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['magenta']('CRIT')}: ${message}`,
            data ? data : '',
        );
        return { message, data };
    }

    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    notice(message: string, data: object): LogSet {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['cyan']('NOTICE')}: ${message}`,
            data ? data : '',
        );
        return { message, data };
    }

    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    http(message: string, data: object): LogSet {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['gray']('HTTP')}: ${message}`,
            data ? data : '',
        );
        return { message, data };
    }

    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    danger(message: string, data: object): LogSet {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['redBright']('DANGER')}: ${message}`,
            data ? data : '',
        );
        return { message, data };
    }

    /**
     * Logs no information, best use case for empty .then() blocks.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    ignore(message: string, data: object): LogSet {
        return { message, data };
    }
}

// export default Logger;
