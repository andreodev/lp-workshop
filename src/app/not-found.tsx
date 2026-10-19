import Link from 'next/link';

export const metadata = { title: 'Página não encontrada | Ofixy', robots: { index: false, follow: false } };

export default function NotFound() {
  return <main id="conteudo" className="container section"><h1>Página não encontrada</h1><p>Esta página não está disponível. Conheça os recursos do Ofixy no site oficial.</p><Link className="text-link" href="/">Voltar para o início</Link></main>;
}
