import * as ejs from "ejs";
import Utils from "./utils";
import { marked } from "marked";

export default class HtmlRenderer {
	createHtmlString(fileContent: string): string {
		const htmlFileContent = marked.parse(fileContent);
		const fileTitle = Utils.generateFileName();
		console.log(htmlFileContent);
		const file = ejs.render(Utils.getHtmlTemplate(), {
			title: fileTitle,
			textContent: htmlFileContent,
		});
		console.log(file);
		return file;
	}
}
