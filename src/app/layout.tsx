import type { Metadata, Viewport } from 'next';
import { Manrope, Nunito_Sans } from 'next/font/google';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { JsonLd } from '../components/JsonLd';
import { siteUrl, siteDescription } from '../lib/site';
import '../index.css';
import '../components/HeroDemo.css';

const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });
const nunito = Nunito_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-nunito' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ofixy | Sistema de gestão para oficinas mecânicas',
  description: siteDescription,
  applicationName: 'Ofixy',
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
};

export const viewport: Viewport = { themeColor: '#0064FF' };

const identity = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Ofixy', url: `${siteUrl}/`, logo: `${siteUrl}/brand/logo-horizontal.svg`, description: siteDescription },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'Ofixy', url: `${siteUrl}/`, inLanguage: 'pt-BR', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': 'SoftwareApplication', '@id': `${siteUrl}/#software`, name: 'Ofixy', url: `${siteUrl}/`, applicationCategory: 'BusinessApplication', applicationSubCategory: 'Software de gestão para oficinas mecânicas', operatingSystem: 'Web', inLanguage: 'pt-BR', description: siteDescription, publisher: { '@id': `${siteUrl}/#organization` }, featureList: ['Gestão de clientes e veículos', 'Orçamentos e ordens de serviço', 'Atendimentos e agendamentos', 'Controle de estoque e compras', 'Vendas e gestão financeira', 'Indicadores e relatórios da oficina'] },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${manrope.variable} ${nunito.variable}`}><body><JsonLd data={identity} /><SiteHeader />{children}<SiteFooter /></body></html>;
}
