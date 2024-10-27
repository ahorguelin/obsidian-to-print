export default class Utils {
	static generateFileName(): string {
		const dateToday: Date = new Date();
		return dateToday
			.toLocaleDateString("fr-BE", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			})
			.replace(/\//g, "-");
	}

	static getHtmlTemplate(): string {
		return `<!DOCTYPE html>
		<html lang="en">

		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title><%= title %></title>
			<style>
				body {
					margin: 0;
					padding: 0;
					font-family: Arial, sans-serif;
				}

				.content {
					padding: 10mm;
				}

				/* Print styles */
				@media print {
					@page {
						size: A4 landscape;
						margin: 0;
					}

					.content {
						columns: 4;
						column-gap: 10mm;
						height: auto;
					}
				}
			</style>
			</head>
			
			<body>
				<div class="content">
					<%- textContent %>
				</div>
			</body>

		</html>`;
	}
}
