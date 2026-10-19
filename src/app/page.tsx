import App from '../App';
import { pageMetadata } from '../lib/seo';
import { siteDescription } from '../lib/site';

export const metadata = pageMetadata('Ofixy | Sistema de gestão para oficinas mecânicas', siteDescription, '/');

export default function HomePage() {
  return <App />;
}
