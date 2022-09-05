# VSCode CadQuery extension

VSCode extension that integrates [CadQuery Server](https://github.com/roipoussiere/cadquery-server) in VSCode.

CadQuery Server is a web server used to render 3d models from CadQuery code loaded dynamically.

![](images/screenshot.png)

## Installation

### Install the IDE

The extension works both on [VSCodium](https://vscodium.com/) or [VSCode](https://code.visualstudio.com/).

### Install the extension

In VSCode, search for *cadquery* in Extensions tab in the sidebar.

The extension is available in:
- [the Open VSX Registry](https://open-vsx.org/extension/roipoussiere/cadquery);
- [the VisualStudio marketplace](https://marketplace.visualstudio.com/items?itemName=roipoussiere.cadquery).

Alternatively, you can manually install the extension in VSCode by downloading the vsix file from one on both registries.

### Install CadQuery Server

Read [installation instructions](https://github.com/roipoussiere/cadquery-server#installation).

## Usage

### 1. Run the CadQuery server

You can configure the server url in the VSCode extension settings (which is `http://127.0.0.1:5000` by default).

    source venv/bin/activate # required if you used a virtual environment
    cq-server

Read [usage instructions](https://github.com/roipoussiere/cadquery-server#usage) for advanced use.

### 2. Activate the extension

Hit `f7` to enable the viewer. Alternatively you can use the VSCode command palette (`Ctrl+Shift+P`) and search for `Open CadQuery viewer`.

The preview should be updated each time your CadQuery Python script is saved.

### 3. Tips and tricks

You should use a language server to activate code completion, such as Pylance. Note that in order to make it work on VSCodium, you must set the `nameLong` value to `Visual Studio Code` in your `product.json` (located at `/usr/share/codium/resources/app/product.json` on Linux).

You can make the UI lighter by enabling VSCode Zen mode by hitting `Ctrl+K` then `Z`.

## About

- contact:
    - ping user `@roipoussiere` on channel `other-gui` in the CadQuery Discord;
    - [Mastodon](https://mastodon.tetaneutral.net/@roipoussiere);
- license: [MIT](./LICENSE);
- source: [Framagit](https://framagit.org/roipoussiere/cadquery-vscode) (Gitlab instance) / [Github](https://github.com/roipoussiere/cadquery-vscode) (mirror);
- issue tracker: [Framagit](https://framagit.org/roipoussiere/cadquery-vscode/-/issues) / [Github](https://github.com/roipoussiere/cadquery-vscode/issues)
