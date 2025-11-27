import * as vscode from "vscode";

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
            const fileName: string = event.document.fileName;
            if (
                event.document === vscode.window.activeTextEditor?.document &&
                event.contentChanges.length > 0 &&
                substrings.some(s => fileName.includes(s))
            ) {
                vscode.window.showWarningMessage(warningMessage);
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
