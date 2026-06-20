# 🐾 Animal Center — Sitio Web Completo

Plataforma web integral para veterinaria, SPA y Pet Shop construida con **Next.js 14 App Router**, **TypeScript** y **Tailwind CSS**.

---

## 🚀 Instalación rápida

```bash
# 1. Clona o descomprime el proyecto
cd animal-center

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev

# 4. Abre en el navegador
http://localhost:3000
```

---

## 👤 Usuarios de demostración

| Usuario | Contraseña | Rol |
|---|---|---|
| `perrito` | `perrito123` | Dueño de mascota |
| `doctora-spa` | `doctora123` | Doctora / SPA |
| `admin` | `admin123` | Administrador |

---

## 📁 Estructura del proyecto

```
animal-center/
├── app/
│   ├── layout.tsx              # Layout raíz (Navbar + Footer)
│   ├── page.tsx                # Página de inicio
│   ├── globals.css             # Estilos globales + tokens de diseño
│   ├── login/
│   │   └── page.tsx            # Login con cuentas simuladas
│   ├── catalogo/
│   │   └── page.tsx            # Catálogo de servicios y precios
│   ├── testimonios/
│   │   └── page.tsx            # Testimonios con carrusel
│   ├── campanas/
│   │   └── page.tsx            # Campañas y comunicados
│   ├── info/
│   │   └── page.tsx            # Guías descargables + Bolsa de trabajo
│   └── dashboard/
│       ├── page.tsx            # Router de roles
│       ├── OwnerDashboard.tsx  # Vista: Dueño de mascota
│       ├── DoctorDashboard.tsx # Vista: Doctor / SPA
│       └── AdminDashboard.tsx  # Vista: Administrador
├── components/
│   ├── Navbar.tsx              # Barra de navegación responsive
│   └── Footer.tsx              # Pie de página
├── lib/
│   └── store.ts                # Estado global con Zustand (persistido)
├── types/
│   └── index.ts                # Tipos TypeScript
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## ✨ Funcionalidades por rol

### 🐾 Dueño de mascota
- Registrar y editar perfil de mascotas (nombre, raza, edad, alergias, notas)
- Ver historial de visitas de cada mascota
- Hacer reservas para clínica o SPA
- Ver estado de reservas (pendiente / confirmada / atendida)
- Programa de Huellitas: puntos y canje de recompensas

### 🩺 Doctora / SPA
- Agenda del día con citas asignadas al área
- Ver perfil completo e historial de la mascota antes de atender
- Confirmar asistencia (→ suma puntos automáticamente al dueño)
- Marcar como "No asistió"
- Crear registros/anotaciones clínicas vinculadas a la cita
- Historial del área filtrado por SPA o Clínica

### 🛡️ Administrador
- Crear, publicar y activar/desactivar campañas con título, cuerpo e imagen opcional
- Ver todas las reservas pendientes con perfil del paciente
- Historial completo de reservas
- Activar o desactivar la sección de Bolsa de Trabajo
- Ver todas las postulaciones recibidas

---

## 🎨 Branding

Basado en la paleta oficial de **Animal Center**:
- **Naranja principal:** `#F97316`
- **Veterinaria:** Verde `#16A34A`
- **SPA:** Púrpura `#7C3AED`
- **Pet Shop:** Teal `#0891B2`
- Fuentes: **Nunito** (display/títulos) + **Inter** (cuerpo)
- Firma visual: patrón de huellas de pata como textura de fondo

---

## 🔧 Personalización

Busca y reemplaza estos placeholders en el código:

| Placeholder | Descripción |
|---|---|
| `[Teléfono]` | Número de contacto |
| `[Dirección completa]` | Dirección física |
| `[Correo electrónico]` | Email de contacto |
| `[N° de Registro Oficial]` | Número del Ministerio |
| `$[X]` | Precios de servicios |

El iframe del mapa en `app/page.tsx` usa coordenadas de Guayaquil por defecto. Reemplaza con las coordenadas exactas de tu local.

---

## 📦 Dependencias principales

- `next` 14.2.3 — Framework React con App Router
- `zustand` 4.5.2 — Estado global con persistencia en localStorage
- `lucide-react` 0.383.0 — Íconos SVG
- `tailwindcss` 3.4.1 — Utilidades CSS
- `typescript` 5 — Tipado estático
