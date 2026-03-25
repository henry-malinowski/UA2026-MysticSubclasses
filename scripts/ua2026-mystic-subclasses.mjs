const MODULE_ID = "UA2026-MysticSubclasses";

Hooks.once("init", () => {
	CONFIG.DND5E.featureTypes.class.subtypes.domainSpellList =
		"Domain Spell List";

	game.settings.register(MODULE_ID, "lastVersion", {
		name: "Last Version",
		hint: "The last version checked against to determine whether to show the changelog.",
		scope: "world",
		config: false,
		type: String,
		default: "1.0.0",
	});

	console.log("ua2026-mystic-subclasses.mjs hooked");
});

Hooks.once("ready", async () => {
	const currentVersion = game.modules.get(MODULE_ID).version;
	const lastVersion = game.settings.get(MODULE_ID, "lastVersion");
	if (foundry.utils.isNewerVersion(currentVersion, lastVersion)) {
		const journal = await fromUuid(
			"Compendium.UA2026-MysticSubclasses.content.JournalEntry.uaChangelog00000",
		);
		const page = journal.pages.contents.at(-1);
		journal.sheet.render(true, { pageId: page.id });
		game.settings.set(MODULE_ID, "lastVersion", currentVersion);
	}
});
