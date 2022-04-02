# VSCode CadQuery extension

Write and render CadQuery models in VSCode.

![](images/screenshot.png)

## Features

- update preview when saving;
- reasonably fast (ie. a fraction of a second for basic models);
- reasonably easy to install (the CadQuery server can be installed via docker);
- type checking and code completion.

![](images/pylance.png)

## How it works

When reloading the view, the VSCode extension sends the current Python script on a CadQuery server, that executes its and returns a low-level threejs object representing the model. Since the server already loaded the CadQuery module at start, the response time is usually acceptable.

The viewer is based on the [three-cad-viewer](https://github.com/bernhard-42/three-cad-viewer) (the same used in [jupyter-cadquery](https://github.com/bernhard-42/jupyter-cadquery)) and display the object returned by the server.

The type checking and code completion is made using CadQuery stubs bundled in the extension, generated with MyPy.

## Installation

### Install the IDE

The extension works both on [VSCodium](https://vscodium.com/) or [VSCode](https://code.visualstudio.com/).

### Install the extension

In VSCode, search for *cadquery* in Extensions tab in the sidebar.

The extension is available in:
- [the Open VSX Registry](https://open-vsx.org/extension/roipoussiere/cadquery);
- [the VisualStudio marketplace](https://marketplace.visualstudio.com/items?itemName=roipoussiere.cadquery).

Alternatively, you can manually install the extension in VSCode by downloading the vsix file from one on both registries.

### Install the CadQuery server

#### Using docker

This is the recommended way if you don't have CadQuery installed on your system.

You must install [Docker](https://docs.docker.com/get-docker/) first, then dowload the image ([cadquery/cadquery-server](https://hub.docker.com/r/cadquery/cadquery-server) on Docker hub):

    docker pull cadquery/cadquery-server

#### Using pip

If you already installed CadQuery, you can use pip instead:

    pip install cadquery-server

## Usage

### 1. Run the CadQuery server

You can configure the server url in the VSCode extension settings (which is `http://127.0.0.1:5000` by default).

#### If you used Docker

    docker run --rm -d -p 5000:5000 cadquery/cadquery-server

#### If you used pip

    cq-server

### 2. Activate the extension

Hit `Alt+V` to enable the viewer. Alternatively you can use the VSCode command palette (`Ctrl+Shift+P`) and search for `Open CadQuery viewer`.

The preview should be updated each time your CadQuery Python script is saved.

### 3. Tips and tricks

You can make the UI lighter by enabling VSCode Zen mode by hitting `Ctrl+K` then `Z`.

You should use a language server to activate code completion, such as Pylance. Note that in order to make it work on VSCodium, you must set the `nameLong` value to `Visual Studio Code` in your `product.json` (located at `/usr/share/codium/resources/app/product.json` on Linux).

## About

- contact: [Mastodon](https://mastodon.tetaneutral.net/@roipoussiere);
- license: [MIT](./LICENSE);
- source: [Framagit](https://framagit.org/roipoussiere/cadquery-vscode) (Gitlab instance) / [Github](https://github.com/roipoussiere/cadquery-vscode) (mirror);
- issue tracker: [Framagit](https://framagit.org/roipoussiere/cadquery-vscode/-/issues) / [Github](https://github.com/roipoussiere/cadquery-vscode/issues)
