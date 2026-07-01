import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function getUser() {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [process.env.DEFAULT_USER_EMAIL])
    const user = result.rows[0]
    return result.rows[0] ?? null
}