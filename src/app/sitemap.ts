import type { MetadataRoute } from 'next';
import { publicPages, siteUrl } from '../lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/` }, ...publicPages.map(page => ({ url: `${siteUrl}/${page.slug}` }))];
}
