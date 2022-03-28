const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('cadquery.render', function () {
		vscode.window.showInformationMessage('Rendering CadQuery model...');

		const panel = vscode.window.createWebviewPanel(
			'cadQuery',
			'CadQuery view',
			vscode.ViewColumn.One,
			{}
		);
		panel.webview.html = getWebviewContent();
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CadQuery view</title>
  </head>
  <body>
    <h1>CadQuery view</h1>
  </body>
  </html>`;
}

module.exports = {
	activate,
	deactivate
}
