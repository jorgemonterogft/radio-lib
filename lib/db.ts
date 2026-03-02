import sqlite3 from 'sqlite3';
import path from 'path';

const DATABASE_PATH = process.env.DATABASE_URL || './data/blog.db';

// Ensure the data directory exists
import { mkdir } from 'fs/promises';

let db: sqlite3.Database | null = null;

export async function getDatabase(): Promise<sqlite3.Database> {
  if (db) return db;

  // Create data directory if it doesn't exist
  const dataDir = path.dirname(DATABASE_PATH);
  try {
    await mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }

  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DATABASE_PATH, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db!);
      }
    });
  });
}

export async function initializeDatabase(): Promise<void> {
  const database = await getDatabase();

  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,
  ];

  for (const query of queries) {
    await new Promise<void>((resolve, reject) => {
      database.run(query, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

export async function runQuery(
  sql: string,
  params: any[] = []
): Promise<{ id: number; changes: number } | undefined> {
  const database = await getDatabase();

  return new Promise((resolve, reject) => {
    database.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

export async function getRow<T>(
  sql: string,
  params: any[] = []
): Promise<T | undefined> {
  const database = await getDatabase();

  return new Promise((resolve, reject) => {
    database.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row as T | undefined);
    });
  });
}

export async function getAllRows<T>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const database = await getDatabase();

  return new Promise((resolve, reject) => {
    database.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as T[]);
    });
  });
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    return new Promise((resolve, reject) => {
      db!.close((err) => {
        if (err) reject(err);
        else {
          db = null;
          resolve();
        }
      });
    });
  }
}
