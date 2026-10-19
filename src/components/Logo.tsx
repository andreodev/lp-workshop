import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return <Link href="/" className="logo" aria-label="Ofixy — início"><Image src="/brand/logo-horizontal.svg" alt="Ofixy" width={160} height={48} /></Link>;
}
