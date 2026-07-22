import React, { useEffect, useState, type ReactNode } from "react";
import { PlatformPreview } from "./components/PlatformPreview";
import iconChart from "./assets/3d-icons/chart.webp";
import iconBag from "./assets/3d-icons/bag.webp";
import iconBulb from "./assets/3d-icons/bulb.webp";
import iconChat from "./assets/3d-icons/chat.webp";
import iconClock from "./assets/3d-icons/clock.webp";
import iconComputer from "./assets/3d-icons/computer.webp";
import iconCreditCard from "./assets/3d-icons/credit-card.webp";
import iconFile from "./assets/3d-icons/file.webp";
import iconFolder from "./assets/3d-icons/folder.webp";
import iconKey from "./assets/3d-icons/key.webp";
import iconLink from "./assets/3d-icons/link.webp";
import iconLock from "./assets/3d-icons/lock.webp";
import iconMegaphone from "./assets/3d-icons/megaphone.webp";
import iconMobile from "./assets/3d-icons/mobile.webp";
import iconMoney from "./assets/3d-icons/money.webp";
import iconNotebook from "./assets/3d-icons/notebook.webp";
import iconPalette from "./assets/3d-icons/palette.webp";
import iconPaintingBrush from "./assets/3d-icons/painting-brush.webp";
import iconRocket from "./assets/3d-icons/rocket.webp";
import iconFlag from "./assets/3d-icons/flag.webp";
import iconSetting from "./assets/3d-icons/setting.webp";
import iconShield from "./assets/3d-icons/shield.webp";
import iconTools from "./assets/3d-icons/tools.webp";
import iconTarget from "./assets/3d-icons/target.webp";
import iconTrophy from "./assets/3d-icons/trophy.webp";
import iconWallet from "./assets/3d-icons/wallet.webp";
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
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Palette,
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

const WHATSAPP_URL =
  "https://wa.me/5511925592834?text=Ol%C3%A1%2C%20quero%20come%C3%A7ar%20a%20oferecer%20a%20plataforma%20com%20a%20minha%20marca.";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
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
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      style={{ scaleX, background: COLORS.blue }}
    />
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-blueprint absolute inset-0" />
      <div className="hero-glow absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full" />

      <motion.svg
        viewBox="0 0 600 600"
        className="hero-wheel absolute -right-52 top-10 h-[34rem] w-[34rem] sm:-right-24 sm:h-[42rem] sm:w-[42rem] lg:-right-16 lg:-top-4 lg:h-[50rem] lg:w-[50rem]"
        animate={{ rotate: 360 }}
        transition={{ duration: 46, ease: "linear", repeat: Infinity }}
      >
        <circle cx="300" cy="300" r="270" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="18 10" />
        <circle cx="300" cy="300" r="225" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="300" cy="300" r="168" fill="rgba(35,84,230,.025)" stroke="currentColor" strokeWidth="2" strokeDasharray="3 12" />
        <g fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round">
          <path d="M300 300 300 145" />
          <path d="M300 300 434 222" />
          <path d="M300 300 434 378" />
          <path d="M300 300 300 455" />
          <path d="M300 300 166 378" />
          <path d="M300 300 166 222" />
        </g>
        <circle cx="300" cy="300" r="62" fill="white" stroke="currentColor" strokeWidth="4" />
        <circle cx="300" cy="300" r="18" fill="currentColor" />
      </motion.svg>

      <svg viewBox="0 0 1440 720" preserveAspectRatio="none" className="hero-road absolute inset-x-0 bottom-0 h-[58%] w-full">
        <g fill="none" stroke="currentColor">
          <path d="M650 0 115 720M790 0 1325 720" strokeWidth="2" />
          <path d="M690 0 510 720M750 0 930 720" strokeWidth="1.5" />
          <path className="hero-road-flow" d="M720 0V720" strokeWidth="4" strokeDasharray="28 38" />
          {[90, 190, 310, 455, 625].map((y) => (
            <path key={y} d={`M${650 - y * 0.74} ${y} H${790 + y * 0.74}`} strokeWidth="1" opacity=".55" />
          ))}
        </g>
      </svg>

      {["01  ATENDIMENTO", "02  SERVIÇO", "03  ENTREGA"].map((label, index) => (
        <motion.span
          key={label}
          className="hero-stage absolute hidden rounded-full border bg-white/70 px-3 py-1.5 font-mono text-[9px] font-semibold tracking-[.14em] text-[#2354E6] backdrop-blur sm:block"
          style={{ left: `${8 + index * 17}%`, top: `${36 + index * 8}%` }}
          animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4 + index, delay: index * 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {label}
        </motion.span>
      ))}
    </div>
  );
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
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.52 2 2.03 6.48 2.03 12c0 1.75.46 3.45 1.35 4.95L2 22l5.18-1.36A9.94 9.94 0 0 0 12.04 22c5.52 0 10.01-4.48 10.01-10S17.56 2 12.04 2Zm5.85 14.11c-.25.7-1.47 1.34-2.04 1.43-.52.08-1.17.11-1.89-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5.01-4.37-5.16-4.57-.15-.2-1.23-1.64-1.23-3.13s.78-2.22 1.06-2.53c.28-.3.61-.38.81-.38h.58c.19 0 .44-.07.69.53.25.61.86 2.1.94 2.25.08.15.13.33.03.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.3.31-.13.61.18.3.78 1.28 1.67 2.07 1.15 1.02 2.11 1.34 2.42 1.49.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.68-.15.28.1 1.77.84 2.07.99.3.15.5.23.58.36.08.13.08.73-.17 1.43Z" />
    </svg>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
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

function FaqItem({
  q,
  a,
  isOpen,
  onClick,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      className="border-b"
      style={{ borderColor: COLORS.line }}
    >
      <motion.button
        whileTap={{ scale: 0.995 }}
        onClick={onClick}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base font-medium" style={{ color: COLORS.navy }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
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
            <p
              className="pb-5 text-sm leading-relaxed"
              style={{ color: COLORS.muted }}
            >
              {a}
            </p>
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
    const t = setInterval(
      () => setI((v) => (v + 1) % brandPresets.length),
      2600,
    );
    return () => clearInterval(t);
  }, [reduceMotion]);
  const preset = brandPresets[i];

  return (
    <div
      className="w-full max-w-md overflow-hidden rounded-2xl border shadow-xl"
      style={{ borderColor: COLORS.line }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: COLORS.line, background: COLORS.soft }}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "#F87171" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "#FBBF24" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "#34D399" }}
          />
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

        <div
          className="mt-5 h-2 w-full overflow-hidden rounded-full"
          style={{ background: COLORS.line }}
        >
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

const workshopItems = [
  {
    icon3d: iconNotebook,
    text: "Visão do que está acontecendo na oficina hoje",
  },
  { icon3d: iconTools, text: "Orçamentos e ordens de serviço no mesmo lugar" },
  { icon3d: iconFolder, text: "Controle de produtos, estoque e fornecedores" },
  { icon3d: iconBag, text: "Venda rápida no balcão" },
  { icon3d: iconWallet, text: "Contas a pagar, a receber e saldo da oficina" },
  { icon3d: iconFile, text: "Relatórios e documentos prontos para enviar" },
  { icon3d: iconChat, text: "Lembretes para clientes pelo WhatsApp" },
  { icon3d: iconShield, text: "Acesso seguro para cada pessoa da equipe" },
];

const adminItems = [
  { icon3d: iconComputer, text: "Cadastro e acompanhamento de todas as oficinas" },
  { icon3d: iconPalette, text: "Nome, logotipo, cores e imagens de cada marca" },
  { icon3d: iconLink, text: "Endereço próprio para acessar a plataforma" },
  { icon3d: iconKey, text: "Controle de quem pode ver e fazer cada tarefa" },
  { icon3d: iconChart, text: "Visão geral de toda a rede em um só lugar" },
  { icon3d: iconClock, text: "Histórico das ações feitas na plataforma" },
];

const flow = [
  "Cliente",
  "Veículo",
  "Orçamento",
  "Aprovação",
  "Ordem de serviço",
  "Venda",
  "Financeiro",
  "Pós-venda",
];

const diferenciais = [
  {
    icon3d: iconPaintingBrush,
    title: "A plataforma leva a sua marca",
    desc: "Use seu nome, logotipo, cores, endereço e documentos.",
  },
  {
    icon3d: iconLock,
    title: "Os dados de cada oficina ficam separados",
    desc: "Uma oficina não vê as informações da outra.",
  },
  {
    icon3d: iconFlag,
    title: "A rotina fica em um só lugar",
    desc: "Do primeiro atendimento ao pagamento e contato depois do serviço.",
  },
  {
    icon3d: iconTrophy,
    title: "Você acompanha todas as oficinas",
    desc: "Cadastre unidades, organize acessos e veja a rede em uma única área.",
  },
  {
    icon3d: iconMoney,
    title: "Você pode vender seus próprios planos",
    desc: "Monte sua oferta e cobre uma assinatura dos seus clientes.",
  },
  {
    icon3d: iconTarget,
    title: "Você não precisa criar um sistema do zero",
    desc: "Comece com uma plataforma pronta e adapte a identidade ao seu negócio.",
  },
];

const audiences = [
  {
    icon3d: iconRocket,
    title: "Empresas de tecnologia",
    desc: "Para quem quer atender oficinas sem criar outro sistema do zero.",
  },
  {
    icon3d: iconMegaphone,
    title: "Redes e franquias",
    desc: "Para organizar várias oficinas e manter os dados de cada uma separados.",
  },
  {
    icon3d: iconCreditCard,
    title: "Distribuidores e fornecedores",
    desc: "Para oferecer mais uma solução útil aos clientes que já compram de você.",
  },
  {
    icon3d: iconBulb,
    title: "Consultorias automotivas",
    desc: "Para juntar seu método de trabalho a uma plataforma com a sua marca.",
  },
  {
    icon3d: iconMobile,
    title: "Quem quer vender software",
    desc: "Para criar planos mensais sem bancar o desenvolvimento de uma plataforma.",
  },
  {
    icon3d: iconSetting,
    title: "Grupos com várias oficinas",
    desc: "Para acompanhar unidades, pessoas e resultados em um só lugar.",
  },
];

const workshopBrands = [
  {
    name: "Rikinho Auto Center",
    primary: "RIKINHO",
    secondary: "AUTO CENTER",
    color: "#E30613",
    background: "#0B0B0D",
    markColor: "#E30613",
    mark: 0,
  },
  {
    name: "Central Motors",
    primary: "CENTRAL",
    secondary: "MOTORS",
    color: "#0F766E",
    mark: 1,
  },
  {
    name: "Oficina Vetor",
    primary: "VETOR",
    secondary: "OFICINA",
    color: "#B45309",
    mark: 2,
  },
  {
    name: "Box 77 Garage",
    primary: "BOX 77",
    secondary: "GARAGE",
    color: "#7C3AED",
    mark: 3,
  },
  {
    name: "Prime Car Service",
    primary: "PRIME",
    secondary: "CAR SERVICE",
    color: "#BE123C",
    mark: 4,
  },
  {
    name: "AutoTech Centro",
    primary: "AUTOTECH",
    secondary: "CENTRO AUTOMOTIVO",
    color: "#0369A1",
    mark: 5,
  },
  {
    name: "Garage Norte",
    primary: "GARAGE",
    secondary: "NORTE",
    color: "#047857",
    mark: 6,
  },
  {
    name: "MotorLab",
    primary: "MOTORLAB",
    secondary: "PERFORMANCE",
    color: "#4338CA",
    mark: 7,
  },
  {
    name: "ViaCar Oficina",
    primary: "VIACAR",
    secondary: "OFICINA",
    color: "#C2410C",
    mark: 8,
  },
  {
    name: "Ponto Motor",
    primary: "PONTO",
    secondary: "MOTOR",
    color: "#334155",
    mark: 9,
  },
];

function WorkshopLogo({ brand }: { brand: (typeof workshopBrands)[number] }) {
  const marks = [
    <path
      key="speed"
      d="M8 27h11l7-12h10l-5 7h7L25 35H12l6-8Z"
      fill="currentColor"
    />,
    <path
      key="central"
      d="M34 17a12 12 0 1 0 0 14M17 24h14"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />,
    <path
      key="vector"
      d="m12 34 12-22 12 22-12-7-12 7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    />,
    <text
      key="box"
      x="24"
      y="30"
      fill="currentColor"
      fontSize="17"
      fontWeight="800"
      textAnchor="middle"
    >
      77
    </text>,
    <path
      key="prime"
      d="M14 35V13h12c7 0 11 3 11 9s-4 9-11 9h-6v4h-6Zm6-10h6c3 0 5-1 5-3s-2-3-5-3h-6v6Z"
      fill="currentColor"
    />,
    <path
      key="tech"
      d="m24 10 13 7v14l-13 7-13-7V17l13-7Zm0 8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
      fill="currentColor"
      fillRule="evenodd"
    />,
    <path
      key="garage"
      d="m10 24 14-11 14 11v12h-6v-8H16v8h-6V24Zm8 8h12"
      fill="currentColor"
    />,
    <path
      key="lab"
      d="M8 26h7l3-9 6 17 5-13 4 5h7"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
    <path
      key="road"
      d="M11 13h7l6 22 6-22h7L28 38h-8L11 13Zm13 5v11"
      fill="currentColor"
    />,
    <path
      key="point"
      d="M24 9a15 15 0 1 0 0 30 15 15 0 0 0 0-30Zm0 9a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
      fill="currentColor"
      fillRule="evenodd"
    />,
  ];

  return (
    <div className="flex items-center gap-3" aria-label={brand.name}>
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12 shrink-0"
        style={{ color: "markColor" in brand ? brand.markColor : "#FFFFFF" }}
        aria-hidden="true"
      >
        <rect
          width="48"
          height="48"
          rx="13"
          fill={"background" in brand ? brand.background : brand.color}
        />
        {marks[brand.mark]}
      </svg>
      <div className="leading-none">
        <div
          className="text-[15px] font-bold tracking-[-.035em]"
          style={{ color: COLORS.navy }}
        >
          {brand.primary}
        </div>
        <div
          className="mt-1 text-[9px] font-semibold tracking-[.2em]"
          style={{ color: brand.color }}
        >
          {brand.secondary}
        </div>
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
          whileHover={{
            y: -6,
            scale: 1.025,
            borderColor: brand.color,
            boxShadow: "0 18px 45px rgba(15,23,41,.12)",
          }}
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
    <section
      className="overflow-hidden border-b py-14"
      style={{ borderColor: COLORS.line }}
      aria-label="Identidades de oficinas demonstradas na plataforma"
    >
      <div className="mx-auto mb-8 max-w-6xl px-6 text-center">
        <p
          className="text-[11px] font-semibold uppercase tracking-[.18em]"
          style={{ color: COLORS.blue }}
        >
          Do seu jeito
        </p>
        <h2 className="display mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          O mesmo sistema pode ter a identidade de cada marca
        </h2>
      </div>
      <div className="brand-marquee overflow-hidden px-4 py-2 sm:px-6">
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

const faqs = [
  {
    q: "A plataforma aparece com a minha marca?",
    a: "Sim. Ela pode usar seu nome, logotipo, cores, imagens, endereço na internet, documentos e e-mails.",
  },
  {
    q: "Os dados de uma oficina ficam separados das outras?",
    a: "Sim. Cada oficina acessa somente suas próprias informações, clientes e serviços.",
  },
  {
    q: "Posso acompanhar várias oficinas?",
    a: "Sim. Você cadastra as unidades, organiza os acessos e acompanha toda a rede em uma área administrativa.",
  },
  {
    q: "O que a oficina consegue fazer no sistema?",
    a: "Cadastrar clientes e veículos, criar orçamentos e ordens de serviço, controlar estoque, vendas, contas e manter contato com o cliente depois do serviço.",
  },
  {
    q: "Posso usar meu próprio endereço na internet?",
    a: "Sim. Ajudamos a configurar um endereço próprio para que a plataforma tenha ainda mais a cara da sua marca.",
  },
  {
    q: "Como faço para contratar?",
    a: "Fale com a gente pelo WhatsApp. Primeiro entendemos seu negócio, mostramos a plataforma e explicamos valores e próximos passos com clareza.",
  },
];

/* ---------- main ---------- */

export default function AutoCoreLanding() {
  useFonts();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [prodTab, setProdTab] = useState(0);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="min-w-0 overflow-x-clip"
        style={{
          background: "#FFFFFF",
          color: COLORS.navy,
          fontFamily: "'Manrope', sans-serif",
        }}
      >
        <ScrollProgress />
        <style>{`
        * { box-sizing: border-box; }
        .display { font-family: 'Geist', sans-serif; }
        ::selection { background: ${COLORS.blue}; color: #fff; }
        .btn-primary { background: ${COLORS.blue}; color: #fff; box-shadow: 0 10px 28px rgba(35,84,230,.22); }
        .btn-primary:hover { background: ${COLORS.blueDark}; transform: translateY(-1px); }
        .hero-blueprint { background-color: #F7F9FF; background-image: linear-gradient(rgba(35,84,230,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(35,84,230,.06) 1px, transparent 1px), radial-gradient(circle at 78% 14%, rgba(73,116,255,.2), transparent 34%), radial-gradient(circle at 18% 58%, rgba(255,153,51,.1), transparent 26%); background-size: 48px 48px, 48px 48px, auto, auto; mask-image: linear-gradient(to bottom, black 72%, transparent); }
        .hero-glow { background: conic-gradient(from 210deg, rgba(35,84,230,.28), rgba(91,141,239,.04), rgba(255,153,51,.18), rgba(35,84,230,.28)); filter: blur(70px); animation: hero-breathe 9s ease-in-out infinite; }
        .hero-wheel { color: rgba(35,84,230,.13); filter: drop-shadow(0 28px 45px rgba(35,84,230,.08)); transform-origin: center; mask-image: linear-gradient(125deg, transparent 4%, black 38%, black 72%, transparent 96%); }
        .hero-road { color: rgba(35,84,230,.18); mask-image: linear-gradient(to bottom, transparent, black 22%, transparent 94%); }
        .hero-road-flow { animation: road-flow 2.8s linear infinite; }
        .hero-stage { border-color: rgba(35,84,230,.16); box-shadow: 0 10px 30px rgba(35,84,230,.08); }
        @keyframes hero-breathe { 0%, 100% { transform: scale(1) translate3d(0,0,0); } 50% { transform: scale(1.14) translate3d(-28px,20px,0); } }
        @keyframes road-flow { to { stroke-dashoffset: -66; } }
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
        <header
          className="sticky top-0 z-50 border-b backdrop-blur"
          style={{
            borderColor: COLORS.line,
            background: "rgba(255,255,255,0.85)",
          }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <BrandMark />
              <span className="display text-lg font-semibold tracking-tight">
                AutoCore
              </span>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              <NavLink href="#produto">O que você recebe</NavLink>
              <NavLink href="#como-funciona">Como funciona</NavLink>
              <NavLink href="#diferenciais">Vantagens</NavLink>
              <NavLink href="#faq">Dúvidas</NavLink>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <motion.a
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                Quero começar
              </motion.a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
            >
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
                  <NavLink href="#produto">O que você recebe</NavLink>
                  <NavLink href="#como-funciona">Como funciona</NavLink>
                  <NavLink href="#diferenciais">Vantagens</NavLink>
                  <NavLink href="#faq">Dúvidas</NavLink>
                  <motion.a
                    whileTap={{ scale: 0.98 }}
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary rounded-lg px-4 py-2 text-center text-sm font-medium"
                  >
                    Quero começar
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* HERO */}
        <section
          className="relative isolate overflow-hidden border-b"
          style={{ borderColor: COLORS.line }}
        >
          <HeroBackdrop />

          <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl flex-col items-center gap-14 px-4 py-20 sm:px-6 lg:py-24">
            <div className="max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.14em] backdrop-blur"
                style={{ borderColor: COLORS.line, color: COLORS.blue }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: COLORS.blue }}
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                Um sistema para oficinas com a sua marca
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="display text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[4.65rem]"
              >
                Ofereça um{" "}
                <span className="bg-gradient-to-r from-[#2354E6] to-[#5B8DEF] bg-clip-text text-transparent">
                  sistema completo
                </span>{" "}
                para oficinas com a sua marca
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mx-auto mt-7 max-w-2xl text-base leading-relaxed lg:text-lg"
                style={{ color: COLORS.muted }}
              >
                Você recebe a plataforma pronta para personalizar e oferecer aos
                seus clientes. As oficinas cuidam da rotina e você acompanha
                tudo em uma área separada.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary group flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all"
                >
                  Quero começar agora
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="#como-funciona"
                  className="rounded-lg border bg-white/70 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-white"
                  style={{ borderColor: COLORS.line, color: COLORS.navy }}
                >
                  Ver como funciona
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs"
                style={{ color: COLORS.muted }}
              >
                {[
                  "Sua marca e suas cores",
                  "Dados de cada oficina separados",
                  "Tudo em um só lugar",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} style={{ color: COLORS.blue }} />
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto w-full max-w-6xl"
            >
              <motion.div
                className="absolute left-3 -top-7 z-20 hidden rounded-xl border bg-white/90 px-3 py-2 shadow-lg backdrop-blur sm:block sm:left-4"
                style={{ borderColor: COLORS.line }}
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: COLORS.muted }}
                >
                  Exemplo de rede
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  37 oficinas
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-6 right-3 z-20 hidden rounded-xl border bg-white/90 px-3 py-2 shadow-lg backdrop-blur sm:block sm:right-4"
                style={{ borderColor: COLORS.line }}
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: COLORS.muted }}
                >
                  Personalização
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-sm font-semibold">
                  <Palette size={14} style={{ color: COLORS.blue }} />
                  Com a sua marca
                </div>
              </motion.div>
              <PlatformPreview />
            </motion.div>
          </div>
        </section>
        <WorkshopCarousel />

        {/* PROBLEMA */}
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Reveal>
            <span
              className="text-xs font-semibold tracking-widest"
              style={{ color: COLORS.blue }}
            >
              UM CAMINHO MAIS SIMPLES
            </span>
            <h2 className="display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Seus clientes precisam de organização. Você não precisa criar um
              sistema do zero.
            </h2>
            <p
              className="mt-5 text-base leading-relaxed"
              style={{ color: COLORS.muted }}
            >
              A plataforma já reúne o que uma oficina usa no dia a dia. Você
              coloca sua marca, escolhe como quer oferecer o serviço e pode
              começar sem manter uma equipe inteira de desenvolvimento.
            </p>
          </Reveal>
        </section>

        {/* PARA QUEM É */}
        <section
          className="relative overflow-hidden py-24"
          style={{ background: COLORS.tint }}
        >
          <div
            aria-hidden="true"
            className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border-[48px] opacity-40"
            style={{ borderColor: "#DDE7FF" }}
          />
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="text-center">
              <span
                className="text-xs font-semibold tracking-widest"
                style={{ color: COLORS.blue }}
              >
                PARA QUEM É
              </span>
              <h2 className="display mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
                Para quem já atende oficinas ou quer entrar nesse mercado
              </h2>
              <p
                className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed"
                style={{ color: COLORS.muted }}
              >
                Cada oficina recebe um espaço próprio para trabalhar. Você cuida
                da sua marca, dos seus clientes e acompanha todas as unidades.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map((item, i) => (
                <Reveal key={item.title} delay={(i % 3) * 0.06}>
                  <motion.div
                    whileHover={{
                      y: -9,
                      scale: 1.02,
                      borderColor: COLORS.blue,
                      boxShadow: "0 24px 60px rgba(35,84,230,.14)",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="technical-card group h-full cursor-default rounded-2xl border bg-white p-7 shadow-[0_8px_30px_rgba(15,23,41,.04)]"
                    style={{ borderColor: COLORS.line }}
                  >
                    <div className="flex items-start justify-between">
                      <motion.img
                        src={item.icon3d}
                        alt=""
                        loading="lazy"
                        whileHover={{ rotate: -6, scale: 1.1 }}
                        className="h-16 w-16 rounded-2xl object-cover mix-blend-multiply"
                      />
                      <span className="text-xs font-medium tracking-widest text-[#B5C0D3]">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="display mt-7 text-base font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                      {item.desc}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* DOIS PRODUTOS, UMA OPERAÇÃO */}
        <section
          id="produto"
          style={{ background: COLORS.soft }}
          className="scroll-mt-20 py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="text-center">
              <span
                className="text-xs font-semibold tracking-widest"
                style={{ color: COLORS.blue }}
              >
                O QUE VOCÊ RECEBE
              </span>
              <h2 className="display mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
                Uma área para a oficina trabalhar e outra para você acompanhar
              </h2>
            </Reveal>

            <div
              className="mx-auto mt-10 flex w-fit flex-wrap justify-center gap-1 rounded-xl border bg-white p-1 shadow-sm"
              style={{ borderColor: COLORS.line }}
            >
              <TabButton active={prodTab === 0} onClick={() => setProdTab(0)}>
                Área da oficina
              </TabButton>
              <TabButton active={prodTab === 1} onClick={() => setProdTab(1)}>
                Sua área de controle
              </TabButton>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={prodTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2"
              >
                {(prodTab === 0 ? workshopItems : adminItems).map((it) => (
                  <motion.div
                    key={it.text}
                    whileHover={{ x: 5, borderColor: COLORS.blueLight }}
                    className="flex items-center gap-5 rounded-xl border bg-white p-5 shadow-[0_5px_20px_rgba(15,23,41,.025)]"
                    style={{ borderColor: COLORS.line }}
                  >
                    <img
                      src={it.icon3d}
                      alt=""
                      loading="lazy"
                      className="h-12 w-12 shrink-0 rounded-xl object-cover mix-blend-multiply"
                    />
                    <span
                      className="text-sm leading-snug"
                      style={{ color: COLORS.navy }}
                    >
                      {it.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* WHITE-LABEL */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <Reveal>
              <span
                className="text-xs font-semibold tracking-widest"
                style={{ color: COLORS.blue }}
              >
                COM A SUA MARCA
              </span>
              <h2 className="display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Para o cliente, a plataforma é sua
              </h2>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: COLORS.muted }}
              >
                Personalizamos a plataforma para combinar com o seu negócio. A
                oficina vê sua marca em todos os pontos importantes.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  "Seu nome e logotipo",
                  "Suas cores",
                  "Seu próprio endereço na internet",
                  "Documentos e e-mails com a sua identidade",
                ].map((it) => (
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
        <section
          id="como-funciona"
          style={{ background: COLORS.soft }}
          className="scroll-mt-20 py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="text-center">
              <span
                className="text-xs font-semibold tracking-widest"
                style={{ color: COLORS.blue }}
              >
                COMO FUNCIONA
              </span>
              <h2 className="display mx-auto mt-3 max-w-lg text-3xl font-semibold tracking-tight md:text-4xl">
                A oficina acompanha o serviço do começo ao fim
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
                      <span
                        className="text-sm font-medium"
                        style={{ color: COLORS.navy }}
                      >
                        {step}
                      </span>
                    </motion.div>
                    {i < flow.length - 1 && (
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.8,
                          delay: i * 0.12,
                          repeat: Infinity,
                        }}
                      >
                        <ArrowRight
                          size={16}
                          style={{ color: COLORS.blueLight }}
                          className="shrink-0"
                        />
                      </motion.div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section
          id="diferenciais"
          className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24"
        >
          <Reveal className="text-center">
            <span
              className="text-xs font-semibold tracking-widest"
              style={{ color: COLORS.blue }}
            >
              VANTAGENS
            </span>
            <h2 className="display mx-auto mt-3 max-w-lg text-3xl font-semibold tracking-tight md:text-4xl">
              Por que usar a AutoCore
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {diferenciais.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="h-full rounded-2xl border p-7"
                  style={{ borderColor: COLORS.line }}
                >
                  <motion.img
                    src={f.icon3d}
                    alt=""
                    loading="lazy"
                    whileHover={{ rotate: 6, scale: 1.08 }}
                    className="mb-7 h-20 w-20 rounded-2xl object-cover mix-blend-multiply"
                  />
                  <h3 className="display text-base font-semibold">{f.title}</h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: COLORS.muted }}
                  >
                    {f.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* DEMONSTRAÇÃO */}
        <section
          id="demonstracao"
          className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24"
        >
          <Reveal>
            <div
              className="technical-grid relative overflow-hidden rounded-3xl border border-white/10 px-8 py-20 text-center shadow-[0_35px_90px_rgba(15,23,41,.22)]"
              style={{ background: COLORS.navy }}
            >
              <div
                className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: "rgba(91,141,239,0.35)" }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute left-8 top-8 h-3 w-3 border-l border-t border-white/40"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute bottom-8 right-8 h-3 w-3 border-b border-r border-white/40"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <h2 className="display mx-auto max-w-xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Quer saber se a plataforma combina com o seu negócio?
              </h2>
              <p
                className="mx-auto mt-4 max-w-md text-sm"
                style={{ color: "#94A3C4" }}
              >
                Fale com a gente pelo WhatsApp. Mostramos como tudo funciona,
                entendemos o que você precisa e explicamos valores e próximos
                passos sem compromisso.
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
                Quero começar com minha marca
              </motion.a>
              <div className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-slate-300 sm:flex-row sm:gap-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:border-[#25D366]/40 hover:bg-white/10 hover:text-white"
                >
                  <span className="text-[#25D366]">
                    <WhatsAppIcon size={17} />
                  </span>
                  WhatsApp · 11 92559-2834
                </a>
                <a
                  href="mailto:developerandreo@gmail.com"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:border-blue-400/40 hover:bg-white/10 hover:text-white"
                >
                  <Mail size={17} style={{ color: COLORS.blueLight }} />
                  Enviar e-mail
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          style={{ background: COLORS.soft }}
          className="scroll-mt-20 py-24"
        >
          <div className="mx-auto max-w-2xl px-6">
            <Reveal className="text-center">
              <span
                className="text-xs font-semibold tracking-widest"
                style={{ color: COLORS.blue }}
              >
                PERGUNTAS FREQUENTES
              </span>
              <h2 className="display mx-auto mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Ficou com alguma dúvida?
              </h2>
            </Reveal>
            <LayoutGroup>
              <div className="mt-10">
                {faqs.map((f, i) => (
                  <FaqItem
                    key={f.q}
                    q={f.q}
                    a={f.a}
                    isOpen={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  />
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
                  <span className="display text-base font-semibold">
                    AutoCore
                  </span>
                </div>
                <p
                  className="mt-3 max-w-xs text-sm"
                  style={{ color: COLORS.muted }}
                >
                  Um sistema completo para oficinas, personalizado com a marca
                  de quem oferece.
                </p>
                <div className="mt-4 flex flex-col items-start gap-2 text-sm">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-2 transition-colors hover:bg-slate-50"
                    style={{ borderColor: COLORS.line, color: COLORS.muted }}
                  >
                    <span className="text-[#25D366]">
                      <WhatsAppIcon size={17} />
                    </span>
                    WhatsApp · 11 92559-2834
                  </a>
                  <a
                    href="mailto:developerandreo@gmail.com"
                    className="inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-2 transition-colors hover:bg-slate-50"
                    style={{ borderColor: COLORS.line, color: COLORS.muted }}
                  >
                    <Mail size={17} style={{ color: COLORS.blue }} />
                    Enviar e-mail
                  </a>
                </div>
              </div>
              {[
                {
                  title: "Produto",
                  items: [
                    "Área da oficina",
                    "Área de controle",
                    "Sua marca",
                    "Vantagens",
                  ],
                },
                {
                  title: "Empresa",
                  items: ["Sobre", "Carreiras", "Blog", "Contato"],
                },
                {
                  title: "Suporte",
                  items: ["Central de ajuda", "Status", "Falar com a gente"],
                },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="text-sm font-semibold">{col.title}</h4>
                  <ul className="mt-3 flex flex-col gap-2">
                    {col.items.map((it) => (
                      <li key={it}>
                        <a
                          href="#"
                          className="text-sm"
                          style={{ color: COLORS.muted }}
                        >
                          {it}
                        </a>
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
              <span>
                © {new Date().getFullYear()} AutoCore. Todos os direitos
                reservados.
              </span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-black">
                  Privacidade
                </a>
                <a href="#" className="hover:text-black">
                  Termos
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
