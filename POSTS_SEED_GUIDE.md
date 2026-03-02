# Posts de Prueba - Guía Completa

## ✅ 10 Posts Genéricos Creados

Se han creado 10 posts de prueba en la base de datos SQLite. Estos posts son totalmente funcionales y están listos para usar.

## 📝 Lista de Posts

### 1. Introducción a Next.js 16
- **Slug:** `introduccion-nextjs-16`
- **Autor:** José García
- **Tags:** nextjs, react, javascript
- **Contenido:** Aprende sobre Server Components, Edge Functions, optimizaciones y más

### 2. SQLite vs PostgreSQL: ¿Cuándo usar cuál?
- **Slug:** `sqlite-vs-postgresql`
- **Autor:** María López
- **Tags:** base-datos, sqlite, postgresql
- **Contenido:** Comparativa detallada entre dos bases de datos populares

### 3. Autenticación con JWT: Guía Completa
- **Slug:** `autenticacion-jwt-guia`
- **Autor:** Carlos Mendez
- **Tags:** autenticacion, jwt, seguridad
- **Contenido:** Implementa JWT seguro en tus aplicaciones

### 4. React Hooks: State y Effects
- **Slug:** `react-hooks-state-effects`
- **Autor:** Ana Rodríguez
- **Tags:** react, javascript, hooks
- **Contenido:** Domina los Hooks de React para mejores componentes

### 5. CSS Modules vs Tailwind: ¿Cuál elegir?
- **Slug:** `css-modules-vs-tailwind`
- **Autor:** David Chen
- **Tags:** css, diseño, react
- **Contenido:** Compara dos enfoques populares para estilizar componentes

### 6. API REST: Mejores Prácticas
- **Slug:** `api-rest-mejores-practicas`
- **Autor:** Elena Martínez
- **Tags:** api, rest, backend
- **Contenido:** Diseña APIs REST que escalen con tu proyecto

### 7. Testing en JavaScript: Vitest vs Jest
- **Slug:** `testing-vitest-vs-jest`
- **Autor:** Luis Fernández
- **Tags:** testing, javascript, herramientas
- **Contenido:** Elige la herramienta de testing adecuada

### 8. Optimización de Imágenes en Web
- **Slug:** `optimizacion-imagenes-web`
- **Autor:** Sandra Gómez
- **Tags:** performance, imagenes, web
- **Contenido:** Mejora el rendimiento optimizando imágenes

### 9. TypeScript: Tipos Avanzados
- **Slug:** `typescript-tipos-avanzados`
- **Autor:** Roberto Núñez
- **Tags:** typescript, javascript, tipos
- **Contenido:** Explora los tipos avanzados de TypeScript

### 10. Despliegue a Producción: Guía Completa
- **Slug:** `despliegue-produccion-guia`
- **Autor:** Patricia Sánchez
- **Tags:** devops, produccion, deployment
- **Contenido:** Aprende cómo desplegar aplicaciones a producción

## 🚀 Cómo Ver los Posts

### Opción 1: Interfaz Web
1. Inicia el servidor:
```bash
cd /Users/jetm/Desktop/system-oldschool/www-sacred
npm run dev -- -p 10000 --workspaces=false
```

2. Abre en el navegador:
- **Lista de posts:** http://localhost:10000/blog
- **Detalle de un post:** http://localhost:10000/blog/introduccion-nextjs-16

### Opción 2: API
```bash
# Obtener todos los posts
curl http://localhost:10000/api/blog/posts

# Obtener un post específico
curl http://localhost:10000/api/blog/posts/introduccion-nextjs-16

# Obtener primeros 3 posts
curl "http://localhost:10000/api/blog/posts?limit=3"

# Obtener solo posts locales (ignorar Notion si está configurado)
curl "http://localhost:10000/api/blog/posts?source=local"
```

## 📊 Estructura de Datos

Cada post tiene:
- **id:** Identificador único
- **title:** Título del post
- **slug:** URL-friendly slug
- **content:** Contenido completo
- **excerpt:** Resumen corto
- **author:** Nombre del autor
- **tags:** Etiquetas separadas por comas
- **published:** 1 = publicado, 0 = borrador
- **created_at:** Fecha de creación
- **updated_at:** Última edición

## 🔄 Agregar Más Posts

Para agregar más posts, puedes:

### Opción 1: Modificar el script seed-posts.js
Edita `/scripts/seed-posts.js` y agrega más objetos al array `testPosts`:

```javascript
{
  id: '11',
  title: 'Tu Nuevo Post',
  slug: 'tu-nuevo-post',
  content: 'Contenido aquí...',
  excerpt: 'Resumen corto',
  author: 'Tu Nombre',
  published: 1,
  tags: 'tag1,tag2,tag3'
}
```

Luego ejecuta:
```bash
node scripts/seed-posts.js
```

### Opción 2: Insertar directamente (sin script)
Crea un archivo temporal con SQL INSERT.

### Opción 3: Usar Notion
Configura Notion como CMS y los posts aparecerán automáticamente en `/api/blog/posts`.

## 🎯 Casos de Uso

Los posts de prueba son perfectos para:
- ✅ Testing de la interfaz de blog
- ✅ Demostración de características
- ✅ Testing de búsqueda (próximamente)
- ✅ Testing de paginación (próximamente)
- ✅ Desarrollo de comentarios
- ✅ Performance testing

## 📝 Notas Importantes

1. **Posts Locales vs Notion:**
   - Si Notion está configurado, la API usará Notion primero
   - Si Notion no está configurado o no tiene posts, usará SQLite local
   - Puedes forzar la fuente con `?source=local` o `?source=notion`

2. **Base de Datos:**
   - Los posts se guardan en `./data/blog.db`
   - La tabla se llama `posts`
   - No está en `.gitignore`, así que se subirá a Git

3. **Desarrollo:**
   - Los posts no necesitan ser renderizados estáticamente
   - Next.js cachea el contenido automáticamente
   - Los cambios se reflejan casi instantáneamente

## 🔧 Próximas Mejoras

Considera agregar:
1. **API para crear posts:** `POST /api/blog/posts`
2. **API para editar posts:** `PUT /api/blog/posts/[slug]`
3. **API para eliminar posts:** `DELETE /api/blog/posts/[slug]`
4. **Panel de administración:** `/admin/posts`
5. **Búsqueda full-text:** `GET /api/blog/search?q=...`
6. **Paginación:** `GET /api/blog/posts?page=1&limit=10`
7. **Filtrado por autor:** `GET /api/blog/posts?author=...`
8. **Filtrado por tags:** `GET /api/blog/posts?tags=...`

## ✨ ¡Todo Listo!

Tus 10 posts de prueba están listos. Ahora puedes:
1. Ver el blog funcionando
2. Probar la interfaz
3. Desarrollar nuevas características
4. Integrar Notion cuando quieras

¡Disfruta! 🎉
