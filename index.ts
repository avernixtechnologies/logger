import chalk from 'chalk';
import { DateTime } from 'luxon';

interface Log {
    level: LogType;
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
    | 'danger';
type ChalkColorMethod = keyof typeof chalk;

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

    log(level: LogType, message: string, data?: object): Log {
        const dt = DateTime.now();
        if (level !== 'ignore') {
            const colorMethod = this.logLevel[level];

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

    info(message: string, data: object) {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['green']('INFO')}: ${message}`,
            data ? data : '',
        );
    }
    debug(message: string, data: object) {
        const dt = DateTime.now();
        if (this.env === 'production') {
            return;
        }
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['blue']('DEBUG')}: ${message}`,
            data ? data : '',
        );
    }
    error(message: string, data: object) {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['red']('ERROR')}: ${message}`,
            data ? data : '',
        );
    }
    warn(message: string, data: object) {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['yellow']('WARN')}: ${message}`,
            data ? data : '',
        );
    }
    crit(message: string, data: object) {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['magenta']('CRIT')}: ${message}`,
            data ? data : '',
        );
    }
    notice(message: string, data: object) {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['cyan']('NOTICE')}: ${message}`,
            data ? data : '',
        );
    }
    http(message: string, data: object) {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['gray']('HTTP')}: ${message}`,
            data ? data : '',
        );
    }
    danger(message: string, data: object) {
        const dt = DateTime.now();
        console.log(
            `${dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk['redBright']('DANGER')}: ${message}`,
            data ? data : '',
        );
    }

    ignore(message: string, data: object) {}
}

// export default Logger;
