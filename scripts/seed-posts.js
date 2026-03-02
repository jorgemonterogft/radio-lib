/**
 * Script para crear posts de prueba
 * Uso: node scripts/seed-posts.js
 */

const sqlite3 = require('sqlite3');
const path = require('path');

const DATABASE_PATH = './data/blog.db';

const testPosts = [
  {
    id: '1',
    title: 'Introducción a Next.js 16',
    slug: 'introduccion-nextjs-16',
    content: `Next.js 16 trae mejoras significativas en rendimiento y escalabilidad.

En esta guía aprenderás sobre:
- Server Components mejorados
- Edge Functions
- Optimizaciones de imagen
- Streaming de datos
- Nueva arquitectura de API routes

Next.js continúa siendo el framework más poderoso para React.`,
    excerpt: 'Descubre las nuevas características de Next.js 16',
    author: 'José García',
    published: 1,
    tags: 'nextjs,react,javascript'
  },
  {
    id: '2',
    title: 'SQLite vs PostgreSQL: ¿Cuándo usar cuál?',
    slug: 'sqlite-vs-postgresql',
    content: `SQLite y PostgreSQL son bases de datos populares, pero cada una tiene sus propias fortalezas.

SQLite es ideal para:
- Desarrollo local
- Aplicaciones pequeñas
- Proyectos sin servidor
- Análisis de datos

PostgreSQL es mejor para:
- Aplicaciones en escala
- Datos complejos
- Múltiples usuarios
- Alta disponibilidad

Elige según tus necesidades específicas.`,
    excerpt: 'Comparativa entre dos bases de datos populares',
    author: 'María López',
    published: 1,
    tags: 'base-datos,sqlite,postgresql'
  },
  {
    id: '3',
    title: 'Autenticación con JWT: Guía Completa',
    slug: 'autenticacion-jwt-guia',
    content: `JWT (JSON Web Tokens) es un estándar moderno para autenticación.

Ventajas de JWT:
- Stateless (sin sesión en servidor)
- Escalable
- Compatible con múltiples dominios
- Seguro cuando se usa correctamente

Estructura básica:
Header.Payload.Signature

Implementa JWT en tu aplicación Next.js para:
- Login seguro
- Proteger rutas
- Comunicación entre servicios`,
    excerpt: 'Aprende a implementar JWT en tus aplicaciones',
    author: 'Carlos Mendez',
    published: 1,
    tags: 'autenticacion,jwt,seguridad'
  },
  {
    id: '4',
    title: 'React Hooks: State y Effects',
    slug: 'react-hooks-state-effects',
    content: `React Hooks revolucionaron la forma de escribir componentes.

Los Hooks más importantes:
- useState: Manejar estado local
- useEffect: Efectos secundarios
- useContext: Acceder a contexto
- useReducer: Lógica compleja
- useCallback: Memoizar funciones
- useMemo: Memoizar valores

Con Hooks puedes escribir componentes funcionales con toda la potencia.`,
    excerpt: 'Domina los Hooks de React para mejores componentes',
    author: 'Ana Rodríguez',
    published: 1,
    tags: 'react,javascript,hooks'
  },
  {
    id: '5',
    title: 'CSS Modules vs Tailwind: ¿Cuál elegir?',
    slug: 'css-modules-vs-tailwind',
    content: `Hay varias formas de estilizar tus componentes React.

CSS Modules:
- Estilos locales
- Evita conflictos de nombres
- Mayor control
- Curva de aprendizaje suave

Tailwind CSS:
- Utilidades predefinidas
- Desarrollo rápido
- Consistencia de diseño
- Archivo final más pequeño

Ambas son excelentes. Elige según tu preferencia y proyecto.`,
    excerpt: 'Compara dos enfoques populares para estilizar componentes',
    author: 'David Chen',
    published: 1,
    tags: 'css,diseño,react'
  },
  {
    id: '6',
    title: 'API REST: Mejores Prácticas',
    slug: 'api-rest-mejores-practicas',
    content: `Diseñar una buena API REST es fundamental para aplicaciones escalables.

Principios clave:
- Usar métodos HTTP correctamente (GET, POST, PUT, DELETE)
- Versionamiento de API (/v1/, /v2/)
- Códigos de estado HTTP apropiados
- Paginación para grandes datasets
- Rate limiting
- Documentación clara

Sigue estos principios para crear APIs que sean fáciles de mantener y entender.`,
    excerpt: 'Diseña APIs REST que escalen con tu proyecto',
    author: 'Elena Martínez',
    published: 1,
    tags: 'api,rest,backend'
  },
  {
    id: '7',
    title: 'Testing en JavaScript: Vitest vs Jest',
    slug: 'testing-vitest-vs-jest',
    content: `Los tests son esenciales para código de calidad.

Jest:
- Muy popular
- Fácil de configurar
- Buena documentación
- Más lento

Vitest:
- Más rápido
- Compatible con Jest
- Mejor para Vite
- Mejor developer experience

Ambos son excelentes. Vitest es ideal para proyectos Vite/Rollup.`,
    excerpt: 'Elige la herramienta de testing adecuada',
    author: 'Luis Fernández',
    published: 1,
    tags: 'testing,javascript,herramientas'
  },
  {
    id: '8',
    title: 'Optimización de Imágenes en Web',
    slug: 'optimizacion-imagenes-web',
    content: `Las imágenes son frecuentemente el mayor culpable del rendimiento lento.

Estrategias de optimización:
- Usar formatos modernos (WebP, AVIF)
- Lazy loading
- Responsive images
- Image CDN
- Compresión inteligente
- Next.js Image component

Una imagen bien optimizada puede reducir tu bundle en 50-70%.`,
    excerpt: 'Mejora el rendimiento optimizando imágenes',
    author: 'Sandra Gómez',
    published: 1,
    tags: 'performance,imagenes,web'
  },
  {
    id: '9',
    title: 'TypeScript: Tipos Avanzados',
    slug: 'typescript-tipos-avanzados',
    content: `TypeScript va mucho más allá de simples tipos.

Tipos avanzados:
- Generics (Genéricos)
- Union Types
- Intersection Types
- Mapped Types
- Conditional Types
- Template Literal Types

Dominar estos conceptos te permitirá escribir código más robusto y mantenible.`,
    excerpt: 'Explora los tipos avanzados de TypeScript',
    author: 'Roberto Núñez',
    published: 1,
    tags: 'typescript,javascript,tipos'
  },
  {
    id: '10',
    title: 'Despliegue a Producción: Guía Completa',
    slug: 'despliegue-produccion-guia',
    content: `Desplegar a producción requiere planificación y atención.

Pasos clave:
1. Compilar código para producción
2. Configurar variables de entorno
3. Configurar base de datos
4. Configurar CDN
5. SSL/HTTPS
6. Monitoreo
7. Backups
8. CI/CD

Plataformas populares:
- Vercel (Next.js)
- Netlify
- AWS
- DigitalOcean
- Heroku

Elige según tus necesidades y presupuesto.`,
    excerpt: 'Aprende cómo desplegar aplicaciones a producción',
    author: 'Patricia Sánchez',
    published: 1,
    tags: 'devops,produccion,deployment'
  }
];

async function seedDatabase() {
  const db = new sqlite3.Database(DATABASE_PATH);

  return new Promise((resolve, reject) => {
    // Crear tabla de posts si no existe
    db.run(
      `CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        author TEXT,
        published INTEGER DEFAULT 0,
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          reject(err);
          return;
        }

        // Insertar posts de prueba
        const insertPromises = testPosts.map(
          (post) =>
            new Promise((resolveInsert, rejectInsert) => {
              db.run(
                `INSERT OR REPLACE INTO posts 
                 (id, title, slug, content, excerpt, author, published, tags) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  post.id,
                  post.title,
                  post.slug,
                  post.content,
                  post.excerpt,
                  post.author,
                  post.published,
                  post.tags
                ],
                (err) => {
                  if (err) {
                    rejectInsert(err);
                  } else {
                    resolveInsert();
                  }
                }
              );
            })
        );

        Promise.all(insertPromises)
          .then(() => {
            db.all('SELECT COUNT(*) as count FROM posts', (err, rows) => {
              if (err) {
                reject(err);
              } else {
                const count = rows[0].count;
                console.log(
                  `✅ Base de datos inicializada con ${count} posts de prueba`
                );
                db.close();
                resolve();
              }
            });
          })
          .catch((err) => {
            db.close();
            reject(err);
          });
      }
    );
  });
}

seedDatabase()
  .then(() => {
    console.log('✅ Script completado exitosamente');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
