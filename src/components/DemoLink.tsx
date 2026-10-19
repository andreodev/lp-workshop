import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { contactUrl } from '../lib/site';

export function DemoLink({ children = 'Solicitar demonstração', className = '' }: { children?: ReactNode; className?: string }) {
  return <a className={`button ${className}`} href={contactUrl} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}
