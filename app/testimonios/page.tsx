"use client";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Heart, PawPrint } from "lucide-react";
import Link from "next/link";

const TESTIMONIALS = [
  {
    name: "Rocío Torres",
    pet: "Max",
    breed: "Golden Retriever · 4 años",
    area: "SPA",
    emoji: "🐕",
    color: "purple",
    stars: 5,
    text: "Llevé a Max al SPA por primera vez y quedé asombrada. El equipo lo recibió con tanta paciencia, llegó nervioso y salió moviendo la cola feliz. El baño de aromaterapia le dejó el pelo brillante por días. ¡Los recomiendo sin dudarlo!",
    date: "Mayo 2026",
  },
  {
    name: "Andrés Morales",
    pet: "Mishi",
    breed: "Gata Persa · 2 años",
    area: "Veterinaria",
    emoji: "🐈",
    color: "green",
    stars: 5,
    text: "La Dra. Sofía es excelente. Mishi tenía una infección ocular y me atendieron el mismo día. Explicó todo el tratamiento con claridad y a los 5 días mi gata estaba perfectamente. La clínica es limpia, organizada y muy profesional.",
    date: "Abril 2026",
  },
  {
    name: "Valeria Cedeño",
    pet: "Tobi",
    breed: "Beagle · 3 años",
    area: "SPA",
    emoji: "🐶",
    color: "purple",
    stars: 5,
    text: "El SPA de Animal Center es simplemente fabuloso. Tobi huele a lavanda todo el día y su pelo brilla como nunca. Llevan un historial de sus visitas que me da mucha tranquilidad. Ya agendé el próximo turno.",
    date: "Junio 2026",
  },
  {
    name: "Felipe Naranjo",
    pet: "Nala",
    breed: "Siamés · 1 año",
    area: "Pet Shop",
    emoji: "🐱",
    color: "teal",
    stars: 5,
    text: "Compré el alimento premium en el Pet Shop y la diferencia es notable. Nala lo devora y tiene mucha más energía. Además el personal me asesoró muy bien sobre qué opción era mejor para su edad. Excelente atención.",
    date: "Junio 2026",
  },
  {
    name: "Carmen Vélez",
    pet: "Bruno",
    breed: "Bulldog Francés · 5 años",
    area: "Veterinaria",
    emoji: "🐾",
    color: "green",
    stars: 5,
    text: "Bruno tenía problemas digestivos crónicos. Gracias al seguimiento de la doctora y el cambio de dieta que recomendaron, hoy está completamente estable. Nunca pensé que una veterinaria tan cercana tuviera este nivel de especialización.",
    date: "Marzo 2026",
  },
  {
    name: "Gabriela Ríos",
    pet: "Coco",
    breed: "Chihuahua · 6 años",
    area: "SPA",
    emoji: "🐩",
    color: "purple",
    stars: 5,
    text: "Coco es muy miedosa pero con el equipo del SPA siempre llega y se calma. El trato es tan gentil que ya no llorar cuando la dejo. El programa de huellitas es genial, ya voy a reclamar mi baño gratis.",
    date: "Mayo 2026",
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; badge: string }> = {
  green: { bg: "bg-green-50", text: "text-green-700", badge: "badge-green" },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    badge: "badge-purple",
  },
  teal: { bg: "bg-teal-50", text: "text-teal-700", badge: "badge-teal" },
};

export default function TestimonialsPage() {
  const [featured, setFeatured] = useState(0);
  const t = TESTIMONIALS[featured];
  const colors = COLOR_MAP[t.color];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 paw-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block  text-black text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Familias felices
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-orange-500 mb-4">
            Historias de éxito 🐾
          </h1>
          <p className="text-amber-500 text-lg max-w-2xl mx-auto">
            Nada nos llena más de orgullo que ver a nuestros pacientes felices y
            saludables. Estas son sus historias.
          </p>
        </div>
      </div>

      {/* Featured testimonial */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
          <div className={`${colors.bg} p-8 text-center`}>
            <div className="text-7xl mb-4">{t.emoji}</div>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p
              className={`text-sm font-bold uppercase tracking-widest ${colors.text} mb-1`}
            >
              {t.area}
            </p>
            <p className="text-stone-800 text-xl leading-relaxed italic font-medium max-w-2xl mx-auto mb-6">
              "{t.text}"
            </p>
            <div>
              <p className="font-black text-stone-900 text-lg">{t.name}</p>
              <p className="text-stone-500 text-sm">
                {t.pet} — {t.breed}
              </p>
              <p className="text-stone-400 text-xs mt-1">{t.date}</p>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between border-t border-stone-100">
            <button
              onClick={() =>
                setFeatured(
                  (i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
                )
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-stone-500 hover:text-orange-500 hover:bg-orange-50 font-semibold text-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeatured(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === featured ? "bg-orange-500" : "bg-stone-300"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setFeatured((i) => (i + 1) % TESTIMONIALS.length)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-stone-500 hover:text-orange-500 hover:bg-orange-50 font-semibold text-sm transition-colors"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* All testimonials grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-black text-stone-900 mb-8 text-center">
          Todos los testimonios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => {
            const c = COLOR_MAP[testimonial.color];
            return (
              <button
                key={i}
                onClick={() => setFeatured(i)}
                className={`card-hover text-left bg-white rounded-2xl border-2 p-6 transition-all ${
                  featured === i
                    ? "border-orange-400 shadow-lg"
                    : "border-stone-100 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{testimonial.emoji}</span>
                  <span className={`badge ${c.badge}`}>{testimonial.area}</span>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic line-clamp-3">
                  "{testimonial.text}"
                </p>
                <div className="mt-4 pt-4 border-t border-stone-100">
                  <p className="font-bold text-stone-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-stone-500 text-xs">
                    {testimonial.pet} — {testimonial.breed}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-orange-50 border-t border-orange-100 py-16">
        <div className="max-w-2xl mx-auto text-center px-4">
          <Heart className="w-10 h-10 text-orange-400 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-stone-900 mb-3">
            ¿Ya eres parte de nuestra familia?
          </h3>
          <p className="text-stone-600 mb-6">
            Crea tu huellita digital, gestiona las citas de tu mascota y acumula
            puntos en cada visita.
          </p>
          <Link href="/login" className="btn-primary">
            <PawPrint className="w-4 h-4" />
            Unirme a la familia Animal Center
          </Link>
        </div>
      </div>
    </div>
  );
}
