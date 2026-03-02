# Git - Próximos Pasos

## Ver Cambios

Para ver qué has modificado:
```bash
cd /Users/jetm/Desktop/system-oldschool/www-sacred

# Ver estado
git status

# Ver diferencias
git diff package.json
git diff tsconfig.json

# Ver archivos nuevos
git status --porcelain | grep "^??"
```

## Guardar Cambios (Commit)

### Opción 1: Agregar todo
```bash
git add .
git commit -m "feat: Implementar blog completo con autenticación y Notion"
git push
```

### Opción 2: Agregar parcialmente
```bash
# Agregar solo lo que quieres
git add package.json tsconfig.json
git add 'lib/**/*.ts'
git add 'app/api/**/*.ts'
git add 'app/auth/**'
git add 'app/blog/**'
git add 'components/Login*.tsx'
git add 'components/Register*.tsx'
git add 'components/BlogPostCard.tsx'
git add '*.md'

# Comprometer cambios
git commit -m "feat: Implementar blog con autenticación JWT y Notion CMS"

# Subir a GitHub
git push
```

## Estructura de Commit

**Archivos modificados:**
- `package.json` - Agregar dependencias (bcryptjs, jsonwebtoken, @notionhq/client, sqlite3, dotenv)
- `tsconfig.json` - Agregar ruta `@/*`

**Archivos nuevos:**
- `.env.local` - Variables de entorno
- `lib/auth.ts` - Autenticación JWT
- `lib/db.ts` - Base de datos SQLite
- `lib/notion.ts` - API de Notion
- `app/api/auth/*` - Rutas de autenticación
- `app/api/blog/*` - Rutas de blog
- `app/auth/*` - Página de autenticación
- `app/blog/*` - Páginas de blog
- `components/LoginForm.*` - Componente de login
- `components/RegisterForm.*` - Componente de registro
- `components/BlogPostCard.*` - Tarjeta de post
- `*.md` - Documentación

## Mensaje de Commit Recomendado

```
feat: Implementar blog completo con autenticación y Notion

Cambios:
- Agregar autenticación JWT con bcryptjs
- Crear API routes para login/register
- Implementar SQLite para usuarios
- Agregar integración con Notion para posts
- Crear componentes UI para formularios y tarjetas
- Implementar páginas de auth y blog
- Agregar estilos terminales retro
- Documentar setup y desarrollo

BREAKING CHANGE: Se agregan nuevas dependencias a package.json
```

## Ignorar Archivos

Los siguientes NO deben incluirse en el commit (ya están en .gitignore):
- `/node_modules/`
- `/.next/`
- `/data/`
- `.env.local` (⚠️ Muy importante, no compartir!)

Verifica que `.gitignore` contenga:
```
node_modules/
.next/
data/
.env.local
.env*.local
```

## Después de Push

1. Verifica en GitHub que los cambios se subieron correctamente
2. Crea un Pull Request si es necesario
3. Los cambios estarán disponibles en `main` branch

## Comandos Útiles

```bash
# Ver historial de commits
git log --oneline

# Revertir cambios
git restore archivo.ts

# Deshacer último commit (sin perder cambios)
git reset --soft HEAD~1

# Ver rama actual
git branch

# Cambiar de rama
git checkout -b mi-rama

# Merging a main
git checkout main
git merge mi-rama
git push
```

## Resumen

1. ✅ Cambios listos en working directory
2. ⏳ Agregar: `git add .`
3. ⏳ Guardar: `git commit -m "mensaje"`
4. ⏳ Subir: `git push`
5. ✅ Verificar en GitHub

¡El blog está completamente implementado y listo para versionar! 🎉
