# Blog Setup Guide

Este es un blog completo construido con Next.js que integra autenticación local con SQLite y posts desde Notion.

## Características

- ✅ **Autenticación**: Login y registro con JWT
- ✅ **Base de datos**: SQLite para usuarios y sesiones
- ✅ **CMS**: Notion como base de datos para posts del blog
- ✅ **Escalable**: Fácil de migrar a otras bases de datos
- ✅ **Terminal Aesthetics**: Estilo retro de terminal

## Instalación

1. **Clonar e instalar dependencias** (ya hecho):
```bash
npm install
```

2. **Configurar variables de entorno** (`.env.local`):
```bash
# JWT - Cambia esto en producción
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Notion API - Opcional para posts
NOTION_API_KEY=tu-notion-api-key
NOTION_DATABASE_ID=tu-notion-database-id

# Database
DATABASE_URL=./data/blog.db

# App
NEXT_PUBLIC_APP_NAME=Sacred Blog
```

## Rutas Disponibles

### Autenticación
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro

### Blog
- `GET /api/blog/posts` - Listar todos los posts
- `GET /api/blog/posts?limit=5` - Listar con límite
- `GET /api/blog/posts/[slug]` - Obtener un post por slug

### Páginas
- `/auth` - Login/Registro
- `/blog` - Lista de posts
- `/blog/[slug]` - Detalle de post

## Usar SQLite Localmente

La base de datos SQLite se crea automáticamente en `./data/blog.db` la primera vez que ejecutes la aplicación.

## Integrar con Notion (Opcional)

1. **Crear API Key en Notion**:
   - Ve a https://www.notion.so/profile/integrations
   - Crea una nueva integración
   - Copia el token

2. **Crear Database en Notion** con las siguientes propiedades:
   - `title` (Title) - Título del post
   - `slug` (Rich Text) - URL slug
   - `content` (Rich Text) - Contenido
   - `excerpt` (Rich Text) - Resumen
   - `published` (Checkbox) - Publicado o no
   - `author` (Rich Text) - Autor
   - `tags` (Multi-select) - Etiquetas
   - `created_at` (Created time) - Fecha de creación
   - `updated_at` (Last edited time) - Última edición

3. **Conectar la integración** a tu database en Notion

4. **Agregar en `.env.local`**:
```bash
NOTION_API_KEY=tu-token-aqui
NOTION_DATABASE_ID=tu-database-id-aqui
```

## Desarrollo

```bash
npm run dev
```

Abre http://localhost:10000 en tu navegador.

## Compilar para producción

```bash
npm run build
npm start
```

## Estructura del Proyecto

```
app/
  ├── api/
  │   ├── auth/
  │   │   ├── login/route.ts
  │   │   └── register/route.ts
  │   └── blog/
  │       ├── posts/route.ts
  │       └── posts/[slug]/route.ts
  ├── blog/
  │   ├── page.tsx          # Lista de posts
  │   └── [slug]/page.tsx   # Detalle de post
  └── auth/
      └── page.tsx          # Login/Registro

components/
  ├── LoginForm.tsx
  ├── RegisterForm.tsx
  └── BlogPostCard.tsx

lib/
  ├── auth.ts          # Funciones JWT
  ├── db.ts            # SQLite
  └── notion.ts        # Notion API
```

## Próximos Pasos

1. **Autenticación mejorada**: Agregar OAuth (Google, GitHub)
2. **Comentarios**: Sistema de comentarios en posts
3. **Búsqueda**: Búsqueda de posts
4. **Admin panel**: Panel para gestionar posts locales
5. **Email**: Notificaciones por email
6. **Analytics**: Seguimiento de visitas

## Problemas Comunes

### "NOTION_DATABASE_ID is not set"
Configura las variables de entorno en `.env.local` si quieres usar Notion. Sin ellas, la app seguirá funcionando pero sin posts.

### "No workspaces found!"
En macOS, si npm tiene `workspaces=true` global, ejecuta:
```bash
npm install --workspaces=false
```

## Licencia

MIT
