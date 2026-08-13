import { useState, useEffect } from "react";
import {
  Menu, X, Phone, Mail, ArrowRight, CheckCircle,
  Paintbrush, Layers, Sparkles, Clock, Award,
  ChevronDown, Send, Instagram, MessageCircle,
  Camera, ExternalLink, Palette, Star, Droplets,
  Building2, Play, Grid3X3, BookOpen,
} from "lucide-react";

// ─── DADOS REAIS DA EMPRESA ────────────────────────────────────────────────────
const WA_DIRECT  = "https://wa.me/558788226113";
const WA_CATALOG = "https://wa.me/c/558788226113";
const IG_URL     = "https://www.instagram.com/sonhartpinturasoficial/";
const EMAIL_ADDR = "sonhartpinturasoficial@outlook.com";
const PHONE_DISP = "+55 87 8822-6113";

type Page =
  | "home" | "sobre" | "servicos" | "efeitos"
  | "epoxi" | "galeria" | "portfolio" | "insta"
  | "orcamento" | "contato";

const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: "home",      label: "Início"    },
  { id: "sobre",     label: "Sobre"     },
  { id: "servicos",  label: "Serviços"  },
  { id: "efeitos",   label: "Efeitos"   },
  { id: "epoxi",     label: "Epóxi"     },
  { id: "galeria",   label: "Galeria"   },
  { id: "portfolio", label: "Portfólio" },
  { id: "insta",     label: "Instagram" },
  { id: "orcamento", label: "Orçamento" },
  { id: "contato",   label: "Contato"   },
];

const SERVICOS = [
  { id: "efeitos",  label: "Cimento Queimado",        icon: <Layers size={24}/>,    color: "#C41E3A", desc: "Acabamento moderno, elegante e sofisticado" },
  { id: "efeitos",  label: "Efeito Velvet",            icon: <Sparkles size={24}/>,  color: "#E86B1F", desc: "Textura aveludada com aparência de luxo" },
  { id: "epoxi",    label: "Pintura em Epóxi",         icon: <Droplets size={24}/>,  color: "#B5191A", desc: "Alta resistência e brilho impecável" },
  { id: "efeitos",  label: "Pinturas Decorativas",     icon: <Palette size={24}/>,   color: "#C85A00", desc: "Efeitos especiais para ambientes únicos" },
  { id: "efeitos",  label: "Efeito Mármore",           icon: <Star size={24}/>,      color: "#D4181B", desc: "Sofisticação com aparência de mármore real" },
  { id: "servicos", label: "Pinturas de Alto Padrão",  icon: <Award size={24}/>,     color: "#A01530", desc: "Acabamento impecável com equipamentos modernos" },
  { id: "servicos", label: "Pintura de Casas",         icon: <Building2 size={24}/>, color: "#E05010", desc: "Transformação completa do seu lar" },
] as const;

// ─── COMPONENTE: BOTÃO WHATSAPP FLUTUANTE ──────────────────────────────────────
function WAFloat() {
  return (
    <a
      href={WA_DIRECT}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
      style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 20px rgba(37,211,102,0.5)" }}
    >
      <MessageCircle size={20} fill="white" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

// ─── COMPONENTE: PLACEHOLDER DE FOTO ──────────────────────────────────────────
function PhotoSlot({ label, tall }: { label?: string; tall?: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed w-full"
      style={{ minHeight: tall ? "280px" : "200px", background: "#F9F0E8", borderColor: "rgba(196,30,58,0.25)" }}
    >
      <Camera size={26} style={{ color: "#C41E3A", opacity: 0.4 }} />
      <span className="text-xs font-medium text-center px-3 max-w-[160px]" style={{ color: "#A06040" }}>
        {label ?? "Adicione sua foto aqui"}
      </span>
    </div>
  );
}

// ─── COMPONENTE: NAVBAR ────────────────────────────────────────────────────────
function Navbar({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (p: Page) => { onNav(p); setOpen(false); };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 shadow-lg"
      style={{ background: scrolled ? "rgba(28,8,0,0.97)" : "#1C0800", transition: "background .3s", fontFamily: "'Nunito Sans', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <button onClick={() => go("home")} className="flex items-center gap-2 focus:outline-none shrink-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#C41E3A" }}>
            <Paintbrush size={15} color="white" />
          </div>
          <span style={{ fontFamily: "'Anton', sans-serif", letterSpacing: ".06em", color: "#F5C842", fontSize: "1.25rem" }}>
            SONHART
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden xl:flex items-center gap-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="px-2.5 py-1.5 rounded text-xs font-semibold transition-all"
              style={{
                color:  current === item.id ? "#F5C842" : "#f0d0c0",
                background: current === item.id ? "rgba(196,30,58,.25)" : "transparent",
                borderBottom: current === item.id ? "2px solid #C41E3A" : "2px solid transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: phone + hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <a href={WA_DIRECT} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-1.5 text-xs font-bold" style={{ color: "#25D366" }}>
            <MessageCircle size={13} />
            {PHONE_DISP}
          </a>
          <button className="xl:hidden p-2" style={{ color: "#F5C842" }} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden px-4 pb-4" style={{ background: "#1C0800", borderTop: "1px solid rgba(196,30,58,.3)" }}>
          <div className="grid grid-cols-2 gap-1 pt-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="text-left py-2.5 px-3 text-sm font-semibold rounded-lg"
                style={{ color: current === item.id ? "#F5C842" : "#f0d0c0", background: current === item.id ? "rgba(196,30,58,.2)" : "transparent" }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <a href={WA_DIRECT} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold" style={{ background: "#25D366", color: "#fff" }}>
            <MessageCircle size={16} /> Chamar no WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── COMPONENTE: RODAPÉ ────────────────────────────────────────────────────────
function Footer({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <footer style={{ background: "#0F0400", fontFamily: "'Nunito Sans', sans-serif" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#C41E3A" }}>
              <Paintbrush size={15} color="white" />
            </div>
            <span style={{ fontFamily: "'Anton', sans-serif", letterSpacing: ".06em", color: "#F5C842", fontSize: "1.2rem" }}>SONHART</span>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#c0a090" }}>
            Sonhart Pinturas Mecanizadas é especializada em pinturas de alto padrão. Com equipamentos modernos entregamos sempre o melhor acabamento.
          </p>
          <div className="flex gap-2">
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(196,30,58,.3)" }}>
              <Instagram size={16} color="#F5C842" />
            </a>
            <a href={WA_DIRECT} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(37,211,102,.2)" }}>
              <MessageCircle size={16} color="#25D366" />
            </a>
          </div>
        </div>

        {/* Pages */}
        <div>
          <h4 className="font-bold mb-4 text-xs tracking-wider uppercase" style={{ color: "#F5C842" }}>Páginas</h4>
          <div className="grid grid-cols-2 gap-y-2 gap-x-3">
            {NAV_ITEMS.map(n => (
              <button key={n.id} onClick={() => onNav(n.id)} className="text-left text-sm hover:text-white transition-colors" style={{ color: "#c0a090" }}>
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-4 text-xs tracking-wider uppercase" style={{ color: "#F5C842" }}>Contato</h4>
          <div className="space-y-3">
            <a href={WA_DIRECT} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-white transition-colors" style={{ color: "#c0a090" }}>
              <MessageCircle size={14} style={{ color: "#25D366" }} className="shrink-0" /> {PHONE_DISP}
            </a>
            <a href={`mailto:${EMAIL_ADDR}`} className="flex items-center gap-2 text-sm hover:text-white transition-colors" style={{ color: "#c0a090" }}>
              <Mail size={14} style={{ color: "#C41E3A" }} className="shrink-0" /> {EMAIL_ADDR}
            </a>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-white transition-colors" style={{ color: "#c0a090" }}>
              <Instagram size={14} style={{ color: "#C41E3A" }} className="shrink-0" /> @sonhartpinturasoficial
            </a>
            <div className="flex items-start gap-2 text-sm" style={{ color: "#c0a090" }}>
              <Clock size={14} style={{ color: "#C41E3A" }} className="mt-0.5 shrink-0" />
              <span>Seg–Sex: 24h | Sáb e Dom: Fechado</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-xs border-t" style={{ borderColor: "rgba(196,30,58,.2)", color: "#7a4030" }}>
        © {new Date().getFullYear()} Sonhart Pinturas Mecanizadas · Israel Freitas
      </div>
    </footer>
  );
}

// ─── BOTÃO WHATSAPP PADRÃO ─────────────────────────────────────────────────────
function WABtn({ label = "Solicitar orçamento pelo WhatsApp", catalog }: { label?: string; catalog?: boolean }) {
  return (
    <a
      href={catalog ? WA_CATALOG : WA_DIRECT}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95"
      style={{ background: "#25D366", color: "#fff", boxShadow: "0 6px 20px rgba(37,211,102,.4)" }}
    >
      <MessageCircle size={17} fill="white" /> {label}
    </a>
  );
}

// ─── PÁGINA 1: INÍCIO ──────────────────────────────────────────────────────────
function PageHome({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&h=900&fit=crop&auto=format"
            alt="Pintura profissional de alto padrão"
            className="w-full h-full object-cover"
            style={{ opacity: .22 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(196,30,58,.65) 0%, rgba(28,8,0,.96) 60%)" }} />
        </div>
        <div className="absolute top-0 right-0 w-56 h-28 rounded-bl-full opacity-60" style={{ background: "#C41E3A" }} />
        <div className="absolute bottom-16 left-0 w-40 h-40 rounded-full opacity-15" style={{ background: "#F5C842" }} />

        <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ background: "rgba(245,200,66,.15)", color: "#F5C842", border: "1px solid rgba(245,200,66,.3)" }}>
              <Paintbrush size={12} /> Pinturas Mecanizadas de Alto Padrão
            </div>
            <h1 className="text-white mb-5 leading-none" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", letterSpacing: ".02em" }}>
              SONHART<br />
              <span style={{ color: "#F5C842" }}>PINTURAS</span><br />
              MECANIZADAS
            </h1>
            <p className="text-base mb-8 max-w-md leading-relaxed" style={{ color: "#f0c8b0" }}>
              Especializados em pinturas de alto padrão. Com equipamentos modernos entregamos sempre o melhor acabamento aos nossos clientes.
            </p>
            <div className="flex flex-wrap gap-3">
              <WABtn label="Solicitar orçamento" />
              <button
                onClick={() => onNav("portfolio")}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-all hover:bg-white/10"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
              >
                Ver nossos trabalhos
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4" style={{ borderColor: "#C41E3A" }}>
              <PhotoSlot label="Adicione a foto principal dos seus trabalhos aqui" tall />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} color="#F5C842" />
        </div>
      </section>

      {/* Descrição */}
      <section className="py-16 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 rounded-full text-xs font-bold mb-4 tracking-wider uppercase" style={{ background: "rgba(196,30,58,.1)", color: "#C41E3A" }}>
            Quem somos
          </div>
          <h2 className="mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2.2rem", color: "#1C0800" }}>
            PINTURAS DE ALTO PADRÃO
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "#4A2010" }}>
            <strong>Sonhart Pinturas Mecanizadas</strong> é especializada em pinturas de alto padrão. Com equipamentos modernos conseguimos entregar sempre o melhor acabamento aos nossos clientes!
          </p>
        </div>
      </section>

      {/* Serviços rápidos */}
      <section className="py-16 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-10" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2.2rem", color: "#1C0800" }}>
            NOSSOS SERVIÇOS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICOS.map((s) => {
              const page = s.id as Page;
              return (
                <button
                  key={s.label}
                  onClick={() => onNav(page)}
                  className="text-left p-5 rounded-xl border-2 transition-all hover:shadow-lg group"
                  style={{ background: "#fff", borderColor: "rgba(196,30,58,.12)" }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${s.color}15`, color: s.color }}>
                    {s.icon}
                  </div>
                  <div className="font-bold text-sm mb-1" style={{ color: "#1C0800" }}>{s.label}</div>
                  <div className="text-xs" style={{ color: "#7A4030" }}>{s.desc}</div>
                </button>
              );
            })}
            {/* empty slot for the 8th card to keep grid symmetry */}
            <button
              onClick={() => onNav("contato")}
              className="text-left p-5 rounded-xl border-2 transition-all hover:shadow-lg flex flex-col items-center justify-center text-center"
              style={{ background: "#C41E3A", borderColor: "#C41E3A" }}
            >
              <MessageCircle size={28} color="#F5C842" className="mb-2" />
              <div className="font-bold text-sm text-white">Solicitar<br/>Orçamento</div>
            </button>
          </div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="py-16 px-6 text-center" style={{ background: "#1C0800" }}>
        <h2 className="text-white mb-3" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2.2rem" }}>
          PRONTO PARA TRANSFORMAR SEU ESPAÇO?
        </h2>
        <p className="mb-7 text-sm" style={{ color: "rgba(255,255,255,.75)" }}>
          Entre em contato pelo WhatsApp e solicite seu orçamento gratuito.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <WABtn label="Chamar no WhatsApp agora" />
          <a href={WA_CATALOG} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-all hover:bg-white/10" style={{ color: "#F5C842", borderColor: "#F5C842" }}>
            <BookOpen size={16} /> Ver catálogo completo
          </a>
        </div>
      </section>
    </div>
  );
}

// ─── PÁGINA 2: SOBRE ───────────────────────────────────────────────────────────
function PageSobre({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute top-0 right-0 w-72 h-44 rounded-bl-full opacity-50" style={{ background: "#C41E3A" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(245,200,66,.15)", color: "#F5C842", border: "1px solid rgba(245,200,66,.3)" }}>
            Nossa história
          </div>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)" }}>
            SOBRE A SONHART
          </h1>
          <p style={{ color: "rgba(255,255,255,.75)" }}>
            Especialistas em pinturas mecanizadas de alto padrão
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="mb-5" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2rem", color: "#1C0800" }}>
              SONHART PINTURAS MECANIZADAS
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: "#4A2010" }}>
              <strong>Sonhart Pinturas Mecanizadas</strong> é especializada em pinturas de alto padrão. Com equipamentos modernos conseguimos entregar sempre o melhor acabamento aos nossos clientes!
            </p>
            <p className="mb-6 leading-relaxed" style={{ color: "#4A2010" }}>
              Nossa especialidade abrange desde pinturas residenciais até acabamentos decorativos sofisticados como cimento queimado, efeito Velvet, efeito mármore e pintura em epóxi — sempre com o compromisso de qualidade e excelência em cada projeto.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Equipamentos modernos para melhor acabamento",
                "Especialistas em efeitos decorativos e pinturas de alto padrão",
                "Atendimento personalizado para cada cliente",
                "Comprometimento com qualidade em cada detalhe",
              ].map(it => (
                <div key={it} className="flex items-start gap-3">
                  <CheckCircle size={17} className="mt-0.5 shrink-0" style={{ color: "#C41E3A" }} />
                  <span className="text-sm" style={{ color: "#4A2010" }}>{it}</span>
                </div>
              ))}
            </div>

            <WABtn />
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl" style={{ background: "#1C0800" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#C41E3A" }}>
                  <Paintbrush size={22} color="white" />
                </div>
                <div>
                  <div className="text-white font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.1rem" }}>Israel Freitas</div>
                  <div className="text-xs" style={{ color: "#F5C842" }}>Responsável — Sonhart Pinturas Mecanizadas</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#c0a090" }}>
                Responsável pela empresa e pelo padrão de qualidade de cada projeto entregue.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Award size={24}/>,    title: "Alto Padrão",         desc: "Acabamentos de excelência em cada projeto" },
                { icon: <Paintbrush size={24}/>, title: "Mecanizado",        desc: "Equipamentos modernos para melhor resultado" },
                { icon: <Clock size={24}/>,     title: "Seg–Sex",            desc: "Atendimento disponível 24 horas de segunda a sexta" },
                { icon: <MessageCircle size={24}/>, title: "Orçamento grátis", desc: "Contato direto pelo WhatsApp" },
              ].map(c => (
                <div key={c.title} className="p-4 rounded-xl" style={{ background: "#fff", border: "1px solid rgba(196,30,58,.12)" }}>
                  <div className="mb-2" style={{ color: "#C41E3A" }}>{c.icon}</div>
                  <div className="font-bold text-sm mb-1" style={{ color: "#1C0800" }}>{c.title}</div>
                  <div className="text-xs" style={{ color: "#7A4030" }}>{c.desc}</div>
                </div>
              ))}
            </div>

            <PhotoSlot label="Adicione uma foto da equipe ou dos trabalhos aqui" tall />
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PÁGINA 3: SERVIÇOS ────────────────────────────────────────────────────────
function PageServicos({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute top-0 right-0 w-72 h-44 rounded-bl-full opacity-50" style={{ background: "#E86B1F" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-white mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)" }}>
            NOSSOS SERVIÇOS
          </h1>
          <p style={{ color: "rgba(255,255,255,.75)" }}>Pinturas de alto padrão para todos os tipos de espaço</p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICOS.map((s) => {
              const page = s.id as Page;
              return (
                <div key={s.label} className="rounded-2xl overflow-hidden shadow-sm" style={{ background: "#fff", border: "1px solid rgba(196,30,58,.1)" }}>
                  <div className="h-48 flex items-center justify-center relative" style={{ background: `${s.color}12` }}>
                    <PhotoSlot label={`Foto de ${s.label}`} />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: s.color, color: "#fff" }}>
                      {s.label}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div style={{ color: s.color }}>{s.icon}</div>
                      <h3 className="font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.1rem", color: "#1C0800" }}>{s.label}</h3>
                    </div>
                    <p className="text-sm mb-4" style={{ color: "#7A4030" }}>{s.desc}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onNav(page)}
                        className="text-xs font-bold flex items-center gap-1"
                        style={{ color: s.color }}
                      >
                        Ver mais <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center p-8 rounded-2xl" style={{ background: "#1C0800" }}>
            <h2 className="text-white mb-3" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2rem" }}>SOLICITE SEU ORÇAMENTO</h2>
            <p className="mb-6 text-sm" style={{ color: "#c0a090" }}>Fale diretamente com a Sonhart pelo WhatsApp ou acesse o catálogo completo.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <WABtn label="Chamar no WhatsApp" />
              <a href={WA_CATALOG} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2" style={{ color: "#F5C842", borderColor: "#F5C842" }}>
                <BookOpen size={16}/> Ver catálogo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PÁGINA 4: EFEITOS DECORATIVOS ────────────────────────────────────────────
function PageEfeitos({ onNav }: { onNav: (p: Page) => void }) {
  const efeitos = [
    {
      title: "Cimento Queimado",
      color: "#C41E3A",
      icon: <Layers size={28}/>,
      desc: "O cimento queimado é um dos acabamentos mais sofisticados e modernos disponíveis hoje. Proporciona uma superfície com aparência urbana e contemporânea, muito valorizada em projetos de design de interiores.",
      tags: ["Paredes", "Pisos", "Moderno", "Contemporâneo"],
    },
    {
      title: "Efeito Velvet",
      color: "#E86B1F",
      icon: <Sparkles size={28}/>,
      desc: "O efeito Velvet cria uma superfície com aparência aveludada e toque macio, transmitindo sofisticação e exclusividade. Ideal para quem deseja um ambiente com personalidade única e acabamento de luxo.",
      tags: ["Aveludado", "Luxo", "Elegante", "Exclusivo"],
    },
    {
      title: "Efeito Mármore",
      color: "#B5191A",
      icon: <Star size={28}/>,
      desc: "O efeito mármore replica a beleza e sofisticação do mármore natural em qualquer superfície. Um acabamento de alto impacto visual que valoriza qualquer ambiente com elegância e nobreza.",
      tags: ["Sofisticado", "Elegante", "Nobre", "Alto padrão"],
    },
  ];

  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute top-0 right-0 w-72 h-44 rounded-bl-full opacity-50" style={{ background: "#B5191A" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(245,200,66,.15)", color: "#F5C842", border: "1px solid rgba(245,200,66,.3)" }}>
            <Sparkles size={12}/> Arte & Exclusividade
          </div>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)" }}>
            EFEITOS DECORATIVOS
          </h1>
          <p style={{ color: "rgba(255,255,255,.75)" }}>Cimento Queimado · Efeito Velvet · Efeito Mármore</p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-6xl mx-auto space-y-16">
          {efeitos.map((ef, i) => (
            <div key={ef.title} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <div className="lg:[direction:ltr]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${ef.color}18`, color: ef.color }}>
                    {ef.icon}
                  </div>
                  <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "2rem", color: "#1C0800" }}>{ef.title.toUpperCase()}</h2>
                </div>
                <p className="mb-5 leading-relaxed" style={{ color: "#4A2010" }}>{ef.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {ef.tags.map(t => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${ef.color}15`, color: ef.color }}>
                      {t}
                    </span>
                  ))}
                </div>
                <WABtn label={`Pedir orçamento — ${ef.title}`} />
              </div>
              <div className="lg:[direction:ltr] grid grid-cols-2 gap-3">
                <PhotoSlot label={`Foto de ${ef.title} — resultado 1`} tall />
                <div className="space-y-3">
                  <PhotoSlot label={`Foto de ${ef.title} — resultado 2`} />
                  <PhotoSlot label={`Foto de ${ef.title} — detalhe`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 text-center" style={{ background: "#C41E3A" }}>
        <h2 className="text-white mb-3" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2rem" }}>
          QUER UM ACABAMENTO EXCLUSIVO?
        </h2>
        <p className="mb-6 text-sm" style={{ color: "rgba(255,255,255,.85)" }}>Solicite seu orçamento pelo WhatsApp agora mesmo.</p>
        <WABtn label="Solicitar orçamento pelo WhatsApp" />
      </section>
    </div>
  );
}

// ─── PÁGINA 5: PINTURA EM EPÓXI ────────────────────────────────────────────────
function PageEpoxi({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute top-0 right-0 w-72 h-44 rounded-bl-full opacity-50" style={{ background: "#B5191A" }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(245,200,66,.15)", color: "#F5C842", border: "1px solid rgba(245,200,66,.3)" }}>
            <Droplets size={12}/> Revestimento Técnico
          </div>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)" }}>
            PINTURA EM EPÓXI
          </h1>
          <p className="max-w-lg" style={{ color: "rgba(255,255,255,.75)" }}>
            Alta resistência, brilho intenso e acabamento impecável para pisos, paredes e superfícies especiais.
          </p>
          <div className="mt-6">
            <WABtn label="Pedir orçamento para Epóxi" />
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2rem", color: "#1C0800" }}>
              O QUE É PINTURA EM EPÓXI?
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: "#4A2010" }}>
              A pintura em epóxi é um tipo de revestimento de alta performance que proporciona um acabamento extremamente resistente, duradouro e com excelente brilho. É muito utilizada em pisos, garagens, áreas comerciais e ambientes que exigem durabilidade superior.
            </p>
            <p className="mb-6 leading-relaxed" style={{ color: "#4A2010" }}>
              Na Sonhart Pinturas Mecanizadas, aplicamos epóxi com equipamentos modernos, garantindo uma cobertura uniforme e um acabamento de alto padrão.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Alta resistência a impactos e abrasão",
                "Superfície de fácil limpeza e manutenção",
                "Acabamento liso, brilhante e uniforme",
                "Ideal para pisos de garagens e áreas comerciais",
                "Resistente a produtos químicos",
                "Aplicação com equipamentos modernos",
              ].map(it => (
                <div key={it} className="flex items-start gap-3">
                  <CheckCircle size={17} className="mt-0.5 shrink-0" style={{ color: "#B5191A" }} />
                  <span className="text-sm" style={{ color: "#4A2010" }}>{it}</span>
                </div>
              ))}
            </div>

            <WABtn label="Solicitar orçamento para Epóxi" />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden" style={{ border: "3px solid #B5191A" }}>
              <PhotoSlot label="Adicione aqui a foto real do trabalho de Pintura em Epóxi" tall />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <PhotoSlot label="Detalhe epóxi — antes" />
              <PhotoSlot label="Detalhe epóxi — depois" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-6 text-center" style={{ background: "#1C0800" }}>
        <h2 className="text-white mb-3" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2rem" }}>
          INTERESSE EM PINTURA EM EPÓXI?
        </h2>
        <p className="mb-6 text-sm" style={{ color: "rgba(255,255,255,.75)" }}>Fale com a Sonhart agora pelo WhatsApp e solicite seu orçamento gratuito.</p>
        <WABtn label="Chamar no WhatsApp" />
      </section>
    </div>
  );
}

// ─── PÁGINA 6: GALERIA ─────────────────────────────────────────────────────────
function PageGaleria({ onNav }: { onNav: (p: Page) => void }) {
  const categorias = [
    { label: "Cimento Queimado", count: 4, color: "#C41E3A" },
    { label: "Efeito Velvet",    count: 4, color: "#E86B1F" },
    { label: "Pintura em Epóxi", count: 4, color: "#B5191A" },
    { label: "Efeito Mármore",   count: 4, color: "#C85A00" },
    { label: "Pinturas Decorativas", count: 4, color: "#A01530" },
  ];

  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute top-0 right-0 w-72 h-44 rounded-bl-full opacity-50" style={{ background: "#C41E3A" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-white mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)" }}>
            GALERIA DE TRABALHOS
          </h1>
          <p style={{ color: "rgba(255,255,255,.75)" }}>Resultados reais de cada serviço — adicione suas fotos abaixo</p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-7xl mx-auto space-y-16">
          {categorias.map(cat => (
            <div key={cat.label}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ background: cat.color }} />
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.8rem", color: "#1C0800" }}>
                  {cat.label.toUpperCase()}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: cat.count }).map((_, i) => (
                  <PhotoSlot key={i} label={`${cat.label} — foto ${i + 1}`} tall />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 px-6 text-center" style={{ background: "#1C0800" }}>
        <p className="text-white mb-2 font-bold text-lg">Quer ver mais trabalhos?</p>
        <p className="mb-6 text-sm" style={{ color: "#c0a090" }}>Acesse o Instagram da Sonhart para mais fotos e vídeos dos trabalhos realizados.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm" style={{ background: "#C41E3A", color: "#fff" }}>
            <Instagram size={16}/> Ver no Instagram
          </a>
          <WABtn label="Solicitar orçamento" />
        </div>
      </section>
    </div>
  );
}

// ─── PÁGINA 7: PORTFÓLIO ───────────────────────────────────────────────────────
function PagePortfolio({ onNav }: { onNav: (p: Page) => void }) {
  const cats = ["Todos", "Cimento Queimado", "Efeito Velvet", "Epóxi", "Pinturas Decorativas", "Efeito Mármore"];
  const [active, setActive] = useState("Todos");

  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute top-0 right-0 w-72 h-44 rounded-bl-full opacity-50" style={{ background: "#E86B1F" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-white mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)" }}>
            PORTFÓLIO
          </h1>
          <p style={{ color: "rgba(255,255,255,.75)" }}>Projetos realizados com qualidade e dedicação</p>
        </div>
      </section>

      <section className="py-16 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-7xl mx-auto">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: active === c ? "#C41E3A" : "#fff",
                  color: active === c ? "#fff" : "#4A2010",
                  border: active === c ? "2px solid #C41E3A" : "2px solid rgba(196,30,58,.2)",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Portfolio grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-sm" style={{ background: "#fff", border: "1px solid rgba(196,30,58,.1)" }}>
                <PhotoSlot label={`Projeto ${i + 1} — adicione a foto real aqui`} tall />
                <div className="p-4">
                  <div className="font-bold text-sm mb-1" style={{ color: "#1C0800" }}>Projeto {i + 1}</div>
                  <div className="text-xs mb-3" style={{ color: "#7A4030" }}>Adicione a descrição do projeto aqui</div>
                  <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#C41E3A" }}>
                    <ExternalLink size={12}/> Ver no Instagram
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm mb-4" style={{ color: "#7A4030" }}>Confira mais projetos completos no Instagram:</p>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm" style={{ background: "#C41E3A", color: "#fff" }}>
              <Instagram size={16}/> @sonhartpinturasoficial
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PÁGINA 8: INSTAGRAM ───────────────────────────────────────────────────────
function PageInsta({ onNav }: { onNav: (p: Page) => void }) {
  const posts = Array.from({ length: 6 });

  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute top-0 right-0 w-72 h-44 rounded-bl-full opacity-50" style={{ background: "#C41E3A" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}>
            <Instagram size={32} color="white" />
          </div>
          <h1 className="text-white mb-3" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)" }}>
            INSTAGRAM
          </h1>
          <p className="text-lg font-bold mb-2" style={{ color: "#F5C842" }}>@sonhartpinturasoficial</p>
          <p className="mb-6" style={{ color: "rgba(255,255,255,.75)" }}>
            Acompanhe nossos trabalhos, efeitos decorativos, antes &amp; depois e muito mais.
          </p>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
            style={{ background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)", color: "#fff" }}
          >
            <Instagram size={16}/> Seguir no Instagram
          </a>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm mb-8" style={{ color: "#7A4030" }}>
            As publicações abaixo são exemplos de posts da Sonhart. Para ver as fotos e vídeos reais, acesse o Instagram:
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="font-bold ml-1" style={{ color: "#C41E3A" }}>@sonhartpinturasoficial</a>
          </p>

          {/* Mock Instagram grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {posts.map((_, i) => (
              <a
                key={i}
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-xl overflow-hidden group block"
                style={{ aspectRatio: "1" }}
              >
                <PhotoSlot label={`Post ${i + 1} — clique para ver no Instagram`} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" style={{ background: "rgba(196,30,58,.6)" }}>
                  <div className="text-center text-white">
                    <Instagram size={28} className="mx-auto mb-1" />
                    <span className="text-xs font-bold">Ver no Instagram</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Videos section */}
          <div className="rounded-2xl p-8 text-center" style={{ background: "#1C0800" }}>
            <Play size={40} className="mx-auto mb-4" style={{ color: "#F5C842" }} />
            <h2 className="text-white mb-2" style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.8rem" }}>VÍDEOS DOS TRABALHOS</h2>
            <p className="text-sm mb-6" style={{ color: "#c0a090" }}>
              Confira os vídeos dos processos e resultados no Instagram da Sonhart.
            </p>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
              style={{ background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)", color: "#fff" }}
            >
              <Instagram size={16}/> Ver vídeos no Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PÁGINA 9: CATÁLOGO / ORÇAMENTO ───────────────────────────────────────────
function PageOrcamento({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute top-0 right-0 w-72 h-44 rounded-bl-full opacity-50" style={{ background: "#C41E3A" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(245,200,66,.15)", color: "#F5C842", border: "1px solid rgba(245,200,66,.3)" }}>
            <MessageCircle size={12}/> Orçamento Gratuito
          </div>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)" }}>
            CATÁLOGO & ORÇAMENTO
          </h1>
          <p style={{ color: "rgba(255,255,255,.75)" }}>
            Conheça nosso catálogo completo e solicite seu orçamento pelo WhatsApp
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Catalog card */}
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ background: "#fff", border: "2px solid #25D366" }}>
            <div className="p-2" style={{ background: "#25D366" }}>
              <p className="text-white text-center text-xs font-bold tracking-wider uppercase">Catálogo Oficial Sonhart</p>
            </div>
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(37,211,102,.12)" }}>
                <BookOpen size={32} style={{ color: "#25D366" }} />
              </div>
              <h2 className="mb-3" style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.8rem", color: "#1C0800" }}>
                CATÁLOGO COMPLETO DE SERVIÇOS
              </h2>
              <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "#4A2010" }}>
                Acesse o catálogo completo da Sonhart Pinturas Mecanizadas diretamente pelo WhatsApp e veja todos os serviços, efeitos e acabamentos disponíveis.
              </p>
              <a
                href={WA_CATALOG}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                style={{ background: "#25D366", color: "#fff", boxShadow: "0 8px 24px rgba(37,211,102,.4)" }}
              >
                <BookOpen size={20}/> Ver catálogo no WhatsApp
              </a>
            </div>
          </div>

          {/* Direct WhatsApp card */}
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ background: "#fff", border: "2px solid #C41E3A" }}>
            <div className="p-2" style={{ background: "#C41E3A" }}>
              <p className="text-white text-center text-xs font-bold tracking-wider uppercase">Orçamento Direto</p>
            </div>
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(196,30,58,.1)" }}>
                <MessageCircle size={32} style={{ color: "#C41E3A" }} />
              </div>
              <h2 className="mb-3" style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.8rem", color: "#1C0800" }}>
                CONVERSAR PELO WHATSAPP
              </h2>
              <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "#4A2010" }}>
                Fale diretamente com a Sonhart. Descreva seu projeto, envie fotos do local e receba seu orçamento gratuito rapidamente.
              </p>
              <WABtn label={`Chamar agora: ${PHONE_DISP}`} />
            </div>
          </div>

          {/* Info cards */}
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: <Award size={24}/>, title: "Orçamento Gratuito", desc: "Sem compromisso e sem custo" },
              { icon: <Clock size={24}/>,  title: "Atendimento Seg–Sex", desc: "Disponível 24 horas de segunda a sexta" },
              { icon: <MessageCircle size={24}/>, title: "Resposta Rápida", desc: "Retornamos seu contato pelo WhatsApp" },
            ].map(c => (
              <div key={c.title} className="p-5 rounded-xl text-center" style={{ background: "#fff", border: "1px solid rgba(196,30,58,.12)" }}>
                <div className="flex justify-center mb-2" style={{ color: "#C41E3A" }}>{c.icon}</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#1C0800" }}>{c.title}</div>
                <div className="text-xs" style={{ color: "#7A4030" }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PÁGINA 10: CONTATO ────────────────────────────────────────────────────────
function PageContato({ onNav }: { onNav: (p: Page) => void }) {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message
    const text = encodeURIComponent(
      `Olá, Sonhart! Me chamo ${form.name}.\nTelefone: ${form.phone}\nServiço: ${form.service || "Não informado"}\nMensagem: ${form.message}`
    );
    window.open(`https://wa.me/558788226113?text=${text}`, "_blank");
    setSent(true);
  };

  const contacts = [
    { icon: <MessageCircle size={20}/>, label: "WhatsApp", value: PHONE_DISP, href: WA_DIRECT, color: "#25D366" },
    { icon: <Mail size={20}/>,          label: "E-mail",    value: EMAIL_ADDR, href: `mailto:${EMAIL_ADDR}`, color: "#C41E3A" },
    { icon: <Instagram size={20}/>,     label: "Instagram", value: "@sonhartpinturasoficial", href: IG_URL, color: "#E86B1F" },
    { icon: <BookOpen size={20}/>,      label: "Catálogo",  value: "Ver catálogo completo", href: WA_CATALOG, color: "#B5191A" },
  ];

  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute top-0 right-0 w-72 h-44 rounded-bl-full opacity-50" style={{ background: "#C41E3A" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(245,200,66,.15)", color: "#F5C842", border: "1px solid rgba(245,200,66,.3)" }}>
            <Phone size={12}/> Fale conosco
          </div>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)" }}>
            CONTATO
          </h1>
          <p style={{ color: "rgba(255,255,255,.75)" }}>
            Entre em contato com a Sonhart pelo canal de sua preferência
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Form → vai para WhatsApp */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl shadow-sm" style={{ background: "#fff", border: "1px solid rgba(196,30,58,.1)" }}>
              <h2 className="mb-2" style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.8rem", color: "#1C0800" }}>
                ENVIAR MENSAGEM
              </h2>
              <p className="text-xs mb-6" style={{ color: "#7A4030" }}>Ao enviar, você será direcionado para o WhatsApp da Sonhart.</p>

              {sent ? (
                <div className="text-center py-12">
                  <MessageCircle size={56} className="mx-auto mb-4" style={{ color: "#25D366" }} />
                  <h3 className="font-bold text-xl mb-2" style={{ color: "#1C0800" }}>Abrindo WhatsApp!</h3>
                  <p className="mb-6" style={{ color: "#7A4030" }}>A janela do WhatsApp foi aberta com sua mensagem.</p>
                  <button onClick={() => setSent(false)} className="px-5 py-2 rounded-full text-sm font-bold" style={{ background: "#C41E3A", color: "#fff" }}>
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: "#7A4030" }}>Seu nome *</label>
                      <input required type="text" placeholder="Nome completo" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#F2E4D8", border: "2px solid transparent", color: "#1C0800" }}
                        onFocus={e => e.target.style.borderColor="#C41E3A"} onBlur={e => e.target.style.borderColor="transparent"} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: "#7A4030" }}>WhatsApp *</label>
                      <input required type="tel" placeholder="+55 00 00000-0000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#F2E4D8", border: "2px solid transparent", color: "#1C0800" }}
                        onFocus={e => e.target.style.borderColor="#C41E3A"} onBlur={e => e.target.style.borderColor="transparent"} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "#7A4030" }}>Serviço de interesse</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#F2E4D8", border: "2px solid transparent", color: "#1C0800" }}>
                      <option value="">Selecione um serviço</option>
                      {SERVICOS.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "#7A4030" }}>Mensagem</label>
                    <textarea rows={4} placeholder="Descreva seu projeto..." value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ background: "#F2E4D8", border: "2px solid transparent", color: "#1C0800" }}
                      onFocus={e => e.target.style.borderColor="#C41E3A"} onBlur={e => e.target.style.borderColor="transparent"} />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.01]" style={{ background: "#25D366", color: "#fff", boxShadow: "0 8px 24px rgba(37,211,102,.35)" }}>
                    <MessageCircle size={16}/> Enviar pelo WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-2xl" style={{ background: "#1C0800" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#C41E3A" }}>
                  <Paintbrush size={22} color="white" />
                </div>
                <div>
                  <div className="text-white font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.1rem" }}>Israel Freitas</div>
                  <div className="text-xs" style={{ color: "#F5C842" }}>Sonhart Pinturas Mecanizadas</div>
                </div>
              </div>
              <div className="space-y-4">
                {contacts.map(c => (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                    style={{ textDecoration: "none" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${c.color}25`, color: c.color }}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,.5)" }}>{c.label}</div>
                      <div className="text-sm font-semibold text-white">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(196,30,58,.12)" }}>
              <h4 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#1C0800" }}>
                <Clock size={16} style={{ color: "#C41E3A" }}/> Horários de atendimento
              </h4>
              {[
                { d: "Segunda-feira", h: "Aberta 24 horas" },
                { d: "Terça-feira",   h: "Aberta 24 horas" },
                { d: "Quarta-feira",  h: "Aberta 24 horas" },
                { d: "Quinta-feira",  h: "Aberta 24 horas" },
                { d: "Sexta-feira",   h: "Aberta 24 horas" },
                { d: "Sábado",        h: "Fechada" },
                { d: "Domingo",       h: "Fechada" },
              ].map(row => (
                <div key={row.d} className="flex justify-between py-1.5 text-xs border-b last:border-b-0" style={{ borderColor: "rgba(196,30,58,.08)" }}>
                  <span style={{ color: "#4A2010" }}>{row.d}</span>
                  <span className="font-semibold" style={{ color: row.h === "Fechada" ? "#7A4030" : "#C41E3A" }}>{row.h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── APP PRINCIPAL ─────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const onNav = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home":      return <PageHome      onNav={onNav} />;
      case "sobre":     return <PageSobre     onNav={onNav} />;
      case "servicos":  return <PageServicos  onNav={onNav} />;
      case "efeitos":   return <PageEfeitos   onNav={onNav} />;
      case "epoxi":     return <PageEpoxi     onNav={onNav} />;
      case "galeria":   return <PageGaleria   onNav={onNav} />;
      case "portfolio": return <PagePortfolio onNav={onNav} />;
      case "insta":     return <PageInsta     onNav={onNav} />;
      case "orcamento": return <PageOrcamento onNav={onNav} />;
      case "contato":   return <PageContato   onNav={onNav} />;
      default:          return <PageHome      onNav={onNav} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <Navbar current={page} onNav={onNav} />
      <main className="flex-1 pt-16">
        {renderPage()}
      </main>
      <Footer onNav={onNav} />
      <WAFloat />
    </div>
  );
}
