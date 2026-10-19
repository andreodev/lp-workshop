'use client';

import { ArrowRight } from 'lucide-react';
import type { FormEvent } from 'react';
import { contactUrl, whatsapp } from '../lib/site';

export function LeadForm() {
  function prepareContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const workshop = String(data.get('workshop') ?? '').trim();
    if (!name || !workshop) return;
    const message = `Olá! Sou ${name}, da oficina ${workshop}. Quero conhecer o Ofixy e solicitar uma demonstração.`;
    window.location.assign(`${whatsapp}?text=${encodeURIComponent(message)}`);
  }
  return <><form className="lead-form" onSubmit={prepareContact}><label htmlFor="lead-name">Seu nome</label><input id="lead-name" name="name" autoComplete="name" placeholder="Como podemos chamar você?" maxLength={80} required pattern=".*\S.*" /><label htmlFor="lead-workshop">Nome da oficina</label><input id="lead-workshop" name="workshop" autoComplete="organization" placeholder="Qual é o nome da sua oficina?" maxLength={120} required pattern=".*\S.*" /><button type="submit" className="button">Solicitar demonstração pelo WhatsApp <ArrowRight size={18} aria-hidden="true" /></button><p className="form-notice">Ao continuar, o WhatsApp será aberto com sua mensagem pronta. Envie para solicitar a demonstração.</p></form><noscript><style>{`.lead-form { display: none; }`}</style><p><a className="text-link" href={contactUrl}>Solicitar demonstração diretamente pelo WhatsApp</a></p></noscript></>;
}
