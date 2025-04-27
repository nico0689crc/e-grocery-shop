// Standard Library Imports
import { NextResponse } from 'next/server'; // Next.js Server Utilities

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const res = await fetch(`${process.env.API_URL_EXTERNAL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 401) {
      return NextResponse.json(
        {
          message: ['Invalid email or password'],
        },
        {
          status: 401,
          statusText: 'Unauthorized',
        }
      );
    }

    if (res.status === 200) {
      return NextResponse.json(await res.json());
    }

    return NextResponse.json(
      {
        message: ['An unexpected error occurred'],
      },
      {
        status: res.status,
        statusText: res.statusText || 'Error',
      }
    );
  } catch (_error: unknown) {
    const error = _error instanceof Error ? _error : new Error('Unknown error occurred');
    return NextResponse.json(
      {
        message: [error.message],
      },
      {
        status: 500,
        statusText: 'Internal Server Error',
      }
    );
  }
}
