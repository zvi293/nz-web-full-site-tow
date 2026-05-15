/* Static Site Generation step.
   Runs after `vite build` (client) and `vite build --ssr` (server bundle).
   Renders every route in ROUTES to a fully-formed static HTML file so
   search engines receive real, crawlable content per URL — not an
   empty <div id="root"> SPA shell. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(rootDir, 'dist');
const serverDir = path.join(rootDir, 'dist-server');
const serverEntry = path.join(serverDir, 'entry-server.js');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found — run `vite build` first.');
  process.exit(1);
}
if (!fs.existsSync(serverEntry)) {
  console.error('[prerender] dist-server/entry-server.js not found — run the SSR build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');
const { render, ROUTES } = await import(pathToFileURL(serverEntry).href);

let generated = 0;
for (const route of ROUTES) {
  const { html, head } = render(route.path);

  let page = template;
  page = page.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  );
  page = page.replace('<!--app-head-->', head);
  page = page.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  const outDir = route.path === '/' ? distDir : path.join(distDir, route.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), page, 'utf-8');

  generated += 1;
  const rel = path.relative(rootDir, path.join(outDir, 'index.html'));
  console.log(`[prerender] ${route.path}  ->  ${rel}`);
}

/* The SSR bundle is a build artifact only — it is never deployed. */
fs.rmSync(serverDir, { recursive: true, force: true });

console.log(`[prerender] done — ${generated} static pages generated.`);
