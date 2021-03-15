const vscode = require('vscode');
const openGoogle = require('open-google');
const opn = require('better-opn');

function activate(context) {
  let convertTsInterfaceToMermaid = vscode.commands.registerCommand(
    'convert.TS.Interface.to.Mermaid',
    convertTsInterfaceToMermaidFn
  );
  let showVFTicketPage = vscode.commands.registerCommand(
    'Show.VF.Ticket.Page',
    showVFTicketPageFn
  );

  let googleSearch = vscode.commands.registerCommand(
    'google.Search',
    googleSearchFn
  );

  let decimalToBinary = vscode.commands.registerCommand(
    'decimalToBinary',
    decimalToBinaryFn
  );
  console.log('"re4388 utility Pack" is now active!');
  context.subscriptions.push(convertTsInterfaceToMermaid);
  context.subscriptions.push(showVFTicketPage);
  context.subscriptions.push(googleSearch);
  context.subscriptions.push(decimalToBinary);
}

// export interface ApplicationInfo {
//   version: string | null;
//   buildDate: string | null;
//   licenseLink: string | null;
// }

function convertTsInterfaceToMermaidFn() {
  // const selectedText = getSelectedText();
  // if (!selectedText) {
  //   return;
  // }

  // multi-select => msg is a string[]
  vscode.window
    .showQuickPick(
      [
        '哈哈哈，你是傻逼吗',
        '哈哈哈，你是二逼么',
        '你他妈有病吧',
        '乖，你是妈的智障',
      ],
      {
        canPickMany: true,
        ignoreFocusOut: true,
        matchOnDescription: true,
        matchOnDetail: true,
        placeHolder: '温馨提示，请选择你是哪种类型？',
      }
    )
    .then(function (msg) {
      console.log(msg);
    });

  // 选择本地文件
  // vscode.window
  //   .showOpenDialog({
  //     // 可选对象
  //     canSelectFiles: true, // 是否可选文件
  //     canSelectFolders: false, // 是否可选文件夹
  //     canSelectMany: true, // 是否可以选择多个
  //     defaultUri: vscode.Uri.file('/D:/'), // 默认打开本地路径
  //     openLabel: '按钮文字说明',
  //   })
  //   .then(function (msg) {
  //     console.log(msg.path);
  //   });

  // options bar
  // vscode.window
  //   .showInformationMessage(
  //     'what options you want to choose', // question
  //     'options1',
  //     'options2',
  //     'options3'
  //   )
  //   .then(function (select) {
  //     vscode.window.showInformationMessage(`${select}`);
  //     vscode.window.setStatusBarMessage('今天也要快乐鸭！~', 3000);
  //   });
}

function getSelectedText() {
  const documentText = vscode.window.activeTextEditor.document.getText();

  if (!documentText) {
    return '';
  }

  const activeSelection = vscode.window.activeTextEditor.selection;
  if (activeSelection.isEmpty) {
    return '';
  }
  const selStartoffset = vscode.window.activeTextEditor.document.offsetAt(
    activeSelection.start
  );
  const selEndOffset = vscode.window.activeTextEditor.document.offsetAt(
    activeSelection.end
  );

  let selectedText = documentText.slice(selStartoffset, selEndOffset).trim();
  return selectedText.replace(/\s\s+/g, ' ');
}

/**
 * this extension allow you to key in decimal number and output binary number in showInformationMessage
 */
function decimalToBinaryFn() {
  vscode.window
    .showInputBox({
      password: false,
      ignoreFocusOut: true,
      placeHolder: 'decimal number ?',
      prompt: 'for example, 0 => 0,   2 => 10,   4 => 100, ...',
      validateInput: function (text) {
        const textToNum = Number(text);
        if (typeof textToNum !== 'number') {
          return 'Only allow number input';
        }
      },
    })
    .then(function (msg) {
      vscode.window.showInformationMessage(`${Number(msg).toString(2)}`);
    });
}

/**
 * this extension allow you to key in search string and open chrome google search
 */
function googleSearchFn() {
  vscode.window
    .showInputBox({
      password: false,
      ignoreFocusOut: true,
      placeHolder: 'google what?',
    })
    .then(function (msg) {
      openGoogle(msg);
    });
}

/**
 * this extension allow you to key in search string and open chrome google search
 */
function showVFTicketPageFn() {
  vscode.window
    .showInputBox({
      password: false,
      ignoreFocusOut: true,
      placeHolder: '1512',
      prompt: 'e.g. 1512, 1819..for bioclinica Jira Ticket #',
    })
    .then(function (ticketNumber) {
      opn(
        `https://jira.imgdev.bioclinica.com/secure/QuickSearch.jspa?searchString=${ticketNumber}`
      );
    });
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
