import chalk from 'chalk';
import { DateTime } from 'luxon';

/**
 * A lot of the DocBlocks were generated using AI. If you notice anything off, please let us know.
 */

/**
 * IAvernixLogger interface defines a standard logging system with various levels of log messages.
 * It provides methods to log messages at different severity levels, including informational,
 * warning, and error messages, among others.
 */
interface IAvernixLogger {
    /**
     * Logs a message with a custom level.
     * @param level The severity level of the log message.
     * @param message The log message content.
     * @param data Optional additional data related to the log message.
     */
    log(level: string, message: string, data?: object): void;

    /**
     * Logs an informational message.
     * @param message The informational message content.
     * @param data Optional additional data related to the message.
     */
    info(message: string, data?: object): void;

    /**
     * Logs a debug message, typically used to provide detailed information useful in diagnosing problems.
     * Debug messages are often only enabled or visible in development environments.
     * @param message The debug message content.
     * @param data Optional additional data related to the debug information.
     */
    debug(message: string, data?: object): void;

    /**
     * Logs an error message.
     * @param message The error message content.
     * @param data Optional additional data related to the error.
     */
    error(message: string, data?: object): void;

    /**
     * Logs a warning message.
     * @param message The warning message content.
     * @param data Optional additional data related to the warning.
     */
    warn(message: string, data?: object): void;

    /**
     * Logs a critical error message.
     * @param message The critical error message content.
     * @param data Optional additional data related to the critical error.
     */
    crit(message: string, data?: object): void;

    /**
     * Ignores the message. This method might be used to log messages that are considered
     * not important or should be filtered out in certain conditions.
     * @param message The message to ignore.
     * @param data Optional additional data related to the message.
     */
    ignore(message: string, data?: object): void;

    /**
     * Logs an HTTP request or response message.
     * @param message The HTTP message content.
     * @param data Optional additional data related to the HTTP message.
     */
    http(message: string, data?: object): void;

    /**
     * Logs a notice message, typically used for less urgent informational messages.
     * @param message The notice message content.
     * @param data Optional additional data related to the notice.
     */
    notice(message: string, data?: object): void;

    /**
     * Logs a danger message, indicating a severe issue or error that needs immediate attention.
     * @param message The danger message content.
     * @param data Optional additional data related to the danger message.
     */
    danger(message: string, data?: object): void;
}

interface Log {
    level: LogType;
    messageOrData?: string | object;
    dataIfMessage?: any;
}
interface LogSet {
    messageOrData?: string | object;
    dataIfMessage?: any;
}

// interface debugLevels {
//     level?: string;
// }

interface Args {
    debugMode?: boolean;
    customLogLevels?: { [level: string]: ChalkHexMethod };
    name?: string;
    debugLevels?: string[];
    formatFunction?: (args: {
        level: string;
        message?: string;
        date: DateTime;
        name?: string;
    }) => string;
}

interface CustomLogLevels {
    [level: string]: string; // Allow any string as a key and value
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
type ChalkHexMethod = keyof typeof chalk;

/**
 * Interface for log transport mechanisms.
 * Implement this interface to create new transports for logging messages to various destinations like console, file, or external services.
 */
export interface LogTransport {
    /**
     * Logs a message with the specified level and data.
     * @param level The severity level of the log message.
     * @param message The log message content.
     * @param data Optional additional data related to the log message.
     */
    log: (
        level: string,
        message: string | object | undefined,
        data?: object,
    ) => Promise<void> | void;
}

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
export class Logger implements IAvernixLogger {
    private logLevels: { [key in LogType | string]: string };
    name?: string;
    debugMode: boolean;
    debugLevels: string[] = [];
    public customLogLevels: CustomLogLevels = {};
    private transports: LogTransport[] = [];
    private formatFunction?: (args: {
        level: string;
        message?: string;
        date: DateTime;
        name?: string;
    }) => string;

    constructor(args: Args) {
        this.name = args.name;
        this.debugMode = args.debugMode ?? true;
        this.formatFunction = args.formatFunction;
        this.debugLevels = args.debugLevels ?? [];
        // Default log levels
        const defaultLogLevels: { [key in LogType]: string } = {
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
                console.log(
                    chalk
                        .rgb(123, 45, 67)
                        .underline('Invalid hex color: ' + color + ' | Defaulting to'),
                    chalk.hex('#00FF00').underline('#00FF00'),
                    chalk.rgb(123, 45, 67).underline('Please use a valid hex color code.'),
                );
                // throw new Error('Invalid hex color: ' + color);
            }
        });
    }

    /**
     * Adds a new transport to the logger.
     * @param transport An instance of a class that implements the LogTransport interface.
     */
    addTransport(transport: LogTransport) {
        this.transports.push(transport);
    }

    isValidHexColor(hex: string) {
        const regex = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
        return regex.test(hex);
    }

    getString(level: LogType, message?: string): string {
        const dt = DateTime.now();
        let colorOrMethod = this.logLevels[level];
        let formattedLevel: string;

        // Determine color or method for level
        if (this.isValidHexColor(colorOrMethod)) {
            formattedLevel = chalk.hex(colorOrMethod)(`${level.toUpperCase()}`);
        } else if (typeof chalk[colorOrMethod as keyof typeof chalk] === 'function') {
            formattedLevel = (chalk[colorOrMethod as keyof typeof chalk] as any)(
                `${level.toUpperCase()}`,
            );
        } else {
            formattedLevel = `${level.toUpperCase()}`;
        }

        // Use custom format function if provided
        if (this.formatFunction) {
            return this.formatFunction({
                level: formattedLevel,
                message,
                date: dt,
                name: this.name,
            });
        }

        // Fallback to default formatting
        return `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${formattedLevel}:${message ? ' ' + message : ''}`;
    }

    /**
     * Logs a message at the specified level with optional data. Filters out debug messages in production.
     *
     * @param {LogType} level - The severity level of the log message.
     * @param {string} message - The main log message to output.
     * @param {Object} [data] - Optional data to log alongside the message.
     * @returns {Log} The log object containing the level, message, and optional data.
     */
    async log(level: LogType, messageOrData?: string | object, dataIfMessage?: any): Promise<Log> {
        let message = typeof messageOrData === 'string' ? messageOrData : undefined;
        let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;

        if (
            (level === 'debug' && !this.debugMode) ||
            (this.debugLevels.includes(level) && !this.debugMode)
        ) {
            return { level, messageOrData, dataIfMessage };
        }

        console.log(`${this.getString(level, message)}`, data ? data : '');

        for (const transport of this.transports) {
            try {
                await transport.log(level, messageOrData, dataIfMessage);
            } catch (error) {
                console.error('Error in log transport:', error);
            }
        }

        return { level, messageOrData, dataIfMessage };
    }

    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    info(messageOrData?: string | object, dataIfMessage?: any): LogSet {
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
    debug(messageOrData?: string | object, dataIfMessage?: any): LogSet {
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
    error(messageOrData?: string | object, dataIfMessage?: any): LogSet {
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
    warn(messageOrData?: string | object, dataIfMessage?: any): LogSet {
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
    crit(messageOrData?: string | object, dataIfMessage?: any): LogSet {
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
    notice(messageOrData?: string | object, dataIfMessage?: any): LogSet {
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
    http(messageOrData?: string | object, dataIfMessage?: any): LogSet {
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
    danger(messageOrData?: string | object, dataIfMessage?: any): LogSet {
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
    ignore(messageOrData?: string | object, dataIfMessage?: any) {}
}

export function createLogger(args: Args) {
    const logger = new Logger(args);
    return new Proxy(logger, {
        get(target, prop, receiver) {
            if (typeof prop === 'string' && prop in target.customLogLevels) {
                return (messageOrData?: string | object, dataIfMessage?: object) => {
                    let message = typeof messageOrData === 'string' ? messageOrData : undefined;
                    let data = typeof messageOrData === 'object' ? messageOrData : dataIfMessage;

                    target.log(prop, message, data);
                };
            }
            return Reflect.get(target, prop, receiver);
        },
    });
}
