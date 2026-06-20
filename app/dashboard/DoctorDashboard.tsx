"use client";
import { useState } from "react";
import { Stethoscope, Sparkles, ClipboardList, CheckCircle, XCircle, Eye, Plus, X, Save, Calendar } from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { Appointment, Pet } from "@/types";

export function DoctorDashboard() {
  const { currentUser, appointments, pets, history, addHistoryRecord, updateAppointmentStatus } = useAppStore();
  const [tab, setTab] = useState<"agenda" | "historial" | "nuevo">("agenda");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [linkedApt, setLinkedApt] = useState<Appointment | null>(null);

  // Doctor's area based on username
  const myArea = currentUser!.username === "doctora-spa" ? "spa" : "clinica";

  const myAppointments = appointments
    .filter((a) => a.area === myArea)
    .sort((a, b) => a.date.localeCompare(b.date));

  const pending = myAppointments.filter((a) => a.status === "pending" || a.status === "confirmed");
  const past = myAppointments.filter((a) => a.status === "attended" || a.status === "no-show");

  const areaLabel = myArea === "spa" ? "SPA" : "Clínica Veterinaria";
  const areaColor = myArea === "spa" ? "purple" : "green";

  return (
    <div className="min-h-screen bg-stone-50 paw-bg-subtle">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 ${myArea === "spa" ? "bg-purple-500" : "bg-green-500"} rounded-2xl flex items-center justify-center shadow-md`}>
              {myArea === "spa" ? <Sparkles className="w-7 h-7 text-white" /> : <Stethoscope className="w-7 h-7 text-white" />}
            </div>
            <div>
              <p className="text-sm text-stone-500">Panel profesional</p>
              <h1 className="text-2xl font-black text-stone-900">{currentUser!.name}</h1>
              <span className={`badge ${myArea === "spa" ? "badge-purple" : "badge-green"}`}>{areaLabel}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Pendientes", value: pending.length, color: "orange" },
            { label: "Atendidos", value: past.filter(a => a.status === "attended").length, color: "green" },
            { label: "No asistieron", value: past.filter(a => a.status === "no-show").length, color: "red" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm text-center">
              <p className="text-3xl font-black text-stone-900">{s.value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-stone-100 mb-6">
          {[
            { id: "agenda", label: "Agenda", icon: <Calendar className="w-4 h-4" /> },
            { id: "historial", label: "Historial clínico", icon: <ClipboardList className="w-4 h-4" /> },
            { id: "nuevo", label: "Nuevo registro", icon: <Plus className="w-4 h-4" /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                tab === t.id
                  ? myArea === "spa" ? "bg-purple-500 text-white shadow-sm" : "bg-green-500 text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* AGENDA TAB */}
        {tab === "agenda" && (
          <div className="space-y-4">
            {pending.length === 0 && past.length === 0 && (
              <div className="bg-white rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center">
                <p className="text-4xl mb-3">📅</p>
                <p className="text-stone-500">No hay citas asignadas para esta área</p>
              </div>
            )}
            {pending.length > 0 && (
              <div>
                <h3 className="font-black text-stone-900 mb-3">Próximas citas</h3>
                <div className="space-y-3">
                  {pending.map((apt) => {
                    const pet = pets.find((p) => p.id === apt.petId);
                    return (
                      <AppointmentCard
                        key={apt.id}
                        apt={apt}
                        pet={pet}
                        myArea={myArea}
                        onAttended={() => {
                          updateAppointmentStatus(apt.id, "attended");
                          setLinkedApt(apt);
                          setShowRecordForm(true);
                          setTab("nuevo");
                        }}
                        onNoShow={() => updateAppointmentStatus(apt.id, "no-show")}
                        onViewPet={() => setSelectedPet(pet ?? null)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div className="mt-6">
                <h3 className="font-black text-stone-900 mb-3">Citas pasadas</h3>
                <div className="space-y-3">
                  {past.map((apt) => {
                    const pet = pets.find((p) => p.id === apt.petId);
                    return (
                      <div key={apt.id} className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm flex items-center justify-between">
                        <div>
                          <p className="font-bold text-stone-900">{apt.petName} — {apt.ownerName}</p>
                          <p className="text-xs text-stone-500">{apt.reason}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-stone-500">{apt.date} {apt.time}</p>
                          <span className={`badge ${apt.status === "attended" ? "badge-green" : "badge-red"}`}>
                            {apt.status === "attended" ? "Atendido" : "No asistió"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* HISTORIAL TAB */}
        {tab === "historial" && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-stone-900">Historial del área: {areaLabel}</h2>
            {history.filter((h) => h.area === myArea).length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center">
                <p className="text-4xl mb-3">📋</p>
                <p className="text-stone-500">Aún no hay registros en esta área</p>
              </div>
            ) : (
              [...history]
                .filter((h) => h.area === myArea)
                .reverse()
                .map((record) => {
                  const pet = pets.find((p) => p.id === record.petId);
                  return (
                    <div key={record.id} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{pet?.avatar ?? "🐾"}</span>
                          <div>
                            <p className="font-black text-stone-900">{record.petName}</p>
                            <p className="text-xs text-stone-500">por {record.authorName}</p>
                          </div>
                        </div>
                        <span className="text-sm text-stone-400 shrink-0">{record.date}</span>
                      </div>
                      <p className="text-sm text-stone-600 mt-3 leading-relaxed bg-stone-50 rounded-xl p-3">{record.process}</p>
                    </div>
                  );
                })
            )}
          </div>
        )}

        {/* NUEVO REGISTRO TAB */}
        {tab === "nuevo" && (
          <NewRecordForm
            myArea={myArea}
            author={currentUser!}
            pets={pets}
            linkedApt={linkedApt}
            onSave={(r) => {
              addHistoryRecord(r);
              setLinkedApt(null);
              setShowRecordForm(false);
              setTab("historial");
            }}
            onClearApt={() => setLinkedApt(null)}
          />
        )}
      </div>

      {/* Pet profile modal */}
      {selectedPet && (
        <PetProfileModal pet={selectedPet} petHistory={history.filter((h) => h.petId === selectedPet.id)} onClose={() => setSelectedPet(null)} />
      )}
    </div>
  );
}

function AppointmentCard({ apt, pet, myArea, onAttended, onNoShow, onViewPet }: any) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="text-3xl">{pet?.avatar ?? "🐾"}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-black text-stone-900">{apt.petName}</p>
              <p className="text-sm text-stone-500">Dueño: {apt.ownerName}</p>
              <p className="text-sm text-stone-600 mt-1">{apt.reason}</p>
              {pet?.allergies && <p className="text-xs text-amber-600 mt-1">⚠️ {pet.allergies}</p>}
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-stone-900">{apt.date}</p>
              <p className="text-orange-500 font-bold text-lg">{apt.time}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              onClick={onViewPet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Ver perfil completo
            </button>
            <button
              onClick={onAttended}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-100 hover:bg-green-200 text-green-700 text-xs font-bold transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Asistió — Registrar
            </button>
            <button
              onClick={onNoShow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold transition-colors"
            >
              <XCircle className="w-3.5 h-3.5" /> No asistió
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewRecordForm({ myArea, author, pets, linkedApt, onSave, onClearApt }: any) {
  const [form, setForm] = useState({
    petId: linkedApt?.petId ?? "",
    process: "",
    date: new Date().toISOString().split("T")[0],
  });

  const selectedPet = pets.find((p: Pet) => p.id === form.petId);

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
      <h2 className="text-lg font-black text-stone-900 mb-5">Nuevo registro clínico</h2>

      {linkedApt && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-5 flex items-center justify-between">
          <p className="text-sm text-green-700 font-semibold">✅ Vinculado a cita confirmada de {linkedApt.petName}</p>
          <button onClick={onClearApt} className="text-green-600 hover:text-green-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Autor</label>
          <input type="text" value={author.name} disabled className="input-field bg-stone-50 text-stone-500 cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Área</label>
          <input type="text" value={myArea === "spa" ? "SPA" : "Clínica Veterinaria"} disabled className="input-field bg-stone-50 text-stone-500 cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Paciente</label>
          {linkedApt ? (
            <input type="text" value={`${selectedPet?.avatar ?? ""} ${selectedPet?.name ?? linkedApt.petName}`} disabled className="input-field bg-stone-50 text-stone-500 cursor-not-allowed" />
          ) : (
            <select value={form.petId} onChange={(e) => setForm({ ...form, petId: e.target.value })} className="input-field">
              <option value="">Seleccionar mascota...</option>
              {pets.map((p: Pet) => <option key={p.id} value={p.id}>{p.avatar} {p.name} ({p.breed})</option>)}
            </select>
          )}
          {selectedPet?.allergies && <p className="text-xs text-amber-600 mt-1">⚠️ Alergias: {selectedPet.allergies}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Fecha</label>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Proceso / Descripción</label>
          <textarea
            rows={5}
            value={form.process}
            onChange={(e) => setForm({ ...form, process: e.target.value })}
            className="input-field resize-none"
            placeholder={myArea === "spa" ? "Ej: Baño de aromaterapia con lavanda. Corte de uñas. Se portó muy bien..." : "Ej: Vacuna antirrábica aplicada. Peso: 18kg. Temperatura normal. Próxima cita en 6 meses..."}
          />
        </div>
        <button
          onClick={() => {
            if (!form.petId && !linkedApt?.petId) return;
            onSave({
              petId: linkedApt?.petId ?? form.petId,
              petName: selectedPet?.name ?? linkedApt?.petName ?? "",
              authorId: author.id,
              authorName: author.name,
              area: myArea,
              process: form.process,
              date: form.date,
              appointmentId: linkedApt?.id,
            });
          }}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-white transition-colors ${
            myArea === "spa" ? "bg-purple-500 hover:bg-purple-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <Save className="w-4 h-4" /> Guardar registro
        </button>
      </div>
    </div>
  );
}

function PetProfileModal({ pet, petHistory, onClose }: { pet: Pet; petHistory: any[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-stone-100 sticky top-0 bg-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{pet.avatar}</span>
            <div>
              <h3 className="font-black text-stone-900 text-xl">{pet.name}</h3>
              <p className="text-stone-500 text-sm">{pet.breed}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-stone-50 rounded-xl p-3 text-center">
              <p className="text-lg font-black text-stone-900">{pet.age}</p>
              <p className="text-xs text-stone-500">años</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 text-center">
              <p className="text-lg font-black text-stone-900">{pet.weight}</p>
              <p className="text-xs text-stone-500">kg</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 text-center">
              <p className="text-lg font-black text-stone-900">{petHistory.length}</p>
              <p className="text-xs text-stone-500">visitas</p>
            </div>
          </div>
          {pet.allergies && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-sm font-bold text-amber-700">⚠️ Alergias: {pet.allergies}</p>
            </div>
          )}
          {pet.notes && <p className="text-sm text-stone-600 italic bg-stone-50 rounded-xl p-3">"{pet.notes}"</p>}
          <div>
            <h4 className="font-black text-stone-900 mb-3">Historial completo</h4>
            {petHistory.length === 0 ? (
              <p className="text-stone-400 text-sm text-center py-4">Sin registros previos</p>
            ) : (
              <div className="space-y-3">
                {[...petHistory].reverse().map((h) => (
                  <div key={h.id} className="border border-stone-100 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`badge ${h.area === "spa" ? "badge-purple" : "badge-green"} text-[10px]`}>
                        {h.area === "spa" ? "SPA" : "Clínica"}
                      </span>
                      <span className="text-xs text-stone-400">{h.date}</span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">{h.process}</p>
                    <p className="text-xs text-stone-400 mt-1">por {h.authorName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
