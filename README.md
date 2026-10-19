# Ofixy — site público

Site oficial: https://www.ofixy.com.br/. Next.js 16.4.2, React 19, TypeScript, App Router e Tailwind CSS 4. O conteúdo é gerado em HTML durante o build; não depende de login nem de chamadas ao sistema administrativo.

## Desenvolvimento e verificações

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm build
pnpm typecheck
pnpm test:seo
```

`pnpm preview` é um alias do servidor local Next.js de desenvolvimento. Para validar a publicação estática, sirva o diretório `out` em um servidor com suporte a URLs sem extensão (`/orcamentos` → `/orcamentos.html`) e resposta 404 real para caminhos inexistentes.

## Publicação

O build exporta o site em **`out/`**. `.next/` contém arquivos internos do build/desenvolvimento e não deve ser publicado. O antigo `dist/` do Vite não é mais a saída do projeto.

`vercel.json` configura Next.js, `pnpm build`, saída `out` e URLs sem `.html`. Em outra hospedagem, configure resolução de arquivos `.html` e `404.html`; não use fallback de SPA para `index.html`. Preserve o redirecionamento existente de `ofixy.com.br` para `www.ofixy.com.br` e de HTTP para HTTPS. Não foi feito deploy nesta tarefa.

## Conteúdo e SEO

- `src/lib/site.ts`: domínio, contato comercial existente e lista de páginas públicas.
- `src/lib/features.ts`: textos, benefícios e FAQs das seis páginas estratégicas; descrições baseadas nos recursos já publicados no projeto.
- `src/lib/seo.ts`: metadata por página, canonical, Open Graph e Twitter Cards.
- `src/app/layout.tsx`: identidade da marca em JSON-LD, fontes locais servidas pelo Next e componentes compartilhados.
- `src/app/sitemap.ts` e `src/app/robots.ts`: arquivos gerados automaticamente no build.
- `scripts/check-seo.mjs`: valida o HTML exportado, metadata única, schemas, links, sitemap, FAQ, WhatsApp e exclusão de caminhos privados.

A versão de produção não usa otimizador de imagens em tempo de execução: o logo SVG e o banner PNG da marca já são leves e têm dimensões definidas. Para adicionar fotos ou capturas, prepare arquivos WebP/AVIF e variantes responsivas antes da publicação. Os arquivos em `src/assets` não são publicados automaticamente.

Os crawlers Googlebot, Bingbot e OAI-SearchBot são atendidos pela regra `User-Agent: *`, com acesso ao conteúdo público. As rotas privadas não existem neste site e não entram no sitemap. O robots do domínio público não controla o subdomínio `app.ofixy.com.br`; autenticação e políticas de indexação desse aplicativo devem ser verificadas no projeto responsável.

## Search Console

Após publicar, envie https://www.ofixy.com.br/sitemap.xml e inspecione:

- https://www.ofixy.com.br/
- https://www.ofixy.com.br/sistema-para-oficina-mecanica
- https://www.ofixy.com.br/ordem-de-servico
- https://www.ofixy.com.br/orcamentos
- https://www.ofixy.com.br/controle-de-estoque
- https://www.ofixy.com.br/gestao-financeira
- https://www.ofixy.com.br/agendamentos

Use o teste de URL publicada antes de solicitar indexação. Também é possível enviar o sitemap ao Bing Webmaster Tools. A implementação permite descoberta e leitura; indexação e posicionamento dependem dos mecanismos de busca.

Auditoria, arquivos alterados, verificações e pendências: [docs/seo-audit.md](docs/seo-audit.md).
