import { postNewBook } from '@/lib/queries/addbook';
import { NextResponse } from 'next/server'
import pool from '@/lib/db';

export async function POST(request: Request) {
  const { userUid, title, author, totalPages, publicationYear, publisher, isbn, coverUrl, status} = await request.json();

  const { rows } = await pool.query('SELECT user_id FROM users WHERE user_uid = $1', [userUid]);
  const userId = rows[0]?.user_id;
  if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  await postNewBook({ userId, title, author, totalPages, publicationYear, publisher, isbn, coverUrl, status });

  return NextResponse.json({ success: true });
}