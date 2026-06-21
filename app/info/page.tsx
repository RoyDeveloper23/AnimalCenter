"use client";
import { useState } from "react";
import {
  FileText,
  Download,
  AlertCircle,
  Droplets,
  Pill,
  Heart,
  Scissors,
  BookOpen,
  Briefcase,
  Send,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

const GUIDES = [
  {
    title: "Qué hacer en emergencias con tu mascota",
    desc: "Pasos críticos a seguir si tu mascota tiene convulsiones, atragantamiento, heridas graves o envenenamiento. Guía de primeros auxilios.",
    icon: <AlertCircle className="w-5 h-5" />,
    color: "red",
    pages: "12 págs",
    size: "1.2 MB",
    category: "Emergencias",
  },
  {
    title: "Cómo bañar a tu mascota en casa",
    desc: "Técnica correcta de baño, productos recomendados según tipo de pelo, frecuencia ideal y cómo secar sin lastimarlos.",
    icon: <Droplets className="w-5 h-5" />,
    color: "blue",
    pages: "8 págs",
    size: "0.9 MB",
    category: "Higiene",
  },
  {
    title: "Guía para administrar medicamentos",
    desc: "Cómo dar pastillas, jarabes, gotas oculares y inyectables en casa de forma segura. Incluye tabla de dosificación por peso.",
    icon: <Pill className="w-5 h-5" />,
    color: "green",
    pages: "6 págs",
    size: "0.7 MB",
    category: "Medicación",
  },
  {
    title: "Nutrición y dieta balanceada",
    desc: "Qué alimentos son seguros, cuáles son tóxicos, porciones recomendadas por edad y tamaño, y cómo leer etiquetas.",
    icon: <Heart className="w-5 h-5" />,
    color: "orange",
    pages: "10 págs",
    size: "1.1 MB",
    category: "Nutrición",
  },
  {
    title: "Cuidado del pelo y las uñas",
    desc: "Frecuencia de cepillado según raza, cómo cortar las uñas sin lastimar, señales de problemas en la piel.",
    icon: <Scissors className="w-5 h-5" />,
    color: "purple",
    pages: "5 págs",
    size: "0.6 MB",
    category: "Higiene",
  },
  {
    title: "Calendario de vacunación",
    desc: "Esquema de vacunas para perros y gatos desde cachorro hasta adulto. Incluye cuándo repetir y qué registrar.",
    icon: <BookOpen className="w-5 h-5" />,
    color: "teal",
    pages: "4 págs",
    size: "0.5 MB",
    category: "Vacunación",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Emergencias: "badge-red",
  Higiene: "badge-teal",
  Medicación: "badge-green",
  Nutrición: "badge-orange",
  Vacunación: "badge-purple",
};

const ICON_BG: Record<string, string> = {
  red: "bg-red-100 text-red-600",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
  purple: "bg-purple-100 text-purple-600",
  teal: "bg-teal-100 text-teal-600",
};

export default function InfoPage() {
  const { jobBoardActive, addJobApplication } = useAppStore();
  const [downloaded, setDownloaded] = useState<Set<number>>(new Set());
  const [jobForm, setJobForm] = useState({
    name: "",
    area: "",
    cv: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const categories = [
    "Todos",
    ...Array.from(new Set(GUIDES.map((g) => g.category))),
  ];
  const filtered =
    activeCategory === "Todos"
      ? GUIDES
      : GUIDES.filter((g) => g.category === activeCategory);

  const handleDownload = (idx: number) => {
    setDownloaded((prev) => {
      const next = new Set(prev); // Clona el Set existente sin usar [...]
      next.add(idx); // Agrega el nuevo índice de forma segura
      return next;
    });
    // Simulate download of placeholder PDF
    const a = document.createElement("a");
    a.href = "#";
    a.download = `animal-center-guia-${idx + 1}.pdf`;
    // In production, this would be a real file URL
  };

  const handleJobSubmit = () => {
    if (!jobForm.name || !jobForm.area || !jobForm.message) return;
    addJobApplication(jobForm);
    setSubmitted(true);
    setJobForm({ name: "", area: "", cv: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 paw-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block bg-white/20 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Recursos gratuitos
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-orange-500 mb-4">
            Información útil 📚
          </h1>
          <p className="text-amber-500 text-lg max-w-2xl mx-auto">
            Guías, manuales y recursos descargables para que cuides a tu mascota
            con confianza.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white border border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Guides grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((guide, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden card-hover"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${ICON_BG[guide.color]}`}
                  >
                    {guide.icon}
                  </div>
                  <span
                    className={`badge ${CATEGORY_COLORS[guide.category] ?? "badge-gray"}`}
                  >
                    {guide.category}
                  </span>
                </div>
                <h3 className="font-black text-stone-900 text-base mb-2 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {guide.desc}
                </p>
                <div className="flex gap-3 mt-3 text-xs text-stone-400">
                  <span>📄 {guide.pages}</span>
                  <span>💾 {guide.size}</span>
                </div>
              </div>
              <div className="px-5 pb-5">
                <button
                  onClick={() => handleDownload(i)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    downloaded.has(i)
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {downloaded.has(i) ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> Descargado
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Descargar PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Job Board (conditionally rendered based on admin toggle) */}
        {jobBoardActive && (
          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-stone-800 to-stone-700 p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-orange-300 font-bold text-xs uppercase tracking-widest">
                  Únete al equipo
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                Trabaja con nosotros 🐾
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                ¿Amas a los animales y quieres hacer una diferencia? Estamos
                buscando personas apasionadas para unirse al equipo de Animal
                Center.
              </p>
            </div>

            <div className="p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-stone-900 mb-2">
                    ¡Postulación enviada!
                  </h3>
                  <p className="text-stone-500">
                    Revisaremos tu postulación y nos pondremos en contacto
                    pronto. ¡Gracias por tu interés!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline mt-5 text-sm"
                  >
                    Enviar otra postulación
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-black text-stone-900 mb-4">
                      Áreas disponibles
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          area: "Médico Veterinario",
                          icon: "🩺",
                          desc: "Consulta, cirugía y diagnóstico",
                        },
                        {
                          area: "Estilista SPA",
                          icon: "✂️",
                          desc: "Baños, cortes y tratamientos",
                        },
                        {
                          area: "Recepcionista / Admin",
                          icon: "📋",
                          desc: "Atención al cliente y agenda",
                        },
                        {
                          area: "Auxiliar veterinario",
                          icon: "🐾",
                          desc: "Apoyo en clínica y cuidado",
                        },
                      ].map((item) => (
                        <div
                          key={item.area}
                          className="flex items-center gap-3 bg-stone-50 rounded-xl p-3"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <p className="font-bold text-stone-900 text-sm">
                              {item.area}
                            </p>
                            <p className="text-xs text-stone-500">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-black text-stone-900">
                      Tu postulación
                    </h3>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        value={jobForm.name}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, name: e.target.value })
                        }
                        className="input-field"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1">
                        Área de interés *
                      </label>
                      <select
                        value={jobForm.area}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, area: e.target.value })
                        }
                        className="input-field"
                      >
                        <option value="">Seleccionar área...</option>
                        <option>Médico Veterinario</option>
                        <option>Estilista SPA</option>
                        <option>Recepcionista / Admin</option>
                        <option>Auxiliar veterinario</option>
                        <option>Otra</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1">
                        CV / Nombre del archivo
                      </label>
                      <input
                        type="text"
                        value={jobForm.cv}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, cv: e.target.value })
                        }
                        className="input-field"
                        placeholder="Ej: MiCV_2026.pdf (simulado)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1">
                        Mensaje / Presentación *
                      </label>
                      <textarea
                        rows={4}
                        value={jobForm.message}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, message: e.target.value })
                        }
                        className="input-field resize-none"
                        placeholder="Cuéntanos sobre tu experiencia, motivación y por qué quieres unirte al equipo..."
                      />
                    </div>
                    <button
                      onClick={handleJobSubmit}
                      disabled={
                        !jobForm.name || !jobForm.area || !jobForm.message
                      }
                      className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> Enviar postulación
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
