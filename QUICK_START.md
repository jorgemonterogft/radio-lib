# Quick Start Guide

## Estructura del Proyecto

Ya tienes un blog completamente funcional. Aquí está lo que se creó:

### 📁 Archivos creados:

**Backend (API Routes)**
- `/app/api/auth/login/route.ts` - Login
- `/app/api/auth/register/route.ts` - Registro
- `/app/api/blog/posts/route.ts` - Listar posts
- `/app/api/blog/posts/[slug]/route.ts` - Detalle de post

**Funciones auxiliares**
- `/lib/auth.ts` - JWT y autenticación
- `/lib/db.ts` - SQLite
- `/lib/notion.ts` - API de Notion

**Componentes UI**
- `/components/LoginForm.tsx` - Formulario de login
- `/components/RegisterForm.tsx` - Formulario de registro
- `/components/BlogPostCard.tsx` - Tarjeta de post

**Páginas**
- `/app/auth/page.tsx` - Login/Registro
- `/app/blog/page.tsx` - Lista de posts
- `/app/blog/[slug]/page.tsx` - Detalle de post

## Cómo empezar

### 1. Ejecutar en desarrollo
```bash
npm run dev
```
Ve a http://localhost:10000

### 2. Rutas principales
- **Auth**: http://localhost:10000/auth
- **Blog**: http://localhost:10000/blog
- **API**: http://localhost:10000/api/auth/login (POST)

### 3. Primeros pasos

#### Opción A: Solo SQLite (Local)
- El usuario y sesiones se guardan en SQLite automáticamente
- No necesitas Notion configurada
- Ir a `/auth` y crear una cuenta

#### Opción B: SQLite + Notion (Recomendado)
1. Crear una base de datos en Notion con posts
2. Copiar el `NOTION_API_KEY` y `NOTION_DATABASE_ID` 
3. Agregar a `.env.local`
4. Los posts aparecerán en `/blog`

## API Endpoints

### Autenticación
```bash
# Registro
curl -X POST http://localhost:10000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "username",
    "password": "password"
  }'

# Login
curl -X POST http://localhost:10000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password"
  }'
```

### Blog
```bash
# Listar posts
curl http://localhost:10000/api/blog/posts

# Listar primeros 5 posts
curl "http://localhost:10000/api/blog/posts?limit=5"

# Obtener un post
curl http://localhost:10000/api/blog/posts/my-post-slug
```

## Diferencia SQLite vs Notion

| Característica | SQLite | Notion |
|---|---|---|
| Usuarios | ✅ | ❌ |
| Posts | ❌ | ✅ |
| Configuración | Automática | Manual |
| Administración | Code | UI de Notion |
| Escalabilidad | Local | Cloud |

## Pasos siguientes

1. **Autenticación mejorada**: Agregar OAuth (Google)
2. **Comentarios**: Sistema de comentarios
3. **Búsqueda**: Búsqueda full-text
4. **Admin panel**: Editar posts locales
5. **Email**: Verificación de email
6. **Rate limiting**: Proteger APIs

¡Todo listo! Ahora puedes empezar a desarrollar el blog.
