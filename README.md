# Zostaw Venva (WORK IN PROGRESS)

A small VS Code extension that warns you when you edit files inside a virtual environment or any folder you choose to match by path.

## Configuration

This extension provides the following settings (accessible via VS Code settings):

- **`zostaw-venva.warningMessage`** (string, default: `"venv file edited 💀"`)
  - The warning message displayed when you edit a file in a matched folder path.

- **`zostaw-venva.venvPaths`** (array, default: `["venv"]`)
  - An array of path substrings to match against edited file paths. If any substring matches, the warning is triggered. For example, `["venv", "env", ".venv"]` will warn on files in folders containing any of these strings in their path.


