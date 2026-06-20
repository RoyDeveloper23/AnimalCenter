"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  PawPrint,
  LogIn,
  LogOut,
  User,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/testimonios", label: "Testimonios" },
  { href: "/campanas", label: "Campañas" },
  { href: "/info", label: "Info Útil" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAppStore();

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16 mb-1">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div className="leading-tight">
              <span
                className="block font-black text-xl text-stone-900"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Animal Center
              </span>
              <span className="block text-[10px] font-semibold text-orange-500 tracking-widest uppercase">
                SPA · Vet · Pet Shop
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 my-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === l.href
                    ? "bg-orange-100 text-orange-600"
                    : "text-stone-600 hover:text-orange-500 hover:bg-orange-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-stone-800">
                    {currentUser.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-stone-500" />
                </button>
                {userMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden z-50">
                    <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
                      <p className="text-xs text-stone-500">Conectado como</p>
                      <p className="font-bold text-stone-900 text-sm">
                        {currentUser.name}
                      </p>
                      <span className="badge badge-orange text-[10px] mt-1">
                        {currentUser.role}
                      </span>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Mi espacio
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary text-sm">
                <PawPrint className="w-4 h-4" />
                Crea tu huellita
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-orange-50"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-orange-100 bg-white px-4 py-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                pathname === l.href
                  ? "bg-orange-100 text-orange-600"
                  : "text-stone-600 hover:bg-orange-50 hover:text-orange-500"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-stone-100">
            {currentUser ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-stone-700 hover:bg-orange-50"
                >
                  <LayoutDashboard className="w-4 h-4" /> Mi espacio —{" "}
                  {currentUser.name.split(" ")[0]}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" /> Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="btn-primary text-sm w-full justify-center"
              >
                <PawPrint className="w-4 h-4" />
                Crea tu huellita
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
