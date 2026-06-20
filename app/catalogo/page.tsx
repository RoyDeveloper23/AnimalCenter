"use client";
import { useState } from "react";
import {
  Stethoscope,
  Sparkles,
  ShoppingBag,
  Syringe,
  Bath,
  Scissors,
  Pill,
  Heart,
  Search,
} from "lucide-react";

const CATALOG = {
  veterinaria: {
    label: "Veterinaria",
    icon: <Stethoscope className="w-6 h-6" />,
    color: "green",
    badgeClass: "badge-green",
    bgClass: "bg-green-50",
    borderClass: "border-green-200",
    iconBg: "bg-green-500",
    services: [
      {
        name: "Consulta general",
        price: "$10",
        desc: "Evaluación clínica completa con diagnóstico",
        icon: <Stethoscope className="w-4 h-4" />,
      },
      {
        name: "Vacuna antirrábica",
        price: "$25",
        desc: "Incluye certificado oficial de vacunación",
        icon: <Syringe className="w-4 h-4" />,
      },
      {
        name: "Vacuna parvovirus",
        price: "$20",
        desc: "Protección contra enfermedades virales",
        icon: <Syringe className="w-4 h-4" />,
      },
      {
        name: "Vacuna séxtuple",
        price: "$40",
        desc: "Combinada: Moquillo, Hepatitis, Parvo, Leptospira",
        icon: <Syringe className="w-4 h-4" />,
      },
      {
        name: "Desparasitación interna",
        price: "$15",
        desc: "Tratamiento oral antiparasitario",
        icon: <Pill className="w-4 h-4" />,
      },
      {
        name: "Desparasitación externa",
        price: "$20",
        desc: "Antipulgas y antigarrapatas",
        icon: <Pill className="w-4 h-4" />,
      },
      {
        name: "Examen de sangre",
        price: "$30",
        desc: "Hemograma completo y bioquímica",
        icon: <Heart className="w-4 h-4" />,
      },
      {
        name: "Rayos X",
        price: "$50",
        desc: "Diagnóstico por imagen (por placa)",
        icon: <Heart className="w-4 h-4" />,
      },
      {
        name: "Ecografía",
        price: "$60",
        desc: "Ultrasonido abdominal o reproductivo",
        icon: <Heart className="w-4 h-4" />,
      },
      {
        name: "Esterilización (hembra)",
        price: "$80",
        desc: "Ovariohisterectomía con anestesia",
        icon: <Heart className="w-4 h-4" />,
      },
      {
        name: "Castración (macho)",
        price: "$50",
        desc: "Orquiectomía con anestesia incluida",
        icon: <Heart className="w-4 h-4" />,
      },
      {
        name: "Limpieza dental",
        price: "$40",
        desc: "Profilaxis dental con ultrasonido",
        icon: <Heart className="w-4 h-4" />,
      },
    ],
  },
  spa: {
    label: "SPA",
    icon: <Sparkles className="w-6 h-6" />,
    color: "purple",
    badgeClass: "badge-purple",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-200",
    iconBg: "bg-purple-500",
    services: [
      {
        name: "Baño pequeño (≤5kg)",
        price: "$10",
        desc: "Shampoo especial + secado + perfume",
        icon: <Bath className="w-4 h-4" />,
      },
      {
        name: "Baño mediano (5–15kg)",
        price: "$15",
        desc: "Shampoo especial + secado + perfume",
        icon: <Bath className="w-4 h-4" />,
      },
      {
        name: "Baño grande (>15kg)",
        price: "$20",
        desc: "Shampoo especial + secado + perfume",
        icon: <Bath className="w-4 h-4" />,
      },
      {
        name: "Corte + Baño (pequeño)",
        price: "$30",
        desc: "Baño completo + corte personalizado",
        icon: <Scissors className="w-4 h-4" />,
      },
      {
        name: "Corte + Baño (mediano)",
        price: "$35",
        desc: "Baño completo + corte personalizado",
        icon: <Scissors className="w-4 h-4" />,
      },
      {
        name: "Corte + Baño (grande)",
        price: "$40",
        desc: "Baño completo + corte personalizado",
        icon: <Scissors className="w-4 h-4" />,
      },
      {
        name: "Baño de aromaterapia",
        price: "$25",
        desc: "Con aceites esenciales de lavanda o manzanilla",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        name: "Tratamiento hidratante",
        price: "$20",
        desc: "Mascarilla nutritiva para pelo opaco o seco",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        name: "Corte de uñas",
        price: "$10",
        desc: "Limado y corte seguro incluido",
        icon: <Scissors className="w-4 h-4" />,
      },
      {
        name: "Limpieza de oídos",
        price: "$15",
        desc: "Limpieza profunda con solución especializada",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        name: "Limpieza dental (SPA)",
        price: "$20",
        desc: "Cepillado con pasta enzymatic",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        name: "Pack Deluxe Completo",
        price: "$50",
        desc: "Baño aromático + corte + uñas + oídos + pañuelo",
        icon: <Sparkles className="w-4 h-4" />,
      },
    ],
  },
  petshop: {
    label: "Pet Shop",
    icon: <ShoppingBag className="w-6 h-6" />,
    color: "teal",
    badgeClass: "badge-teal",
    bgClass: "bg-teal-50",
    borderClass: "border-teal-200",
    iconBg: "bg-teal-500",
    services: [
      {
        name: "Alimento seco premium (kg)",
        price: "$5",
        desc: "Marcas seleccionadas de alta calidad nutricional",
        icon: <ShoppingBag className="w-4 h-4" />,
      },
      {
        name: "Alimento húmedo (lata)",
        price: "$15",
        desc: "Variedades de pollo, res y salmón",
        icon: <ShoppingBag className="w-4 h-4" />,
      },
      {
        name: "Snacks y premios",
        price: "$10",
        desc: "Galletas, huesitos y golosinas saludables",
        icon: <ShoppingBag className="w-4 h-4" />,
      },
      {
        name: "Collar y correa",
        price: "$20",
        desc: "Diferentes tamaños y diseños",
        icon: <ShoppingBag className="w-4 h-4" />,
      },
      {
        name: "Cama para mascotas",
        price: "$30",
        desc: "Modelos lavables en varios tamaños",
        icon: <ShoppingBag className="w-4 h-4" />,
      },
      {
        name: "Antiparasitario externo",
        price: "$30",
        desc: "Pipetas y collares antipulgas",
        icon: <Pill className="w-4 h-4" />,
      },
      {
        name: "Vitaminas y suplementos",
        price: "$35",
        desc: "Omega 3, calcio, articulaciones",
        icon: <Pill className="w-4 h-4" />,
      },
      {
        name: "Juguetes",
        price: "$25",
        desc: "Kong, peluches, mordedores y más",
        icon: <ShoppingBag className="w-4 h-4" />,
      },
    ],
  },
};

const COLORS: Record<string, string> = {
  green: "text-green-700",
  purple: "text-purple-700",
  teal: "text-teal-700",
};

type CategoryKey = keyof typeof CATALOG;

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState<CategoryKey | "all">("all");
  const [search, setSearch] = useState("");

  const categories = Object.entries(CATALOG) as [
    CategoryKey,
    (typeof CATALOG)[CategoryKey],
  ][];

  const filtered = categories
    .flatMap(([key, cat]) =>
      cat.services
        .filter(
          (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.desc.toLowerCase().includes(search.toLowerCase()),
        )
        .map((s) => ({ ...s, category: key, cat })),
    )
    .filter((s) => activeTab === "all" || s.category === activeTab);

  return (
    <div className="min-h-screen bg-stone-50 paw-bg-subtle">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 paw-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Precios transparentes
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Catálogo de servicios
          </h1>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto">
            Todos nuestros servicios y tarifas base en un solo lugar. Sin
            sorpresas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
              placeholder="    Buscar servicio..."
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { id: "all", label: "Todos" },
              { id: "veterinaria", label: "Veterinaria" },
              { id: "spa", label: "SPA" },
              { id: "petshop", label: "Pet Shop" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                  activeTab === t.id
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-500"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-stone-500">
              No se encontraron servicios para "{search}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((s, i) => (
              <div
                key={i}
                className={`card-hover bg-white rounded-2xl border-2 ${s.cat.borderClass} p-5`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-9 h-9 ${s.cat.iconBg} rounded-xl flex items-center justify-center text-white`}
                  >
                    {s.icon}
                  </div>
                  <span className={`badge ${s.cat.badgeClass} text-[10px]`}>
                    {s.cat.label}
                  </span>
                </div>
                <p className="font-bold text-stone-900 text-sm leading-snug mb-1">
                  {s.name}
                </p>
                <p className="text-xs text-stone-500 leading-relaxed mb-3">
                  {s.desc}
                </p>
                <p className={`text-2xl font-black ${COLORS[s.cat.color]}`}>
                  {s.price}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Note */}
        <div className="mt-10 bg-orange-50 border border-orange-200 rounded-2xl p-5 text-center">
          <p className="text-sm text-orange-700">
            💡 Los precios mostrados son tarifas base y pueden variar según el
            tamaño, raza o condición específica de tu mascota. Para una
            cotización exacta, <strong>contáctanos o reserva tu cita</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
