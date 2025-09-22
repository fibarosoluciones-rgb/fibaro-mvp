
# Fíbaro – MVP (Next.js + Supabase)

Dominio: mejiasbusiness.es  
Empresa: Mejias Business SL · CIF B75334714 · Calle Víctor Jara, 5 · admi@mejiasbusiness.es

## Cómo arrancar
1. Clona este proyecto y copia `.env.example` a `.env.local` rellenando Supabase y correo.
2. `npm i`
3. `npm run dev`

## Qué incluye
- App Router con páginas: `/` (Home), `/comparador`, `/productos`, `/cuenta`, `/admin`.
- Tailwind con colores Fíbaro y logos en `/public`.
- Recomendador 3 opciones (mock con `data/tarifas.sample.json`).
- Esquema Postgres en `db/schema.sql` listo para Supabase.
- `.env.example` con claves para Brevo (SMTP), Redsys (Bizum) y GoCardless (SEPA).

## Siguientes pasos
- Crear proyecto en Supabase y aplicar `db/schema.sql`.
- Conectar Auth (roles por RLS) y cada módulo del admin.
- Cargar tarifas reales desde Admin (CRUD).
- Activar métodos de pago que quieras (puedes dejarlos OFF).

> Todo es editable desde el panel y ampliable conmigo como copiloto técnico.
