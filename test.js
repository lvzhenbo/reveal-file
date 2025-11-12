import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import test from 'node:test';
import assert from 'node:assert/strict';
import revealFile from './index.js';

const execFileAsync = promisify(execFile);

// Check if file manager service is available (mainly for Linux CI environments)
const hasFileManager = process.platform === 'linux'
	? await (async () => {
		try {
			await execFileAsync('dbus-send', [
				'--session',
				'--dest=org.freedesktop.DBus',
				'--type=method_call',
				'--print-reply',
				'/org/freedesktop/DBus',
				'org.freedesktop.DBus.ListNames',
			]);
			return true;
		} catch {
			return false;
		}
	})()
	: true;

test('reveal file', {skip: !hasFileManager && 'File manager service not available'}, async () => {
	await assert.doesNotReject(revealFile(fileURLToPath(import.meta.url)));
});

test('reveal file with URL instance', {skip: !hasFileManager && 'File manager service not available'}, async () => {
	await assert.doesNotReject(revealFile(new URL(import.meta.url)));
});

test('throw on invalid type', async () => {
	await assert.rejects(
		async () => revealFile(123),
		{
			name: 'TypeError',
			message: 'Expected a string or URL, got number',
		},
	);
});

test('throw on relative path', async () => {
	await assert.rejects(
		async () => revealFile('./test.js'),
		{
			name: 'TypeError',
			message: 'Path must be absolute',
		},
	);
});
