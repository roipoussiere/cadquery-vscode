const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(ctx) {
	let disposable = vscode.commands.registerCommand('cadquery.render', function () {
		vscode.window.showInformationMessage('Rendering CadQuery model...');

		const panel = vscode.window.createWebviewPanel(
			'cadQuery', 'CadQuery view', vscode.ViewColumn.One, {
				enableScripts: true,
				localResourceRoots: [ getResourcePath(ctx, '.') ]
			}
		);

		html = fs.readFileSync(getResourcePath(ctx, 'index.html').path).toString();

		const cssPath = getResourcePath(ctx, 'cq-viewer.esm.css');
		html = html.replace('{{cq-view-css}}', panel.webview.asWebviewUri(cssPath).toString());

		const jsPath = getResourcePath(ctx, 'cq-viewer.esm.js');
		html = html.replace('{{cq-view-js}}', panel.webview.asWebviewUri(jsPath).toString());

		const examplePath = getResourcePath(ctx, 'hexapod.js');
		html = html.replace('{{cq-view-example}}', panel.webview.asWebviewUri(examplePath).toString());

		panel.webview.html = html;
	});

	ctx.subscriptions.push(disposable);
}

function getResourcePath(context, resourcePath) {
	return vscode.Uri.file(path.join(context.extensionPath, 'cq-viewer', resourcePath));
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
