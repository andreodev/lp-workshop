'use client';

import { useRef } from 'react';
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Check, ClipboardList, Wallet, Wrench } from 'lucide-react';
import { PlatformPreview } from './PlatformPreview';
import { contactUrl } from '../lib/site';

export function HeroDemo() {
  const preview = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: preview,
    offset: ['start 95%', 'start 22%'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [9, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [14, 0]);

  return (
    <MotionConfig reducedMotion="user"><div id="plataforma" className="product-showcase" ref={preview}>
      <div className="showcase-intro"><span>CONHEÇA SEU NOVO JEITO DE GERIR</span><ArrowDown size={15} aria-hidden="true" /></div>
      <motion.div className="showcase-frame" style={reducedMotion ? undefined : { scale, rotateX, y, transformPerspective: 1400 }}>
        <div className="showcase-toolbar"><div><span className="showcase-live-dot" />Sua oficina, em uma única visão.</div><span>Prévia interativa · dados fictícios</span></div>
        <PlatformPreview />
      </motion.div>
      <div className="showcase-outcomes"><span><ClipboardList size={17} /> Orçamentos organizados</span><span><Wrench size={17} /> Equipe conectada</span><span><Wallet size={17} /> Financeiro à vista</span></div>
      <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="showcase-invitation"><Check size={14} /> Quer ver na sua rotina? Solicite uma demonstração.</a>
    </div></MotionConfig>
  );
}
