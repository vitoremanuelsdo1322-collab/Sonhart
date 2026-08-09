import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Star,
  Paintbrush,
  Shield,
  Layers,
  Droplets,
  Palette,
  Building2,
  Eye,
  Wrench,
  Clock,
  Award,
  Users,
  ChevronDown,
  Send,
  Instagram,
  Facebook,
  Sparkles,
} from "lucide-react";

type Page =
  | "home"
  | "interior"
  | "exterior"
  | "decorativo"
  | "impermeabilizacao"
  | "texturas"
  | "vernizes"
  | "industrial"
  | "consultoria"
  | "contato";

const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: "home", label: "Início" },
  { id: "interior", label: "P. Interior" },
  { id: "exterior", label: "P. Exterior" },
  { id: "decorativo", label: "Acabamentos" },
  { id: "impermeabilizacao", label: "Impermeab." },
  { id: "texturas", label: "Texturas" },
  { id: "vernizes", label: "Vernizes" },
  { id: "industrial", label: "Industrial" },
  { id: "consultoria", label: "Consultoria" },
  { id: "contato", label: "Contato" },
];

const SERVICES: { id: Page; label: string; icon: React.ReactNode; color: string; desc: string }[] = [
  { id: "interior", label: "Pintura Interior", icon: <Paintbrush size={28} />, color: "#C41E3A", desc: "Ambientes renovados com cores que inspiram" },
  { id: "exterior", label: "Pintura Exterior", icon: <Building2 size={28} />, color: "#E86B1F", desc: "Proteção e beleza para a fachada da sua obra" },
  { id: "decorativo", label: "Acabamentos Decorativos", icon: <Sparkles size={28} />, color: "#B5191A", desc: "Efeitos especiais e técnicas artesanais" },
  { id: "impermeabilizacao", label: "Impermeabilização", icon: <Droplets size={28} />, color: "#E05010", desc: "Proteção total contra umidade e infiltrações" },
  { id: "texturas", label: "Texturas & Grafiato", icon: <Layers size={28} />, color: "#C85A00", desc: "Superfícies com personalidade e profundidade" },
  { id: "vernizes", label: "Vernizes & Esmaltes", icon: <Eye size={28} />, color: "#D4181B", desc: "Acabamentos de alto brilho e durabilidade" },
  { id: "industrial", label: "Pintura Industrial", icon: <Wrench size={28} />, color: "#A01530", desc: "Soluções técnicas para grandes estruturas" },
  { id: "consultoria", label: "Consultoria de Cores", icon: <Palette size={28} />, color: "#F5A000", desc: "Harmonia cromática com orientação especializada" },
];

function Navbar({ current, onNavigate }: { current: Page; onNavigate: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        background: scrolled ? "rgba(28, 8, 0, 0.97)" : "#1C0800",
        transition: "background 0.3s",
        fontFamily: "'Nunito Sans', sans-serif",
      }}
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => { onNavigate("home"); setOpen(false); }}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#C41E3A" }}>
            <Paintbrush size={18} color="white" />
          </div>
          <span
            style={{ fontFamily: "'Anton', sans-serif", letterSpacing: "0.08em", color: "#F5C842", fontSize: "1.5rem" }}
          >
            SONHART
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="px-3 py-1.5 rounded text-sm transition-all duration-200 font-semibold"
              style={{
                color: current === item.id ? "#F5C842" : "#f0d0c0",
                background: current === item.id ? "rgba(196,30,58,0.25)" : "transparent",
                borderBottom: current === item.id ? "2px solid #C41E3A" : "2px solid transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Phone + mobile toggle */}
        <div className="flex items-center gap-3">
          <a href="tel:+5511999999999" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#F5C842" }}>
            <Phone size={14} />
            (11) 99999-9999
          </a>
          <button
            className="xl:hidden p-2 rounded"
            style={{ color: "#F5C842" }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#1C0800", borderTop: "1px solid rgba(196,30,58,0.3)" }} className="xl:hidden px-4 pb-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setOpen(false); }}
              className="w-full text-left py-3 px-2 text-sm font-semibold border-b"
              style={{
                color: current === item.id ? "#F5C842" : "#f0d0c0",
                borderColor: "rgba(196,30,58,0.2)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer style={{ background: "#0F0400", fontFamily: "'Nunito Sans', sans-serif" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#C41E3A" }}>
              <Paintbrush size={18} color="white" />
            </div>
            <span style={{ fontFamily: "'Anton', sans-serif", letterSpacing: "0.08em", color: "#F5C842", fontSize: "1.5rem" }}>SONHART</span>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#c0a090" }}>
            Pinturas de alto padrão com qualidade profissional e compromisso com a excelência. Transformamos espaços em obras de arte.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ background: "rgba(196,30,58,0.3)" }}>
              <Instagram size={16} color="#F5C842" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(196,30,58,0.3)" }}>
              <Facebook size={16} color="#F5C842" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: "#F5C842" }}>Serviços</h4>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className="text-left text-sm hover:text-white transition-colors"
                style={{ color: "#c0a090" }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: "#F5C842" }}>Contato</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm" style={{ color: "#c0a090" }}>
              <Phone size={14} className="mt-0.5 shrink-0" style={{ color: "#C41E3A" }} />
              (11) 99999-9999
            </div>
            <div className="flex items-start gap-2 text-sm" style={{ color: "#c0a090" }}>
              <Mail size={14} className="mt-0.5 shrink-0" style={{ color: "#C41E3A" }} />
              contato@sonhart.com.br
            </div>
            <div className="flex items-start gap-2 text-sm" style={{ color: "#c0a090" }}>
              <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "#C41E3A" }} />
              Rua das Tintas, 245 — São Paulo, SP
            </div>
            <div className="flex items-start gap-2 text-sm" style={{ color: "#c0a090" }}>
              <Clock size={14} className="mt-0.5 shrink-0" style={{ color: "#C41E3A" }} />
              Seg–Sex: 8h–18h | Sáb: 8h–13h
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(196,30,58,0.2)", color: "#7a4030" }} className="text-center py-5 text-xs">
        © {new Date().getFullYear()} SONHART Pinturas. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function ServiceCard({ service, onNavigate }: { service: typeof SERVICES[0]; onNavigate: (p: Page) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onNavigate(service.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-left p-6 rounded-xl transition-all duration-300 group"
      style={{
        background: hovered ? service.color : "#ffffff",
        boxShadow: hovered ? `0 12px 40px ${service.color}40` : "0 2px 16px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-4px)" : "none",
        border: `2px solid ${hovered ? service.color : "rgba(196,30,58,0.12)"}`,
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
        style={{ background: hovered ? "rgba(255,255,255,0.2)" : `${service.color}15`, color: hovered ? "#fff" : service.color }}
      >
        {service.icon}
      </div>
      <h3 className="font-bold text-base mb-2 transition-colors duration-300" style={{ fontFamily: "'Rajdhani', sans-serif", color: hovered ? "#fff" : "#1C0800", fontSize: "1.1rem" }}>
        {service.label}
      </h3>
      <p className="text-sm transition-colors duration-300" style={{ color: hovered ? "rgba(255,255,255,0.85)" : "#7A4030" }}>
        {service.desc}
      </p>
      <div className="flex items-center gap-1 mt-4 text-xs font-semibold transition-colors duration-300" style={{ color: hovered ? "#F5C842" : service.color }}>
        Ver serviço <ArrowRight size={13} />
      </div>
    </button>
  );
}

// ─── PAGE: HOME ────────────────────────────────────────────────────────────────
function PageHome({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&h=900&fit=crop&auto=format"
            alt="Pintura profissional de interiores"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(196,30,58,0.7) 0%, rgba(28,8,0,0.95) 60%)" }} />
        </div>

        {/* Paint drip accent */}
        <div className="absolute top-0 right-0 w-64 h-32 rounded-bl-full opacity-60" style={{ background: "#C41E3A" }} />
        <div className="absolute top-0 right-32 w-20 h-20 rounded-full opacity-40" style={{ background: "#E86B1F" }} />
        <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full opacity-20" style={{ background: "#F5C842" }} />

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6" style={{ background: "rgba(245,200,66,0.15)", color: "#F5C842", border: "1px solid rgba(245,200,66,0.3)" }}>
              <Paintbrush size={12} />
              Pinturas de Alto Padrão
            </div>
            <h1
              className="text-white mb-6 leading-none"
              style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", letterSpacing: "0.02em" }}
            >
              TRANSFORMAMOS<br />
              <span style={{ color: "#F5C842" }}>ESPAÇOS</span> EM<br />
              OBRAS DE ARTE
            </h1>
            <p className="text-lg mb-8 max-w-lg leading-relaxed" style={{ color: "#f0c8b0" }}>
              A SONHART oferece serviços de pintura residencial, comercial e industrial com qualidade incomparável e acabamentos que duram anos.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate("contato")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{ background: "#C41E3A", color: "#fff", boxShadow: "0 8px 24px rgba(196,30,58,0.5)" }}
              >
                Solicitar Orçamento <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate("interior")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-2 transition-all hover:bg-white/10"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}
              >
                Nossos Serviços
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {[
                { n: "15+", l: "Anos de experiência" },
                { n: "2.400+", l: "Projetos concluídos" },
                { n: "98%", l: "Clientes satisfeitos" },
              ].map((s) => (
                <div key={s.n}>
                  <div className="font-black text-2xl" style={{ fontFamily: "'Anton', sans-serif", color: "#F5C842" }}>{s.n}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#c09070" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 rounded-full opacity-20" style={{ background: "#F5C842" }} />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4" style={{ borderColor: "#C41E3A" }}>
              <img
                src="https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&h=500&fit=crop&auto=format"
                alt="Latas de tinta coloridas SONHART"
                className="w-full object-cover"
                style={{ height: "420px" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(28,8,0,0.8) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#C41E3A" }}>
                    <Award size={18} color="white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Certificação ISO 9001</div>
                    <div className="text-xs" style={{ color: "#F5C842" }}>Qualidade garantida</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} color="#F5C842" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 tracking-wider uppercase" style={{ background: "rgba(196,30,58,0.1)", color: "#C41E3A" }}>
              O que fazemos
            </div>
            <h2 className="mb-3" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2.8rem", color: "#1C0800" }}>
              NOSSOS SERVIÇOS
            </h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: "#7A4030" }}>
              Do projeto à entrega final, oferecemos soluções completas em pintura e revestimento para todos os tipos de obra.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => <ServiceCard key={s.id} service={s} onNavigate={onNavigate} />)}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 px-6" style={{ background: "#1C0800" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full text-xs font-bold mb-4 tracking-wider uppercase" style={{ background: "rgba(245,200,66,0.15)", color: "#F5C842" }}>
              Por que escolher a SONHART
            </div>
            <h2 className="text-white mb-6" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2.6rem", lineHeight: 1.1 }}>
              QUALIDADE QUE<br />
              <span style={{ color: "#C41E3A" }}>VOCÊ PODE VER</span>
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "#c09070" }}>
              Nossa equipe de profissionais altamente treinados utiliza materiais premium e técnicas avançadas para entregar resultados excepcionais em cada projeto.
            </p>
            <div className="space-y-4">
              {[
                "Materiais de primeira linha, selecionados com rigor",
                "Equipe treinada e certificada",
                "Prazo de entrega cumprido com garantia contratual",
                "Limpeza e organização total do canteiro de obras",
                "Garantia de 2 a 5 anos nos serviços",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-0.5 shrink-0" style={{ color: "#F5C842" }} />
                  <span className="text-sm" style={{ color: "#e0c0a0" }}>{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate("contato")}
              className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
              style={{ background: "#C41E3A", color: "#fff" }}
            >
              Solicitar visita técnica <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { icon: <Shield size={28} />, title: "Garantia Total", desc: "Documentada e contratual em todos os serviços" },
              { icon: <Clock size={28} />, title: "Pontualidade", desc: "Prazos rigorosamente respeitados e comunicados" },
              { icon: <Award size={28} />, title: "Premiado", desc: "Reconhecido por excelência no setor de tintas" },
              { icon: <Users size={28} />, title: "Equipe Própria", desc: "Profissionais diretos, sem terceirização" },
            ].map((card) => (
              <div key={card.title} className="p-5 rounded-xl" style={{ background: "rgba(196,30,58,0.12)", border: "1px solid rgba(196,30,58,0.2)" }}>
                <div className="mb-3" style={{ color: "#F5C842" }}>{card.icon}</div>
                <h4 className="font-bold text-sm text-white mb-1" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem" }}>{card.title}</h4>
                <p className="text-xs" style={{ color: "#c09070" }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "2.5rem", color: "#1C0800" }}>O QUE DIZEM NOSSOS CLIENTES</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Marina Costa", role: "Arquiteta", text: "A SONHART superou todas as expectativas. O acabamento decorativo ficou impecável, exatamente como projetei.", stars: 5 },
              { name: "Roberto Almeida", role: "Construtora RA", text: "Trabalhamos juntos em 12 obras. Qualidade constante, equipe profissional e prazos sempre cumpridos.", stars: 5 },
              { name: "Fernanda Lima", role: "Síndica", text: "A reforma do condomínio foi transformada pela SONHART. Voltarei a contratar sem dúvida!", stars: 5 },
            ].map((t) => (
              <div key={t.name} className="p-6 rounded-xl shadow-sm" style={{ background: "#fff", border: "1px solid rgba(196,30,58,0.1)" }}>
                <div className="flex gap-1 mb-4">
                  {Array(t.stars).fill(0).map((_, i) => <Star key={i} size={14} fill="#F5C842" color="#F5C842" />)}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "#4A2010" }}>"{t.text}"</p>
                <div>
                  <div className="font-bold text-sm" style={{ color: "#1C0800" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "#C41E3A" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6" style={{ background: "#C41E3A" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-3" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2.5rem" }}>
            PRONTO PARA TRANSFORMAR SEU ESPAÇO?
          </h2>
          <p className="mb-8 text-base" style={{ color: "rgba(255,255,255,0.85)" }}>
            Entre em contato e receba um orçamento gratuito em até 24 horas.
          </p>
          <button
            onClick={() => onNavigate("contato")}
            className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
            style={{ background: "#F5C842", color: "#1C0800" }}
          >
            Falar com um especialista agora
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── GENERIC SERVICE PAGE ──────────────────────────────────────────────────────
interface ServicePageProps {
  onNavigate: (p: Page) => void;
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  heroColor: string;
  description: string;
  items: string[];
  steps: { n: string; title: string; desc: string }[];
  image2: string;
  alt2: string;
  badge?: string;
}

function ServicePage({ onNavigate, title, subtitle, heroImage, heroAlt, heroColor, description, items, steps, image2, alt2, badge }: ServicePageProps) {
  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden" style={{ background: "#1C0800" }}>
        <div className="absolute inset-0">
          <img src={heroImage} alt={heroAlt} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${heroColor}99 0%, rgba(28,8,0,0.95) 65%)` }} />
        </div>
        <div className="absolute top-0 right-0 w-80 h-48 rounded-bl-full opacity-50" style={{ background: heroColor }} />

        <div className="relative max-w-5xl mx-auto">
          <button onClick={() => onNavigate("home")} className="flex items-center gap-1 text-xs mb-6 font-semibold" style={{ color: "#F5C842" }}>
            ← Voltar ao início
          </button>
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(245,200,66,0.15)", color: "#F5C842", border: "1px solid rgba(245,200,66,0.3)" }}>
              {badge}
            </div>
          )}
          <h1 className="text-white mb-4 leading-none" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            {title}
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>{subtitle}</p>
          <button
            onClick={() => onNavigate("contato")}
            className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
            style={{ background: heroColor, color: "#fff", boxShadow: `0 8px 24px ${heroColor}50` }}
          >
            Pedir orçamento gratuito <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2rem", color: "#1C0800" }}>
              POR QUE ESCOLHER ESTE SERVIÇO?
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "#4A2010" }}>{description}</p>
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it} className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-0.5 shrink-0" style={{ color: heroColor }} />
                  <span className="text-sm" style={{ color: "#4A2010" }}>{it}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate("contato")}
              className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
              style={{ background: heroColor, color: "#fff" }}
            >
              Solicitar visita técnica gratuita <ArrowRight size={15} />
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl relative" style={{ border: `3px solid ${heroColor}` }}>
            <img src={image2} alt={alt2} className="w-full object-cover" style={{ height: "380px" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(28,8,0,0.7) 100%)" }} />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: heroColor }}>
                <Award size={18} color="white" />
              </div>
              <span className="text-white text-sm font-bold">Garantia de qualidade SONHART</span>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6" style={{ background: "#1C0800" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-white mb-12" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2rem" }}>
            COMO FUNCIONA NOSSO PROCESSO
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="p-5 rounded-xl text-center" style={{ background: "rgba(196,30,58,0.1)", border: "1px solid rgba(196,30,58,0.2)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm" style={{ background: heroColor, color: "#fff" }}>
                  {step.n}
                </div>
                <h4 className="font-bold text-white mb-2 text-sm" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem" }}>{step.title}</h4>
                <p className="text-xs" style={{ color: "#c09070" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-8" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2rem", color: "#1C0800" }}>
            OUTROS SERVIÇOS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SERVICES.slice(0, 4).map((s) => (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className="p-4 rounded-xl text-left transition-all hover:scale-102 border"
                style={{ background: "#fff", borderColor: "rgba(196,30,58,0.12)" }}
              >
                <div className="text-2xl mb-2" style={{ color: s.color }}>{s.icon}</div>
                <div className="font-bold text-xs" style={{ color: "#1C0800" }}>{s.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────────
function PageContato({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6" style={{ background: "#1C0800" }}>
        <div className="absolute top-0 right-0 w-64 h-40 rounded-bl-full opacity-60" style={{ background: "#C41E3A" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(245,200,66,0.15)", color: "#F5C842", border: "1px solid rgba(245,200,66,0.3)" }}>
            <Phone size={12} /> Atendimento Rápido
          </div>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            FALE COM A SONHART
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)" }}>
            Solicite seu orçamento gratuito. Respondemos em até 24 horas.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl shadow-sm" style={{ background: "#fff", border: "1px solid rgba(196,30,58,0.1)" }}>
              <h2 className="mb-6" style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.8rem", color: "#1C0800" }}>
                SOLICITAR ORÇAMENTO
              </h2>

              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle size={56} className="mx-auto mb-4" style={{ color: "#C41E3A" }} />
                  <h3 className="font-bold text-xl mb-2" style={{ color: "#1C0800" }}>Mensagem enviada!</h3>
                  <p style={{ color: "#7A4030" }}>Entraremos em contato em breve. Obrigado!</p>
                  <button onClick={() => setSent(false)} className="mt-6 px-5 py-2 rounded-full text-sm font-bold" style={{ background: "#C41E3A", color: "#fff" }}>
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: "#7A4030" }}>Nome completo *</label>
                      <input
                        required
                        type="text"
                        placeholder="Seu nome"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: "#F2E4D8", border: "2px solid transparent", color: "#1C0800" }}
                        onFocus={(e) => (e.target.style.borderColor = "#C41E3A")}
                        onBlur={(e) => (e.target.style.borderColor = "transparent")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: "#7A4030" }}>Telefone *</label>
                      <input
                        required
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ background: "#F2E4D8", border: "2px solid transparent", color: "#1C0800" }}
                        onFocus={(e) => (e.target.style.borderColor = "#C41E3A")}
                        onBlur={(e) => (e.target.style.borderColor = "transparent")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "#7A4030" }}>E-mail</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "#F2E4D8", border: "2px solid transparent", color: "#1C0800" }}
                      onFocus={(e) => (e.target.style.borderColor = "#C41E3A")}
                      onBlur={(e) => (e.target.style.borderColor = "transparent")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "#7A4030" }}>Serviço desejado</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "#F2E4D8", border: "2px solid transparent", color: form.service ? "#1C0800" : "#7A4030" }}
                    >
                      <option value="">Selecione um serviço</option>
                      {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "#7A4030" }}>Mensagem</label>
                    <textarea
                      rows={4}
                      placeholder="Descreva seu projeto, metragem estimada, prazo desejado..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{ background: "#F2E4D8", border: "2px solid transparent", color: "#1C0800" }}
                      onFocus={(e) => (e.target.style.borderColor = "#C41E3A")}
                      onBlur={(e) => (e.target.style.borderColor = "transparent")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.01]"
                    style={{ background: "#C41E3A", color: "#fff", boxShadow: "0 8px 24px rgba(196,30,58,0.35)" }}
                  >
                    <Send size={16} /> Enviar solicitação de orçamento
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl" style={{ background: "#C41E3A" }}>
              <h3 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.3rem" }}>
                Atendimento Direto
              </h3>
              <div className="space-y-4">
                {[
                  { icon: <Phone size={16} />, label: "Telefone / WhatsApp", value: "(11) 99999-9999" },
                  { icon: <Mail size={16} />, label: "E-mail", value: "contato@sonhart.com.br" },
                  { icon: <MapPin size={16} />, label: "Endereço", value: "Rua das Tintas, 245 — São Paulo, SP" },
                  { icon: <Clock size={16} />, label: "Horário", value: "Seg–Sex: 8h–18h | Sáb: 8h–13h" },
                ].map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.2)", color: "#F5C842" }}>
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{info.label}</div>
                      <div className="text-sm text-white font-semibold">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(196,30,58,0.1)" }}>
              <h3 className="font-bold mb-4" style={{ color: "#1C0800", fontFamily: "'Rajdhani', sans-serif", fontSize: "1.2rem" }}>
                Áreas de Atendimento
              </h3>
              <div className="flex flex-wrap gap-2">
                {["São Paulo", "Guarulhos", "Campinas", "Santo André", "São Bernardo", "Osasco", "Barueri", "Mogi das Cruzes"].map((city) => (
                  <span key={city} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#F2E4D8", color: "#C41E3A" }}>
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl flex items-center gap-4" style={{ background: "#F5C842" }}>
              <Award size={32} style={{ color: "#1C0800" }} className="shrink-0" />
              <div>
                <div className="font-bold text-sm" style={{ color: "#1C0800" }}>Orçamento 100% gratuito</div>
                <div className="text-xs" style={{ color: "#4A2010" }}>Sem compromisso. Resposta em até 24h.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const servicePages: Record<Exclude<Page, "home" | "contato">, ServicePageProps & { onNavigate: (p: Page) => void }> = {
    interior: {
      onNavigate: navigate,
      title: "PINTURA INTERIOR",
      subtitle: "Ambientes renovados com cores e acabamentos que inspiram e valorizam seu imóvel.",
      heroImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&h=900&fit=crop&auto=format",
      heroAlt: "Pintura interior profissional",
      heroColor: "#C41E3A",
      description: "A pintura interior é o toque final que transforma um espaço. Com nossa equipe especializada, utilizamos as melhores tintas e técnicas para garantir um resultado impecável, seja em residências, escritórios ou estabelecimentos comerciais.",
      badge: "Residencial & Comercial",
      items: [
        "Preparação completa de superfícies (massa corrida, selador, lixamento)",
        "Tintas premium de baixo odor e alta cobertura",
        "Profissionais especializados em acabamentos finos",
        "Mínimo de impacto no cotidiano do cliente",
        "Limpeza completa após a conclusão do serviço",
        "Garantia de 2 anos no serviço",
      ],
      steps: [
        { n: "01", title: "Avaliação", desc: "Vistoria gratuita do imóvel e levantamento das necessidades" },
        { n: "02", title: "Orçamento", desc: "Proposta detalhada com materiais e mão de obra" },
        { n: "03", title: "Execução", desc: "Equipe treinada executa com proteção total dos móveis" },
        { n: "04", title: "Entrega", desc: "Vistoria final, limpeza e entrega com garantia" },
      ],
      image2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=500&fit=crop&auto=format",
      alt2: "Resultado final de pintura interior",
    },
    exterior: {
      onNavigate: navigate,
      title: "PINTURA EXTERIOR",
      subtitle: "Proteção e beleza para a fachada do seu imóvel contra todos os elementos.",
      heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop&auto=format",
      heroAlt: "Pintura exterior de fachada",
      heroColor: "#E86B1F",
      description: "A pintura exterior não é apenas estética — é proteção. Nossos sistemas de pintura protegem fachadas contra umidade, fungos, raios UV e poluição, garantindo durabilidade e beleza por anos.",
      badge: "Fachadas & Condomínios",
      items: [
        "Limpeza e tratamento completo da fachada antes da pintura",
        "Tintas elastoméricas de alta resistência a intempéries",
        "Proteção anti-mofo e anti-fungo",
        "Reparos de trincas e imperfeições incluídos",
        "Equipamentos de segurança certificados para trabalho em altura",
        "Garantia de 3 anos no serviço",
      ],
      steps: [
        { n: "01", title: "Diagnóstico", desc: "Análise do estado da fachada e das patologias existentes" },
        { n: "02", title: "Tratamento", desc: "Correção de trincas, limpeza e preparação da superfície" },
        { n: "03", title: "Aplicação", desc: "Pintura em camadas com tintas selecionadas para cada substrato" },
        { n: "04", title: "Controle", desc: "Inspeção de qualidade e entrega com certificado" },
      ],
      image2: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&h=500&fit=crop&auto=format",
      alt2: "Fachada pintada externamente",
    },
    decorativo: {
      onNavigate: navigate,
      title: "ACABAMENTOS DECORATIVOS",
      subtitle: "Técnicas artesanais e efeitos especiais que elevam qualquer ambiente ao nível da arte.",
      heroImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=900&fit=crop&auto=format",
      heroAlt: "Acabamento decorativo artesanal",
      heroColor: "#B5191A",
      description: "Nossos acabamentos decorativos incluem cimento queimado, marmorização, efeito envelhecido, stucco veneziano e muito mais. Cada técnica é executada por artesãos especializados para criar ambientes únicos.",
      badge: "Arte & Exclusividade",
      items: [
        "Cimento queimado artístico em paredes e pisos",
        "Marmorização e efeitos pétreos realistas",
        "Stucco veneziano tradicional",
        "Efeito envelhecido e patinado",
        "Pintura artística e murais personalizados",
        "Atelier de amostras antes da execução",
      ],
      steps: [
        { n: "01", title: "Consultoria", desc: "Definição de estilo, técnica e paleta de cores com o cliente" },
        { n: "02", title: "Amostra", desc: "Execução de painel de teste no local para aprovação" },
        { n: "03", title: "Aplicação", desc: "Execução artesanal por especialistas certificados" },
        { n: "04", title: "Finalização", desc: "Aplicação de proteção e verniz; entrega impecável" },
      ],
      image2: "https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?w=700&h=500&fit=crop&auto=format",
      alt2: "Efeito decorativo aplicado em parede",
    },
    impermeabilizacao: {
      onNavigate: navigate,
      title: "IMPERMEABILIZAÇÃO",
      subtitle: "Proteja sua estrutura contra umidade e infiltrações com sistemas técnicos de última geração.",
      heroImage: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&h=900&fit=crop&auto=format",
      heroAlt: "Impermeabilização de laje",
      heroColor: "#E05010",
      description: "A impermeabilização adequada previne danos estruturais graves causados por umidade e infiltrações. Trabalhamos com sistemas de impermeabilização rígida e flexível para lajes, coberturas, banheiros, piscinas e subsolos.",
      badge: "Proteção Estrutural",
      items: [
        "Impermeabilização de lajes e coberturas com manta asfáltica",
        "Tratamento de banheiros e áreas molhadas",
        "Impermeabilização de piscinas e reservatórios",
        "Sistemas de drenagem e ventilação incluídos",
        "Argamassas poliméricas de alta resistência",
        "Garantia de 5 anos com laudo técnico",
      ],
      steps: [
        { n: "01", title: "Inspeção", desc: "Mapeamento de todas as fontes de umidade e infiltração" },
        { n: "02", title: "Preparação", desc: "Limpeza, primer e regularização do substrato" },
        { n: "03", title: "Aplicação", desc: "Sistemas impermeabilizantes em camadas certificadas" },
        { n: "04", title: "Teste", desc: "Prova d'água obrigatória e emissão de laudo técnico" },
      ],
      image2: "https://images.unsplash.com/photo-1487611273011-2da4a7b0fe88?w=700&h=500&fit=crop&auto=format",
      alt2: "Aplicação de impermeabilizante em laje",
    },
    texturas: {
      onNavigate: navigate,
      title: "TEXTURAS & GRAFIATO",
      subtitle: "Superfícies com personalidade, profundidade e resistência incomparável.",
      heroImage: "https://images.unsplash.com/photo-1582913130019-04e2c81cad76?w=1600&h=900&fit=crop&auto=format",
      heroAlt: "Textura aplicada em parede",
      heroColor: "#C85A00",
      description: "Texturas acrílicas e grafiato oferecem durabilidade superior às tintas convencionais, além de criar superfícies com toque artesanal e visual tridimensional. Ideais para fachadas e ambientes que exigem personalidade.",
      badge: "Fachadas & Interiores",
      items: [
        "Textura acrílica rolada, projetada ou desempenada",
        "Grafiato rústico e grafiato fino",
        "Textura pedra mineira e canjiquinha",
        "Proteção superior a tintas convencionais",
        "Resistência a rachaduras e impactos leves",
        "Grande variedade de cores e padrões",
      ],
      steps: [
        { n: "01", title: "Escolha", desc: "Definição do padrão e granulometria com o cliente" },
        { n: "02", title: "Base", desc: "Preparação e selagem adequada da superfície" },
        { n: "03", title: "Aplicação", desc: "Projeção ou rolagem por técnicos especializados" },
        { n: "04", title: "Acabamento", desc: "Regularização final e selagem protetora" },
      ],
      image2: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=700&h=500&fit=crop&auto=format",
      alt2: "Detalhe de textura aplicada em parede",
    },
    vernizes: {
      onNavigate: navigate,
      title: "VERNIZES & ESMALTES",
      subtitle: "Brilho, proteção e durabilidade para madeiras, metais e superfícies nobres.",
      heroImage: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=1600&h=900&fit=crop&auto=format",
      heroAlt: "Aplicação de verniz em madeira",
      heroColor: "#D4181B",
      description: "Vernizes e esmaltes sintéticos e à base d'água para madeira e metal com acabamento brilhante, semibrilhante ou fosco. Resaltamos a beleza natural dos materiais enquanto protegemos contra desgaste, umidade e corrosão.",
      badge: "Madeiras & Metais",
      items: [
        "Verniz sintético e PU de alto brilho",
        "Esmalte sintético e à base d'água para metais",
        "Tratamento antioxidante para ferragens e grades",
        "Lixamento e preparação incluídos no serviço",
        "Preservação e realce do veio da madeira",
        "Acabamento fosco, semibrilhante e brilhante",
      ],
      steps: [
        { n: "01", title: "Avaliação", desc: "Estado das superfícies e escolha do sistema correto" },
        { n: "02", title: "Lixamento", desc: "Preparação mecânica para aderência perfeita" },
        { n: "03", title: "Aplicação", desc: "Fundo, intermediário e acabamento em camadas" },
        { n: "04", title: "Polimento", desc: "Polimento final para acabamento espelhado" },
      ],
      image2: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&h=500&fit=crop&auto=format",
      alt2: "Resultado final de verniz em madeira",
    },
    industrial: {
      onNavigate: navigate,
      title: "PINTURA INDUSTRIAL",
      subtitle: "Proteção técnica para estruturas metálicas, galpões, silos e grandes obras industriais.",
      heroImage: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&h=900&fit=crop&auto=format",
      heroAlt: "Pintura industrial em estrutura metálica",
      heroColor: "#A01530",
      description: "A pintura industrial exige sistemas técnicos específicos para proteger grandes estruturas contra corrosão, agentes químicos e desgaste mecânico. Nossa equipe é certificada em trabalho em altura e jato abrasivo.",
      badge: "Galpões & Estruturas",
      items: [
        "Tratamento anticorrosivo com primer epóxi",
        "Sistemas de pintura de alto desempenho (Epóxi, PU)",
        "Jato abrasivo e hidrojato para preparação",
        "Pintura de galpões, silos, pontes e tanques",
        "Equipe certificada NR-35 (trabalho em altura)",
        "Laudos técnicos e acompanhamento de engenheiro",
      ],
      steps: [
        { n: "01", title: "Projeto", desc: "Elaboração de memorial descritivo com engenheiro responsável" },
        { n: "02", title: "Jato", desc: "Preparação superficial por jato abrasivo grau Sa 2,5" },
        { n: "03", title: "Pintura", desc: "Aplicação do sistema de proteção em camadas definidas" },
        { n: "04", title: "Inspeção", desc: "Medição de espessura de filme seco e laudo final" },
      ],
      image2: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=500&fit=crop&auto=format",
      alt2: "Estrutura metálica com pintura industrial",
    },
    consultoria: {
      onNavigate: navigate,
      title: "CONSULTORIA DE CORES",
      subtitle: "Harmonia cromática especializada para criar ambientes que comunicam e emocionam.",
      heroImage: "https://images.unsplash.com/photo-1614846027182-cecb07ceb4a4?w=1600&h=900&fit=crop&auto=format",
      heroAlt: "Paletas de cores para consultoria",
      heroColor: "#F5A000",
      description: "Nossa consultoria de cores é conduzida por coloristas certificadas que analisam a iluminação, o estilo de vida e os objetivos de cada cliente para criar uma paleta cromática harmônica e funcional.",
      badge: "Design & Cromática",
      items: [
        "Análise da iluminação natural e artificial do ambiente",
        "Projeto cromático completo com referências de produtos",
        "Testes de cor em painéis físicos no local",
        "Harmonização entre paredes, móveis e revestimentos",
        "Apresentação de renders 3D com as cores definidas",
        "Acompanhamento na execução final da pintura",
      ],
      steps: [
        { n: "01", title: "Briefing", desc: "Entendimento do estilo, cores favoritas e objetivos do espaço" },
        { n: "02", title: "Análise", desc: "Visita técnica para avaliar iluminação e arquitetura" },
        { n: "03", title: "Proposta", desc: "Apresentação de paleta cromática e render digital" },
        { n: "04", title: "Execução", desc: "Acompanhamento da pintura para garantia do resultado" },
      ],
      image2: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=700&h=500&fit=crop&auto=format",
      alt2: "Consultora de cores analisando amostras",
    },
  };

  const renderPage = () => {
    if (page === "home") return <PageHome onNavigate={navigate} />;
    if (page === "contato") return <PageContato onNavigate={navigate} />;
    const sp = servicePages[page as keyof typeof servicePages];
    if (sp) return <ServicePage {...sp} />;
    return <PageHome onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <Navbar current={page} onNavigate={navigate} />
      <main className="flex-1 pt-16">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
