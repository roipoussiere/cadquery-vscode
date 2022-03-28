const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('cadquery.render', function () {
		vscode.window.showInformationMessage('Rendering CadQuery model...');

		const panel = vscode.window.createWebviewPanel(
			'cadQuery', 'CadQuery view', vscode.ViewColumn.One, {
				enableScripts: true,
				localResourceRoots: [ vscode.Uri.file(path.join(context.extensionPath, 'cq-view')) ]
			}
		);

		const index_path = path.join(context.extensionPath, 'cq-view', 'index.html');
		fs.readFile(index_path, 'utf-8', (err, data) => {
			if(err) {
				console.error(err)
			}
			panel.webview.html = data;
		});
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
