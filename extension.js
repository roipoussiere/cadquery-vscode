const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

var sample_model = [
	{
		name: "Box1",
		id: "/Box1",
		parts: [
			{
				name: "Part_0",
				id: "/Box1/Part_0",
				type: "shapes",
				shape: {
					vertices: [ [-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5] ],
					triangles: [ 1, 2, 0, 1, 3, 2, 5, 4, 6, 5, 6, 7, 11, 8, 9, 11, 10, 8, 15, 13, 12, 15, 12, 14, 19, 16, 17, 19, 18, 16, 23, 21, 20, 23, 20, 22],
					normals: [ [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1] ],
					edges: [ [ [-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], ], [ [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], ], [ [-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5], ], [ [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], ], [ [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], ], [ [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], ], [ [0.5, 0.5, -0.5], [0.5, 0.5, 0.5], ], [ [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], ], [ [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], ], [ [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], ], [ [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], ], [ [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5] ]],
				},
				color: "#e8b024",
			}
		],
		loc: null,
	},
	{
		"/Box1/Part_0": [1, 1],
	}
];

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

			panel.webview.html = html;
		}
	}

	function config() {
		panel.webview.postMessage({
			options: {
				cadWidth: 400,
				height: 300
			}
		});
	}

	function update() {
		panel.webview.postMessage({
			model: sample_model
		});
	}

	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.render', render));
	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.config', config));
	ctx.subscriptions.push(vscode.commands.registerCommand('cadquery.update', update));
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
