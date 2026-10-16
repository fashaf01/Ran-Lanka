// Turns dist-artifact/index.html into an artifact page: the claude.ai host adds its own
// <!doctype>, <html>, <head> and <body>, so the page ships as head contents + body contents.
import { readFileSync, writeFileSync } from 'node:fs';

const src = readFileSync('dist-artifact/index.html', 'utf8');
const head = src.match(/<head[^>]*>([\s\S]*?)<\/head>/i)[1]
  .replace(/<meta charset[^>]*>\s*/i, '')
  .replace(/<meta name="viewport"[^>]*>\s*/i, '')
  .replace(/<title>[\s\S]*?<\/title>/i, '<title>Ranlanka Royal</title>');
const body = src.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1];
writeFileSync('dist-artifact/artifact.html', `${head.trim()}\n${body.trim()}\n`);
console.log('dist-artifact/artifact.html written');
