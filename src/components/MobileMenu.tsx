'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { contactUrl } from '../lib/site';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-navigation"><button className="menu-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>{open && <nav id="mobile-menu" className="mobile-menu" aria-label="Navegação móvel" onClick={() => setOpen(false)}><a href="/#plataforma">A plataforma</a><a href="/#recursos">Recursos</a><a href="/sistema-para-oficina-mecanica">Sistema para oficina mecânica</a><a href="/#faq">Dúvidas</a><a href={contactUrl} target="_blank" rel="noopener noreferrer">Solicitar demonstração</a></nav>}</div>;
}
