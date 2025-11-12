# reveal-file

> Reveal a file or folder in the system file manager (Finder, Explorer, etc.)

Cross-platform utility to open the file manager and highlight a specific file or folder. Works on macOS, Windows, and Linux.

## Install

```sh
npm install reveal-file
```

## Usage

```js
import revealFile from 'reveal-file';

await revealFile('/Users/sindresorhus/Documents/Unicorn.pdf');
```

## API

### revealFile(filePath)

Reveals a file or folder in the system file manager.

Returns a `Promise` that resolves when the file manager has been opened.

#### filePath

Type: `string | URL`

The absolute path to the file or folder to reveal.

## CLI

```sh
npm install --global reveal-file
```

```console
$ reveal-file

Usage: reveal-file <file> [<file> ...]

Example:
  reveal-file ~/Documents/Unicorn.pdf
```

## Linux support

Supported file managers:
- Nautilus (GNOME)
- Dolphin (KDE)
- Caja (MATE)
- Thunar (XFCE)
- Nemo (Cinnamon)

## Related

- [open](https://github.com/sindresorhus/open) - Open stuff like URLs, files, executables
- [open-editor](https://github.com/sindresorhus/open-editor) - Open files in your editor at a specific line and column
