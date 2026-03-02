# Tips y Desarrollo

## Desarrollo Rápido

### Hot Reload
Next.js recompila automáticamente cuando cambias archivos. No necesitas reiniciar el servidor.

### Editar Formularios
Los componentes `LoginForm` y `RegisterForm` están en:
- `/components/LoginForm.tsx`
- `/components/RegisterForm.tsx`
- Puedes cambiar campos, validaciones, mensajes fácilmente

### Agregar Nuevas Rutas de API
1. Crear archivo en `app/api/[ruta]/route.ts`
2. Exportar `GET`, `POST`, `PUT`, `DELETE` según necesites
3. Usar `NextRequest` y `NextResponse`

Ejemplo:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Tu código aquí
  return NextResponse.json({ data: 'hello' });
}
```

### Agregar Nuevas Páginas
1. Crear archivo en `app/[ruta]/page.tsx`
2. Usar `'use client'` si necesitas interactividad
3. Next.js crea la ruta automáticamente

Ejemplo:
```typescript
'use client';

export default function MyPage() {
  return <div>Hola mundo</div>;
}
```

## Almacenamiento de Tokens

Los tokens se guardan en `localStorage`:
```javascript
// Guardar
localStorage.setItem('auth_token', token);
localStorage.setItem('user', JSON.stringify(user));

// Obtener
const token = localStorage.getItem('auth_token');
const user = JSON.parse(localStorage.getItem('user') || '{}');
```

## Usar Tokens en Peticiones

```typescript
const token = localStorage.getItem('auth_token');

fetch('/api/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## Debugging

### Ver errores en la consola del servidor
El servidor muestra errores cuando accedes a las rutas.

### Ver errores en el navegador
Abre DevTools (F12) → Console para ver errores del cliente.

### Base de datos
```bash
# Ver contenido SQLite
sqlite3 ./data/blog.db "SELECT * FROM users;"
```

## Variables de Entorno

Todas las variables en `.env.local` están disponibles:
- Client-side (prefijo `NEXT_PUBLIC_`)
- Server-side (todas)

Para agregar nuevas variables:
1. Editar `.env.local`
2. Acceder en el código:
```typescript
const apiKey = process.env.NOTION_API_KEY;
const appName = process.env.NEXT_PUBLIC_APP_NAME;
```

## Extensiones Recomendadas (VS Code)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-dotnettools.csharp"
  ]
}
```

## Scripts NPM

```bash
# Desarrollo
npm run dev -- -p 10000 --workspaces=false

# Compilar
npm run build --workspaces=false

# Producción
npm start

# Linting
npm run lint --workspaces=false
```

## Estructura de Base de Datos SQLite

### Tabla: users
```
id          TEXT PRIMARY KEY
email       TEXT UNIQUE NOT NULL
username    TEXT UNIQUE NOT NULL
password    TEXT NOT NULL (hashed)
created_at  DATETIME
updated_at  DATETIME
```

### Tabla: sessions
```
id          TEXT PRIMARY KEY
user_id     TEXT FOREIGN KEY
token       TEXT NOT NULL
created_at  DATETIME
expires_at  DATETIME
```

## Notion Database Schema

Propiedades necesarias:
- **title** (Title) - Título del post
- **slug** (Rich Text) - URL slug único
- **content** (Rich Text) - Contenido principal
- **excerpt** (Rich Text) - Resumen corto
- **published** (Checkbox) - Publicado o borrador
- **author** (Rich Text) - Autor
- **tags** (Multi-select) - Categorías/etiquetas
- **created_at** (Created time) - Auto
- **updated_at** (Last edited time) - Auto

## Problemas Comunes

### "npm error No workspaces found!"
Solución: Agregar `--workspaces=false` a comandos npm

### Errores de módulos no encontrados
1. Verificar que el archivo existe
2. Verificar la ruta en `tsconfig.json`
3. Reiniciar el servidor

### Notion no muestra posts
1. Verificar `NOTION_API_KEY`
2. Verificar `NOTION_DATABASE_ID`
3. Verificar que la integración está conectada a la database
4. Verificar que posts tienen `published: true`

### Base de datos no se crea
1. Verificar que la carpeta `data/` existe
2. Verificar permisos de archivo
3. Revisar logs de error

## Seguridad

⚠️ **Importante en Producción:**
- Cambiar `JWT_SECRET` a algo fuerte
- Usar HTTPS
- Configurar CORS si es necesario
- Agregar rate limiting
- Validar y sanitizar todas las entradas
- Usar HTTPS_ONLY en cookies

## Ejemplo: Agregar un Nuevo Endpoint

Paso 1: Crear archivo `app/api/posts/create/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { extractTokenFromHeader } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Verificar autenticación
    const token = extractTokenFromHeader(req.headers.get('authorization'));
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Tu lógica aquí
    const data = await req.json();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

Paso 2: Usar desde el cliente:

```typescript
const response = await fetch('/api/posts/create', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

¡Feliz desarrollo! 🚀
