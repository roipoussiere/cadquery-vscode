const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// console.log('cadquery extension actived');

	// commands are defined in package.json
	let disposable = vscode.commands.registerCommand('cadquery.render', function () {
		vscode.window.showInformationMessage('Rendering CadQuery model...');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
