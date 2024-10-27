import { App, Plugin, PluginSettingTab, Setting, TFile } from "obsidian";
import Utils from "./utils";
import HtmlRenderer from "./html-renderer";
import * as path from "path";

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default",
};

export default class ExportToHtml extends Plugin {
	settings: MyPluginSettings;
	htmlRenderer: HtmlRenderer = new HtmlRenderer();
	EXPORT_FOLDER = "exports";

	async onload() {
		await this.loadSettings();
		this.addCommand({
			id: "Export notes to HTML",
			name: "Export notes to HTML",
			callback: () => {
				this.exportToHtml();
			},
		});
		this.addSettingTab(new SettingsTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async exportToHtml(): Promise<void> {
		const exportPath = path.join(
			this.EXPORT_FOLDER,
			`${Utils.generateFileName()}.html`
		);
		const fileToRead: TFile | null = this.app.workspace.getActiveFile();

		if (fileToRead) {
			const fileContent: string = await this.app.vault.read(fileToRead);
			this.app.vault.create(
				exportPath,
				this.htmlRenderer.createHtmlString(fileContent)
			);
		}
	}
}

class SettingsTab extends PluginSettingTab {
	plugin: ExportToHtml;

	constructor(app: App, plugin: ExportToHtml) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
