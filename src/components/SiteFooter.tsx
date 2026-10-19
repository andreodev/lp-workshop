import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { contactUrl, publicPages } from '../lib/site';
import { Logo } from './Logo';
import { DemoLink } from './DemoLink';

export function SiteFooter() {
  return <><footer><div className="container footer-content"><div><Logo /><p>Software de gestão para oficinas mecânicas.<br />Site oficial: <a href="https://www.ofixy.com.br/">www.ofixy.com.br</a></p></div><nav className="footer-links" aria-label="Funcionalidades do Ofixy">{publicPages.map(page => <Link prefetch={false} key={page.slug} href={`/${page.slug}`}>{page.label}</Link>)}<a href={contactUrl} target="_blank" rel="noopener noreferrer">Falar com um especialista <ArrowUpRight size={14} aria-hidden="true" /></a></nav></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Ofixy. Todos os direitos reservados.</span><span>Gestão que acompanha sua oficina.</span></div></footer><div className="mobile-cta"><DemoLink>Conhecer o Ofixy</DemoLink></div></>;
}
