import React, { useEffect, useRef, useState, type ReactNode } from "react";
import rikinhoFinanceiro from "./assets/rikinho-financeiro.png";
import rikinhoOs from "./assets/rikinho-os-anonimizada.png";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  Cpu,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Palette,
  Globe,
  Users,
  LayoutDashboard,
  Wrench,
  Boxes,
  Wallet,
  FileBarChart,
  MessageCircle,
  ShieldCheck,
  Building2,
  Repeat,
  Rocket,
  Network,
  Store,
  Mail,
} from "lucide-react";

/* ------------------------------------------------------------------
   AutoCore — plataforma white-label de gestão para oficinas
   Dois ambientes: plataforma da oficina + painel administrativo

   Tokens
   bg:            #FFFFFF
   bg-soft:       #F6F8FC
   bg-tint:       #EEF3FF
   azul:          #2354E6
   azul-escuro:   #0F1729
   azul-claro:    #5B8DEF
   texto-suave:   #64748B
   linha:         #E6EBF5
   Display: Space Grotesk / Corpo: Inter
------------------------------------------------------------------- */

const FONT_ID = "autocore-fonts";
function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Geist:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const COLORS = {
  blue: "#2354E6",
  blueDark: "#173BAA",
  blueLight: "#5B8DEF",
  navy: "#0F1729",
  muted: "#64748B",
  line: "#E6EBF5",
  soft: "#F6F8FC",
  tint: "#EEF3FF",
};

const WHATSAPP_URL = "https://wa.me/5511925592834?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20demonstra%C3%A7%C3%A3o%20da%20plataforma.";

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      style={{ scaleX, background: COLORS.blue }}
    />
  );
}

function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const points = Array.from({ length: 34 }, (_, i) => ({
      x: ((i * 73) % 101) / 100,
      y: ((i * 47) % 97) / 96,
      phase: i * 0.71,
    }));
    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const nodes = points.map((point) => ({
        x: point.x * width + Math.sin(time * 0.0002 + point.phase) * 13,
        y: point.y * height + Math.cos(time * 0.00016 + point.phase) * 10,
      }));

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (distance < 175) {
            context.strokeStyle = `rgba(35,84,230,${(1 - distance / 175) * 0.14})`;
            context.beginPath();
            context.moveTo(nodes[i].x, nodes[i].y);
            context.lineTo(nodes[j].x, nodes[j].y);
            context.stroke();
          }
        }
      }

      nodes.forEach((node, i) => {
        context.fillStyle = i % 7 === 0 ? "rgba(35,84,230,.6)" : "rgba(91,141,239,.3)";
        context.beginPath();
        context.arc(node.x, node.y, i % 7 === 0 ? 2.4 : 1.4, 0, Math.PI * 2);
        context.fill();
      });
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    observer.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reduceMotion]);

  return <canvas ref={ref} aria-hidden="true" className="canvas-network pointer-events-none absolute inset-0 h-full w-full" />;
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm font-medium transition-colors"
      style={{ color: COLORS.muted }}
      onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.navy)}
      onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.muted)}
    >
      {children}
    </a>
  );
}

function BrandMark() {
  return (
    <motion.div
      whileHover={{ rotate: 90, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="grid h-8 w-8 grid-cols-2 gap-[3px] rounded-[9px] p-[6px]"
      style={{ background: COLORS.blue }}
      aria-hidden="true"
    >
      <span className="rounded-[2px] bg-white" />
      <span className="rounded-[2px] bg-white/45" />
      <span className="rounded-[2px] bg-white/45" />
      <span className="rounded-[2px] bg-white" />
    </motion.div>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.52 2 2.03 6.48 2.03 12c0 1.75.46 3.45 1.35 4.95L2 22l5.18-1.36A9.94 9.94 0 0 0 12.04 22c5.52 0 10.01-4.48 10.01-10S17.56 2 12.04 2Zm5.85 14.11c-.25.7-1.47 1.34-2.04 1.43-.52.08-1.17.11-1.89-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5.01-4.37-5.16-4.57-.15-.2-1.23-1.64-1.23-3.13s.78-2.22 1.06-2.53c.28-.3.61-.38.81-.38h.58c.19 0 .44-.07.69.53.25.61.86 2.1.94 2.25.08.15.13.33.03.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.3.31-.13.61.18.3.78 1.28 1.67 2.07 1.15 1.02 2.11 1.34 2.42 1.49.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.68-.15.28.1 1.77.84 2.07.99.3.15.5.23.58.36.08.13.08.73-.17 1.43Z" />
    </svg>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="relative px-4 py-2.5 text-sm font-medium transition-colors sm:px-5"
      style={{ color: active ? COLORS.blue : COLORS.muted }}
    >
      {children}
      {active && (
        <motion.div
          layoutId="tab-underline"
          className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full"
          style={{ background: COLORS.blue }}
        />
      )}
    </motion.button>
  );
}

function FaqItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div layout className="border-b" style={{ borderColor: COLORS.line }}>
      <motion.button whileTap={{ scale: 0.995 }} onClick={onClick} className="flex w-full items-center justify-between py-5 text-left">
        <span className="text-base font-medium" style={{ color: COLORS.navy }}>
          {q}
        </span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} style={{ color: COLORS.muted }} />
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- hero mockup: oficina <-> administração ---------- */

function HeroMock() {
  const [view, setView] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => setView((v) => (v + 1) % 2), 3200);
    return () => clearInterval(t);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, rotateX: 1.5, rotateY: -1.5 }}
      className="product-window w-full overflow-hidden rounded-2xl border"
      style={{ borderColor: COLORS.line, background: "#FFFFFF" }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: COLORS.line, background: COLORS.soft }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#F87171" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FBBF24" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#34D399" }} />
        </div>
        <div className="flex gap-1 rounded-full p-1" style={{ background: "#fff", border: `1px solid ${COLORS.line}` }}>
          {["Plataforma da oficina", "Painel administrativo"].map((label, i) => (
            <button
              key={label}
              onClick={() => setView(i)}
              className="rounded-full px-3 py-1 text-[11px] font-medium transition-colors"
              style={{
                background: view === i ? COLORS.blue : "transparent",
                color: view === i ? "#fff" : COLORS.muted,
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="w-6" />
      </div>

      <AnimatePresence mode="wait">
        {view === 0 ? (
          <motion.div
            key="web"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Atendimentos abertos", value: "14" },
                { label: "Orçamentos pendentes", value: "6" },
                { label: "OS aguardando peça", value: "2" },
              ].map((k) => (
                <div key={k.label} className="rounded-xl p-3" style={{ background: COLORS.tint }}>
                  <div className="text-[11px]" style={{ color: COLORS.muted }}>{k.label}</div>
                  <div className="mt-1 text-lg font-semibold" style={{ color: COLORS.navy }}>{k.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {[
                { cliente: "Marcos Aurélio", veiculo: "Onix • ABC-1D23", status: "Em execução", cor: "#2354E6" },
                { cliente: "Fernanda Lima", veiculo: "HB20 • QOL-9C03", status: "Aguardando aprovação", cor: "#D97706" },
                { cliente: "Carlos Eduardo", veiculo: "Strada • MTB-1150", status: "Concluída", cor: "#16A34A" },
              ].map((r) => (
                <div
                  key={r.cliente}
                  className="flex items-center justify-between rounded-lg border px-3 py-2.5"
                  style={{ borderColor: COLORS.line }}
                >
                  <div>
                    <div className="text-sm font-medium" style={{ color: COLORS.navy }}>{r.cliente}</div>
                    <div className="text-xs" style={{ color: COLORS.muted }}>{r.veiculo}</div>
                  </div>
                  <span className="text-xs font-medium" style={{ color: r.cor }}>{r.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Oficinas ativas", value: "37" },
                { label: "Domínios verificados", value: "31" },
                { label: "Usuários na rede", value: "212" },
              ].map((k) => (
                <div key={k.label} className="rounded-xl p-3" style={{ background: COLORS.tint }}>
                  <div className="text-[11px]" style={{ color: COLORS.muted }}>{k.label}</div>
                  <div className="mt-1 text-lg font-semibold" style={{ color: COLORS.navy }}>{k.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {[
                { nome: "Oficina Central Motors", dominio: "central.suarede.com", status: "Ativa", cor: "#16A34A" },
                { nome: "Retífica Bom Sinal", dominio: "bomsinal.suarede.com", status: "Em teste", cor: "#2354E6" },
                { nome: "Auto Peças Vetor", dominio: "vetor.suarede.com", status: "Suspensa", cor: "#DC2626" },
              ].map((r) => (
                <div
                  key={r.nome}
                  className="flex items-center justify-between rounded-lg border px-3 py-2.5"
                  style={{ borderColor: COLORS.line }}
                >
                  <div>
                    <div className="text-sm font-medium" style={{ color: COLORS.navy }}>{r.nome}</div>
                    <div className="text-xs" style={{ color: COLORS.muted }}>{r.dominio}</div>
                  </div>
                  <span className="text-xs font-medium" style={{ color: r.cor }}>{r.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- white-label brand-swap signature element ---------- */

const brandPresets = [
  { name: "Central Motors", initials: "CM", color: "#2354E6" },
  { name: "Oficina Vetor", initials: "OV", color: "#B45309" },
  { name: "RetíficaPro", initials: "RP", color: "#15803D" },
];

function BrandSwapDemo() {
  const [i, setI] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => setI((v) => (v + 1) % brandPresets.length), 2600);
    return () => clearInterval(t);
  }, [reduceMotion]);
  const preset = brandPresets[i];

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border shadow-xl" style={{ borderColor: COLORS.line }}>
      <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: COLORS.line, background: COLORS.soft }}>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#F87171" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FBBF24" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#34D399" }} />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={preset.name + "-domain"}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className="text-xs font-medium"
            style={{ color: COLORS.muted }}
          >
            {preset.name.toLowerCase().replace(/\s/g, "")}.suarede.com
          </motion.span>
        </AnimatePresence>
        <div className="w-6" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={preset.initials}
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 8 }}
              transition={{ duration: 0.35 }}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-sm font-semibold text-white"
              style={{ background: preset.color }}
            >
              {preset.initials}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span
              key={preset.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.3 }}
              className="display text-lg font-semibold"
              style={{ color: COLORS.navy }}
            >
              {preset.name}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex gap-2">
          {["Nova ordem", "Orçamento", "Financeiro"].map((label) => (
            <motion.button
              key={label}
              animate={{ borderColor: preset.color, color: preset.color }}
              transition={{ duration: 0.3 }}
              className="rounded-lg border px-3 py-1.5 text-xs font-medium"
            >
              {label}
            </motion.button>
          ))}
        </div>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full" style={{ background: COLORS.line }}>
          <motion.div
            animate={{ background: preset.color }}
            transition={{ duration: 0.3 }}
            className="h-full w-2/3 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- data ---------- */

const facts = [
  { icon: Network, value: "2", label: "ambientes conectados" },
  { icon: Users, value: "3", label: "papéis de acesso" },
  { icon: LayoutDashboard, value: "12", label: "módulos operacionais" },
  { icon: Globe, value: "100%", label: "identidade white-label" },
];

const workshopItems = [
  { icon: LayoutDashboard, text: "Dashboard com fila de atendimentos e projeção financeira" },
  { icon: Wrench, text: "Orçamento, ordem de serviço e execução conectados" },
  { icon: Boxes, text: "Catálogo, estoque e fornecedores" },
  { icon: Store, text: "PDV para venda rápida de balcão" },
  { icon: Wallet, text: "Financeiro com contas a pagar e a receber" },
  { icon: FileBarChart, text: "Relatórios e documentos em PDF" },
  { icon: MessageCircle, text: "Lembretes de pós-venda via WhatsApp" },
  { icon: ShieldCheck, text: "Autenticação em dois fatores e papéis de acesso" },
];

const adminItems = [
  { icon: Building2, text: "Criação e administração de oficinas (tenants)" },
  { icon: Palette, text: "Identidade visual: nome, logotipo, cores e imagem" },
  { icon: Globe, text: "Domínio próprio com verificação de DNS" },
  { icon: Users, text: "Usuários, cargos e permissões por oficina" },
  { icon: LayoutDashboard, text: "Visão consolidada da rede de oficinas" },
  { icon: FileBarChart, text: "Logs de atividade e rastreabilidade" },
];

const flow = ["Cliente", "Veículo", "Orçamento", "Aprovação", "Ordem de serviço", "Venda", "Financeiro", "Pós-venda"];

const diferenciais = [
  { icon: Palette, title: "Produto com a marca do parceiro", desc: "Nome, logotipo, cores, domínio e documentos personalizados por operação." },
  { icon: Network, title: "Gestão multi-tenant de verdade", desc: "Oficinas, usuários e dados tratados por tenant, sem misturar operações." },
  { icon: Wrench, title: "Jornada completa da oficina", desc: "Atendimento, orçamento, ordem de serviço, estoque, PDV e financeiro conectados." },
  { icon: Building2, title: "Administração centralizada", desc: "Cadastre oficinas, controle acessos e acompanhe a rede em um painel único." },
  { icon: Repeat, title: "Receita recorrente para quem distribui", desc: "Base tecnológica para comercializar assinaturas e planos sob marca própria." },
  { icon: Rocket, title: "Entrada mais rápida no mercado", desc: "Comece com uma operação funcional e foque em vendas e relacionamento." },
];

const audiences = [
  { icon: Cpu, title: "Empresas de tecnologia", desc: "Software houses que querem lançar uma oferta vertical pronta para o setor automotivo." },
  { icon: Network, title: "Redes e franquias", desc: "Grupos que precisam padronizar a gestão sem misturar os dados de cada oficina." },
  { icon: Store, title: "Distribuidores e fornecedores", desc: "Empresas que querem ampliar o valor entregue à sua base de clientes." },
  { icon: Users, title: "Consultorias automotivas", desc: "Especialistas que desejam unir método, implantação e tecnologia sob a própria marca." },
  { icon: Repeat, title: "Novas operações SaaS", desc: "Negócios que buscam criar receita recorrente sem desenvolver uma plataforma do zero." },
  { icon: Building2, title: "Marcas com várias oficinas", desc: "Operações que precisam centralizar acesso, suporte e visão da rede." },
];

const workshopBrands = [
  { name: "Rikinho Auto Center", primary: "RIKINHO", secondary: "AUTO CENTER", color: "#E30613", background: "#0B0B0D", markColor: "#E30613", mark: 0 },
  { name: "Central Motors", primary: "CENTRAL", secondary: "MOTORS", color: "#0F766E", mark: 1 },
  { name: "Oficina Vetor", primary: "VETOR", secondary: "OFICINA", color: "#B45309", mark: 2 },
  { name: "Box 77 Garage", primary: "BOX 77", secondary: "GARAGE", color: "#7C3AED", mark: 3 },
  { name: "Prime Car Service", primary: "PRIME", secondary: "CAR SERVICE", color: "#BE123C", mark: 4 },
  { name: "AutoTech Centro", primary: "AUTOTECH", secondary: "CENTRO AUTOMOTIVO", color: "#0369A1", mark: 5 },
  { name: "Garage Norte", primary: "GARAGE", secondary: "NORTE", color: "#047857", mark: 6 },
  { name: "MotorLab", primary: "MOTORLAB", secondary: "PERFORMANCE", color: "#4338CA", mark: 7 },
  { name: "ViaCar Oficina", primary: "VIACAR", secondary: "OFICINA", color: "#C2410C", mark: 8 },
  { name: "Ponto Motor", primary: "PONTO", secondary: "MOTOR", color: "#334155", mark: 9 },
];

function WorkshopLogo({ brand }: { brand: (typeof workshopBrands)[number] }) {
  const marks = [
    <path key="speed" d="M8 27h11l7-12h10l-5 7h7L25 35H12l6-8Z" fill="currentColor" />,
    <path key="central" d="M34 17a12 12 0 1 0 0 14M17 24h14" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />,
    <path key="vector" d="m12 34 12-22 12 22-12-7-12 7Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />,
    <text key="box" x="24" y="30" fill="currentColor" fontSize="17" fontWeight="800" textAnchor="middle">77</text>,
    <path key="prime" d="M14 35V13h12c7 0 11 3 11 9s-4 9-11 9h-6v4h-6Zm6-10h6c3 0 5-1 5-3s-2-3-5-3h-6v6Z" fill="currentColor" />,
    <path key="tech" d="m24 10 13 7v14l-13 7-13-7V17l13-7Zm0 8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" fill="currentColor" fillRule="evenodd" />,
    <path key="garage" d="m10 24 14-11 14 11v12h-6v-8H16v8h-6V24Zm8 8h12" fill="currentColor" />,
    <path key="lab" d="M8 26h7l3-9 6 17 5-13 4 5h7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
    <path key="road" d="M11 13h7l6 22 6-22h7L28 38h-8L11 13Zm13 5v11" fill="currentColor" />,
    <path key="point" d="M24 9a15 15 0 1 0 0 30 15 15 0 0 0 0-30Zm0 9a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" fill="currentColor" fillRule="evenodd" />,
  ];

  return (
    <div className="flex items-center gap-3" aria-label={brand.name}>
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12 shrink-0"
        style={{ color: "markColor" in brand ? brand.markColor : "#FFFFFF" }}
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="13" fill={"background" in brand ? brand.background : brand.color} />
        {marks[brand.mark]}
      </svg>
      <div className="leading-none">
        <div className="text-[15px] font-bold tracking-[-.035em]" style={{ color: COLORS.navy }}>{brand.primary}</div>
        <div className="mt-1 text-[9px] font-semibold tracking-[.2em]" style={{ color: brand.color }}>{brand.secondary}</div>
      </div>
    </div>
  );
}

function WorkshopCarousel() {
  const reduceMotion = useReducedMotion();

  const brandGroup = (duplicate = false) => (
    <div className="flex gap-4 pr-4" aria-hidden={duplicate || undefined}>
      {workshopBrands.map((brand) => (
        <motion.div
          key={`${duplicate ? "duplicate-" : ""}${brand.name}`}
          whileHover={{ y: -6, scale: 1.025, borderColor: brand.color, boxShadow: "0 18px 45px rgba(15,23,41,.12)" }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
          className="group flex w-[260px] shrink-0 cursor-default items-center rounded-2xl border bg-white p-4"
          style={{ borderColor: COLORS.line }}
        >
          <WorkshopLogo brand={brand} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-b py-14" style={{ borderColor: COLORS.line }} aria-label="Identidades de oficinas demonstradas na plataforma">
      <div className="mx-auto mb-8 max-w-6xl px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[.18em]" style={{ color: COLORS.blue }}>Sua marca em operação</p>
        <h2 className="display mt-2 text-xl font-semibold tracking-tight sm:text-2xl">Uma plataforma, diferentes identidades de oficina</h2>
      </div>
      <div className="brand-marquee overflow-hidden">
        <motion.div
          className="flex w-max"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 34, ease: "linear", repeat: Infinity }}
        >
          {brandGroup()}
          {brandGroup(true)}
        </motion.div>
      </div>
    </section>
  );
}

function FinancialShowcase() {
  return (
    <section className="relative overflow-hidden py-24" style={{ background: COLORS.navy }}>
      <div className="technical-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <Reveal>
            <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-red-500">Na prática</span>
            <h2 className="display mt-3 max-w-lg text-3xl font-semibold tracking-tight text-white md:text-4xl">
              O financeiro da oficina em uma visão única
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400 lg:ml-auto">
              Fluxo de caixa, entradas, saídas, receitas, despesas e projeções reunidos em um painel com a identidade da Rikinho Auto Center.
            </p>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: .97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 rounded-[22px] bg-gradient-to-br from-red-500 via-red-700 to-black p-[2px] shadow-[0_40px_100px_rgba(0,0,0,.45)]"
        >
          <div className="overflow-hidden rounded-[20px] bg-black p-2 sm:p-3">
            <div className="relative aspect-[1909/830] overflow-hidden rounded-xl bg-[#f4f1ec]">
              <img
                src={rikinhoFinanceiro}
                alt="Painel financeiro da Rikinho Auto Center com fluxo de caixa, receitas, despesas e projeção financeira"
                width="1909"
                height="967"
                loading="lazy"
                className="absolute inset-x-0 top-0 h-auto w-full"
              />
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 -top-5 hidden rounded-xl border border-red-500/30 bg-black/90 px-4 py-3 text-white shadow-xl backdrop-blur sm:block"
          >
            <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-red-500">Marca aplicada</div>
            <div className="mt-1 text-sm font-semibold">Rikinho Auto Center</div>
          </motion.div>
        </motion.div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {["Fluxo de caixa diário", "Categorias de receitas e despesas", "Projeção de saldo e compromissos"].map((item, i) => (
            <Reveal key={item} delay={i * .06}>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-slate-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-[10px] font-bold text-red-500">0{i + 1}</span>
                {item}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceOrderShowcase() {
  const highlights = [
    "Fila organizada por etapa",
    "Busca por OS, cliente ou veículo",
    "Status atualizado em uma visão",
  ];

  return (
    <section className="relative overflow-hidden border-b py-24" style={{ borderColor: COLORS.line }}>
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-red-100/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr] lg:items-center">
          <Reveal>
            <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-red-600">
              Controle de pátio
            </span>
            <h2 className="display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Cada ordem de serviço no lugar certo
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
              Acompanhe a fila da oficina e identifique rapidamente o que aguarda aprovação,
              o que está em execução e o que já pode ser liberado.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .08 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-[10px] font-bold text-red-600">
                    0{i + 1}
                  </span>
                  {item}
                </motion.div>
              ))}
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 42, scale: .98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="relative rounded-[22px] bg-gradient-to-br from-red-500 via-red-700 to-black p-[2px] shadow-[0_32px_80px_rgba(15,23,41,.2)]"
          >
            <div className="overflow-hidden rounded-[20px] bg-black p-2 sm:p-3">
              <div className="relative aspect-[1762/760] overflow-hidden rounded-xl bg-[#f4f1ec]">
                <img
                  src={rikinhoOs}
                  alt="Quadro de controle de ordens de serviço da Rikinho Auto Center, com dados anonimizados"
                  width="1762"
                  height="892"
                  loading="lazy"
                  className="absolute inset-x-0 top-0 h-auto w-full"
                />
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 right-5 hidden rounded-xl border border-red-500/25 bg-black/90 px-4 py-3 text-white shadow-xl backdrop-blur sm:block"
            >
              <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-red-500">Visão operacional</div>
              <div className="mt-1 text-sm font-semibold">23 itens na semana</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "A plataforma aparece com a minha marca?", a: "Sim. Nome, logotipo, cores, imagem, subdomínio e domínio personalizado podem ser configurados por operação." },
  { q: "Cada oficina tem seus próprios dados?", a: "Sim. A arquitetura é multi-tenant e associa usuários, configurações e registros operacionais à oficina correspondente." },
  { q: "Posso administrar várias oficinas?", a: "Sim. O painel administrativo centraliza o cadastro, a identidade, os domínios, os usuários e a visão operacional de cada oficina." },
  { q: "A oficina consegue controlar toda a rotina?", a: "A plataforma já contempla clientes, veículos, atendimentos, orçamentos, ordens de serviço, mecânicos, catálogo, estoque, fornecedores, PDV, financeiro, relatórios e pós-venda." },
  { q: "Posso usar um domínio próprio?", a: "Sim. O painel administrativo permite cadastrar e verificar o DNS de um domínio personalizado para a oficina." },
  { q: "Existem diferentes níveis de acesso?", a: "Sim. A operação trabalha com os papéis Owner, Administrador e Colaborador, além do acesso exclusivo do administrador master." },
];

/* ---------- main ---------- */

export default function AutoCoreLanding() {
  useFonts();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [prodTab, setProdTab] = useState(0);

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ background: "#FFFFFF", color: COLORS.navy, fontFamily: "'Manrope', sans-serif" }}>
      <ScrollProgress />
      <style>{`
        * { box-sizing: border-box; }
        .display { font-family: 'Geist', sans-serif; }
        ::selection { background: ${COLORS.blue}; color: #fff; }
        .btn-primary { background: ${COLORS.blue}; color: #fff; box-shadow: 0 10px 28px rgba(35,84,230,.22); }
        .btn-primary:hover { background: ${COLORS.blueDark}; transform: translateY(-1px); }
        .canvas-network { mask-image: linear-gradient(to bottom, black 60%, transparent 100%); }
        .hero-grid { background-image: linear-gradient(rgba(35,84,230,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(35,84,230,.055) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse 75% 80% at 70% 40%, black, transparent); }
        .product-window { box-shadow: 0 36px 90px rgba(15,23,41,.15), 0 8px 28px rgba(35,84,230,.08); transform-style: preserve-3d; }
        .technical-card { position: relative; overflow: hidden; }
        .technical-card::before { content: ''; position: absolute; inset: 0 auto auto 0; width: 36px; height: 2px; background: ${COLORS.blue}; transition: width .35s ease; }
        .technical-card:hover::before { width: 100%; background: rgba(255,255,255,.8); }
        .technical-grid { background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 32px 32px; }
        .brand-marquee { mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; } }
      `}</style>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b backdrop-blur" style={{ borderColor: COLORS.line, background: "rgba(255,255,255,0.85)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <BrandMark />
            <span className="display text-lg font-semibold tracking-tight">AutoCore</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink href="#produto">Produto</NavLink>
            <NavLink href="#como-funciona">Como funciona</NavLink>
            <NavLink href="#diferenciais">Diferenciais</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <motion.a whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              Agendar demonstração
            </motion.a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t px-6 md:hidden"
              style={{ borderColor: COLORS.line }}
            >
              <div className="flex flex-col gap-4 py-4">
                <NavLink href="#produto">Produto</NavLink>
                <NavLink href="#como-funciona">Como funciona</NavLink>
                <NavLink href="#diferenciais">Diferenciais</NavLink>
                <NavLink href="#faq">FAQ</NavLink>
                <motion.a whileTap={{ scale: 0.98 }} href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary rounded-lg px-4 py-2 text-center text-sm font-medium">
                  Agendar demonstração
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b" style={{ borderColor: COLORS.line }}>
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <NetworkCanvas />
        <motion.div
          aria-hidden="true"
          className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl"
          style={{ background: "rgba(91,141,239,.16)" }}
          animate={{ scale: [1, 1.12, 1], x: [0, -22, 0], y: [0, 16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[.82fr_1.18fr] lg:py-24">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.14em] backdrop-blur"
              style={{ borderColor: COLORS.line, color: COLORS.blue }}
            >
              <motion.span className="h-1.5 w-1.5 rounded-full" style={{ background: COLORS.blue }} animate={{ opacity: [1, .35, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
              Plataforma white-label para oficinas
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="display text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[4.65rem]"
            >
              Lance sua própria <span className="bg-gradient-to-r from-[#2354E6] to-[#5B8DEF] bg-clip-text text-transparent">plataforma de gestão</span> para oficinas
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-7 max-w-xl text-base leading-relaxed lg:mx-0 lg:text-lg"
              style={{ color: COLORS.muted }}
            >
              Entregue um sistema completo com a sua marca, suas cores e seu domínio — enquanto
              você controla oficinas, acessos e toda a operação em um único painel administrativo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary group flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all">
                Quero conhecer a plataforma
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#como-funciona" className="rounded-lg border bg-white/70 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-white" style={{ borderColor: COLORS.line, color: COLORS.navy }}>
                Ver como funciona
              </motion.a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }} className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs lg:justify-start" style={{ color: COLORS.muted }}>
              {["Marca própria", "Dados separados", "Operação centralizada"].map((item) => (
                <span key={item} className="flex items-center gap-1.5"><CheckCircle2 size={13} style={{ color: COLORS.blue }} />{item}</span>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .2, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-2xl">
            <motion.div className="absolute -left-5 -top-7 z-20 hidden rounded-xl border bg-white/90 px-3 py-2 shadow-lg backdrop-blur sm:block" style={{ borderColor: COLORS.line }} animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <div className="text-[10px] uppercase tracking-wider" style={{ color: COLORS.muted }}>Rede ativa</div>
              <div className="mt-0.5 flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 rounded-full bg-emerald-500" />37 oficinas</div>
            </motion.div>
            <motion.div className="absolute -bottom-6 -right-3 z-20 hidden rounded-xl border bg-white/90 px-3 py-2 shadow-lg backdrop-blur sm:block" style={{ borderColor: COLORS.line }} animate={{ y: [0, 8, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
              <div className="text-[10px] uppercase tracking-wider" style={{ color: COLORS.muted }}>Identidade</div>
              <div className="mt-0.5 flex items-center gap-2 text-sm font-semibold"><Palette size={14} style={{ color: COLORS.blue }} />100% white-label</div>
            </motion.div>
            <HeroMock />
          </motion.div>
        </div>
      </section>

      {/* FACTS BAR */}
      <section style={{ background: COLORS.navy }} className="technical-grid relative overflow-hidden py-5">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 md:grid-cols-4">
          {facts.map((s) => (
            <Reveal key={s.label} className="border-white/10 px-5 py-7 even:border-l md:border-l md:first:border-l-0">
              <motion.div whileHover={{ x: 4 }} className="flex items-center gap-4 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <s.icon size={18} color={COLORS.blueLight} />
                </div>
                <div>
                  <div className="display text-2xl font-semibold text-white">{s.value}</div>
                  <div className="mt-0.5 text-xs" style={{ color: "#94A3C4" }}>{s.label}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <WorkshopCarousel />

      {/* PROBLEMA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Reveal>
          <span className="text-xs font-semibold tracking-widest" style={{ color: COLORS.blue }}>
            O DESAFIO
          </span>
          <h2 className="display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Seus clientes precisam de gestão. Você não precisa começar do zero.
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: COLORS.muted }}>
            Desenvolver um sistema completo exige tempo, equipe especializada e manutenção
            contínua. A solução white-label oferece a base para entrar no mercado com uma
            experiência própria e foco no crescimento comercial.
          </p>
        </Reveal>
      </section>

      {/* PARA QUEM É */}
      <section className="relative overflow-hidden py-24" style={{ background: COLORS.tint }}>
        <div aria-hidden="true" className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border-[48px] opacity-40" style={{ borderColor: "#DDE7FF" }} />
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <span className="text-xs font-semibold tracking-widest" style={{ color: COLORS.blue }}>
              PARA QUEM É
            </span>
            <h2 className="display mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              Para quem quer transformar presença no setor automotivo em uma plataforma
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: COLORS.muted }}>
              Você administra a rede e constrói a relação comercial. Cada oficina recebe seu
              próprio ambiente, equipe, identidade e dados operacionais.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.06}>
                <motion.div
                  whileHover={{
                    y: -9,
                    scale: 1.02,
                    color: "#FFFFFF",
                    backgroundColor: COLORS.blue,
                    borderColor: COLORS.blue,
                    boxShadow: "0 24px 60px rgba(35,84,230,.28)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="technical-card group h-full cursor-default rounded-2xl border bg-white p-6 shadow-[0_8px_30px_rgba(15,23,41,.04)]"
                  style={{ borderColor: COLORS.line }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3FF] transition-colors duration-300 group-hover:bg-white">
                      <item.icon size={18} className="text-[#2354E6]" />
                    </div>
                    <span className="text-xs font-medium tracking-widest text-[#B5C0D3] transition-colors duration-300 group-hover:text-white/55">0{i + 1}</span>
                  </div>
                  <h3 className="display mt-5 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B] transition-colors duration-300 group-hover:text-white/75">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOIS PRODUTOS, UMA OPERAÇÃO */}
      <section id="produto" style={{ background: COLORS.soft }} className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <span className="text-xs font-semibold tracking-widest" style={{ color: COLORS.blue }}>
              DOIS PRODUTOS, UMA OPERAÇÃO
            </span>
            <h2 className="display mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              Um ambiente para a oficina. Um painel para quem opera a rede.
            </h2>
          </Reveal>

          <div className="mx-auto mt-10 flex w-fit flex-wrap justify-center gap-1 rounded-xl border bg-white p-1 shadow-sm" style={{ borderColor: COLORS.line }}>
            <TabButton active={prodTab === 0} onClick={() => setProdTab(0)}>Plataforma da oficina</TabButton>
            <TabButton active={prodTab === 1} onClick={() => setProdTab(1)}>Painel administrativo</TabButton>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={prodTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2"
            >
              {(prodTab === 0 ? workshopItems : adminItems).map((it) => (
                <motion.div key={it.text} whileHover={{ x: 5, borderColor: COLORS.blueLight }} className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow-[0_5px_20px_rgba(15,23,41,.025)]" style={{ borderColor: COLORS.line }}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: COLORS.tint }}>
                    <it.icon size={16} style={{ color: COLORS.blue }} />
                  </div>
                  <span className="text-sm leading-snug" style={{ color: COLORS.navy }}>{it.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <FinancialShowcase />

      {/* WHITE-LABEL */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <span className="text-xs font-semibold tracking-widest" style={{ color: COLORS.blue }}>
              WHITE-LABEL
            </span>
            <h2 className="display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A tecnologia é nossa. A experiência é da sua marca.
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
              Cada oficina pode operar com identidade própria — sem que o cliente saiba
              qual tecnologia está por trás.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {["Nome público e logotipo", "Cores primária e secundária", "Domínio ou subdomínio próprio", "Documentos e e-mails com a identidade da oficina"].map((it) => (
                <li key={it} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} style={{ color: COLORS.blue }} />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center">
            <BrandSwapDemo />
          </Reveal>
        </div>
      </section>

      {/* FLUXO DA OFICINA */}
      <section id="como-funciona" style={{ background: COLORS.soft }} className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <span className="text-xs font-semibold tracking-widest" style={{ color: COLORS.blue }}>
              COMO FUNCIONA
            </span>
            <h2 className="display mx-auto mt-3 max-w-lg text-3xl font-semibold tracking-tight md:text-4xl">
              Um único fluxo, do atendimento ao pós-venda
            </h2>
          </Reveal>

          <Reveal className="hide-scrollbar mt-14 overflow-x-auto overscroll-x-contain">
            <div className="mx-auto flex w-max items-center gap-1 px-2">
              {flow.map((step, i) => (
                <React.Fragment key={step}>
                  <motion.div
                    whileHover={{ y: -5, borderColor: COLORS.blueLight }}
                    className="flex min-w-[112px] flex-col items-center rounded-xl border bg-white px-3 py-4 text-center shadow-[0_6px_20px_rgba(15,23,41,.035)]"
                    style={{ borderColor: COLORS.line }}
                  >
                    <span
                      className="mb-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold"
                      style={{ background: COLORS.tint, color: COLORS.blue }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium" style={{ color: COLORS.navy }}>{step}</span>
                  </motion.div>
                  {i < flow.length - 1 && (
                    <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, delay: i * .12, repeat: Infinity }}>
                      <ArrowRight size={16} style={{ color: COLORS.blueLight }} className="shrink-0" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceOrderShowcase />

      {/* DIFERENCIAIS */}
      <section id="diferenciais" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <Reveal className="text-center">
          <span className="text-xs font-semibold tracking-widest" style={{ color: COLORS.blue }}>
            DIFERENCIAIS
          </span>
          <h2 className="display mx-auto mt-3 max-w-lg text-3xl font-semibold tracking-tight md:text-4xl">
            Por que construir sobre a AutoCore
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-2xl border p-6"
                style={{ borderColor: COLORS.line }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: COLORS.tint }}>
                  <f.icon size={18} style={{ color: COLORS.blue }} />
                </div>
                <h3 className="display text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORS.muted }}>{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DEMONSTRAÇÃO */}
      <section id="demonstracao" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24">
        <Reveal>
          <div className="technical-grid relative overflow-hidden rounded-3xl border border-white/10 px-8 py-20 text-center shadow-[0_35px_90px_rgba(15,23,41,.22)]" style={{ background: COLORS.navy }}>
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "rgba(91,141,239,0.35)" }}
            />
            <motion.div aria-hidden="true" className="absolute left-8 top-8 h-3 w-3 border-l border-t border-white/40" animate={{ opacity: [.3, 1, .3] }} transition={{ duration: 2.4, repeat: Infinity }} />
            <motion.div aria-hidden="true" className="absolute bottom-8 right-8 h-3 w-3 border-b border-r border-white/40" animate={{ opacity: [1, .3, 1] }} transition={{ duration: 2.4, repeat: Infinity }} />
            <h2 className="display mx-auto max-w-xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Veja sua marca funcionando na plataforma
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm" style={{ color: "#94A3C4" }}>
              Agende uma demonstração e conheça a experiência da oficina e o painel que
              controla toda a operação white-label.
            </p>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
            >
              <WhatsAppIcon />
              Agendar demonstração
            </motion.a>
            <div className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-slate-300 sm:flex-row sm:gap-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:border-[#25D366]/40 hover:bg-white/10 hover:text-white">
                <span className="text-[#25D366]"><WhatsAppIcon size={17} /></span>
                WhatsApp · 11 92559-2834
              </a>
              <a href="mailto:developerandreo@gmail.com" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:border-blue-400/40 hover:bg-white/10 hover:text-white">
                <Mail size={17} style={{ color: COLORS.blueLight }} />
                Enviar e-mail
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: COLORS.soft }} className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal className="text-center">
            <span className="text-xs font-semibold tracking-widest" style={{ color: COLORS.blue }}>
              PERGUNTAS FREQUENTES
            </span>
            <h2 className="display mx-auto mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Ficou com alguma dúvida?
            </h2>
          </Reveal>
          <LayoutGroup>
            <div className="mt-10">
              {faqs.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} />
              ))}
            </div>
          </LayoutGroup>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t" style={{ borderColor: COLORS.line }}>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <BrandMark />
                <span className="display text-base font-semibold">AutoCore</span>
              </div>
              <p className="mt-3 max-w-xs text-sm" style={{ color: COLORS.muted }}>
                Plataforma white-label de gestão para oficinas, com identidade e domínio
                próprios para cada operação.
              </p>
              <div className="mt-4 flex flex-col items-start gap-2 text-sm">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-2 transition-colors hover:bg-slate-50" style={{ borderColor: COLORS.line, color: COLORS.muted }}>
                  <span className="text-[#25D366]"><WhatsAppIcon size={17} /></span>
                  WhatsApp · 11 92559-2834
                </a>
                <a href="mailto:developerandreo@gmail.com" className="inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-2 transition-colors hover:bg-slate-50" style={{ borderColor: COLORS.line, color: COLORS.muted }}>
                  <Mail size={17} style={{ color: COLORS.blue }} />
                  Enviar e-mail
                </a>
              </div>
            </div>
            {[
              { title: "Produto", items: ["Plataforma da oficina", "Painel administrativo", "White-label", "Diferenciais"] },
              { title: "Empresa", items: ["Sobre", "Carreiras", "Blog", "Contato"] },
              { title: "Suporte", items: ["Central de ajuda", "Status", "Agendar demonstração"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold">{col.title}</h4>
                <ul className="mt-3 flex flex-col gap-2">
                  {col.items.map((it) => (
                    <li key={it}>
                      <a href="#" className="text-sm" style={{ color: COLORS.muted }}>{it}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row"
            style={{ borderColor: COLORS.line, color: COLORS.muted }}
          >
            <span>© {new Date().getFullYear()} AutoCore. Todos os direitos reservados.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-black">Privacidade</a>
              <a href="#" className="hover:text-black">Termos</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </MotionConfig>
  );
}
