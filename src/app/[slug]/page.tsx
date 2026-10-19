import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { DemoLink } from '../../components/DemoLink';
import { JsonLd } from '../../components/JsonLd';
import { featurePages } from '../../lib/features';
import { publicPages, siteUrl } from '../../lib/site';
import { pageMetadata } from '../../lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return publicPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = Object.hasOwn(featurePages, slug) ? featurePages[slug] : undefined;
  if (!page) notFound();
  return pageMetadata(page.title, page.description, `/${slug}`);
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = Object.hasOwn(featurePages, slug) ? featurePages[slug] : undefined;
  if (!page) notFound();
  const label = publicPages.find(item => item.slug === slug)!.label;
  return <main id="conteudo" className="feature-page">
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ofixy', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: label, item: `${siteUrl}/${slug}` },
    ] }} />
    <section className="feature-hero"><div className="container"><nav aria-label="Caminho de navegação" className="breadcrumbs"><ol><li><Link prefetch={false} href="/">Ofixy</Link></li><li aria-current="page">{label}</li></ol></nav><span className="eyebrow">OFIXY · GESTÃO PARA OFICINAS MECÂNICAS</span><h1>{page.h1}</h1><p className="feature-intro">{page.intro}</p><div className="feature-actions"><DemoLink>Solicitar demonstração</DemoLink><a className="text-link" href="/#plataforma">Explorar a prévia do sistema <ArrowRight size={16} aria-hidden="true" /></a></div><p className="feature-contact-note">Conheça os recursos com nossa equipe pelo WhatsApp.</p></div></section>
    <section className="section"><div className="container"><div className="feature-explanation"><h2>Como o Ofixy ajuda sua oficina</h2><p>{page.explanation}</p></div><div className="feature-grid">{page.benefits.map(benefit => <article className="feature-card" key={benefit.title}><span className="feature-icon"><Check size={24} aria-hidden="true" /></span><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}</div></div></section>
    <section className="section resources-section"><div className="container"><div className="feature-explanation"><h2>Na rotina da oficina</h2><p>Veja como utilizar os recursos no dia a dia da equipe.</p></div><ol className="workflow">{page.workflow.map((step, index) => <li key={step.title}><span className="workflow-number" aria-hidden="true">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol><Link prefetch={false} href="/#plataforma" className="text-link">Ver a prévia interativa do Ofixy, com dados fictícios <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
    <section className="section faq-section"><div className="container faq-grid"><div><span className="eyebrow">DÚVIDAS SOBRE {label.toLocaleUpperCase('pt-BR')}</span><h2>Perguntas frequentes</h2><p>Converse com a equipe para conhecer o uso dos recursos na sua oficina.</p><DemoLink>Falar com um especialista</DemoLink></div><div>{page.faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>
    <section className="section"><div className="container"><div className="feature-explanation"><h2>Funcionalidades relacionadas</h2><p>Conheça outras áreas do Ofixy que apoiam a gestão da oficina.</p></div><nav aria-label="Funcionalidades relacionadas" className="related-links">{page.related.map(related => <Link prefetch={false} key={related} href={`/${related}`}>{publicPages.find(item => item.slug === related)!.label}<ArrowRight size={16} aria-hidden="true" /></Link>)}</nav></div></section>
    <section className="closing"><div className="container"><span className="eyebrow">CONHEÇA O OFIXY NA PRÁTICA</span><h2>Veja o sistema com nossa equipe.</h2><p>Apresente sua rotina, tire dúvidas sobre os recursos e consulte valores.</p><DemoLink>Conhecer o Ofixy</DemoLink></div></section>
  </main>;
}
