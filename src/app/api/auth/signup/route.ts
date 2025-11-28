import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json();

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const usersPath = path.join(process.cwd(), 'data', 'users.json');
    const usersData = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(usersData);

    // Check if user already exists
    if (users.find((u: any) => u.email === email || u.username === username)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      role: 'user',
      teams: [],
      primaryTeam: null,
      totalKudos: 0,
      propKudos: 0,
      quizKudos: 0,
      correctnessRate: 0,
      questionsAnsweredCorrectly: [],
      questionsAnsweredIncorrectly: [],
      questionsFailed: {},
      questionsPassed: [],
      weeklyQuestionsUsed: 0,
      weeklyPassesUsed: 0,
      weeklyResetDate: new Date().toISOString().split('T')[0],
      propsRemaining: {
        prop: 5,
        madProp: 2,
        propHellYeah: 1,
      },
      badges: [],
      streaks: {
        currentCorrectAnswers: 0,
        longestCorrectAnswers: 0,
        currentLoginDays: 0,
        longestLoginDays: 0,
        lastLoginDate: new Date().toISOString().split('T')[0],
      },
      knowYouAnswers: [],
      consecutiveWrongCount: 0,
      rubberBandActive: false,
      createdAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
      weeklyRecapShown: null,
    };

    users.push(newUser);
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Sign up failed' },
      { status: 500 }
    );
  }
}
