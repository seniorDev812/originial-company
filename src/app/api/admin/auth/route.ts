import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock admin credentials - In production, use environment variables and proper hashing
const ADMIN_CREDENTIALS = {
  email: 'admin@seengroup.com',
  password: 'admin123' // In production, use bcrypt or similar for password hashing
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check credentials (replace with actual database lookup)
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Generate a simple token (in production, use JWT or similar)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      // Mock user data
      const user = {
        id: 1,
        email: email,
        name: 'Admin User',
        role: 'admin',
        permissions: ['read', 'write', 'delete']
      };

      // Set HTTP-only cookie for security
      const cookieStore = await cookies();
      cookieStore.set('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });

      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: user,
        token: token
      });
    } else {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
