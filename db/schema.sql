
-- Esquema mínimo para MVP Fíbaro
create table if not exists users_profile (
  user_id uuid primary key,
  role text check (role in ('superadmin','comercial','soporte','contabilidad','distribuidor','cliente')) default 'cliente',
  full_name text,
  phone text,
  lang text default 'es',
  address jsonb,
  iban text,
  consent jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists tarifas_operadores (
  id uuid primary key default gen_random_uuid(),
  operador text check (operador in ('masmovil','pepephone','simyo','jazztel')),
  plan text,
  precio numeric,
  velocidad_down int,
  velocidad_up int,
  datos int,
  minutos int,
  tv boolean default false,
  permanencia_meses int default 0,
  tags text[],
  vigente_desde date default now(),
  vigente_hasta date,
  visible boolean default true,
  created_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  tipo text check (tipo in ('tarifa','producto')),
  operador_objetivo text,
  opcion_recomendada text check (opcion_recomendada in ('A','B','C')),
  estado text default 'nuevo',
  cobertura_json jsonb,
  comercial_asignado uuid,
  created_at timestamptz default now()
);

create table if not exists precontratos (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  datos_porta jsonb,
  documentos_url text[],
  canal_contacto text check (canal_contacto in ('llamada','whatsapp','email')),
  consentimiento_rgpd boolean default false,
  created_at timestamptz default now()
);

create table if not exists contratos (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  operador text,
  fecha_inicio date,
  meses_permanencia_requeridos int default 7,
  estado text default 'pendiente'
);

create table if not exists productos (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  titulo text,
  precio numeric,
  stock int default 0,
  categoria text,
  imagenes text[],
  visible boolean default true,
  created_at timestamptz default now()
);

create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  total numeric,
  metodo_pago text check (metodo_pago in ('bizum','transferencia','contra_reembolso','sepa')),
  estado text default 'pendiente',
  direccion_envio jsonb,
  created_at timestamptz default now()
);

create table if not exists facturas (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid references pedidos(id) on delete cascade,
  numero text,
  pdf_url text,
  total numeric,
  impuestos numeric,
  created_at timestamptz default now()
);

create table if not exists referidos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  codigo text unique,
  referido_user_id uuid,
  estado text default 'pendiente',
  created_at timestamptz default now()
);

create table if not exists plan_amigo_saldo (
  user_id uuid primary key,
  saldo numeric default 0,
  tope numeric default 50,
  updated_at timestamptz default now()
);

create table if not exists objetivos (
  id uuid primary key default gen_random_uuid(),
  comercial_id uuid,
  periodo text, -- p.ej. 2025-10
  metas jsonb,
  recompensa numeric,
  created_at timestamptz default now()
);

create table if not exists comisiones_log (
  id uuid primary key default gen_random_uuid(),
  comercial_id uuid,
  lead_id uuid,
  concepto text,
  importe numeric,
  pagada boolean default false,
  created_at timestamptz default now()
);

create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  asunto text,
  categoria text,
  estado text default 'abierto',
  mensajes jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);
