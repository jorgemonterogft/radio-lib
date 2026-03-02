import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase, runQuery, getRow } from '@/lib/db';
import { hashPassword, generateToken, AuthUser } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();

    const { email, username, password } = await req.json();

    // Validate input
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getRow(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userId = randomUUID();
    await runQuery(
      'INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)',
      [userId, email, username, hashedPassword]
    );

    // Create user object
    const user: AuthUser = { id: userId, email, username };

    // Generate token
    const token = generateToken(user);

    return NextResponse.json(
      {
        message: 'User created successfully',
        user,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
