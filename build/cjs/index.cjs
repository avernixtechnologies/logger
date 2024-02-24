"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const luxon_1 = require("luxon");
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
    log(level, message, data) {
        const dt = luxon_1.DateTime.now();
        if (level !== 'ignore') {
            const colorMethod = this.logLevel[level];
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
    info(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['green']('INFO')}: ${message}`, data ? data : '');
    }
    debug(message, data) {
        const dt = luxon_1.DateTime.now();
        if (this.env === 'production') {
            return;
        }
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['blue']('DEBUG')}: ${message}`, data ? data : '');
    }
    error(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['red']('ERROR')}: ${message}`, data ? data : '');
    }
    warn(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['yellow']('WARN')}: ${message}`, data ? data : '');
    }
    crit(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['magenta']('CRIT')}: ${message}`, data ? data : '');
    }
    notice(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['cyan']('NOTICE')}: ${message}`, data ? data : '');
    }
    http(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['gray']('HTTP')}: ${message}`, data ? data : '');
    }
    danger(message, data) {
        const dt = luxon_1.DateTime.now();
        console.log(`${dt.toLocaleString(luxon_1.DateTime.TIME_24_WITH_SHORT_OFFSET)} | ${this.name ? this.name + ' | ' : ''}${chalk_1.default['redBright']('DANGER')}: ${message}`, data ? data : '');
    }
    ignore(message, data) { }
}
exports.default = Logger;
// export default Logger;
