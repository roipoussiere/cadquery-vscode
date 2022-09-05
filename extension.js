const vscode = require('vscode');
const XMLHttpRequest = require('xhr2');


/**
 * @param {vscode.ExtensionContext} ctx
 */
function activate(ctx) {
	console.log(vscode);

	let panel = undefined;

	vscode.commands.executeCommand('setContext', 'cadquery.enabled', true);
	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.init', init = () => {
		if (panel) {
			panel.reveal(vscode.ViewColumn.Two);
		} else {
			panel = vscode.window.createWebviewPanel(
				'cadQuery', 'CadQuery Server', vscode.ViewColumn.Two, {
					enableScripts: true
				}
			);

			const config = vscode.workspace.getConfiguration('cadquery');
			const cq_server_url = config.get('cadqueryServerUrl');

			var xhr = new XMLHttpRequest();
			xhr.open('GET', `${cq_server_url}/html`, true);
			xhr.setRequestHeader('Content-Type', 'text/html');
			xhr.onload = function() {
				panel.webview.html = this.responseText;
			}
			xhr.send();

			panel.onDidDispose(() => {
				panel = undefined;
				deactivate();
			}, null, ctx.subscriptions);
		}
	}));
}

function deactivate() {
	vscode.commands.executeCommand('setContext', 'cadquery.enabled', false);
}

module.exports = {
	activate,
	deactivate
}
