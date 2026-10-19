import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { DemoLink } from './DemoLink';
import { MobileMenu } from './MobileMenu';

export function SiteHeader() {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><header className="header"><div className="container nav"><Logo /><nav className="desktop-nav" aria-label="Navegação principal"><a href="/#plataforma">A plataforma</a><a href="/#recursos">Recursos</a><a href="/#faq">Dúvidas</a></nav><div className="nav-actions"><a href="https://app.ofixy.com.br" className="nav-login" target="_blank" rel="noopener noreferrer">Entrar no sistema<ArrowUpRight size={13} aria-hidden="true" /></a><DemoLink className="nav-cta">Solicitar demonstração</DemoLink></div><MobileMenu /></div></header></>;
}
