import chalk from 'chalk';
interface Log {
    level: LogType;
    message: string;
    data?: object;
}
interface Args {
    name?: string;
    env?: string;
}
type LogType = 'info' | 'debug' | 'error' | 'warn' | 'crit' | 'ignore' | 'http' | 'notice' | 'danger';
type ChalkColorMethod = keyof typeof chalk;
export default class Logger {
    name?: string;
    env?: string;
    constructor(args: Args);
    logLevel: {
        [key in LogType]: ChalkColorMethod;
    };
    log(level: LogType, message: string, data?: object): Log;
    info(message: string, data: object): void;
    debug(message: string, data: object): void;
    error(message: string, data: object): void;
    warn(message: string, data: object): void;
    crit(message: string, data: object): void;
    notice(message: string, data: object): void;
    http(message: string, data: object): void;
    danger(message: string, data: object): void;
    ignore(message: string, data: object): void;
}
export {};
