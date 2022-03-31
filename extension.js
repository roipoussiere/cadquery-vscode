const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const XMLHttpRequest = require('xhr2');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(ctx) {
	let panel = undefined;
	const modules_path = path.join(ctx.extensionPath, 'node_modules');
	const three_cad_viewer_path = path.join(modules_path, 'three-cad-viewer', 'dist');
	const static_path = path.join(ctx.extensionPath, 'static');

	function render() {
		if (panel) {
			panel.reveal(vscode.ViewColumn.Two);
		} else {
			vscode.window.showInformationMessage('Rendering CadQuery model...');

			panel = vscode.window.createWebviewPanel(
				'cadQuery', 'CadQuery view', vscode.ViewColumn.Two, {
					enableScripts: true,
					localResourceRoots: [
						vscode.Uri.file(three_cad_viewer_path),
						vscode.Uri.file(static_path)
					]
				}
			);

			const cq_viewer_path = path.join(static_path, 'cq-viewer.html');
			html = fs.readFileSync(vscode.Uri.file(cq_viewer_path).path).toString();

			const css_path = path.join(three_cad_viewer_path, 'three-cad-viewer.esm.min.css');
			html = html.replace('{{cq-view-css}}', getResourceUri(panel.webview, css_path));

			const js_path = path.join(three_cad_viewer_path, 'three-cad-viewer.esm.min.js');
			html = html.replace('{{cq-view-js}}', getResourceUri(panel.webview, js_path));

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
			const cq_server_url = vscode.workspace.getConfiguration('cadquery.cadqueryServerUrl');

			var xhr = new XMLHttpRequest();
			xhr.open("POST", cq_server_url, true);
			xhr.setRequestHeader('Content-Type', 'text/plain');
			xhr.send(document_content);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						panel.webview.postMessage({
							model: JSON.parse(xhr.responseText)
						});
					} else {
						console.log(`Server returned response code ${xhr.status}.`);
					}
				}
			}
		}
	}

	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.render', render));
	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.config', config));
	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.update', update));

	vscode.workspace.onDidSaveTextDocument(() => {
		vscode.commands.executeCommand('cadquery.update');
	});

	const watch_pattern = new vscode.RelativePattern(vscode.Uri.file('/tmp/cadquery-vscode'), '*.json');
	vscode.workspace.createFileSystemWatcher(watch_pattern).onDidChange(uri => {
		vscode.commands.executeCommand('cadquery.update');
	});
}

function getResourceUri(webview, resouce_path) {
	return webview.asWebviewUri(vscode.Uri.file(resouce_path)).toString();
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
