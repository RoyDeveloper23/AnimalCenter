"use client";
import { useState } from "react";
import {
  PawPrint,
  Plus,
  Calendar,
  Heart,
  Star,
  ChevronRight,
  Edit3,
  X,
  Save,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { Pet } from "@/types";

export function OwnerDashboard() {
  const {
    currentUser,
    pets,
    addPet,
    updatePet,
    appointments,
    addAppointment,
    loyalty,
  } = useAppStore();
  const myPets = pets.filter((p) => p.ownerId === currentUser!.id);
  const myAppointments = appointments.filter(
    (a) => a.ownerId === currentUser!.id,
  );
  const myLoyalty = loyalty.find((l) => l.ownerId === currentUser!.id);

  const [tab, setTab] = useState<"pets" | "reservas" | "fidelidad">("pets");
  const [showPetForm, setShowPetForm] = useState(false);
  const [showAptForm, setShowAptForm] = useState(false);
  const [editPet, setEditPet] = useState<Pet | null>(null);

  const TABS = [
    {
      id: "pets",
      label: "Mis mascotas",
      icon: <PawPrint className="w-4 h-4" />,
    },
    {
      id: "reservas",
      label: "Reservas",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "fidelidad",
      label: "Huellitas",
      icon: <Heart className="w-4 h-4" />,
    },
  ] as const;

  return (
    <div className="min-h-screen bg-stone-50 paw-bg-subtle">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-2xl">🐾</span>
            </div>
            <div>
              <p className="text-sm text-stone-500">Hola de nuevo,</p>
              <h1 className="text-2xl font-black text-stone-900">
                {currentUser!.name}
              </h1>
              <span className="badge badge-orange">Dueño de mascota</span>
            </div>
          </div>
        </div>

        {/* Loyalty quick card */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-semibold">
                Tus Huellitas acumuladas
              </p>
              <p className="text-5xl font-black mt-1">
                {myLoyalty?.points ?? 0}
              </p>
              <p className="text-orange-100 text-xs mt-1">
                Siguiente recompensa: 100 pts → Baño gratis
              </p>
            </div>
            <div className="text-6xl opacity-30">🐾</div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all"
              style={{
                width: `${Math.min(100, ((myLoyalty?.points ?? 0) / 100) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-stone-100 mb-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                tab === t.id
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* PETS TAB */}
        {tab === "pets" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-stone-900">
                Mis mascotas ({myPets.length})
              </h2>
              <button
                onClick={() => setShowPetForm(true)}
                className="btn-primary text-sm"
              >
                <Plus className="w-4 h-4" /> Agregar mascota
              </button>
            </div>
            {myPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onEdit={() => setEditPet(pet)} />
            ))}
            {myPets.length === 0 && (
              <EmptyState
                icon="🐾"
                text="Aún no tienes mascotas registradas"
                action={() => setShowPetForm(true)}
                actionLabel="Registrar mascota"
              />
            )}
          </div>
        )}

        {/* RESERVAS TAB */}
        {tab === "reservas" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-stone-900">
                Mis reservas
              </h2>
              <button
                onClick={() => setShowAptForm(true)}
                className="btn-primary text-sm"
              >
                <Plus className="w-4 h-4" /> Nueva reserva
              </button>
            </div>
            {myAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-stone-900">{apt.petName}</p>
                    <p className="text-sm text-stone-500 mt-0.5">
                      {apt.reason}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span
                        className={`badge ${apt.area === "spa" ? "badge-purple" : "badge-green"}`}
                      >
                        {apt.area === "spa" ? "SPA" : "Clínica"}
                      </span>
                      <span
                        className={`badge ${apt.status === "attended" ? "badge-green" : apt.status === "no-show" ? "badge-red" : "badge-orange"}`}
                      >
                        {apt.status === "pending"
                          ? "Pendiente"
                          : apt.status === "confirmed"
                            ? "Confirmado"
                            : apt.status === "attended"
                              ? "Atendido"
                              : "No asistió"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-stone-900 text-sm">
                      {apt.date}
                    </p>
                    <p className="text-orange-500 font-bold">{apt.time}</p>
                  </div>
                </div>
              </div>
            ))}
            {myAppointments.length === 0 && (
              <EmptyState
                icon="📅"
                text="No tienes reservas agendadas"
                action={() => setShowAptForm(true)}
                actionLabel="Hacer reserva"
              />
            )}
          </div>
        )}

        {/* LOYALTY TAB */}
        {tab === "fidelidad" && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-stone-900">
              Programa de Huellitas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  pts: 100,
                  reward: "🛁 Baño gratis",
                  achieved: (myLoyalty?.points ?? 0) >= 100,
                },
                {
                  pts: 200,
                  reward: "🛍️ 30% Pet Shop",
                  achieved: (myLoyalty?.points ?? 0) >= 200,
                },
                {
                  pts: 300,
                  reward: "🏥 Consulta gratis",
                  achieved: (myLoyalty?.points ?? 0) >= 300,
                },
                {
                  pts: 500,
                  reward: "✨ Baño Deluxe",
                  achieved: (myLoyalty?.points ?? 0) >= 500,
                },
              ].map((r) => (
                <div
                  key={r.pts}
                  className={`rounded-2xl p-4 border-2 ${r.achieved ? "border-green-300 bg-green-50" : "border-stone-200 bg-white"}`}
                >
                  <p className="text-2xl mb-1">{r.reward.split(" ")[0]}</p>
                  <p className="font-bold text-sm text-stone-900">
                    {r.reward.slice(2)}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    {r.pts} huellitas
                  </p>
                  {r.achieved && (
                    <p className="text-xs font-bold text-green-600 mt-1">
                      ✓ Disponible
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-stone-100">
                <h3 className="font-black text-stone-900">
                  Historial de puntos
                </h3>
              </div>
              {(myLoyalty?.history ?? []).length === 0 ? (
                <p className="text-center text-stone-400 py-8 text-sm">
                  Aún no tienes puntos acumulados
                </p>
              ) : (
                <div className="divide-y divide-stone-50">
                  {[...(myLoyalty?.history ?? [])].reverse().map((h, i) => (
                    <div
                      key={i}
                      className="px-5 py-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-stone-800">
                          {h.reason}
                        </p>
                        <p className="text-xs text-stone-400">{h.date}</p>
                      </div>
                      <span className="font-black text-orange-500">
                        +{h.points} 🐾
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showPetForm && (
        <PetFormModal
          ownerId={currentUser!.id}
          onSave={(p) => {
            addPet(p);
            setShowPetForm(false);
          }}
          onClose={() => setShowPetForm(false)}
        />
      )}
      {editPet && (
        <PetFormModal
          ownerId={currentUser!.id}
          initial={editPet}
          onSave={(p) => {
            updatePet({ ...editPet, ...p });
            setEditPet(null);
          }}
          onClose={() => setEditPet(null)}
        />
      )}
      {showAptForm && (
        <AppointmentFormModal
          pets={myPets}
          ownerName={currentUser!.name}
          ownerId={currentUser!.id}
          onSave={(a) => {
            addAppointment(a);
            setShowAptForm(false);
          }}
          onClose={() => setShowAptForm(false)}
        />
      )}
    </div>
  );
}

function PetCard({ pet, onEdit }: { pet: Pet; onEdit: () => void }) {
  const { history } = useAppStore();
  const petHistory = history.filter((h) => h.petId === pet.id);
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl">
              {pet.avatar}
            </div>
            <div>
              <h3 className="font-black text-stone-900 text-lg">{pet.name}</h3>
              <p className="text-stone-500 text-sm">
                {pet.breed} · {pet.age} años · {pet.weight}kg
              </p>
              {pet.allergies && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠️ Alergias: {pet.allergies}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onEdit}
            className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-600"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        {pet.notes && (
          <p className="text-sm text-stone-500 mt-3 italic bg-stone-50 rounded-xl p-3">
            "{pet.notes}"
          </p>
        )}
      </div>
      {petHistory.length > 0 && (
        <div className="border-t border-stone-100 px-5 py-3 bg-stone-50">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
            Últimas visitas
          </p>
          <div className="space-y-1.5">
            {petHistory
              .slice(-2)
              .reverse()
              .map((h) => (
                <div key={h.id} className="flex items-start gap-2 text-xs">
                  <span
                    className={`badge ${h.area === "spa" ? "badge-purple" : "badge-green"} text-[10px] shrink-0`}
                  >
                    {h.area === "spa" ? "SPA" : "Clínica"}
                  </span>
                  <span className="text-stone-600 leading-tight">
                    {h.process.slice(0, 80)}...
                  </span>
                  <span className="text-stone-400 shrink-0">{h.date}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({
  icon,
  text,
  action,
  actionLabel,
}: {
  icon: string;
  text: string;
  action: () => void;
  actionLabel: string;
}) {
  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center">
      <div className="text-5xl mb-3">{icon}</div>
      <p className="text-stone-500 mb-4">{text}</p>
      <button onClick={action} className="btn-primary text-sm">
        {actionLabel}
      </button>
    </div>
  );
}

function PetFormModal({
  ownerId,
  initial,
  onSave,
  onClose,
}: {
  ownerId: string;
  initial?: Pet;
  onSave: (p: any) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    species: initial?.species ?? "dog",
    breed: initial?.breed ?? "",
    age: initial?.age ?? 1,
    weight: initial?.weight ?? 5,
    allergies: initial?.allergies ?? "",
    notes: initial?.notes ?? "",
    avatar: initial?.avatar ?? "🐶",
    ownerId,
  } as any);

  const AVATARS = ["🐶", "🐱", "🐇", "🐹", "🦜"];
  return (
    <Modal
      title={initial ? "Editar mascota" : "Nueva mascota"}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">
            Avatar
          </label>
          <div className="flex gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => setForm({ ...form, avatar: a })}
                className={`w-10 h-10 text-xl rounded-xl border-2 transition-colors ${form.avatar === a ? "border-orange-400 bg-orange-50" : "border-stone-200"}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        <Field
          label="Nombre"
          value={form.name}
          onChange={(v: string) => setForm({ ...form, name: v })}
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">
              Especie
            </label>
            <select
              value={form.species}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setForm({ ...form, species: e.target.value })
              }
              className="input-field"
            >
              <option value="dog">Perro</option>
              <option value="cat">Gato</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <Field
            label="Raza"
            value={form.breed}
            onChange={(v: string) => setForm({ ...form, breed: v })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Edad (años)"
            value={form.age}
            onChange={(v: string) => setForm({ ...form, age: Number(v) })}
            type="number"
          />
          <Field
            label="Peso (kg)"
            value={form.weight}
            onChange={(v: string) => setForm({ ...form, weight: Number(v) })}
            type="number"
          />
        </div>
        <Field
          label="Alergias"
          value={form.allergies}
          onChange={(v: string) => setForm({ ...form, allergies: v })}
          placeholder="Ninguna"
        />
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">
            Notas adicionales
          </label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setForm({ ...form, notes: e.target.value })
            }
            className="input-field resize-none"
            placeholder="Comportamiento, preferencias..."
          />
        </div>
        <button
          onClick={() => onSave(form)}
          className="btn-primary w-full justify-center"
        >
          <Save className="w-4 h-4" /> Guardar mascota
        </button>
      </div>
    </Modal>
  );
}

function AppointmentFormModal({
  pets,
  ownerName,
  ownerId,
  onSave,
  onClose,
}: {
  pets: any[];
  ownerName: string;
  ownerId: string;
  onSave: (a: any) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    petId: pets[0]?.id ?? "",
    area: "clinica",
    date: "",
    time: "",
    reason: "",
  } as any);
  const pet = pets.find((p) => p.id === form.petId);
  return (
    <Modal title="Nueva reserva" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">
            Mascota
          </label>
          <select
            value={form.petId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setForm({ ...form, petId: e.target.value })
            }
            className="input-field"
          >
            {pets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.avatar} {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">
            Área
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["clinica", "spa"] as const).map((area) => (
              <button
                key={area}
                onClick={() => setForm({ ...form, area })}
                className={`py-3 rounded-xl border-2 text-sm font-bold transition-colors ${form.area === area ? (area === "clinica" ? "border-green-400 bg-green-50 text-green-700" : "border-purple-400 bg-purple-50 text-purple-700") : "border-stone-200 text-stone-500"}`}
              >
                {area === "clinica" ? "🏥 Clínica Vet" : "✨ SPA"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Fecha"
            value={form.date}
            onChange={(v: string) => setForm({ ...form, date: v })}
            type="date"
          />
          <Field
            label="Hora"
            value={form.time}
            onChange={(v: string) => setForm({ ...form, time: v })}
            type="time"
          />
        </div>
        <Field
          label="Motivo"
          value={form.reason}
          onChange={(v: string) => setForm({ ...form, reason: v })}
          placeholder="Ej: Vacuna, baño, control..."
        />
        <button
          onClick={() => {
            if (!form.date || !form.time || !form.reason || !form.petId) return;
            onSave({
              ...form,
              petName: pet?.name ?? "",
              ownerName,
              ownerId,
              status: "pending",
            });
          }}
          className="btn-primary w-full justify-center"
        >
          <Calendar className="w-4 h-4" /> Confirmar reserva
        </button>
      </div>
    </Modal>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-stone-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        placeholder={placeholder}
      />
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-stone-100 sticky top-0 bg-white rounded-t-3xl z-10">
          <h3 className="font-black text-stone-900 text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
