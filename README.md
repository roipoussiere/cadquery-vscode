# VSCode CadQuery extension

Write and render CadQuery models in VSCode.

![](images/screenshot.png)

## Features

- update preview when saving;
- reasonably fast (ie. a fraction of a second for basic models).

## How it works

The preview based on the [three-cad-viewer](https://github.com/bernhard-42/three-cad-viewer) (the same used in [jupyter-cadquery](https://github.com/bernhard-42/jupyter-cadquery)).

When reloading the view, the VSCode extension sends the current Python script on a CadQuery web server ([cadquery/cadquery-server](https://hub.docker.com/r/cadquery/cadquery-server) on Docker hub), that executes the CadQuery code and returns a low-level threejs object representing the model.

## Installation

### Prerequisite

- [Docker](https://docs.docker.com/get-docker/);
- [VSCodium](https://vscodium.com/) or [VSCode](https://code.visualstudio.com/).

### Installing the extension

In VSCode, search for *cadquery* in Extensions tab in the sidebar.

The extension is available in:
- [the Open VSX Registry](https://open-vsx.org/extension/roipoussiere/cadquery);
- [the VisualStudio marketplace](https://marketplace.visualstudio.com/items?itemName=roipoussiere.cadquery).

Alternatively, you can manually install the extension in VSCode by downloading the vsix file from one on both registries.

## Usage

### 1. Run the CadQuery server

You must run the cadquery server first:

    docker run --rm -d -p 5000:5000 cadquery/cadquery-server

You can configure the server url in the VSCode extension settings (which is `http://127.0.0.1:5000` by default).

### 2. Activate the extension

Hit `Ctrl+Shift+P` to open the VSCode command palette, then search for `Open CadQuery viewer`.

The preview should be updated each time your CadQuery Python script is saved.

### 3. Tips and tricks

You can make the UI lighter by enabling VSCode Zen mode by hitting `Ctrl+K` then `Z`.

## About

- contact: [Mastodon](https://mastodon.tetaneutral.net/@roipoussiere);
- license: [MIT](./LICENSE);
- source: [Framagit](https://framagit.org/roipoussiere/cadquery-vscode) (Gitlab instance) / [Github](https://github.com/roipoussiere/cadquery-vscode) (mirror);
- issue tracker: [Framagit](https://framagit.org/roipoussiere/cadquery-vscode/-/issues) / [Github](https://github.com/roipoussiere/cadquery-vscode/issues)
