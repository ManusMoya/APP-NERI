# Sistema de compras y ventas

Aplicación web local hecha con React + Vite para registrar compras, ventas, clientes, fábricas, productos y balance.

## Estado actual

- Funciona de forma local con datos cargados en el código.
- Todavía no escribe datos en Supabase.
- Ya trae preparada la conexión futura con Supabase.
- Está lista para subir a GitHub y publicar en Cloudflare Pages.

## Usar en la computadora

1. Instalar dependencias:

```bash
npm install
```

2. Abrir en modo desarrollo:

```bash
npm run dev
```

3. Crear versión final:

```bash
npm run build
```

## Variables para Supabase

Copiar `.env.example` como `.env` y completar:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Esas claves se obtienen dentro del proyecto de Supabase, en Project Settings > API.

## Crear tablas en Supabase

Cuando se quiera activar la base de datos:

1. Entrar al proyecto de Supabase.
2. Ir a SQL Editor.
3. Copiar y ejecutar el contenido de `supabase/schema.sql`.
4. Completar las variables de entorno.
5. Conectar las pantallas para leer y guardar desde Supabase.

## Subir a GitHub

Subir todos los archivos del proyecto, excepto lo que ignora `.gitignore`:

- `node_modules`
- `dist`
- `.env`

## Publicar en Cloudflare Pages

Configuración recomendada:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Variables de entorno:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

Al principio se puede usar el dominio gratuito de Cloudflare Pages. Más adelante se puede conectar un dominio propio.
