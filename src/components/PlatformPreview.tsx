import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Archive,
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Bell,
  Car,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Eye,
  EyeOff,
  FileText,
  Inbox,
  Landmark,
  LayoutDashboard,
  MessageCircle,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
  Users,
  WalletCards,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const LINE = "#E5E7EB";
const MUTED = "#64748B";

function darkenHex(hex: string, amount = 0.44) {
  const value = Number.parseInt(hex.slice(1), 16);
  const channel = (shift: number) => Math.round(((value >> shift) & 255) * (1 - amount));
  return `rgb(${channel(16)} ${channel(8)} ${channel(0)})`;
}

const brands = [
  { name: "Rikinho Auto Center", short: "R", primary: "#E30613", secondary: "#111315" },
  { name: "Central Motors", short: "CM", primary: "#2354E6", secondary: "#0F1729" },
  { name: "Oficina Vetor", short: "V", primary: "#0F8A72", secondary: "#12332E" },
];

type PageId = "inicio" | "atendimentos" | "central" | "ordens" | "clientes" | "veiculos" | "mecanicos" | "estoque" | "financeiro" | "configuracoes";
type MenuItem = { id: PageId; label: string; icon: LucideIcon };

const menu: Array<{ title: string; items: MenuItem[] }> = [
  {
    title: "Principal",
    items: [
      { id: "inicio", label: "Início", icon: LayoutDashboard },
      { id: "atendimentos", label: "Atendimentos", icon: ClipboardList },
      { id: "central", label: "Central de Atendimento", icon: Inbox },
    ],
  },
  {
    title: "Dia a dia",
    items: [
      { id: "ordens", label: "Ordens de Serviço", icon: ClipboardCheck },
      { id: "clientes", label: "Clientes", icon: Users },
      { id: "veiculos", label: "Veículos", icon: Car },
      { id: "mecanicos", label: "Mecânicos", icon: Wrench },
      { id: "estoque", label: "Estoque", icon: Package },
      { id: "financeiro", label: "Financeiro", icon: Landmark },
    ],
  },
  { title: "Sistema", items: [{ id: "configuracoes", label: "Configurações", icon: Settings }] },
];

type Brand = (typeof brands)[number];

function PageHeader({ title, description, action, brand }: { title: string; description: string; action?: string; brand: Brand }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <h2 className="text-base font-bold tracking-tight text-slate-950 sm:text-lg">{title}</h2>
        <p className="mt-0.5 text-[8px] text-slate-500 sm:text-[9px]">{description}</p>
      </div>
      {action ? <button type="button" className="hidden items-center gap-1 rounded-lg px-3 py-2 text-[8px] font-semibold text-white sm:flex" style={{ background: brand.primary }}><Plus size={10} />{action}</button> : null}
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border bg-white shadow-sm ${className}`} style={{ borderColor: LINE }}>{children}</div>;
}

function DashboardScreen({ brand, goTo }: { brand: Brand; goTo: (page: PageId) => void }) {
  const cards = [
    ["Atendimentos em andamento", "14", "3 parados ou aguardando peça", Wrench, "#F59E0B"],
    ["Vendas de hoje", "R$ 8.420", "9 recebimentos no período", ShoppingCart, "#10B981"],
    ["Orçamentos pendentes", "6", "2 aprovados para virar OS", FileText, "#F59E0B"],
    ["Saldo previsto", "R$ 41 mil", "A receber menos a pagar", Banknote, "#3B82F6"],
  ] as const;

  return (
    <div className="space-y-3">
      <PageHeader title="Hoje na oficina" description="Comece atendimentos, veja a fila e acompanhe o financeiro sem procurar em vários menus." action="Novo atendimento" brand={brand} />
      <Card className="overflow-hidden p-3" >
        <div className="grid gap-3 sm:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[7px] font-semibold" style={{ color: brand.primary, background: `${brand.primary}12` }}><ClipboardList size={9} /> Fluxo simples</span>
            <h3 className="mt-2 max-w-md text-base font-black leading-tight text-slate-900">Atenda, aprove, execute e receba pelo mesmo caminho.</h3>
            <p className="mt-1 max-w-lg text-[8px] leading-4 text-slate-500">Escolha se o atendimento começa como orçamento, ordem de serviço ou venda rápida.</p>
            <div className="mt-3 flex gap-2"><button type="button" onClick={() => goTo("atendimentos")} className="rounded-md px-3 py-1.5 text-[8px] font-semibold text-white" style={{ background: brand.primary }}>Novo atendimento</button><button type="button" className="rounded-md bg-slate-900 px-3 py-1.5 text-[8px] font-semibold text-white">Venda rápida</button></div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">{[{ label: "Novo atendimento", icon: ClipboardList }, { label: "Venda rápida", icon: ShoppingCart }, { label: "Cadastrar cliente", icon: Users }, { label: "Ver financeiro", icon: Landmark }].map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => label === "Ver financeiro" ? goTo("financeiro") : undefined} className="flex items-center gap-2 rounded-lg border bg-slate-50 p-2 text-left text-[8px] font-semibold" style={{ borderColor: LINE }}><span className="grid h-6 w-6 place-items-center rounded-md bg-white"><Icon size={10} /></span>{label}</button>)}</div>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">{cards.map(([title, value, description, Icon, tone]) => <Card key={title} className="p-2.5"><div className="flex items-start justify-between gap-2"><span className="text-[7px] font-bold uppercase leading-3 text-slate-500">{title}</span><span className="grid h-6 w-6 shrink-0 place-items-center rounded-md" style={{ background: `${tone}18`, color: tone }}><Icon size={11} /></span></div><strong className="mt-2 block text-sm text-slate-900">{value}</strong><span className="mt-1 block truncate text-[7px] text-slate-400">{description}</span></Card>)}</div>
      <div className="grid gap-2 lg:grid-cols-[1.15fr_.85fr]">
        <Card className="p-3"><div className="flex items-center gap-1.5 text-[9px] font-bold"><ClipboardList size={11} style={{ color: brand.primary }} /> Fila de atendimento</div><p className="mt-0.5 text-[7px] text-slate-400">Itens parados aparecem primeiro para você agir.</p><div className="mt-2 space-y-1.5">{[["OS #3902", "Marcos Aurélio · Onix", "Em execução"], ["OS #3899", "Ana Carolina · Renegade", "Falta peça"], ["ORÇ #1048", "Fernanda Lima · HB20", "Aprovação"]].map(([code, name, status]) => <button key={code} type="button" onClick={() => goTo("ordens")} className="flex w-full items-center justify-between rounded-lg border p-2 text-left hover:bg-slate-50" style={{ borderColor: LINE }}><div><b className="block text-[8px] text-slate-800">{code}</b><span className="text-[7px] text-slate-400">{name}</span></div><span className="rounded-full bg-amber-50 px-2 py-1 text-[7px] font-semibold text-amber-700">{status}</span></button>)}</div></Card>
        <div className="grid gap-2"><Card className="p-3"><div className="text-[9px] font-bold">Orçamentos para acompanhar</div><div className="mt-2 space-y-1.5">{[["#1048 · Fernanda Lima", "R$ 2.480"], ["#1042 · Paulo Mendes", "R$ 1.190"]].map(([name, value]) => <div key={name} className="flex justify-between rounded-lg bg-slate-50 p-2"><span className="text-[8px] font-medium">{name}</span><b className="text-[8px]">{value}</b></div>)}</div></Card><Card className="grid grid-cols-2 gap-2 p-3"><div className="rounded-lg bg-emerald-50 p-2"><span className="text-[7px] text-emerald-700">A receber</span><b className="block text-[10px] text-emerald-800">R$ 28 mil</b></div><div className="rounded-lg bg-red-50 p-2"><span className="text-[7px] text-red-700">A pagar</span><b className="block text-[10px] text-red-800">R$ 12 mil</b></div></Card></div>
      </div>
    </div>
  );
}

function AttendancesScreen({ brand, goTo }: { brand: Brand; goTo: (page: PageId) => void }) {
  const choices = [
    ["Orçamento", "Cliente perguntou preço ou precisa aprovar.", FileText, "#F59E0B"],
    ["Ordem de serviço", "Serviço confirmado e veículo já entrou.", ClipboardCheck, brand.primary],
    ["Caixa / PDV", "Venda direta ou recebimento de serviço.", ShoppingCart, "#10B981"],
  ] as const;
  return <div className="space-y-3"><PageHeader title="Atendimentos" description="Uma entrada simples para orçamento, ordem de serviço e venda rápida." action="Começar agora" brand={brand} /><Card className="p-3" ><div className="mb-3"><span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: brand.primary }}>Escolher atendimento</span><h3 className="mt-1 text-sm font-bold">Como você quer começar?</h3></div><div className="grid gap-2 sm:grid-cols-3">{choices.map(([title, description, Icon, tone]) => <button key={title} type="button" onClick={() => title === "Ordem de serviço" ? goTo("ordens") : undefined} className="group rounded-xl border bg-white p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md" style={{ borderColor: LINE }}><span className="grid h-8 w-8 place-items-center rounded-lg" style={{ color: tone, background: `${tone}12` }}><Icon size={14} /></span><b className="mt-3 block text-[10px]">{title}</b><span className="mt-1 block text-[8px] leading-4 text-slate-500">{description}</span><span className="mt-3 flex items-center gap-1 text-[8px] font-semibold" style={{ color: tone }}>Selecionar <ArrowRight size={9} /></span></button>)}</div></Card><div className="grid gap-2 sm:grid-cols-[.8fr_1.2fr]"><Card className="p-3"><b className="text-[10px]">Qual caminho usar?</b><div className="mt-2 space-y-2">{choices.map(([title, description]) => <div key={title} className="rounded-lg border p-2" style={{ borderColor: LINE }}><strong className="text-[8px]">{title}</strong><p className="mt-0.5 text-[7px] text-slate-500">{description}</p></div>)}</div></Card><Card className="p-3"><b className="text-[10px]">Acompanhar atendimentos</b><p className="text-[7px] text-slate-400">Continue o que já foi iniciado.</p><div className="mt-2 space-y-1.5">{[["Orçamentos", "Propostas e aprovações", FileText], ["Ordens de serviço", "Fila, status e execução", ClipboardList], ["Vendas e recebimentos", "PDV e pagamentos", Banknote]].map(([title, text, Icon]) => <button key={title as string} type="button" onClick={() => title === "Ordens de serviço" ? goTo("ordens") : undefined} className="flex w-full items-center justify-between rounded-lg border p-2 text-left" style={{ borderColor: LINE }}><span className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg" style={{ color: brand.primary, background: `${brand.primary}10` }}><Icon size={11} /></span><span><b className="block text-[8px]">{title as string}</b><small className="text-[7px] text-slate-400">{text as string}</small></span></span><ArrowRight size={10} className="text-slate-400" /></button>)}</div></Card></div></div>;
}

const inboxMessages = [
  { name: "Fernanda Lima", initials: "FL", os: "3901", car: "HB20 · QOL-9C03", date: "Hoje", text: "Olá, Fernanda! Como ficou o seu HB20 depois do serviço?" },
  { name: "Marcos Aurélio", initials: "MA", os: "3898", car: "Onix · ABC-1D23", date: "Ontem", text: "Passando para saber se ficou tudo certo com o veículo." },
  { name: "Carla Souza", initials: "CS", os: "3892", car: "Compass · RIK-2A90", date: "18 jul", text: "Sua opinião ajuda nossa equipe a melhorar cada vez mais." },
];

function CustomerCareScreen({ brand }: { brand: Brand }) {
  const [folder, setFolder] = useState("Entrada");
  const [selected, setSelected] = useState(0);
  const message = inboxMessages[selected];
  return <div className="space-y-3"><PageHeader title="Central de Atendimento" description="Acompanhe retornos pós-serviço e mantenha o relacionamento com seus clientes em dia." brand={brand} /><div className="grid grid-cols-3 gap-2">{[["Aguardando contato", "12", Inbox, "#B45309"], ["Clientes contatados", "38", CheckCheck, "#047857"], ["Arquivados", "7", Archive, MUTED]].map(([label, value, Icon, tone]) => <Card key={label as string} className="flex items-center gap-2 p-2.5"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ color: tone as string, background: `${tone}12` }}><Icon size={11} /></span><div><b className="block text-sm">{value as string}</b><span className="text-[7px] text-slate-500">{label as string}</span></div></Card>)}</div><Card className="grid h-[390px] overflow-hidden sm:grid-cols-[125px_1fr_1.35fr] lg:grid-cols-[145px_1fr_1.4fr]">
    <aside className="hidden border-r bg-slate-50/70 p-2.5 sm:block" style={{ borderColor: LINE }}><div className="mb-3 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg text-white" style={{ background: brand.primary }}><MessageCircle size={11} /></span><div><b className="block text-[8px]">Pós-atendimento</b><span className="text-[7px] text-slate-400">Após 7 dias</span></div></div>{[{ label: "Entrada", count: 12, icon: Inbox }, { label: "Contatados", count: 38, icon: CheckCheck }, { label: "Arquivados", count: 7, icon: Archive }].map(({ label, count, icon: Icon }) => <button key={label} type="button" onClick={() => setFolder(label)} className="mb-1 flex w-full items-center gap-1.5 rounded-lg px-2 py-2 text-[8px] font-medium" style={{ color: folder === label ? brand.primary : MUTED, background: folder === label ? `${brand.primary}10` : "transparent" }}><Icon size={10} /><span className="flex-1 text-left">{label}</span><span className="rounded-full bg-white px-1.5 py-0.5 text-[7px] ring-1 ring-slate-200">{count}</span></button>)}</aside>
    <div className="border-r" style={{ borderColor: LINE }}><div className="border-b p-2" style={{ borderColor: LINE }}><div className="flex items-center gap-1.5 rounded-md border px-2 py-2 text-[7px] text-slate-400" style={{ borderColor: LINE }}><Search size={9} /> Buscar cliente, placa ou OS...</div></div><div className="divide-y divide-slate-100">{inboxMessages.map((item, index) => <button key={item.os} type="button" onClick={() => setSelected(index)} className="flex w-full gap-2 p-2.5 text-left" style={{ background: selected === index ? `${brand.primary}08` : "white" }}><span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full text-[7px] font-bold" style={{ color: brand.primary, background: `${brand.primary}12` }}>{item.initials}{index === 0 ? <i className="absolute right-0 top-0 h-2 w-2 rounded-full ring-2 ring-white" style={{ background: brand.primary }} /> : null}</span><span className="min-w-0 flex-1"><span className="flex justify-between"><b className="truncate text-[8px]">{item.name}</b><small className="text-[6px] text-slate-400">{item.date}</small></span><b className="mt-0.5 block truncate text-[7px]">Feedback da OS #{item.os}</b><small className="mt-1 line-clamp-2 text-[7px] leading-3 text-slate-400">{item.text}</small></span></button>)}</div></div>
    <article className="hidden min-w-0 flex-col bg-slate-50/40 sm:flex"><header className="border-b p-3" style={{ borderColor: LINE }}><div className="flex items-start justify-between"><div><div className="flex items-center gap-1.5"><b className="text-[10px]">Retorno da OS #{message.os}</b><span className="rounded-full bg-amber-50 px-2 py-0.5 text-[6px] font-semibold text-amber-700">Pendente</span></div><span className="mt-1 block text-[7px] text-slate-400">{message.name} · {message.car}</span></div><MoreHorizontal size={12} className="text-slate-400" /></div></header><div className="flex-1 p-3"><div className="rounded-xl border bg-white p-3 text-[8px] leading-4 text-slate-600" style={{ borderColor: LINE }}><p>Olá, {message.name.split(" ")[0]}! Tudo bem?</p><p className="mt-2">Já se passaram alguns dias desde o serviço no seu {message.car.split(" · ")[0]}. Queremos saber se ficou tudo certo com o veículo.</p><p className="mt-2">Conte com a equipe da <b>{brand.name}</b>!</p></div><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" className="rounded-lg border bg-white py-2 text-[8px] font-semibold" style={{ borderColor: LINE }}>Copiar mensagem</button><button type="button" className="rounded-lg bg-[#25D366] py-2 text-[8px] font-semibold text-white">Abrir WhatsApp</button></div></div><footer className="flex items-center justify-between border-t p-3" style={{ borderColor: LINE }}><button type="button" className="text-[7px] text-slate-400">Arquivar</button><button type="button" className="rounded-lg px-3 py-2 text-[7px] font-semibold text-white" style={{ background: brand.primary }}>Marcar como contatado</button></footer></article>
  </Card></div>;
}

const boardColumns = [
  { title: "Orç. criados", tone: "#94A3B8", items: [["ORÇ #1048", "Fernanda Lima", "HB20 · QOL-9C03", "Rafael"]] },
  { title: "Aguard. aprovação", tone: "#F59E0B", items: [["ORÇ #1042", "Paulo Mendes", "Corolla · RKP-8A20", "Diego"]] },
  { title: "A fazer", tone: "#64748B", items: [["#3904", "Bruno Ribeiro", "Compass · RIK-2A90", "Sem mecânico"]] },
  { title: "Em execução", tone: "#2563EB", items: [["#3902", "Marcos Aurélio", "Onix · ABC-1D23", "Rafael"], ["#3900", "Julia Costa", "T-Cross · DSE-9P11", "Lucas"]] },
  { title: "Falta peça", tone: "#D97706", items: [["#3899", "Ana Carolina", "Renegade · ERT-4G55", "Diego"]] },
  { title: "Pendente", tone: "#7C3AED", items: [["#3897", "Ricardo Alves", "Civic · QWE-2D30", "Lucas"]] },
  { title: "Veículo liberado", tone: "#059669", items: [["#3896", "Carlos Eduardo", "Strada · MTB-1150", "Rafael"]] },
  { title: "Finalizadas", tone: "#0F766E", items: [["#3891", "Carla Souza", "Polo · ASR-8F12", "Diego"]] },
];

function ServiceOrdersScreen({ brand }: { brand: Brand }) {
  return <div className="flex h-full min-h-0 flex-col gap-3"><PageHeader title="Controle de pátio" description="Organize a fila da oficina e acompanhe cada etapa em tempo real." action="Nova OS" brand={brand} /><Card className="flex flex-wrap items-center gap-2 p-2.5"><div className="flex min-w-44 flex-1 items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-[7px] text-slate-400"><Search size={10} /> Pesquisar por OS, cliente, veículo, placa ou mecânico</div><button type="button" className="flex items-center gap-1 rounded-lg border px-2.5 py-2 text-[7px]" style={{ borderColor: LINE }}>Todos os status <ChevronDown size={9} /></button><button type="button" className="flex items-center gap-1 rounded-lg border px-2.5 py-2 text-[7px]" style={{ borderColor: LINE }}>Este mês <ChevronDown size={9} /></button></Card><Card className="flex min-h-0 flex-1 flex-col overflow-hidden bg-slate-100/60 p-2.5"><div className="mb-2 flex items-center justify-between text-[7px]"><span className="font-semibold"><i className="mr-1 inline-block h-2 w-2 rounded-full" style={{ background: brand.primary }} /> 9 itens neste mês</span><span className="rounded-full bg-white px-2 py-1 text-slate-400">Arraste uma OS para mudar de etapa</span></div><div className="hide-scrollbar min-h-0 flex-1 overflow-x-auto"><div className="grid h-full min-w-[1320px] grid-cols-8 gap-2">{boardColumns.map((column) => <section key={column.title} className="flex flex-col rounded-xl border p-2" style={{ borderColor: `${column.tone}28`, background: `${column.tone}09` }}><header className="flex min-h-9 items-start justify-between border-b pb-2" style={{ borderColor: LINE }}><div><div className="flex items-center gap-1"><i className="h-2 w-2 rounded-full" style={{ background: column.tone }} /><b className="text-[7px] uppercase">{column.title}</b></div><span className="text-[6px] text-slate-400">Etapa da operação</span></div><span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[7px] font-bold">{column.items.length}</span></header><div className="mt-2 space-y-2">{column.items.map(([code, client, car, mechanic]) => <article key={code} className="rounded-lg border bg-white p-2 shadow-sm" style={{ borderColor: LINE }}><div className="flex items-center justify-between"><b className="font-mono text-[7px] text-slate-500">{code}</b><span className="rounded-full px-1.5 py-0.5 text-[6px]" style={{ color: column.tone, background: `${column.tone}12` }}>{column.title}</span></div><h3 className="mt-1 truncate text-[8px] font-bold">{client}</h3><p className="mt-1 flex items-center gap-1 truncate text-[7px] text-slate-500"><Car size={8} />{car}</p><p className="mt-1 flex items-center gap-1 truncate text-[7px] text-slate-500"><Wrench size={8} />{mechanic}</p><button type="button" className="mt-2 w-full rounded-md border py-1.5 text-[7px]" style={{ borderColor: LINE }}>Detalhes</button></article>)}</div></section>)}</div></div></Card></div>;
}

function FinanceScreen({ brand }: { brand: Brand }) {
  const [hidden, setHidden] = useState(false);
  const money = (value: string) => hidden ? "•••••" : value;
  const kpis = [["Saldo atual", "R$ 38.420", "+12,4%", WalletCards, "positive"], ["Entradas", "R$ 96.800", "+18,2%", ArrowDownLeft, "positive"], ["Saídas", "R$ 58.380", "-4,1%", ArrowUpRight, "negative"], ["A receber", "R$ 28.460", "+8,7%", TrendingUp, "info"], ["A pagar", "R$ 12.190", "-2,3%", TrendingDown, "warning"], ["Ticket médio", "R$ 935", "+6,8%", Banknote, "neutral"]] as const;
  return <div className="space-y-3"><div className="flex items-end justify-between gap-3"><div className="flex items-end gap-2"><PageHeader title="Financeiro" description="Resumo financeiro da empresa." brand={brand} /><button type="button" onClick={() => setHidden((value) => !value)} aria-label={hidden ? "Mostrar valores" : "Ocultar valores"} className="grid h-7 w-7 place-items-center rounded-lg border bg-white" style={{ borderColor: LINE }}>{hidden ? <EyeOff size={10} /> : <Eye size={10} />}</button></div><div className="hidden gap-1.5 sm:flex"><button type="button" className="flex items-center gap-1 rounded-lg px-3 py-2 text-[7px] font-semibold text-white" style={{ background: brand.primary }}><Plus size={9} /> Novo lançamento</button><button type="button" className="rounded-lg border px-2.5 text-[7px]" style={{ borderColor: LINE }}>••• Mais ações</button></div></div><div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">{kpis.map(([label, value, trend, Icon, state]) => <Card key={label} className="p-2.5"><div className="flex justify-between"><span className="grid h-7 w-7 place-items-center rounded-lg" style={{ color: brand.primary, background: `${brand.primary}10` }}><Icon size={11} /></span><span className={`rounded-full px-1.5 py-1 text-[6px] font-semibold ${state === "negative" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"}`}>{trend}</span></div><span className="mt-2 block text-[7px] text-slate-500">{label}</span><b className="mt-1 block truncate text-[11px]">{money(value)}</b></Card>)}</div><div className="grid gap-2 lg:grid-cols-[1.2fr_.8fr]"><Card className="p-3"><div className="flex items-center justify-between"><div><b className="text-[9px]">Fluxo de caixa</b><p className="text-[7px] text-slate-400">Entradas, saídas e saldo por dia.</p></div><span className="text-[7px] text-slate-400">Últimos 30 dias</span></div><div className="relative mt-3 h-24 overflow-hidden rounded-lg bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_24px]"><svg viewBox="0 0 500 100" className="h-full w-full" preserveAspectRatio="none"><path d="M0,82 C45,70 60,78 100,55 S170,70 210,43 S285,55 325,28 S390,48 430,20 S470,25 500,12" fill="none" stroke={brand.primary} strokeWidth="3"/><path d="M0,88 C55,82 90,92 130,74 S210,82 250,66 S330,75 370,58 S450,70 500,48" fill="none" stroke="#F87171" strokeWidth="2" strokeDasharray="5 4"/></svg></div><div className="mt-2 flex gap-4 text-[7px] text-slate-500"><span><i className="mr-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: brand.primary }} />Entradas</span><span><i className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-red-400" />Saídas</span></div></Card><Card className="p-3"><b className="text-[9px]">Entradas e saídas</b><p className="text-[7px] text-slate-400">Composição do período.</p><div className="mt-3 flex items-center justify-center gap-5"><div className="relative h-20 w-20 rounded-full" style={{ background: `conic-gradient(${brand.primary} 0 62%, #F87171 62% 100%)` }}><div className="absolute inset-3 grid place-items-center rounded-full bg-white text-center"><b className="text-[9px]">R$ 155k</b></div></div><div className="space-y-2 text-[7px]"><div><i className="mr-1 inline-block h-2 w-2 rounded-sm" style={{ background: brand.primary }} /> Entradas <b className="ml-2">62%</b></div><div><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-red-400" /> Saídas <b className="ml-2">38%</b></div></div></div></Card></div><Card className="overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-2 border-b p-2.5" style={{ borderColor: LINE }}><div className="flex gap-1">{["Todos", "Contas", "Caixa", "Categorias"].map((item, index) => <button key={item} type="button" className="rounded-md px-2 py-1 text-[7px] font-semibold" style={{ color: index === 0 ? brand.primary : MUTED, background: index === 0 ? `${brand.primary}10` : "transparent" }}>{item}</button>)}</div><div className="flex items-center gap-1 rounded-md border px-2 py-1.5 text-[7px] text-slate-400" style={{ borderColor: LINE }}><SlidersHorizontal size={8} /> Filtros</div></div><div className="grid grid-cols-[1.5fr_.8fr_.8fr_.7fr] bg-slate-50 px-3 py-2 text-[6px] font-bold uppercase text-slate-400"><span>Lançamento</span><span>Data</span><span>Valor</span><span>Status</span></div>{[["OS #3901 · Carlos Eduardo", "Hoje", "R$ 2.480,00", "Recebido"], ["Auto Peças Brasil", "Amanhã", "R$ 3.120,00", "A pagar"], ["OS #3902 · Marcos Aurélio", "25 jul", "R$ 4.850,00", "A receber"]].map((row) => <div key={row[0]} className="grid grid-cols-[1.5fr_.8fr_.8fr_.7fr] border-t px-3 py-2.5 text-[7px]" style={{ borderColor: LINE }}>{row.map((cell, index) => <span key={cell} className={index === 0 ? "font-semibold" : "text-slate-500"}>{index === 2 ? money(cell) : cell}</span>)}</div>)}</Card></div>;
}

const listPages = {
  clientes: { title: "Clientes", description: "Gerencie contatos, histórico e relacionamento.", action: "Novo cliente", columns: ["Cliente", "Contato", "Veículos", "Último atendimento"], rows: [["Marcos Aurélio", "(11) 98888-1204", "3 veículos", "Hoje"], ["Fernanda Lima", "(11) 97771-8032", "1 veículo", "Ontem"], ["Carlos Eduardo", "(11) 96665-4490", "2 veículos", "18 jul"], ["Ana Carolina", "(11) 95521-7600", "1 veículo", "16 jul"]] },
  veiculos: { title: "Veículos", description: "Cadastro e histórico técnico por placa.", action: "Novo veículo", columns: ["Veículo", "Placa", "Cliente", "Ano"], rows: [["Onix LT 1.0", "ABC-1D23", "Marcos Aurélio", "2022"], ["HB20 Comfort", "QOL-9C03", "Fernanda Lima", "2021"], ["Strada Freedom", "MTB-1150", "Carlos Eduardo", "2023"], ["Compass Sport", "RIK-2A90", "Bruno Ribeiro", "2020"]] },
  mecanicos: { title: "Mecânicos", description: "Equipe, especialidades e produtividade.", action: "Novo mecânico", columns: ["Mecânico", "Especialidade", "Serviços ativos", "Status"], rows: [["Rafael Santos", "Motor e injeção", "4 serviços", "Disponível"], ["Diego Costa", "Suspensão e freios", "3 serviços", "Em serviço"], ["Lucas Rocha", "Elétrica", "5 serviços", "Em serviço"], ["André Lima", "Diagnóstico", "2 serviços", "Disponível"]] },
  estoque: { title: "Estoque", description: "Produtos, serviços, preços e reposição.", action: "Novo item", columns: ["Produto / serviço", "Código", "Estoque", "Valor"], rows: [["Óleo 5W30 sintético", "OL-530", "28 unidades", "R$ 58,90"], ["Filtro de óleo", "FO-118", "4 unidades", "R$ 32,00"], ["Pastilha de freio", "PF-220", "12 jogos", "R$ 189,00"], ["Alinhamento 3D", "SV-014", "Serviço", "R$ 120,00"]] },
} as const;

function ListScreen({ pageId, brand }: { pageId: keyof typeof listPages; brand: Brand }) {
  const page = listPages[pageId];
  return <div className="space-y-3"><PageHeader title={page.title} description={page.description} action={page.action} brand={brand} /><div className="grid grid-cols-3 gap-2">{[["Total cadastrado", pageId === "clientes" ? "1.248" : pageId === "veiculos" ? "1.536" : pageId === "mecanicos" ? "9" : "386"], ["Ativos agora", pageId === "mecanicos" ? "7" : "24"], ["Atualizados este mês", "46"]].map(([label, value]) => <Card key={label} className="p-2.5"><span className="text-[7px] text-slate-400">{label}</span><b className="mt-1 block text-sm">{value}</b></Card>)}</div><Card className="overflow-hidden"><div className="flex items-center justify-between border-b p-3" style={{ borderColor: LINE }}><div className="flex w-52 items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-[7px] text-slate-400"><Search size={9} /> Pesquisar...</div><button type="button" className="rounded-lg border px-2 py-2 text-[7px]" style={{ borderColor: LINE }}>Filtros</button></div><div className="grid grid-cols-4 bg-slate-50 px-3 py-2 text-[6px] font-bold uppercase text-slate-400">{page.columns.map((column) => <span key={column}>{column}</span>)}</div>{page.rows.map((row) => <button key={row[0]} type="button" className="grid w-full grid-cols-4 border-t px-3 py-3 text-left text-[8px] hover:bg-slate-50" style={{ borderColor: LINE }}>{row.map((cell, index) => <span key={cell} className={index === 0 ? "font-semibold text-slate-800" : "text-slate-500"}>{cell}</span>)}</button>)}</Card></div>;
}

function SettingsScreen({ brand }: { brand: Brand }) {
  const settings = [["Minha conta", "Perfil, senha e autenticação em dois fatores", Users], ["Dados da empresa", "Logo, cores, documentos e dados públicos", Settings], ["Usuários e permissões", "Equipe, cargos e níveis de acesso", CheckCircle2], ["E-mails", "Remetente, respostas e notificações", MessageCircle], ["Feedback de clientes", "Textos e lembretes de pós-atendimento", Inbox], ["Segurança", "Sessões, acessos e auditoria", ClipboardCheck]] as const;
  return <div className="space-y-3"><PageHeader title="Configurações" description="Gerencie sua conta, empresa, equipe e automações." brand={brand} /><Card className="overflow-hidden"><div className="flex items-center gap-3 border-b p-3" style={{ borderColor: LINE }}><span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: brand.primary }}>{brand.short}</span><div><b className="text-[10px]">{brand.name}</b><p className="text-[7px] text-slate-400">Ambiente principal · Plano profissional</p></div></div><div className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3">{settings.map(([title, description, Icon]) => <button key={title} type="button" className="flex gap-3 rounded-xl border p-3 text-left hover:bg-slate-50" style={{ borderColor: LINE }}><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ color: brand.primary, background: `${brand.primary}10` }}><Icon size={12} /></span><span><b className="block text-[9px]">{title}</b><small className="mt-1 block text-[7px] leading-3 text-slate-400">{description}</small></span></button>)}</div></Card></div>;
}

export function PlatformPreview() {
  const [activePage, setActivePage] = useState<PageId>("inicio");
  const [brandIndex, setBrandIndex] = useState(0);
  const [isExploring, setIsExploring] = useState(false);
  const reduceMotion = useReducedMotion();
  const brand = brands[brandIndex];
  const sidebarDark = darkenHex(brand.primary);

  useEffect(() => {
    if (reduceMotion || isExploring) return;
    const timer = setInterval(() => setBrandIndex((index) => (index + 1) % brands.length), 2800);
    return () => clearInterval(timer);
  }, [isExploring, reduceMotion]);

  const screen = activePage === "inicio" ? <DashboardScreen brand={brand} goTo={setActivePage} />
    : activePage === "atendimentos" ? <AttendancesScreen brand={brand} goTo={setActivePage} />
      : activePage === "central" ? <CustomerCareScreen brand={brand} />
        : activePage === "ordens" ? <ServiceOrdersScreen brand={brand} />
          : activePage === "financeiro" ? <FinanceScreen brand={brand} />
            : activePage === "configuracoes" ? <SettingsScreen brand={brand} />
              : <ListScreen pageId={activePage} brand={brand} />;

  return (
    <motion.div data-testid="platform-preview" data-demo-page={activePage} initial={{ opacity: 0, y: 34, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} onMouseEnter={() => setIsExploring(true)} onMouseLeave={() => setIsExploring(false)} className="product-window pointer-events-none relative w-full overflow-hidden rounded-2xl border bg-white text-left lg:pointer-events-auto" style={{ borderColor: `${brand.primary}36` }}>
      <div className="flex h-10 items-center justify-between border-b bg-[#F8FAFC] px-3 sm:px-4" style={{ borderColor: LINE }}><div className="flex gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" /><span className="h-2.5 w-2.5 rounded-full bg-[#FFD43B]" /><span className="h-2.5 w-2.5 rounded-full bg-[#51CF66]" /></div><div className="hidden items-center gap-2 rounded-md border bg-white px-3 py-1 text-[10px] text-slate-400 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />ambiente de demonstração · dados fictícios</div><div className="flex items-center gap-2">{brands.map((item, index) => <button key={item.name} type="button" aria-label={`Usar identidade ${item.name}`} onClick={() => setBrandIndex(index)} className="h-2.5 w-2.5 rounded-full transition-transform hover:scale-125" style={{ background: item.primary, boxShadow: brandIndex === index ? `0 0 0 2px white, 0 0 0 3px ${item.primary}` : "none" }} />)}</div></div>
      <div className="flex h-[560px] sm:h-[580px]">
        <aside className="hidden w-[190px] shrink-0 flex-col text-white lg:flex" style={{ background: `radial-gradient(circle at 18% 0%, rgba(255,255,255,.24), transparent 38%), linear-gradient(155deg, ${brand.primary} 0%, ${sidebarDark} 100%)` }}><div className="flex min-h-20 items-center gap-2.5 border-b border-white/10 px-4"><motion.div key={brand.short} initial={{ opacity: 0, scale: .75, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: isExploring ? 0 : .32 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/25 bg-white text-[11px] font-black" style={{ color: brand.primary }}>{brand.short}</motion.div><AnimatePresence mode="wait"><motion.span key={brand.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: isExploring ? 0 : .28 }} className="text-xs font-bold leading-tight">{brand.name}</motion.span></AnimatePresence></div><nav className="hide-scrollbar flex-1 overflow-y-auto px-2 py-3" aria-label="Navegação da plataforma demonstrativa">{menu.map((group) => <div key={group.title} className="mb-3"><div className="px-2 pb-1.5 text-[8px] font-semibold uppercase tracking-[.16em] text-white/45">{group.title}</div><div className="space-y-0.5">{group.items.map((item) => <button key={item.id} type="button" onClick={() => setActivePage(item.id)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[9px] font-medium" style={{ background: activePage === item.id ? "rgba(255,255,255,.18)" : "transparent", color: activePage === item.id ? "#fff" : "rgba(255,255,255,.72)" }}><item.icon size={12} />{item.label}</button>)}</div></div>)}</nav><div className="m-3 flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 p-2.5"><div className="grid h-7 w-7 place-items-center rounded-lg bg-white/15 text-[8px] font-bold">AS</div><div><div className="text-[8px] font-semibold">Amanda Silva</div><div className="text-[7px] text-white/50">Administradora</div></div></div></aside>
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#F5F4F1]"><div className="flex h-12 shrink-0 items-center justify-between border-b bg-white px-3 sm:px-4" style={{ borderColor: LINE }}><div className="flex items-center gap-2"><motion.div key={brand.short} className="grid h-7 w-7 place-items-center rounded-lg text-[8px] font-bold text-white lg:hidden" style={{ background: brand.primary }}>{brand.short}</motion.div><div className="hidden h-7 w-48 items-center gap-2 rounded-lg border bg-slate-50 px-3 text-[7px] text-slate-400 lg:flex" style={{ borderColor: LINE }}><Search size={9} /> Buscar cliente, OS, placa...</div></div><div className="flex items-center gap-2"><span className="text-[8px] font-semibold text-slate-600 lg:hidden">Financeiro</span><button type="button" aria-label="Notificações" className="grid h-7 w-7 place-items-center rounded-lg border text-slate-500" style={{ borderColor: LINE }}><Bell size={10} /></button><button type="button" className="hidden rounded-lg px-3 py-2 text-[7px] font-semibold text-white lg:block" style={{ background: brand.primary }}>Abrir PDV</button></div></div><div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto p-3 sm:p-4"><div className="h-full lg:hidden"><FinanceScreen brand={brand} /></div><div className="hidden h-full lg:block"><AnimatePresence mode="wait"><motion.div key={activePage} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .18 }} className="h-full">{screen}</motion.div></AnimatePresence></div></div></main>
      </div>
    </motion.div>
  );
}
