import type { Metadata } from 'next';
import { siteUrl } from './site';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: 'website', locale: 'pt_BR', siteName: 'Ofixy',
      title, description, url: `${siteUrl}${path}`,
      images: [{ url: '/brand/social.png', width: 1920, height: 600, alt: 'Ofixy — software de gestão para oficinas mecânicas' }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: [{ url: '/brand/social.png', alt: 'Ofixy — software de gestão para oficinas mecânicas' }],
    },
  };
}
