import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [process.env.DEFAULT_USER_EMAIL])
    const user = result.rows[0]
    return NextResponse.json(user ?? null)
}