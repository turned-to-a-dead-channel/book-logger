import pool from '@/lib/db'
import { postBookQuote } from '@/lib/queries/booksquotes'
import { NextResponse } from 'next/server'

export async function GET() {
    const result = await pool.query('SELECT * FROM footer_quotes')
    const quotes = result.rows
    return NextResponse.json(quotes ?? null)
}

export async function POST(request: Request) {
  const { userBooksuid, quote, pageRef } = await request.json()
  await postBookQuote({ userBooksuid, quote, pageRef })
  return NextResponse.json({ success: true })
}