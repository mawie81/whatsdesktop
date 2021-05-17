'use strict';
const {app, BrowserWindow, Menu, shell} = require('electron');
const os = require('os');
const configStore = require('./config');

const appName = app.getName();

function restoreWindow() {
  const win = BrowserWindow.getAllWindows()[0];
  win.show();
  return win;
}

function sendAction(action) {
  const win = BrowserWindow.getAllWindows()[0];
  win.webContents.send(action);
}

const trayTpl = [
  {
    label: 'Show',
    click() {
      restoreWindow();
    }
  },
  {
    label: 'Enable dark mode',
    type: 'checkbox',
    checked: configStore.get('darkMode'),
    click(item) {
      configStore.set('darkMode', item.checked);
      sendAction('toggleDarkMode');
    }
  },
  {
    type: 'separator'
  },
  {
    label: `Quit ${appName}`,
    click() {
      app.exit(0);
    }
  }
];

const viewTpl = {
  label: 'View',
  submenu: [
    {
      label: 'Reset Text Size',
      accelerator: 'CmdOrCtrl+0',
      click() {
        configStore.set('zoomLevel', 0);
        sendAction('updateZoomLevel');
      }
    },
    {
      label: 'Increase Text Size',
      accelerator: 'CmdOrCtrl+Plus',
      click() {
        configStore.set('zoomLevel', configStore.get('zoomLevel') + 1);
        sendAction('updateZoomLevel');
      }
    },
    {
      label: 'Decrease Text Size',
      accelerator: 'CmdOrCtrl+-',
      click() {
        configStore.set('zoomLevel', configStore.get('zoomLevel') - 1);
        sendAction('updateZoomLevel');
      }
    }
  ]
};

const darwinTpl = [
  {
    label: appName,
    submenu: [
      {
        label: `About ${appName}`,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: `Hide ${appName}`,
        accelerator: 'Cmd+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Cmd+Shift+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: `Quit ${appName}`,
        accelerator: 'Cmd+Q',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }
    ]
  },
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Enable dark mode',
        type: 'checkbox',
        checked: configStore.get('darkMode'),
        click(item) {
          configStore.set('darkMode', item.checked);
          sendAction('toggleDarkMode');
        }
      }
    ]
  },
  viewTpl,
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      },
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Cmd+F',
        click() {
          const win = BrowserWindow.getAllWindows()[0];
          win.setFullScreen(!win.isFullScreen());
        }
      }
    ]
  },
  {
    label: 'Help',
    role: 'help'
  }
];

const linuxTpl = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }
    ]
  },
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Enable dark mode',
        type: 'checkbox',
        checked: configStore.get('darkMode'),
        click(item) {
          configStore.set('darkMode', item.checked);
          sendAction('toggleDarkMode');
        }
      }
    ]
  },
  viewTpl,
  {
    label: 'Help',
    role: 'help'
  }
];

const winTpl = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }
    ]
  },
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Minimize to tray',
        type: 'checkbox',
        checked: configStore.get('minimizeToTray'),
        click(item) {
          configStore.set('minimizeToTray', item.checked);
        }
      },
      {
        label: 'Close to tray',
        type: 'checkbox',
        checked: configStore.get('closeToTray'),
        click(item) {
          configStore.set('closeToTray', item.checked);
        }
      },
      {
        label: 'Enable dark mode',
        type: 'checkbox',
        checked: configStore.get('darkMode'),
        click(item) {
          configStore.set('darkMode', item.checked);
          sendAction('toggleDarkMode');
        }
      }
    ]
  },
  viewTpl,
  {
    label: 'Help',
    role: 'help'
  }
];

const helpSubmenu = [
  {
    label: `${appName} Website...`,
    click() {
      shell.openExternal('https://github.com/sergiomb2/whatsdesktop');
    }
  },
  {
    label: 'Report an Issue...',
    click() {
      const body = `
**Please succinctly describe your issue and steps to reproduce it.**

-

${app.getName()} ${app.getVersion()}
${process.platform} ${process.arch} ${os.release()}`;

      shell.openExternal(`https://github.com/sergiomb2/whatsdesktop/issues/new?body=${encodeURIComponent(body)}`);
    }
  }
];

let tpl;
if (process.platform === 'darwin') {
  tpl = darwinTpl;
} else if (process.platform === 'win32') {
  tpl = winTpl;
} else {
  tpl = linuxTpl;
}

tpl[tpl.length - 1].submenu = helpSubmenu;

module.exports = {
  mainMenu: Menu.buildFromTemplate(tpl),
  trayMenu: Menu.buildFromTemplate(trayTpl)
};
