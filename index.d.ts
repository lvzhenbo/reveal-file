/**
Reveal a file or folder in the system file manager.

@param filePath - The absolute path to the file or folder to reveal.
@returns A promise that resolves when the file manager has been opened.

@example
```
import revealFile from 'reveal-file';

await revealFile('/Users/sindresorhus/Documents/Unicorn.pdf');
```
*/
export default function revealFile(filePath: string | URL): Promise<void>;
