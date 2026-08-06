// Tiny zero-dependency static server — the factory playground app.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
const PORT = process.env.PORT || 3000;

createServer(async (req, res) => {
	const path = normalize(req.url === '/' ? '/index.html' : req.url).replace(/^(\.\.[/\\])+/, '');
	try {
		const body = await readFile(join('public', path));
		res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' });
		res.end(body);
	} catch {
		res.writeHead(404, { 'content-type': 'text/plain' });
		res.end('not found');
	}
}).listen(PORT, () => console.log(`playground listening on :${PORT}`));
