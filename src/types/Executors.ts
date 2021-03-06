import { ApplicationCommandOption, CommandInteraction, ContextMenuInteraction, Message } from "discord.js";
import Bot from "../Bot";

interface Command {
	name: string;
	description: string;
	usage: string;
	execute(client:Bot, message:Message, args:string[]): Promise<unknown>;
}
interface Interaction {
	type: "CHAT_INPUT" | "CONTEXT_MENU"| "USER"| "MESSAGE" | "SUB_FUNCTION";
	name: string;
	description: string;
	category: string;
	internal_category: "app" | "guild" | "sub";
	options?: ApplicationCommandOption[];
	execute<T = CommandInteraction>(client: Bot, interaction: T):Promise<unknown>;
	execute<T = ContextMenuInteraction>(client: Bot, interaction: T):Promise<unknown>;
}
interface APIFunction {
	name: string;
	execute(client:Bot, req:Express.Request, res:Express.Response): Promise<unknown>;
}

export { Command, Interaction, APIFunction };