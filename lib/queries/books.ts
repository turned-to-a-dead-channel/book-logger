import pool from '@/lib/db'

// lib/queries/books.ts
export async function getBooksByUserUid(uid: string) {
  const result = await pool.query(`
    SELECT b.*, ub.*
    FROM books b
    JOIN user_books ub ON ub.book_id = b.book_id
    JOIN users u ON u.user_id = ub.user_id
    WHERE u.user_uid = $1
  `, [uid])
  return result.rows
}