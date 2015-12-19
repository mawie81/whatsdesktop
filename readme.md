# <img src="media/logo.png" width="45" align="left">&nbsp;WhatsDesktop

> Unofficial WhatsApp app

*Heavily inspired and adapted from [Caprine](https://github.com/sindresorhus/caprine) by [Sindre Sorhus](https://github.com/sindresorhus).*

*<strong>Note:</strong> In order to use this app a WhatsApp Web compatible device is required.*

<br>
[![](media/screenshot.png)](https://github.com/mawie81/whatsdesktop/releases/latest)

*Requires OS X 10.8+, Linux or Windows.*

## Install

### OS X

#### [Homebrew Cask](http://caskroom.io)

```
$ brew cask install whatsdesktop
```

#### Manually

[**Download**](https://github.com/mawie81/whatsdesktop/releases/latest), unzip, and move `WhatsDesktop.app` to the `/Applications` directory.

### Linux

[**Download**](https://github.com/mawie81/whatsdesktop/releases/latest) and unzip to some location.

To add a shortcut to the app, create a file in `~/.local/share/applications` called `whatsdesktop.desktop` with the following contents:

```
[Desktop Entry]
Name=WhatsDesktop
Exec=/full/path/to/folder/whatsdesktop
Terminal=false
Type=Application
Icon=/full/path/to/folder/WhatsDesktop/resources/app/media/logo-symbol.png
```

### Windows

[**Download**](https://github.com/mawie81/whatsdesktop/releases/latest) and unzip to some location.

Run WhatsDesktop.exe

## Dev

Built with [Electron](http://electron.atom.io).

###### Commands

- Init: `$ npm install`
- Run: `$ npm start`
- Build OS X: `$ npm run build-osx`
- Build Linux: `$ npm run build-linux`
- Build all: `$ npm run build` *(OS X only)*


## License

MIT © [Marcel Wiehle](http://marcel.wiehle.me)
