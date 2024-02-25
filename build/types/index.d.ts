import chalk from 'chalk';
/**
 * A lot of the DocBlocks were generated using AI. If you notice anything off, please let us know.
 */
/**
 * ILogger interface defines a standard logging system with various levels of log messages.
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
    message: string;
    data?: object;
}
interface LogSet {
    message: string;
    data?: object;
}
interface Args {
    level: string;
    message: string;
    data: object;
    debugMode: boolean;
    customLogLevels?: {
        [level: string]: ChalkHexMethod;
    };
    name?: string;
}
interface CustomLogLevels {
    [level: string]: string;
}
type LogType = 'info' | 'debug' | 'error' | 'warn' | 'crit' | 'ignore' | 'http' | 'notice' | 'danger' | string;
type ChalkHexMethod = keyof typeof chalk;
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
export declare class Logger implements IAvernixLogger {
    private logLevels;
    name?: string;
    debugMode: boolean;
    data: object;
    customLogLevels: CustomLogLevels;
    constructor(args: Args);
    isValidHexColor(hex: string): boolean;
    getString(level: LogType, message: string): string;
    /**
     * Logs a message at the specified level with optional data. Filters out debug messages in production.
     *
     * @param {LogType} level - The severity level of the log message.
     * @param {string} message - The main log message to output.
     * @param {Object} [data] - Optional data to log alongside the message.
     * @returns {Log} The log object containing the level, message, and optional data.
     */
    log(level: LogType, message: string, data?: object): Log;
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    info(message: string, data: object): LogSet;
    /**
     * Logs a debug message with optional data. Debug messages are suppressed in production environment.
     *
     * @param {string} message - The debug message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    debug(message: string, data: object): LogSet;
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    error(message: string, data: object): LogSet;
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    warn(message: string, data: object): LogSet;
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    crit(message: string, data: object): LogSet;
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    notice(message: string, data: object): LogSet;
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    http(message: string, data: object): LogSet;
    /**
     * Logs an informational message with optional data.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    danger(message: string, data: object): LogSet;
    /**
     * Logs no information, best use case for empty .then() blocks.
     *
     * @param {string} message - The informational message to log.
     * @param {Object} data - Optional data to log alongside the message.
     */
    ignore(message: string, data: object): LogSet;
}
export declare function createLogger(args: Args): Logger;
export {};
