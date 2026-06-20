"use client";
import { Megaphone, Calendar, PawPrint } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";

export default function CampanasPage() {
  const { campaigns } = useAppStore();
  const active = campaigns.filter((c) => c.active);
  const inactive = campaigns.filter((c) => !c.active);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 paw-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block bg-white/20 text-black text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Novedades
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-orange-500 mb-4">
            Campañas y comunicados 📣
          </h1>
          <p className="text-amber-500 text-lg max-w-2xl mx-auto">
            Entérate de nuestras campañas de vacunación, promociones especiales
            y novedades del mes.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Active campaigns */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-black text-stone-900">
              Campañas activas
              <span className="ml-2 badge badge-orange">{active.length}</span>
            </h2>
          </div>

          {active.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-stone-500">
                No hay campañas activas en este momento.
              </p>
              <p className="text-stone-400 text-sm mt-1">
                ¡Vuelve pronto para enterarte de nuevas promociones!
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {active.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border-2 border-orange-200 shadow-sm overflow-hidden"
                >
                  {c.imageUrl && (
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-xl font-black text-stone-900">
                        {c.title}
                      </h3>
                      <span className="badge badge-green shrink-0">Activa</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">{c.body}</p>
                    <div className="flex items-center gap-2 mt-4 text-xs text-stone-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Publicado el {c.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past campaigns */}
        {inactive.length > 0 && (
          <div>
            <h2 className="text-lg font-black text-stone-900 mb-4 flex items-center gap-2">
              Campañas anteriores
              <span className="badge badge-gray">{inactive.length}</span>
            </h2>
            <div className="space-y-3">
              {inactive.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 opacity-70"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-stone-700">{c.title}</h3>
                      <p className="text-stone-500 text-sm mt-1 line-clamp-2">
                        {c.body}
                      </p>
                    </div>
                    <span className="badge badge-gray shrink-0">
                      Finalizada
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-orange-50 border border-orange-100 rounded-3xl p-8 text-center">
          <PawPrint className="w-8 h-8 text-orange-400 mx-auto mb-3" />
          <h3 className="text-xl font-black text-stone-900 mb-2">
            ¿No quieres perderte ninguna campaña?
          </h3>
          <p className="text-stone-600 text-sm mb-5">
            Crea tu cuenta y mantente al tanto de todas nuestras promociones y
            campañas exclusivas para clientes registrados.
          </p>
          <Link href="/login" className="btn-primary">
            <PawPrint className="w-4 h-4" />
            Crear mi cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
