"use client";
import { useState } from "react";
import {
  Megaphone, Calendar, Briefcase, Plus, X, Save, ToggleLeft, ToggleRight,
  CheckCircle, Clock, XCircle, Eye, Users, PawPrint, Shield
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { Pet } from "@/types";

export function AdminDashboard() {
  const {
    currentUser, campaigns, addCampaign, toggleCampaign,
    appointments, pets, jobApplications, jobBoardActive, toggleJobBoard,
  } = useAppStore();

  const [tab, setTab] = useState<"campanas" | "reservas" | "trabajo">("campanas");
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [selectedApt, setSelectedApt] = useState<string | null>(null);

  const TABS = [
    { id: "campanas", label: "Campañas", icon: <Megaphone className="w-4 h-4" /> },
    { id: "reservas", label: "Reservas", icon: <Calendar className="w-4 h-4" /> },
    { id: "trabajo", label: "Bolsa de trabajo", icon: <Briefcase className="w-4 h-4" /> },
  ] as const;

  const pendingApts = appointments.filter((a) => a.status === "pending" || a.status === "confirmed");
  const pastApts = appointments.filter((a) => a.status === "attended" || a.status === "no-show");

  return (
    <div className="min-h-screen bg-stone-50 paw-bg-subtle">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center shadow-md">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Panel de administración</p>
              <h1 className="text-2xl font-black text-stone-900">{currentUser!.name}</h1>
              <span className="badge badge-teal">Administrador</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Campañas activas", value: campaigns.filter((c) => c.active).length, icon: "📣", color: "orange" },
            { label: "Reservas pendientes", value: pendingApts.length, icon: "📅", color: "teal" },
            { label: "Reservas atendidas", value: pastApts.filter(a => a.status === "attended").length, icon: "✅", color: "green" },
            { label: "Postulaciones", value: jobApplications.length, icon: "📋", color: "purple" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-3xl font-black text-stone-900">{s.value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-stone-100 mb-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                tab === t.id ? "bg-teal-500 text-white shadow-sm" : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* CAMPAÑAS TAB */}
        {tab === "campanas" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-stone-900">Campañas y comunicados</h2>
              <button onClick={() => setShowCampaignForm(true)} className="btn-primary text-sm">
                <Plus className="w-4 h-4" /> Nueva campaña
              </button>
            </div>
            {campaigns.length === 0 && (
              <EmptyState icon="📣" text="No hay campañas creadas" action={() => setShowCampaignForm(true)} actionLabel="Crear primera campaña" />
            )}
            {[...campaigns].reverse().map((c) => (
              <div key={c.id} className={`bg-white rounded-2xl p-5 border-2 shadow-sm transition-all ${c.active ? "border-orange-200" : "border-stone-200 opacity-60"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-stone-900">{c.title}</h3>
                      <span className={`badge ${c.active ? "badge-green" : "badge-gray"}`}>
                        {c.active ? "Activa" : "Inactiva"}
                      </span>
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed">{c.body}</p>
                    <p className="text-xs text-stone-400 mt-2">Publicado el {c.createdAt} por {c.authorName}</p>
                  </div>
                  <button
                    onClick={() => toggleCampaign(c.id)}
                    className={`shrink-0 p-2 rounded-xl transition-colors ${c.active ? "text-orange-500 hover:bg-orange-50" : "text-stone-400 hover:bg-stone-100"}`}
                    title={c.active ? "Desactivar" : "Activar"}
                  >
                    {c.active ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RESERVAS TAB */}
        {tab === "reservas" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-black text-stone-900 mb-4">
                Reservas pendientes
                <span className="ml-2 badge badge-orange">{pendingApts.length}</span>
              </h2>
              {pendingApts.length === 0 ? (
                <div className="bg-white rounded-2xl border-2 border-dashed border-stone-200 p-10 text-center">
                  <p className="text-4xl mb-2">📅</p>
                  <p className="text-stone-400">No hay reservas pendientes</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingApts.map((apt) => {
                    const pet = pets.find((p) => p.id === apt.petId);
                    return (
                      <div key={apt.id} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl">{pet?.avatar ?? "🐾"}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-black text-stone-900">{apt.petName}</p>
                                <p className="text-sm text-stone-500">Dueño: {apt.ownerName}</p>
                                <p className="text-sm text-stone-600 mt-0.5">{apt.reason}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="font-bold text-stone-900 text-sm">{apt.date}</p>
                                <p className="text-orange-500 font-bold text-lg">{apt.time}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3 flex-wrap">
                              <span className={`badge ${apt.area === "spa" ? "badge-purple" : "badge-green"}`}>
                                {apt.area === "spa" ? "SPA" : "Clínica"}
                              </span>
                              <span className="badge badge-orange">Pendiente</span>
                              {pet && (
                                <button
                                  onClick={() => setSelectedApt(selectedApt === apt.id ? null : apt.id)}
                                  className="flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-800"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  Ver perfil
                                </button>
                              )}
                            </div>
                            {selectedApt === apt.id && pet && (
                              <div className="mt-3 bg-stone-50 rounded-xl p-4 border border-stone-200 text-sm space-y-1">
                                <p><span className="font-bold">Raza:</span> {pet.breed}</p>
                                <p><span className="font-bold">Edad:</span> {pet.age} años · {pet.weight}kg</p>
                                {pet.allergies && <p className="text-amber-600">⚠️ Alergias: {pet.allergies}</p>}
                                {pet.notes && <p className="italic text-stone-500">"{pet.notes}"</p>}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-black text-stone-900 mb-4">Historial de reservas</h2>
              {pastApts.length === 0 ? (
                <p className="text-stone-400 text-center py-6 text-sm">Sin historial aún</p>
              ) : (
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                  <div className="divide-y divide-stone-50">
                    {[...pastApts].reverse().map((apt) => (
                      <div key={apt.id} className="px-5 py-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-bold text-stone-900 text-sm">{apt.petName} — {apt.ownerName}</p>
                          <p className="text-xs text-stone-500">{apt.reason} · {apt.date} {apt.time}</p>
                        </div>
                        <div className="flex gap-2 items-center shrink-0">
                          <span className={`badge ${apt.area === "spa" ? "badge-purple" : "badge-green"}`}>
                            {apt.area === "spa" ? "SPA" : "Vet"}
                          </span>
                          <span className={`badge ${apt.status === "attended" ? "badge-green" : "badge-red"}`}>
                            {apt.status === "attended" ? "Atendido" : "No asistió"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* BOLSA DE TRABAJO TAB */}
        {tab === "trabajo" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-stone-900">Bolsa de trabajo</h2>
              <button
                onClick={toggleJobBoard}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold text-sm transition-colors ${
                  jobBoardActive
                    ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                    : "border-stone-200 bg-stone-50 text-stone-500 hover:bg-stone-100"
                }`}
              >
                {jobBoardActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                {jobBoardActive ? "Visible en el sitio" : "Oculta en el sitio"}
              </button>
            </div>

            <div className={`rounded-2xl p-4 border-2 ${jobBoardActive ? "border-green-200 bg-green-50" : "border-stone-200 bg-stone-50"}`}>
              <p className="text-sm font-semibold text-stone-700">
                {jobBoardActive
                  ? "✅ La sección de empleo está activa y visible para los visitantes del sitio."
                  : "⛔ La sección de empleo está oculta. Los visitantes no pueden ver ni postular."}
              </p>
            </div>

            <h3 className="font-black text-stone-900 mt-4">
              Postulaciones recibidas
              <span className="ml-2 badge badge-purple">{jobApplications.length}</span>
            </h3>

            {jobApplications.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-stone-200 p-10 text-center">
                <p className="text-4xl mb-2">📋</p>
                <p className="text-stone-400 text-sm">Aún no hay postulaciones recibidas</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...jobApplications].reverse().map((app) => (
                  <div key={app.id} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-black text-stone-900">{app.name}</p>
                        <span className="badge badge-purple mt-1">{app.area}</span>
                        <p className="text-sm text-stone-600 mt-2 leading-relaxed">{app.message}</p>
                        {app.cv && <p className="text-xs text-teal-600 mt-1 font-semibold">📎 CV adjunto: {app.cv}</p>}
                      </div>
                      <p className="text-xs text-stone-400 shrink-0">{app.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Campaign Form Modal */}
      {showCampaignForm && (
        <CampaignFormModal
          authorName={currentUser!.name}
          onSave={(c) => { addCampaign(c); setShowCampaignForm(false); }}
          onClose={() => setShowCampaignForm(false)}
        />
      )}
    </div>
  );
}

function CampaignFormModal({ authorName, onSave, onClose }: {
  authorName: string;
  onSave: (c: any) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ title: "", body: "", imageUrl: "", active: true, authorName });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-stone-100 sticky top-0 bg-white rounded-t-3xl">
          <h3 className="font-black text-stone-900 text-lg">Nueva campaña</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">Título *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
              placeholder="Ej: 🐾 Campaña de Vacunación — Julio 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">Cuerpo del comunicado *</label>
            <textarea
              rows={5}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="input-field resize-none"
              placeholder="Describe la campaña, fechas, descuentos, instrucciones..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">URL de imagen o video (opcional)</label>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="input-field"
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3">
            <span className="text-sm font-bold text-stone-700">Publicar inmediatamente</span>
            <button
              onClick={() => setForm({ ...form, active: !form.active })}
              className={`transition-colors ${form.active ? "text-green-500" : "text-stone-400"}`}
            >
              {form.active ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
            </button>
          </div>
          <button
            onClick={() => {
              if (!form.title.trim() || !form.body.trim()) return;
              onSave(form);
            }}
            className="btn-primary w-full justify-center py-3"
          >
            <Megaphone className="w-4 h-4" /> Publicar campaña
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, text, action, actionLabel }: { icon: string; text: string; action: () => void; actionLabel: string }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center">
      <div className="text-5xl mb-3">{icon}</div>
      <p className="text-stone-500 mb-4">{text}</p>
      <button onClick={action} className="btn-primary text-sm">{actionLabel}</button>
    </div>
  );
}
