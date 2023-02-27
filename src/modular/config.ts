import * as path from "path";
import { APIConfig, AppConfig, DatabaseConfig } from "@src/types/Config";
import { ObjectSchema } from "parzival/lib/types/ObjectSchema";
import { objectSchemaFrom, validateObject } from "parzival";
class Config {
	private static cfgPath: string = path.join(__dirname, "..", "..", "config","index.js");
	private static rawConfig: any;
	private static config: AppConfig;
	private static schema: ObjectSchema;
	constructor() {
		Config.rawConfig = require(Config.cfgPath);
		Config.schema = objectSchemaFrom(AppConfig);
		if(!validateObject(Config.config, Config.schema)) {
			throw new Error("Invalid configuration!");
		}
		Config.config = Config.rawConfig;
	}
	/**
	 * Get a client configuration
	 * @param client:string The client to get the configuration for
	 * @returns The client configuration as T
	 */
	static getClientConfig<T extends keyof AppConfig["clients"]>(client: T): AppConfig["clients"][T] {
		return Config.config.clients[client];
	}
	static getApiConfig(): APIConfig {
		return this.config.api;
	}
	static getDatabaseConfig(): DatabaseConfig {
		return this.config.database;
	}
	static getFullConfig(): AppConfig {
		return this.config;
	}
}

export default Config;