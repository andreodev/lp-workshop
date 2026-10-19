import { useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, MessageCircle, ClipboardList, Wrench, Users, Package, Wallet, CalendarDays, BarChart3 } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import { HeroDemo } from './components/HeroDemo';
import ofixyMark from './assets/ofixy-mark.png';

const whatsapp = 'https://wa.me/5511925592834';
const contactUrl = `${whatsapp}?text=${encodeURIComponent('Olá! Quero conhecer o Ofixy e solicitar uma demonstração para minha oficina.')}`;
const features = [
  { icon: CalendarDays, title: 'Cada contato, uma oportunidade.', label: 'ATENDIMENTO E AGENDA', text: 'Receba solicitações pela página pública da oficina, acompanhe os contatos por etapas e organize os atendimentos.' },
  { icon: ClipboardList, title: 'Do orçamento ao serviço aprovado.', label: 'ORÇAMENTOS E ORDENS DE SERVIÇO', text: 'Monte propostas com produtos e serviços, envie por PDF, WhatsApp ou e-mail e transforme orçamentos aprovados em ordens de serviço.' },
  { icon: Wrench, title: 'Saiba o que está em execução.', label: 'SERVIÇOS E VISTORIAS', text: 'Acompanhe os serviços, registre itens e responsáveis e use checklists de vistoria vinculados ao veículo.' },
  { icon: Users, title: 'O histórico sempre à mão.', label: 'CLIENTES E VEÍCULOS', text: 'Encontre cadastros, contatos e histórico de serviços em um só lugar para atender com mais contexto.' },
  { icon: Package, title: 'Mais controle sobre cada peça.', label: 'ESTOQUE E COMPRAS', text: 'Organize produtos, serviços, movimentações, níveis de estoque, fornecedores e pedidos de compra.' },
  { icon: Wallet, title: 'Entenda para onde o dinheiro vai.', label: 'VENDAS, CAIXA E FINANCEIRO', text: 'Venda pelo PDV e acompanhe recebimentos, contas a pagar e a receber, fluxo de caixa, resultado e ticket médio.' },
];
const faqs = [
  ['O que consigo gerenciar com o Ofixy?', 'Atendimentos, agendamentos, clientes, veículos, orçamentos, ordens de serviço, vistorias, estoque, compras, vendas e financeiro. Você também organiza usuários, acessos, comissões e informações da oficina.'],
  ['Posso compartilhar orçamentos com meus clientes?', 'Sim. Você pode compartilhar propostas por PDF, WhatsApp ou e-mail e acompanhar o status até a aprovação. Orçamentos aprovados podem ser convertidos em ordens de serviço.'],
  ['Consigo acompanhar o financeiro da oficina?', 'Sim. A plataforma reúne entradas, saídas, contas a pagar e a receber, fluxo de caixa, resultado e ticket médio por período, além de relatórios e análise visual dos dados.'],
  ['Minha equipe pode usar o sistema?', 'Sim. Você pode cadastrar mecânicos e usuários, organizar níveis de acesso e acompanhar informações de comissão.'],
  ['Qual é o valor e como funciona a demonstração?', 'Fale com a equipe pelo WhatsApp para conhecer os recursos, consultar valores e combinar uma demonstração de acordo com a rotina da sua oficina.'],
];

function Logo() {
  return <a href="#inicio" className="logo" aria-label="Ofixy — início"><img src={ofixyMark} alt="" width="38" height="38" />ofi<span>x</span>y<span className="logo-dot">.</span></a>;
}
function DemoLink({ children = 'Quero uma demonstração', className = '' }: { children?: React.ReactNode; className?: string }) {
  return <a className={`button ${className}`} href="#demonstracao">{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  function prepareContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const workshop = String(data.get('workshop') ?? '').trim();
    if (!name || !workshop) return;
    const message = `Olá! Sou ${name}, da oficina ${workshop}. Quero conhecer o Ofixy e solicitar uma demonstração.`;
    window.location.assign(`${whatsapp}?text=${encodeURIComponent(message)}`);
  }
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="header"><div className="container nav"><Logo /><nav className="desktop-nav" aria-label="Navegação principal"><a href="#plataforma">A plataforma</a><a href="#recursos">Recursos</a><a href="#faq">Dúvidas</a></nav><div className="nav-actions"><a href="https://app.ofixy.com.br" className="nav-login" target="_blank" rel="noopener noreferrer">Entrar no sistema<ArrowUpRight size={13} /></a><DemoLink className="nav-cta">Agendar demonstração</DemoLink></div><button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>{menuOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="Navegação móvel" onClick={() => setMenuOpen(false)}><a href="#plataforma">A plataforma</a><a href="#recursos">Recursos</a><a href="#faq">Dúvidas</a><a href="#demonstracao">Agendar demonstração</a></nav>}</header>
    <main id="conteudo">
      <section id="inicio" className="hero-v2">
        <div className="hero-v2-glow" aria-hidden="true" />
        <div className="container hero-v2-content">
          <div className="hero-v2-badge"><Wrench size={13} aria-hidden="true" /><span>GESTÃO FEITA PARA OFICINAS</span><span className="badge-divider" />Conheça o Ofixy<ArrowUpRight size={13} aria-hidden="true" /></div>
          <h1>Mais tempo para sua oficina.<br /><span>Mais controle do seu negócio.</span></h1>
          <p className="hero-v2-description">Do primeiro orçamento ao dinheiro no caixa. Organize os serviços,<br className="hero-desktop-break" /> conecte sua equipe e acompanhe tudo em um só lugar.</p>
          <div className="hero-v2-actions"><DemoLink>Quero conhecer o Ofixy</DemoLink><a href="#plataforma" className="hero-v2-secondary">Ver o sistema por dentro<ArrowRight size={16} aria-hidden="true" /></a></div>
          <div className="hero-v2-assurances"><span><Check size={14} /> Demonstração com nossa equipe</span><span><Check size={14} /> Tire suas dúvidas pelo WhatsApp</span></div>
          <HeroDemo />
          <div className="hero-v2-audience"><span>PARA QUEM FAZ A OFICINA ACONTECER</span><div>Oficinas mecânicas<i />Autocenters<i />Centros automotivos</div></div>
        </div>
      </section>
      <section id="recursos" className="section resources-section"><div className="container"><div className="center-heading"><span className="eyebrow">CADA ETAPA NO SEU LUGAR</span><h2>Uma oficina tem muitas demandas.<br /><span>A gestão pode ser mais simples.</span></h2><p>Conecte o trabalho da equipe às informações que você precisa para decidir.</p></div><div className="feature-grid">{features.map(({ icon: Icon, title, label, text }, index) => <article className="feature-card" key={label}><div className="feature-top"><span className="feature-icon"><Icon size={24} strokeWidth={1.6} /></span><span className="feature-number">0{index + 1}</span></div><span className="feature-label">{label}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="extra-features"><div><Users size={21} /><h3>Equipe alinhada</h3><p>Usuários, permissões e informações de comissão.</p></div><div><MessageCircle size={21} /><h3>Relacionamento que continua</h3><p>Feedback e integração com WhatsApp para comunicações.</p></div><div><ClipboardList size={21} /><h3>Menos informação perdida</h3><p>Histórico de clientes, veículos e serviços sempre à mão.</p></div><div><BarChart3 size={21} /><h3>Decisões com contexto</h3><p>Indicadores de vendas, financeiro, estoque e clientes.</p></div></div></div></section>
      <section className="clarity-section"><div className="container clarity-grid"><div><span className="eyebrow">MAIS VISIBILIDADE PARA QUEM GERE</span><h2>Você cuida da oficina.<br /><span>O Ofixy conecta<br />as informações.</span></h2><DemoLink /></div><div className="benefit-list">{[['01', 'Atenda com mais contexto.', 'Consulte os dados do cliente, do veículo e dos serviços anteriores sem perder o fio da conversa.'], ['02', 'Acompanhe o trabalho da equipe.', 'Visualize os serviços em execução, os itens registrados e os responsáveis por cada ordem.'], ['03', 'Decida com uma visão mais clara.', 'Acompanhe o caixa, os resultados e os indicadores da operação por período.']].map(([number, title, text]) => <div key={number}><span>{number}</span><article><h3>{title}</h3><p>{text}</p></article><ArrowUpRight size={22} /></div>)}</div></div></section>
      <section id="demonstracao" className="section demo-section"><div className="container demo-grid"><div><span className="eyebrow">VAMOS CONVERSAR SOBRE A SUA OFICINA?</span><h2>Veja como o Ofixy<br />se encaixa na<br /><span>sua rotina.</span></h2><p>Conte um pouco sobre sua oficina e converse com nossa equipe para conhecer a plataforma.</p><ul className="demo-checks"><li><Check size={18} /> Conheça os recursos em uma demonstração</li><li><Check size={18} /> Tire suas dúvidas sobre a operação</li><li><Check size={18} /> Consulte valores e próximos passos</li></ul><a className="text-link" href={contactUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Prefiro falar direto pelo WhatsApp <ArrowUpRight size={16} /></a></div><div className="lead-card"><span className="form-kicker">UM PRIMEIRO PASSO PARA ORGANIZAR A ROTINA</span><h3>Vamos conhecer sua oficina?</h3><p>Solicite uma demonstração e veja o sistema na prática.</p><form onSubmit={prepareContact}><label htmlFor="lead-name">Seu nome</label><input id="lead-name" name="name" autoComplete="name" placeholder="Como podemos chamar você?" maxLength={80} required pattern=".*\S.*" /><label htmlFor="lead-workshop">Nome da oficina</label><input id="lead-workshop" name="workshop" autoComplete="organization" placeholder="Qual é o nome da sua oficina?" maxLength={120} required pattern=".*\S.*" /><button type="submit" className="button">Solicitar demonstração pelo WhatsApp <ArrowRight size={18} /></button><p className="form-notice">Ao continuar, o WhatsApp será aberto com sua mensagem pronta. Envie para solicitar a demonstração.</p></form><div className="form-bottom"><MessageCircle size={17} /> Atendimento pelo WhatsApp</div></div></div></section>
      <section id="faq" className="section faq-section"><div className="container faq-grid"><div><span className="eyebrow">ANTES DE COMEÇAR</span><h2>Ficou alguma<br /><span>dúvida?</span></h2><p>Nossa equipe pode ajudar você a entender o que faz sentido para sua oficina.</p><a href={contactUrl} target="_blank" rel="noopener noreferrer" className="text-link">Conversar com a equipe <ArrowUpRight size={17} /></a></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></div></section>
      <section className="closing"><div className="container"><span className="eyebrow">SUA OFICINA. SEU PRÓXIMO PASSO.</span><h2>Menos informação espalhada.<br /><span>Mais oficina sob controle.</span></h2><DemoLink>Conhecer o Ofixy</DemoLink></div></section>
    </main><footer><div className="container footer-content"><div><Logo /><p>Do atendimento ao financeiro.<br />Sua oficina em um só lugar.</p></div><div><a href="#plataforma">Plataforma</a><a href="#recursos">Recursos</a><a href="#faq">Dúvidas</a><a href={contactUrl} target="_blank" rel="noopener noreferrer">Contato <ArrowUpRight size={14} /></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Ofixy. Todos os direitos reservados.</span><span>Gestão que acompanha sua oficina.</span></div></footer><div className="mobile-cta"><DemoLink>Quero conhecer o Ofixy</DemoLink></div>
  </MotionConfig>;
}
