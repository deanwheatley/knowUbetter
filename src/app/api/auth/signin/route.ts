import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { identifier, password } = await request.json();

    const usersPath = path.join(process.cwd(), 'data', 'users.json');
    const usersData = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(usersData);

    const user = users.find(
      (u: any) =>
        (u.email === identifier || u.username === identifier) &&
        u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    return NextResponse.json(
      { error: 'Sign in failed' },
      { status: 500 }
    );
  }
}
