import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase, getRow } from '@/lib/db';
import { verifyPassword, generateToken, AuthUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();

    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // Find user
    interface UserRow {
      id: string;
      email: string;
      username: string;
      password: string;
    }

    const user = await getRow<UserRow>(
      'SELECT id, email, username, password FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create user object
    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    // Generate token
    const token = generateToken(authUser);

    return NextResponse.json(
      {
        message: 'Login successful',
        user: authUser,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
