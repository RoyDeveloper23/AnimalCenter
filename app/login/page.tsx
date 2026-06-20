"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PawPrint,
  Eye,
  EyeOff,
  Lock,
  User,
  AlertCircle,
  Stethoscope,
  Sparkles,
  Shield,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAppStore();
  const router = useRouter();

  if (currentUser) {
    router.replace("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = login(username.trim(), password);
    setLoading(false);
    if (ok) {
      router.push("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos. Verifica tus datos.");
    }
  };

  const fillDemo = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white paw-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <PawPrint className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white">Animal Center</h1>
            <p className="text-orange-100 text-base mt-1">
              Ingresa a tu huellita digital
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  Usuario
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field pl-9"
                    placeholder="    Tu nombre de usuario"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-9 pr-10"
                    placeholder="    Tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPwd ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center text-base py-3 disabled:opacity-60"
              >
                {loading ? (
                  <span className="animate-pulse">Ingresando...</span>
                ) : (
                  <>
                    <PawPrint className="w-5 h-5" />
                    Entrar a mi huellita
                  </>
                )}
              </button>
            </form>

            {/* Demo accounts */}
            <div className="mt-8">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider text-center mb-3">
                Cuentas de demostración
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => fillDemo("perrito", "perrito123")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-orange-100 hover:border-orange-300 hover:bg-orange-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg">
                    🐕
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-800">
                      Dueño de mascota
                    </p>
                    <p className="text-xs text-stone-400">
                      perrito / perrito123
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => fillDemo("doctora-spa", "doctora123")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-800">
                      Doctora / SPA
                    </p>
                    <p className="text-xs text-stone-400">
                      doctora-spa / doctora123
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => fillDemo("admin", "admin123")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-teal-100 hover:border-teal-300 hover:bg-teal-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-800">
                      Administrador
                    </p>
                    <p className="text-xs text-stone-400">admin / admin123</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Contacta a recepción para registrarte
          </Link>
        </p>
      </div>
    </div>
  );
}
