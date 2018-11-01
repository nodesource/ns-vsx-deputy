'use strict'

const { commands } = require('vscode')
const path = require('path')

function activate(context) {
  console.log('"ns-vsx-deputy" is now active!')

  const disposable = commands
    .registerCommand('deputy.hooksPath', function() {
      return path.join(__dirname, 'hooks', 'hooks.js')
  })
  context.subscriptions.push(disposable)
}

function deactivate() {}

module.exports = { activate, deactivate }
