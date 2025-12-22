import process from 'node:process';
import path from 'node:path';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import childProcess, {exec} from 'node:child_process';

const execFile = promisify(childProcess.execFile);
const {platform} = process;

export default async function revealFile(filePath) {
	if (typeof filePath !== 'string' && !(filePath instanceof URL)) {
		throw new TypeError(`Expected a string or URL, got ${typeof filePath}`);
	}

	if (filePath instanceof URL) {
		filePath = fileURLToPath(filePath);
	}

	if (!path.isAbsolute(filePath)) {
		throw new TypeError('Path must be absolute');
	}

	if (platform === 'darwin') {
		await execFile('open', ['--reveal', filePath]);
	} else if (platform === 'win32') {
		// Explorer expects backslashes
		const windowsPath = filePath.replaceAll('/', '\\');
		// Explorer.exe always returns exit code 1 on Windows, even when successful
		// See: https://github.com/microsoft/WSL/issues/6565
		// Using `execFile` may cause errors when opening paths containing certain special characters, whereas `exec` does not.
		exec(`explorer.exe /select,"${windowsPath}"`);
	} else {
		// Linux: Use D-Bus FileManager1 interface
		// Convert to file:// URL as required by the D-Bus interface
		const fileUrl = `file://${filePath}`;
		// Escape single quotes in the file URL for the shell argument
		const escapedFileUrl = fileUrl.replaceAll('\'', String.raw`'\''`);

		await execFile('gdbus', [
			'call',
			'--session',
			'--dest',
			'org.freedesktop.FileManager1',
			'--object-path',
			'/org/freedesktop/FileManager1',
			'--method',
			'org.freedesktop.FileManager1.ShowItems',
			`['${escapedFileUrl}']`,
			'',
		]);
	}
}
