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
			html = html.replace('{{cq-view-css}}', getResourceUri(ctx, panel.webview, 'three-cad-viewer.esm.min.css'));
			html = html.replace('{{cq-view-js}}', getResourceUri(ctx, panel.webview, 'three-cad-viewer.esm.min.js'));

			panel.webview.html = html;
			vscode.commands.executeCommand('cadquery.config');
			vscode.commands.executeCommand('cadquery.update');
		}
	}

	function config() {
		panel.webview.postMessage({
			options: {
				cadWidth: 620,
				height: 540
			}
		});
	}

	function update() {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document_content = editor.document.getText();
			model = JSON.parse(document_content);
        }

		panel.webview.postMessage({
			model: model
		});
	}

	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.render', render));
	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.config', config));
	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.update', update));

	vscode.workspace.onDidSaveTextDocument(() => {
		vscode.commands.executeCommand('cadquery.update');
	});
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
