"use client";
import Link from "next/link";
import {
  PawPrint,
  Phone,
  MapPin,
  Clock,
  Mail,
  Instagram,
  Facebook,
  Shield,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <span
                  className="block font-black text-lg text-white"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  Animal Center
                </span>
                <span className="block text-[10px] font-semibold text-orange-400 tracking-widest uppercase">
                  SPA · Vet · Pet Shop
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Tu centro integral de bienestar animal. Cuidamos a tu mascota con
              amor, profesionalismo y los mejores estándares de salud.
            </p>
            {/* <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-orange-500 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-orange-500 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div> */}
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-black text-white text-sm mb-3 uppercase tracking-wider"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>+593 987 654 321</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>info@animalcenter.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Paraiso de la Flor, Guayaquil, Ecuador</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="font-black text-white text-sm mb-4 uppercase tracking-wider"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Horarios
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Lun – Vie: 9:00 – 17:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Sábado: 9:00 – 14:00</span>
              </li>
              <li className="text-stone-500 text-xs pl-6">Domingo: Cerrado</li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="">
            <h4
              className="font-black text-white text-sm mb-4 uppercase tracking-wider"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Explorar
            </h4>
            <ul className="grid grid-cols-2 space-y-1 text-sm ">
              {[
                ["Información útil", "/info"],
                ["Campañas activas", "/campanas"],
                ["Testimonios", "/testimonios"],
                ["Catálogo de servicios", "/catalogo"],
                ["Mi espacio", "/dashboard"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 mt-7 pt-5  flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Animal Center. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-orange-400" />
            <span>
              Reg. Ministerio de Protección Animal:{" "}
              <strong className="text-stone-400">
                [N° de Registro Oficial]
              </strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
