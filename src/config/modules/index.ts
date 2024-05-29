import { Parseable, ValidateProperty } from "parzival";
import DiscordConfig from "./discord";
//$StripStart
import I18nConfig from "./i18n";
import OrizuruConfig from "./orizuru";
import WebFromGitConfig from "./web_from_git";
//$StripEnd

@Parseable()
export default class ModuleConfigs {
	@ValidateProperty({
		type: "object",
		recurse: true,
		className: "DiscordConfig",
	})
	discord!: DiscordConfig;

	//$StripStart
	@ValidateProperty({
		type: "object",
		recurse: true,
		className: "I18nConfig",
	})
	i18n!: I18nConfig;

	@ValidateProperty({
		type: "object",
		recurse: true,
		className: "OrizuruConfig",
	})
	orizuru!: OrizuruConfig;

	@ValidateProperty({
		type: "object",
		recurse: true,
		className: "WebFromGitConfig",
	})
	web_from_git!: WebFromGitConfig;
	//$StripEnd
}