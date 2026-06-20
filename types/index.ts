export type UserRole = "owner" | "doctor" | "admin";

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: "dog" | "cat" | "other";
  breed: string;
  age: number;
  weight: number;
  allergies: string;
  notes: string;
  avatar: string;
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  ownerName: string;
  ownerId: string;
  area: "clinica" | "spa";
  date: string;
  time: string;
  reason: string;
  status: "pending" | "confirmed" | "attended" | "no-show";
  createdAt: string;
}

export interface HistoryRecord {
  id: string;
  petId: string;
  petName: string;
  authorId: string;
  authorName: string;
  area: "clinica" | "spa";
  process: string;
  date: string;
  appointmentId?: string;
}

export interface Campaign {
  id: string;
  title: string;
  body: string;
  imageUrl?: string;
  createdAt: string;
  authorName: string;
  active: boolean;
}

export interface LoyaltyPoints {
  ownerId: string;
  points: number;
  history: { date: string; points: number; reason: string }[];
}

export interface JobApplication {
  id: string;
  name: string;
  area: string;
  cv: string;
  message: string;
  createdAt: string;
}
