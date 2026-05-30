import pool from '@/lib/db'

// lib/queries/books.ts
export async function getBooksByUserUid(uid: string) {
  const result = await pool.query(`
    SELECT
      b.book_id, b.book_uid, b.title, b.author, b.published_year, b.page_count, b.publisher, b.isbn, b.notes, b.cover,
      ub.user_books_id, ub.user_books_uid, ub.status, ub.rating, ub.date_started, ub.date_finished, ub.read_number,
      ub.page_count_override, ub.title_override, ub.author_override, ub.published_year_override,
      ub.isbn_override, ub.publisher_override, ub.notes_override, ub.cover_override, ub.current_page, ub.is_favorite,
      json_agg(bq.*) FILTER (WHERE bq.books_quotes_id IS NOT NULL) AS quotes
    FROM books b
    JOIN user_books ub ON ub.book_id = b.book_id
    LEFT JOIN books_quotes bq ON bq.ub_id = ub.user_books_id
    JOIN users u ON u.user_id = ub.user_id
    WHERE u.user_uid = $1
    GROUP BY
      b.book_id, b.book_uid, b.title, b.author, b.published_year, b.page_count, b.publisher, b.isbn, b.notes, b.cover,
      ub.user_books_id, ub.user_books_uid, ub.status, ub.rating, ub.date_started, ub.date_finished, ub.read_number,
      ub.page_count_override, ub.title_override, ub.author_override, ub.published_year_override,
      ub.isbn_override, ub.publisher_override, ub.notes_override, ub.cover_override, ub.current_page, ub.is_favorite
    ORDER BY ub.date_started DESC NULLS LAST
  `, [uid])
  return result.rows
}