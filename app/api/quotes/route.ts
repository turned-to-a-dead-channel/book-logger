import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    const result = await pool.query('SELECT * FROM footer_quotes')
    const quotes = result.rows
    return NextResponse.json(quotes ?? null)
}