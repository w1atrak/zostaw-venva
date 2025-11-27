import * as vscode from "vscode";

let debounceTimer: NodeJS.Timeout | undefined;
let substrings: string[];
let warningMessage: string;

function loadConfig() {
    substrings = vscode.workspace
        .getConfiguration("zostaw-venva")
        .get("venvPaths", []);
    warningMessage = vscode.workspace
        .getConfiguration("zostaw-venva")
        .get("warningMessage", "💀");
}

export function activate(context: vscode.ExtensionContext) {
    loadConfig();

    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => {
            if (
                event.document === vscode.window.activeTextEditor?.document &&
                event.contentChanges.length > 0
            ) {
                if (debounceTimer) {
                    clearTimeout(debounceTimer);
                }

                debounceTimer = setTimeout(() => {
                    const fileName: string =
                        event.document.fileName.toLowerCase();

                    if (substrings.some(s => fileName.includes(s))) {
                        vscode.window.showWarningMessage(warningMessage);
                    }
                }, 1000);
            }
        })
    );

    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration("zostaw-venva")) {
                loadConfig();
            }
        })
    );
}

export function deactivate() {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
}
