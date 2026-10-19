import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const origin = 'https://www.ofixy.com.br';
const slugs = ['', 'sistema-para-oficina-mecanica', 'ordem-de-servico', 'orcamentos', 'controle-de-estoque', 'gestao-financeira', 'agendamentos'];
const titles = new Set();
const descriptions = new Set();
const headings = new Set();
const documents = new Map(slugs.map(slug => [slug, readFileSync(join('out', slug ? `${slug}.html` : 'index.html'), 'utf8')]));
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const meta = (html, name) => [...html.matchAll(/<meta\b[^>]*>/g)].map(match => match[0]).find(tag => attribute(tag, 'name') === name || attribute(tag, 'property') === name);

const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
assert.equal(vercel.framework, 'nextjs');
const buildDirectory = vercel.outputDirectory ?? '.next';
assert(existsSync(join(buildDirectory, 'routes-manifest.json')), 'Vercel must read Next.js manifests, not the static export directory');
const exported = JSON.parse(readFileSync(join(buildDirectory, 'export-detail.json'), 'utf8'));
assert.equal(exported.success, true);
assert(existsSync(join(exported.outDirectory, 'index.html')), 'Vercel must be able to locate the static export');
console.log('OK Vercel: Next.js manifests and static export');

for (const [slug, html] of documents) {
  const path = slug ? `/${slug}` : '/';
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = attribute(meta(html, 'description') ?? '', 'content');
  const h1 = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)];
  assert(title && !titles.has(title), `${path}: missing or duplicate title`);
  assert(description && !descriptions.has(description), `${path}: missing or duplicate description`);
  assert.equal(h1.length, 1, `${path}: expected one H1`);
  assert(!headings.has(h1[0][1]), `${path}: duplicate H1`);
  titles.add(title); descriptions.add(description); headings.add(h1[0][1]);
  assert.match(html, /<html[^>]*lang="pt-BR"/);
  assert.equal([...html.matchAll(/<main\b/g)].length, 1);
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)].map(match => match[0]).filter(tag => attribute(tag, 'rel') === 'canonical');
  assert.equal(canonicals.length, 1, `${path}: expected one canonical`);
  assert.equal(new URL(attribute(canonicals[0], 'href')).href, `${origin}${path}`);
  assert.equal(new URL(attribute(meta(html, 'og:url'), 'content')).href, `${origin}${path}`);
  assert.equal(attribute(meta(html, 'og:title'), 'content'), title);
  assert.equal(attribute(meta(html, 'twitter:card'), 'content'), 'summary_large_image');
  assert(!/noindex/.test(attribute(meta(html, 'robots') ?? '', 'content') ?? ''), `${path}: noindex`);
  assert.match(html, /<details[ >]/, `${path}: FAQ missing from static HTML`);
  assert.match(html, /href="https:\/\/wa\.me\/5511925592834\?text=/, `${path}: existing WhatsApp missing`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  const schemas = graphs.flatMap(graph => graph['@graph'] ?? [graph]);
  for (const type of ['Organization', 'WebSite', 'SoftwareApplication', ...(slug ? ['BreadcrumbList'] : [])]) {
    assert(schemas.some(schema => schema['@type'] === type), `${path}: missing ${type}`);
  }
  assert(!schemas.some(schema => schema.aggregateRating || schema.review), `${path}: unverified ratings`);
  for (const tag of [...html.matchAll(/<(?:a|img)\b[^>]*>/g)].map(match => match[0])) {
    if (tag.startsWith('<img')) {
      assert(attribute(tag, 'alt') !== undefined, `${path}: missing image alt`);
      assert(attribute(tag, 'width') && attribute(tag, 'height'), `${path}: missing image dimensions`);
    }
    const href = attribute(tag, 'href');
    if (!href || !href.startsWith('/') || href.startsWith('//')) continue;
    const [target, fragment] = href.split('#');
    const targetSlug = target.replace(/^\//, '').replace(/\/$/, '');
    assert(documents.has(targetSlug), `${path}: broken internal URL ${href}`);
    if (fragment) assert(documents.get(targetSlug).includes(`id="${fragment}"`), `${path}: broken fragment ${href}`);
  }
  const image = attribute(meta(html, 'og:image'), 'content');
  assert(image?.startsWith(origin));
  assert(existsSync(join('out', new URL(image).pathname)), `${path}: missing social image`);
  console.log(`OK ${path}: static content, metadata, JSON-LD, FAQ, links and CTA`);
}

const sitemap = readFileSync('out/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(urls.sort(), slugs.map(slug => `${origin}/${slug}`).sort(), 'sitemap must include exactly the seven public pages');
const robots = readFileSync('out/robots.txt', 'utf8');
assert.match(robots, /User-Agent: \*/);
assert.match(robots, /Allow: \/\n/);
assert.match(robots, /Sitemap: https:\/\/www\.ofixy\.com\.br\/sitemap\.xml/);
for (const path of ['admin', 'dashboard', 'login', 'auth', 'api']) {
  assert(robots.includes(`Disallow: /${path}`));
  assert(!existsSync(`out/${path}.html`), `${path}: private page must not be exported`);
}
assert.match(readFileSync('out/404.html', 'utf8'), /name="robots" content="noindex/);
console.log('OK sitemap, wildcard access for Googlebot/Bingbot/OAI-SearchBot, private paths and 404 noindex');
