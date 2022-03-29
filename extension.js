const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(ctx) {
	let panel = undefined;

	function render() {
		if (panel) {
			panel.reveal(vscode.ViewColumn.Two);
		} else {
			vscode.window.showInformationMessage('Rendering CadQuery model...');

			panel = vscode.window.createWebviewPanel(
				'cadQuery', 'CadQuery view', vscode.ViewColumn.Two, {
					enableScripts: true,
					localResourceRoots: [ getResource(ctx, '.') ]
				}
			);

			html = fs.readFileSync(getResource(ctx, 'index.html').path).toString();

			html = html.replace('{{cq-view-css}}', getResourceUri(ctx, panel.webview, 'cq-viewer.esm.css'));
			html = html.replace('{{cq-view-js}}', getResourceUri(ctx, panel.webview, 'cq-viewer.esm.js'));
			html = html.replace('{{cq-view-example}}', getResourceUri(ctx, panel.webview, 'hexapod.js'));

			panel.webview.html = html;
		}
	}

	function config() {
		panel.webview.postMessage({
			cadWidth: 400,
			height: 300
		});
	}

	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.render', render));
	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.config', config));
}

function getResource(context, resourcePath) {
	return vscode.Uri.file(path.join(context.extensionPath, 'cq-viewer', resourcePath));
}

function getResourceUri(context, webview, file_name) {
	return webview.asWebviewUri(getResource(context, file_name)).toString();
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
