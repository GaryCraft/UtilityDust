/* eslint-disable */
import winston from "winston";

function getLogDate() {
	const date = new Date();
	return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
export namespace Log {
	export class Logger {
		private static logger: winston.Logger;
		constructor() {
			if (Logger.logger) return;
			Logger.logger = winston.createLogger({
				level: process.env.NODE_ENV === "development" ? "debug" : "info",
				format: winston.format.json(),
				transports: [
					new winston.transports.Console({
						format: winston.format.simple(),
					}),
					new winston.transports.File({
						filename: `./temp/logs/${getLogDate()}.log`,
						format: winston.format.simple(),
					}),
				],
			});
		}
		static log(source: string = "General", level: LogLevel, message: string, ...args: any[]) {
			this.logger.log(level, `${source} ${message}`, ...args);
		}
		static info(source: string = "General", message: string, ...args: any[]) {
			this.logger.info(`${source} ${message}`, ...args);
		}
		static warn(source: string = "General", message: string, ...args: any[]) {
			this.logger.warn(`${source} ${message}`, ...args);
		}

		static error(source: string, error: Error): void;
		static error(source: string, message: string, ...args: any[]): void;
		static error(source: string = "General", either: string | Error, ...args: any[]) {
			if (typeof either === "string") {
				this.logger.error(`${source} ${either}`, ...args);
			} else {
				this.logger.error(`${source}`, either);
			}
		}

		static debug(object: any): void;
		static debug(message: string, ...args: any[]): void;
		static debug(arg0: string | any, ...args: any[]) {
			if (typeof arg0 === "string") {
				this.logger.debug(arg0, ...args);
			} else {
				this.logger.debug(arg0);
			}
		}
		static silly(message: string, ...args: any[]) {
			this.logger.silly(message, ...args);
		}

	}
	export enum LogLevel {
		INFO = "info",
		WARN = "warn",
		ERROR = "error",
		DEBUG = "debug",
	}

}