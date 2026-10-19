# Auditoria e implementação SEO/GEO — Ofixy

Data: 19/10/2026. Domínio oficial: https://www.ofixy.com.br/.

## Situação anterior à implementação

| Área | Evidência | Impacto |
| --- | --- | --- |
| Framework | React 19.2.7 + Vite 8.1.x; sem Next.js e sem roteador | Metadata API e páginas estáticas por URL não estavam disponíveis |
| Renderização | `index.html` com `<div id="root"></div>`; todo conteúdo dependia do JavaScript | Crawlers que não executam JS recebiam metadata, mas não o conteúdo da página |
| Metadata | Título, descrição, OG e Twitter básicos; sem canonical, OG URL ou imagem | Identidade do domínio e compartilhamento incompletos |
| Rastreamento público | Home HTTP 200; robots.txt e sitemap.xml retornavam NOT_FOUND na Vercel | Sem sitemap publicado ou orientação explícita aos crawlers |
| Domínio | `https://ofixy.com.br/` retornava 308 para `https://www.ofixy.com.br/` | Redirecionamento correto já existente, preservado |
| Rotas | Só a home; `/ordem-de-servico` retornava 404 | Não havia páginas estratégicas para intenções específicas |
| Headings e semântica | Um H1 genérico; seções com H2/H3, main, header, nav, footer, links, FAQ nativo e skip link | A base semântica já era boa e foi reaproveitada; faltava associar o H1 à categoria |
| Dados estruturados | SoftwareApplication parcial | Sem vínculo explícito entre software, organização, domínio e site |
| Conversão | WhatsApp comercial e formulário que prepara mensagem já existentes | Foram reaproveitados, sem criar cadastro de teste nem outro telefone |
| Performance | Build Vite: JS 385,22 kB (120,34 kB gzip), CSS 43,49 kB (9,92 kB gzip), marca PNG 375,09 kB; Google Fonts via CSS remoto | Logo desproporcional ao tamanho exibido; fonte dependia de conexão externa no navegador |
| Capturas | Duas capturas locais com identificação de oficina; uma contém nome, e-mail e notificação de cliente | Não publicadas. A prévia interativa existente, rotulada com dados fictícios, foi preservada |
| Validação inicial | `pnpm lint` e `pnpm build` aprovados | Linha de base funcional registrada |

## Decisões e resultado

Migração da infraestrutura para **Next.js 16.4.2 / App Router**, mantendo o layout, os componentes visuais, a prévia navegável e o formulário existente. As sete páginas são pré-renderizadas no build. Somente menu móvel, formulário e demonstração usam componentes cliente. Links de conteúdo não pré-carregam automaticamente as seis páginas, evitando tráfego desnecessário no mobile. A demonstração e o código de animação pertencem à home; não são necessários nas páginas de funcionalidades.

A saída utiliza `out/`, padrão de exportação estática do Next.js, separada dos arquivos internos de desenvolvimento em `.next/`. A hospedagem identificada é Vercel e recebeu configuração explícita em `vercel.json`. A configuração é baseada no [suporte oficial à exportação estática](https://nextjs.org/docs/app/guides/static-exports) e na [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).

Foram implementados títulos e descrições específicos, canonical e OG URL por rota, Twitter Cards e imagem de marca. O sitemap deriva da lista única de páginas públicas e não inventa datas de atualização. O robots permite rastreamento público, inclusive por Googlebot, Bingbot e OAI-SearchBot, e bloqueia os caminhos privados convencionais. Rotas inexistentes recebem página 404 com `noindex`.

JSON-LD inclui Organization, SoftwareApplication e WebSite conectados por `@id`, além de BreadcrumbList nas páginas internas. A serialização escapa `<`. Não foram adicionadas avaliações, clientes, preços, promessas de resultado ou perfis sociais sem comprovação. O schema descreve o produto; não há garantia de elegibilidade a resultados enriquecidos do Google.

O conteúdo GEO explica o que é o Ofixy e associa a marca a oficinas mecânicas e ao domínio oficial. Cada página tem introdução específica, benefícios, sequência de uso, FAQ contextual e links relacionados. Os recursos descritos foram limitados aos já declarados no código da landing page. As seis páginas não são cópias da home.

CTAs de demonstração levam ao contato comercial original. O formulário conserva nome, oficina, validação e preparação da mensagem no WhatsApp; com JavaScript desativado, oferece link direto e oculta o formulário. Nenhuma mensagem é enviada automaticamente.

Os assets de marca adicionados em paralelo ao workspace foram preservados e integrados. O cabeçalho usa logo SVG com dimensões definidas; a imagem social utiliza o banner oficial disponível. Fontes Manrope e Nunito Sans são servidas pelo próprio site via `next/font`, com `display: swap`. A prévia respeita redução de movimento e mantém seu conteúdo inicial visível sem depender da animação de entrada.

A migração adiciona o runtime do Next.js: não foi constatada redução do JavaScript total inicial em relação ao Vite. Os ganhos confirmados são HTML estático legível sem JS, fontes hospedadas localmente, logo leve e isolamento da demonstração na home. Core Web Vitals reais dependem de medição após a publicação; não são inferidos do build.

## Arquivos

Criados nesta implementação:

- `next.config.ts`, `postcss.config.mjs`, `vercel.json`.
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/[slug]/page.tsx`, `src/app/not-found.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`.
- `src/lib/site.ts`, `src/lib/seo.ts`, `src/lib/features.ts`.
- `src/components/DemoLink.tsx`, `src/components/JsonLd.tsx`, `src/components/LeadForm.tsx`, `src/components/Logo.tsx`, `src/components/MobileMenu.tsx`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`.
- `scripts/check-seo.mjs`, `docs/seo-audit.md`.

Modificados:

- `src/App.tsx`, `src/components/HeroDemo.tsx`, `src/components/PlatformPreview.tsx`.
- `src/index.css`, `src/components/HeroDemo.css`.
- `package.json`, `pnpm-lock.yaml`, `package-lock.json`, `tsconfig.json`, `eslint.config.js`, `.gitignore`, `README.md`.

Removidos por substituição da infraestrutura Vite:

- `index.html`, `src/main.tsx`, `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`.

Alterações de marca recebidas em paralelo e preservadas: `public/favicon.svg`, `public/brand/logo-horizontal.svg`, `public/brand/mark.svg`, `public/brand/social.png` e `src/assets/new/`. Esses arquivos não foram tratados como capturas do sistema nem usados como prova de clientes.

## Verificações

- Build Next.js: sete URLs públicas, sitemap, robots e página de erro gerados estaticamente.
- Lint e TypeScript sem erros.
- `pnpm test:seo`: HTML das sete páginas, um H1 por rota, títulos e descrições únicos, canonical, OG, Twitter, JSON-LD, FAQs, imagens com dimensões e alt, links internos e âncoras, número comercial original, sitemap exato, restrições de rotas privadas e 404 com noindex.
- Navegador Brave/Chromium por Playwright temporário, fora das dependências do projeto: todas as páginas em 320, 390, 768 e 1440 px, sem overflow horizontal; sem erros de execução; menu móvel e troca de telas da demonstração funcionais.
- Formulário: URL de destino e mensagem personalizada verificadas; requisição ao WhatsApp interceptada e abortada no teste, sem envio.
- JavaScript desativado: leitura de H1, FAQ nativo e CTA validada na home e em páginas internas representativas.
- Inspeção visual das capturas desktop da home e mobile das páginas representativas.
- Dependências atualizadas dentro das versões compatíveis; `pnpm audit --prod` e `npm audit` sem vulnerabilidades conhecidas. Lockfile validado com instalação offline e `--frozen-lockfile`. Nenhum pacote novo de analytics, SEO ou roteamento adicional.
- Requisições locais com User-Agent Googlebot, Bingbot e OAI-SearchBot retornaram HTTP 200 com conteúdo no HTML; caminhos privados/inexistentes retornaram 404 e noindex. A configuração da CDN de produção permanece uma verificação externa.

## Publicação e pendências externas

1. Publicar o resultado em `out/`. O site público consultado na auditoria ainda era a versão anterior; não foi feito deploy nem enviado sitemap nesta tarefa.
2. Verificar no ambiente publicado as sete URLs com resposta 200, `/robots.txt`, `/sitemap.xml`, imagens sociais e páginas inexistentes com 404. Confirmar que configurações anteriores de SPA não reescrevem tudo para a home.
3. Enviar `https://www.ofixy.com.br/sitemap.xml` ao Search Console; inspecionar e solicitar indexação da home e das seis páginas listadas no README. Repetir o envio no Bing Webmaster Tools se houver acesso.
4. Validar JSON-LD no Schema Markup Validator e, quando aplicável, no Rich Results Test após o deploy. Ausência de preço/avaliação pode limitar resultados específicos de software; esses dados não devem ser inventados.
5. Conferir CDN/WAF e logs de produção para Googlebot, Bingbot e OAI-SearchBot. A regra robots permite o acesso, mas não comprova visitas reais nem contorna bloqueios da infraestrutura.
6. No projeto do aplicativo `app.ofixy.com.br`, conferir autenticação e `noindex`/`X-Robots-Tag` nas telas privadas. Robots é por origem e não é controle de acesso. Este repositório não contém o aplicativo nem sua autenticação; não foram modificados.
7. Obter capturas reais autorizadas, sem nomes, e-mails, placas, notificações ou dados de oficinas/clientes identificáveis, antes de publicá-las. Nenhuma das capturas locais foi incluída no site.
8. Medir PageSpeed Insights/Lighthouse mobile e acompanhar Core Web Vitals de campo no Search Console após publicação. Não foi executado teste de campo nem prometida melhoria de ranking, conversão ou pontuação.
9. Confirmar perfis sociais oficiais antes de adicionar `sameAs`. A auditoria não encontrou confirmação suficiente para cadastrar perfis.
