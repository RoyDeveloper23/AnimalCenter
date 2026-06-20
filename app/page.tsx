"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Stethoscope,
  Sparkles,
  ShoppingBag,
  MapPin,
  Clock,
  Phone,
  ChevronLeft,
  ChevronRight,
  Star,
  PawPrint,
  Syringe,
  Bath,
  Scissors,
  ShieldCheck,
  ArrowRight,
  Megaphone,
  Heart,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 paw-bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <span className="section-eyebrow">Bienvenido a Animal Center</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-black text-stone-900 leading-tight">
            El hogar que tu mascota
            <span className="text-orange-500"> merece 🐾</span>
          </h1>
          <p className="mt-5 text-lg text-stone-600 leading-relaxed">
            Salud, bienestar y amor en un solo lugar. Veterinaria profesional,
            SPA de relajación y Pet Shop completo para que tu compañero peludo
            viva su mejor vida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/login" className="btn-primary text-base">
              <PawPrint className="w-5 h-5" />
              Crear mi huellita
            </Link>
            <Link href="/catalogo" className="btn-outline text-base">
              Ver catálogo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Three branches */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BranchCard
            icon={<Stethoscope className="w-8 h-8" />}
            color="green"
            title="Veterinaria"
            tagline="Salud y confianza"
            desc="Consultas, vacunas, diagnósticos y emergencias atendidas por profesionales certificados."
            accent="bg-green-500"
            lightBg="bg-green-50"
            textColor="text-green-700"
            borderColor="border-green-200"
          />
          <BranchCard
            icon={<Sparkles className="w-8 h-8" />}
            color="purple"
            title="SPA"
            tagline="Relax y limpieza"
            desc="Baños aromáticos, cortes especializados, aromaterapia y tratamientos de belleza para tu peludo."
            accent="bg-purple-500"
            lightBg="bg-purple-50"
            textColor="text-purple-700"
            borderColor="border-purple-200"
          />
          <BranchCard
            icon={<ShoppingBag className="w-8 h-8" />}
            color="teal"
            title="Pet Shop"
            tagline="Todo lo que necesita"
            desc="Alimento premium, accesorios, juguetes y medicamentos para mascotas de todas las razas y tamaños."
            accent="bg-teal-500"
            lightBg="bg-teal-50"
            textColor="text-teal-700"
            borderColor="border-teal-200"
          />
        </div>
      </div>
    </section>
  );
}

function BranchCard({
  icon,
  title,
  tagline,
  desc,
  accent,
  lightBg,
  textColor,
  borderColor,
}: any) {
  return (
    <div
      className={`card-hover rounded-2xl border-2 ${borderColor} ${lightBg} p-7 text-center`}
    >
      <div
        className={`w-16 h-16 ${accent} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-md`}
      >
        {icon}
      </div>
      <p
        className={`text-xs font-bold tracking-widest uppercase ${textColor} mb-1`}
      >
        {tagline}
      </p>
      <h3 className="text-xl font-black text-stone-900 mb-2">{title}</h3>
      <p className="text-sm text-stone-600 leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Campaigns ─────────────────────────────────────────────────────────────────
function CampaignsSection() {
  const { campaigns } = useAppStore();
  const active = campaigns.filter((c) => c.active);
  if (!active.length) return null;

  return (
    <section className="py-16 bg-orange-500 paw-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Megaphone className="w-6 h-6 text-orange-100" />
          <span className="text-orange-100 font-black uppercase tracking-widest text-sm">
            Campañas Activas
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {active.map((c) => (
            <div
              key={c.id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-black text-white mb-2">{c.title}</h3>
              <p className="text-orange-100 text-sm leading-relaxed">
                {c.body}
              </p>
              <p className="text-orange-200 text-xs mt-3">{c.createdAt}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/campanas"
            className="btn-outline bg-white text-orange-500 "
          >
            Ver todas las campañas
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Pricing Catalog snippet ───────────────────────────────────────────────────
const SERVICES = [
  {
    icon: <Stethoscope className="w-5 h-5" />,
    name: "Consulta general",
    price: "$10",
    area: "Veterinaria",
    color: "green",
  },
  {
    icon: <Syringe className="w-5 h-5" />,
    name: "Vacuna antirrábica",
    price: "$25",
    area: "Veterinaria",
    color: "green",
  },
  {
    icon: <Syringe className="w-5 h-5" />,
    name: "Vacuna parvovirus",
    price: "$20",
    area: "Veterinaria",
    color: "green",
  },
  {
    icon: <Bath className="w-5 h-5" />,
    name: "Baño pequeño (≤5kg)",
    price: "$10",
    area: "SPA",
    color: "purple",
  },
  {
    icon: <Bath className="w-5 h-5" />,
    name: "Baño mediano (5–15kg)",
    price: "$15",
    area: "SPA",
    color: "purple",
  },
  {
    icon: <Bath className="w-5 h-5" />,
    name: "Baño grande (>15kg)",
    price: "$20",
    area: "SPA",
    color: "purple",
  },
  {
    icon: <Scissors className="w-5 h-5" />,
    name: "Corte + Baño",
    price: "$30",
    area: "SPA",
    color: "purple",
  },
  {
    icon: <ShoppingBag className="w-5 h-5" />,
    name: "Alimento premium (kg)",
    price: "$5",
    area: "Pet Shop",
    color: "teal",
  },
];

const AREA_COLORS: Record<string, string> = {
  green: "bg-green-50 border-green-200 text-green-700",
  purple: "bg-purple-50 border-purple-200 text-purple-700",
  teal: "bg-teal-50 border-teal-200 text-teal-700",
};

function CatalogPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-eyebrow">Tarifas transparentes</span>
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mt-2">
            Catálogo de servicios
          </h2>
          <p className="text-stone-500 mt-3">
            Precios base — actualiza los valores con tus tarifas reales
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`card-hover rounded-2xl border-2 p-5 ${AREA_COLORS[s.color]}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm`}
                >
                  {s.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                  {s.area}
                </span>
              </div>
              <p className="font-bold text-stone-900 text-sm leading-snug">
                {s.name}
              </p>
              <p className="text-2xl font-black text-stone-900 mt-2">
                {s.price}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/catalogo" className="btn-primary">
            Ver catálogo completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials carousel ─────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Rocío T.",
    pet: "Max — Golden Retriever",
    text: "El mejor lugar de la ciudad. Max llegó asustado y salió feliz. El equipo es increíble, muy profesionales y cariñosos.",
    stars: 5,
    emoji: "🐕",
  },
  {
    name: "Andrés M.",
    pet: "Mishi — Persa",
    text: "La Dra. Sofía es excelente. Mi gata Mishi tenía una infección y la atendieron de inmediato. En pocos días estaba perfectamente.",
    stars: 5,
    emoji: "🐈",
  },
  {
    name: "Valeria C.",
    pet: "Tobi — Beagle",
    text: "El SPA es fabuloso. Tobi huele a lavanda todo el día y su pelo brilla. Los cito cada mes sin dudar.",
    stars: 5,
    emoji: "🐶",
  },
  {
    name: "Felipe N.",
    pet: "Nala — Siamés",
    text: "Compré el alimento premium en el Pet Shop. Nala lo devora y tiene más energía que nunca. Excelente calidad.",
    stars: 5,
    emoji: "🐱",
  },
];

function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const prev = () =>
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[idx];

  return (
    <section className="py-20 bg-stone-50 paw-bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-eyebrow">Historias de éxito</span>
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mt-2">
            Familias que confían en nosotros
          </h2>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-100 text-center relative">
            <div className="text-6xl mb-4">{t.emoji}</div>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="text-stone-700 text-lg leading-relaxed italic mb-6">
              "{t.text}"
            </p>
            <p className="font-black text-stone-900">{t.name}</p>
            <p className="text-sm text-stone-500">{t.pet}</p>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-stone-200 hover:border-orange-300 hover:text-orange-500 flex items-center justify-center shadow-sm transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-orange-500" : "bg-stone-300"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-stone-200 hover:border-orange-300 hover:text-orange-500 flex items-center justify-center shadow-sm transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/testimonios" className="btn-outline">
            Ver más historias
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Map & Contact ─────────────────────────────────────────────────────────────
function MapSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-eyebrow">Encuéntranos</span>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mt-2 mb-6">
              Visítanos y conoce nuestras instalaciones
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Dirección</p>
                  <p className="text-stone-500 text-sm">Paraiso de la Flor</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">
                    Horarios de atención
                  </p>
                  <p className="text-stone-500 text-sm">
                    Lunes a Viernes: 9:00 – 17:00
                  </p>
                  <p className="text-stone-500 text-sm">
                    Sábados: 9:00 – 14:00
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Teléfono</p>
                  <p className="text-stone-500 text-sm">+593 987 654 321</p>
                </div>
              </li>
            </ul>
            <Link href="/login" className="btn-primary mt-8 inline-flex">
              <Heart className="w-4 h-4" />
              Reservar una cita
            </Link>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-orange-100 h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d996.7821015244558!2d-79.95081655707781!3d-2.104043384407771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d0d305b5c58b9%3A0x30ee5fc85e1095a8!2sAnimal%20Center!5e0!3m2!1ses-419!2sec!4v1781971831901!5m2!1ses-419!2sec"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Animal Center ubicación"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Loyalty CTA ───────────────────────────────────────────────────────────────
function LoyaltyCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500 paw-bg">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="text-5xl mb-4">🐾</div>
        <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-3">
          Programa de Huellitas
        </h2>
        <p className="text-orange-400 text-lg mb-8">
          Acumula puntos en cada visita y canjéalos por baños gratis y
          descuentos exclusivos.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          {[
            { label: "Consulta veterinaria", pts: "20", icon: "🏥" },
            { label: "Baño en SPA", pts: "25", icon: "✨" },
            { label: "Compra en Pet Shop", pts: "10", icon: "🛍️" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-white"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="font-black text-orange-500 text-lg grid grid-cols-2 justify-content gap-1 items-center mx-0 mb-1">
                {item.pts} <PawPrint className="w-5 h-5" />
              </p>
              <p className="text-sm text-stone-900">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="text-orange-500 text-sm mb-6">
          🎁 Al acumular
          <span className="my-3">
            <strong className="text-stone-900 mx-3">100 huellitas</strong> →
            Baño gratis ·{" "}
          </span>
          <strong className="text-stone-900 mx-3">200 huellitas</strong> → 30%
          descuento Pet Shop
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-white text-orange-500 font-black rounded-full px-8 py-3 hover:bg-orange-50 transition-colors text-base shadow-lg"
        >
          <PawPrint className="w-5 h-5" />
          Registrarme y empezar a acumular
        </Link>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CampaignsSection />
      <CatalogPreview />
      <TestimonialsSection />
      <LoyaltyCTA />
      <MapSection />
    </>
  );
}
