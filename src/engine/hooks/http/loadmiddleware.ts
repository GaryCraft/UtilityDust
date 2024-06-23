import { ApplicationContext } from "@src/engine/types/Engine";
import { HTTPMiddleware, HTTPRouteHandler } from "@src/engine/types/Executors";
import { useImporterRecursive } from "@src/engine/utils/Importing";
import { debug, info, warn } from "@src/engine/utils/Logger";
import { getRootPath } from "@src/engine/utils/Runtime";
import { objectSchemaFrom, validateObject } from "parzival";

export default async function (appCtx: ApplicationContext) {
	const validationSchema = objectSchemaFrom(HTTPMiddleware);
	debug("Loading middleware...");
	await useImporterRecursive(`${getRootPath()}/http/middleware`,
		function validator(middlewareFile: any, file, dir): middlewareFile is { default: HTTPMiddleware } {
			if (!middlewareFile?.default) {
				warn(`Middleware ${file} from ${dir} has no default export`);
				return false;
			}
			if (!validateObject(middlewareFile.default, validationSchema)) {
				warn(`Middleware ${file} from ${dir} is invalid`);
				return false;
			}
			return true;
		},
		function loader(middlewareModule, file, dir) {
			const parsedRoute = `${dir.replace(getRootPath() + "/http/middleware", "")}/${file.split(".")[0]}`.replace(/\$/g, ":");
			const midd = middlewareModule.default;
			// If base directory is middleware, then it's a global middleware (it doesn't have more than the file name in its route), remove .ts and .js extensions
			if (parsedRoute.startsWith("/" + file.replace(/\.[tj]s$/, ""))) {
				debug(`Registering middleware ${file} as global middleware`);
				appCtx.http.server.use(midd.middleware);
			}
			else {
				debug(`Registering middleware ${file} at ${parsedRoute}`);
				appCtx.http.server.use(parsedRoute, midd.middleware);
			}
		});
	info("Finished loading middleware");
}