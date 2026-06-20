"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { OwnerDashboard } from "./OwnerDashboard";
import { DoctorDashboard } from "./DoctorDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { PawPrint } from "lucide-react";

export default function DashboardPage() {
  const { currentUser } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.replace("/login");
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PawPrint className="w-8 h-8 text-orange-400 animate-pulse" />
      </div>
    );
  }

  if (currentUser.role === "owner") return <OwnerDashboard />;
  if (currentUser.role === "doctor") return <DoctorDashboard />;
  if (currentUser.role === "admin") return <AdminDashboard />;
  return null;
}
