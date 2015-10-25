'use strict';
const path = require('path');
const fs = require('fs');
const app = require('app');
const BrowserWindow = require('browser-window');
const shell = require('shell');
const Menu = require('menu');
const appMenu = require('./menu');
const Tray = require('tray');

require('electron-debug')();
require('crash-reporter').start();

let mainWindow;
let appIcon;

function updateBadge(title) {
	if (!app.dock) {
		return;
	}

	const messageCount = (/\(([0-9]+)\)/).exec(title);
	app.dock.setBadge(messageCount ? messageCount[1] : '');

  if (messageCount) {
    appIcon.setImage(path.join(__dirname, 'media', 'media/logo-blue.png'));
    app.dock.bounce('informational');
  } else {
    appIcon.setImage(path.join(__dirname, 'media', 'logo-tray.png'));
  }
}

function createMainWindow() {
	const win = new BrowserWindow({
		'title': app.getName(),
		'show': false,
		'width': 1000,
		'height': 800,
		//'icon': path.join(__dirname, 'media', 'logo-symbol.png'),
		'min-width': 400,
		'min-height': 200,
	//	'title-bar-style': 'hidden-inset',
		'web-preferences': {
			// fails without this because of CommonJS script detection
			'node-integration': false,
			// required for Facebook active ping thingy
			'web-security': false,
			'plugins': true
		}
	});

	win.loadUrl('https://web.whatsapp.com', {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.52 Safari/537.36'
  });
	win.on('closed', app.quit);
	win.on('page-title-updated', (e, title) => updateBadge(title));
  win.on('close', (e) => {
    if (win.forceClose) return;
    if (process.platform == 'darwin') {
      e.preventDefault();
      win.hide();
    }
  });
  return win;
}

function createTray() {
  appIcon = new Tray(path.join(__dirname, 'media', 'logo-tray.png'));
  appIcon.setPressedImage(path.join(__dirname, 'media', 'logo-white.png'));
  appIcon.setContextMenu(appMenu.trayMenu);
}

app.on('ready', () => {
	Menu.setApplicationMenu(appMenu.mainMenu);

	mainWindow = createMainWindow();
  createTray();

	const page = mainWindow.webContents;

	page.on('dom-ready', () => {
		mainWindow.show();
	});

	page.on('new-window', (e, url) => {
		e.preventDefault();
		shell.openExternal(url);
	});

  page.on('did-finish-load', () => {
    mainWindow.setTitle(app.getName());
  });

});

app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('before-quit', () => {
  mainWindow.forceClose = true;
});

app.on('activate-with-no-open-windows', () => {
  mainWindow.show();
});
