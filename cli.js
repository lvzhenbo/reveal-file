#!/usr/bin/env node
import process from 'node:process';
import path from 'node:path';
import revealFile from './index.js';

const files = process.argv.slice(2);

if (files.length === 0) {
	console.error('Usage: reveal-file <file>');
	console.error('');
	console.error('Example:');
	console.error('  reveal-file ~/Documents/Unicorn.pdf');
	process.exit(1);
}

const file = files[0];
const absolutePath = path.resolve(file);

try {
	await revealFile(absolutePath);
} catch (error) {
	console.error(`Failed to reveal ${file}:`, error.message);
	process.exit(1);
}
