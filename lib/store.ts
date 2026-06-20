"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  User,
  Pet,
  Appointment,
  HistoryRecord,
  Campaign,
  LoyaltyPoints,
  JobApplication,
  UserRole,
} from "@/types";

// ── Simulated users ──────────────────────────────────────────────────────────
const USERS: Record<string, { password: string; user: User }> = {
  perrito: {
    password: "perrito123",
    user: { id: "u1", username: "perrito", name: "María García", role: "owner" },
  },
  "doctora-spa": {
    password: "doctora123",
    user: { id: "u2", username: "doctora-spa", name: "Dra. Sofía Ramos", role: "doctor" },
  },
  admin: {
    password: "admin123",
    user: { id: "u3", username: "admin", name: "Carlos Mendoza", role: "admin" },
  },
};

// ── Seed data ─────────────────────────────────────────────────────────────────
const SEED_PETS: Pet[] = [
  {
    id: "p1",
    ownerId: "u1",
    name: "Manchas",
    species: "dog",
    breed: "Labrador Mestizo",
    age: 3,
    weight: 18,
    allergies: "Polen, polvo",
    notes: "Le encanta el agua pero le temen los ruidos fuertes.",
    avatar: "🐶",
  },
  {
    id: "p2",
    ownerId: "u1",
    name: "Luna",
    species: "cat",
    breed: "Siamés",
    age: 2,
    weight: 4,
    allergies: "Ninguna",
    notes: "Muy tranquila, no le gustan los extraños.",
    avatar: "🐱",
  },
];

const SEED_CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    title: "🐾 Campaña de Vacunación — Julio 2026",
    body: "Este sábado 20 de julio realizamos nuestra campaña de vacunación antirrábica y parvovirus. ¡Trae a tu mascota y recibe un 20% de descuento en la consulta del día!",
    imageUrl: "",
    createdAt: "2026-06-10",
    authorName: "Carlos Mendoza",
    active: true,
  },
  {
    id: "c2",
    title: "✂️ Mes del Baño SPA — Descuento Especial",
    body: "Durante todo junio, los baños de aromaterapia tienen un 15% de descuento para clientes registrados. ¡Reserva tu turno ahora!",
    imageUrl: "",
    createdAt: "2026-06-01",
    authorName: "Carlos Mendoza",
    active: true,
  },
];

const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: "a1",
    petId: "p1",
    petName: "Manchas",
    ownerName: "María García",
    ownerId: "u1",
    area: "clinica",
    date: "2026-06-20",
    time: "10:00",
    reason: "Control anual y vacunas",
    status: "pending",
    createdAt: "2026-06-15",
  },
  {
    id: "a2",
    petId: "p2",
    petName: "Luna",
    ownerName: "María García",
    ownerId: "u1",
    area: "spa",
    date: "2026-06-22",
    time: "14:00",
    reason: "Baño y corte de uñas",
    status: "pending",
    createdAt: "2026-06-15",
  },
];

const SEED_HISTORY: HistoryRecord[] = [
  {
    id: "h1",
    petId: "p1",
    petName: "Manchas",
    authorId: "u2",
    authorName: "Dra. Sofía Ramos",
    area: "clinica",
    process: "Vacuna antirrábica aplicada. Control de peso: 18kg. Estado general excelente.",
    date: "2026-05-10",
  },
  {
    id: "h2",
    petId: "p1",
    petName: "Manchas",
    authorId: "u2",
    authorName: "Dra. Sofía Ramos",
    area: "spa",
    process: "Baño completo con aromaterapia de lavanda. Corte de uñas y limpieza de oídos. Se portó muy bien.",
    date: "2026-05-25",
  },
];

const SEED_LOYALTY: LoyaltyPoints[] = [
  {
    ownerId: "u1",
    points: 45,
    history: [
      { date: "2026-05-10", points: 20, reason: "Consulta clínica — Manchas" },
      { date: "2026-05-25", points: 25, reason: "Baño SPA — Manchas" },
    ],
  },
];

// ── Store interface ───────────────────────────────────────────────────────────
interface AppState {
  // Auth
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;

  // Pets
  pets: Pet[];
  addPet: (pet: Omit<Pet, "id">) => void;
  updatePet: (pet: Pet) => void;

  // Appointments
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, "id" | "createdAt">) => void;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;

  // History
  history: HistoryRecord[];
  addHistoryRecord: (record: Omit<HistoryRecord, "id">) => void;

  // Campaigns
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, "id" | "createdAt">) => void;
  toggleCampaign: (id: string) => void;

  // Loyalty
  loyalty: LoyaltyPoints[];
  addPoints: (ownerId: string, points: number, reason: string) => void;

  // Job Applications
  jobApplications: JobApplication[];
  addJobApplication: (app: Omit<JobApplication, "id" | "createdAt">) => void;
  jobBoardActive: boolean;
  toggleJobBoard: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Auth ──────────────────────────────────────────────────────────────
      currentUser: null,
      login: (username, password) => {
        const entry = USERS[username];
        if (entry && entry.password === password) {
          set({ currentUser: entry.user });
          return true;
        }
        return false;
      },
      logout: () => set({ currentUser: null }),

      // ── Pets ──────────────────────────────────────────────────────────────
      pets: SEED_PETS,
      addPet: (pet) =>
        set((s) => ({
          pets: [...s.pets, { ...pet, id: `p${Date.now()}` }],
        })),
      updatePet: (pet) =>
        set((s) => ({ pets: s.pets.map((p) => (p.id === pet.id ? pet : p)) })),

      // ── Appointments ──────────────────────────────────────────────────────
      appointments: SEED_APPOINTMENTS,
      addAppointment: (apt) =>
        set((s) => ({
          appointments: [
            ...s.appointments,
            { ...apt, id: `a${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] },
          ],
        })),
      updateAppointmentStatus: (id, status) => {
        const apt = get().appointments.find((a) => a.id === id);
        set((s) => ({
          appointments: s.appointments.map((a) =>
            a.id === id ? { ...a, status } : a
          ),
        }));
        // Award points if attended
        if (status === "attended" && apt) {
          const area = apt.area === "spa" ? "Baño SPA" : "Consulta clínica";
          get().addPoints(apt.ownerId, apt.area === "spa" ? 25 : 20, `${area} — ${apt.petName}`);
        }
      },

      // ── History ───────────────────────────────────────────────────────────
      history: SEED_HISTORY,
      addHistoryRecord: (record) =>
        set((s) => ({
          history: [...s.history, { ...record, id: `h${Date.now()}` }],
        })),

      // ── Campaigns ─────────────────────────────────────────────────────────
      campaigns: SEED_CAMPAIGNS,
      addCampaign: (campaign) =>
        set((s) => ({
          campaigns: [
            ...s.campaigns,
            {
              ...campaign,
              id: `c${Date.now()}`,
              createdAt: new Date().toISOString().split("T")[0],
            },
          ],
        })),
      toggleCampaign: (id) =>
        set((s) => ({
          campaigns: s.campaigns.map((c) =>
            c.id === id ? { ...c, active: !c.active } : c
          ),
        })),

      // ── Loyalty ───────────────────────────────────────────────────────────
      loyalty: SEED_LOYALTY,
      addPoints: (ownerId, points, reason) =>
        set((s) => {
          const existing = s.loyalty.find((l) => l.ownerId === ownerId);
          const date = new Date().toISOString().split("T")[0];
          if (existing) {
            return {
              loyalty: s.loyalty.map((l) =>
                l.ownerId === ownerId
                  ? {
                      ...l,
                      points: l.points + points,
                      history: [...l.history, { date, points, reason }],
                    }
                  : l
              ),
            };
          }
          return {
            loyalty: [
              ...s.loyalty,
              { ownerId, points, history: [{ date, points, reason }] },
            ],
          };
        }),

      // ── Job ───────────────────────────────────────────────────────────────
      jobApplications: [],
      addJobApplication: (app) =>
        set((s) => ({
          jobApplications: [
            ...s.jobApplications,
            { ...app, id: `j${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] },
          ],
        })),
      jobBoardActive: true,
      toggleJobBoard: () => set((s) => ({ jobBoardActive: !s.jobBoardActive })),
    }),
    { name: "animal-center-store" }
  )
);
