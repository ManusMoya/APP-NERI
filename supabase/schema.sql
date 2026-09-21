create table if not exists factories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  factory_id uuid references factories(id) on delete set null,
  cost numeric(12, 2) not null default 0,
  price numeric(12, 2),
  stock integer not null default 0,
  status text not null default 'Activo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists operations (
  id uuid primary key default gen_random_uuid(),
  operation_date date not null,
  type text not null check (type in ('venta', 'compra')),
  client_id uuid references clients(id) on delete set null,
  factory_id uuid references factories(id) on delete set null,
  name text,
  factory_name text,
  detail text,
  status text not null,
  purchase numeric(12, 2) not null default 0,
  payment numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  additional_expenses numeric(12, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists operation_items (
  id uuid primary key default gen_random_uuid(),
  operation_id uuid not null references operations(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  factory_name text,
  quantity integer not null default 1,
  unit_cost numeric(12, 2) not null default 0,
  unit_price numeric(12, 2) not null default 0,
  line_purchase numeric(12, 2) not null default 0,
  line_total numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists products_factory_id_idx on products(factory_id);
create index if not exists operations_date_idx on operations(operation_date desc);
create index if not exists operations_type_idx on operations(type);
create index if not exists operation_items_operation_id_idx on operation_items(operation_id);
