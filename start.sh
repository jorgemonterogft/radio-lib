#!/bin/bash

# Script para iniciar el servidor de blog

# Evitar problemas con workspaces de npm
export NODE_OPTIONS="--no-warnings"

# Navegar al directorio correcto
cd "$(dirname "$0")"

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependencias..."
  npm install --workspaces=false
fi

# Crear directorio de datos si no existe
mkdir -p ./data

# Inicializar base de datos
echo "🗄️ Inicializando base de datos SQLite..."
node -e "
const db = require('sqlite3');
const path = require('path');
const { initializeDatabase } = require('./lib/db');

initializeDatabase().then(() => {
  console.log('✅ Base de datos lista');
}).catch(err => {
  console.error('Error:', err);
});
"

# Iniciar servidor
echo "🚀 Iniciando servidor en http://localhost:10000"
npm run dev -- -p 10000 --workspaces=false
