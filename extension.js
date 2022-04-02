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
	const stubs_path = path.join(ctx.extensionPath, 'stubs');
	const viewer_options = {
		theme: 'browser',
		glass: true,
		control: 'trackball'			
	}

	vscode.commands.executeCommand('setContext', 'cadquery.enabled', true);
	vscode.workspace.getConfiguration().update('python.analysis.extraPaths', [ stubs_path ], false);

	function init() {
		if (panel) {
			panel.reveal(vscode.ViewColumn.Two);
		} else {
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
			vscode.commands.executeCommand('cadquery.render');

			panel.webview.onDidReceiveMessage(
				message => {
					if (message.status == 'dom_loaded') {
						render();
					}
				},
				undefined,
				ctx.subscriptions
			);
		}
	}

	function render() {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			get_model(editor.document.getText(),
				(model) => {
					panel.webview.postMessage({
						command: 'render',
						model: model,
						options: viewer_options
					});
				},
				(error_code) => {
					if (error_code == 0) {
						vscode.window.showErrorMessage(`Can not connect to CadQuery server. Is it started?`);
					} else {
						vscode.window.showErrorMessage(`CadQuery server returned response code ${xhr.status}.`);
					}
				}
			);
		}
	}

	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.init', init));
	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.render', render));

	vscode.workspace.onDidSaveTextDocument(() => {
		vscode.commands.executeCommand('cadquery.render');
	});
}

function get_model(cq_script, on_success, on_error) {
	const config = vscode.workspace.getConfiguration('cadquery');
	const cq_server_url = config.get('cadqueryServerUrl');

	var xhr = new XMLHttpRequest();
	xhr.open("POST", cq_server_url, true);
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.send(cq_script);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				on_success(JSON.parse(xhr.responseText));
			} else {
				on_error(xhr.status);
			}
		}
	}
}

function getResourceUri(webview, resouce_path) {
	return webview.asWebviewUri(vscode.Uri.file(resouce_path)).toString();
}

function deactivate() {
	vscode.commands.executeCommand('setContext', 'cadquery.enabled', false);
}

module.exports = {
	activate,
	deactivate
}
