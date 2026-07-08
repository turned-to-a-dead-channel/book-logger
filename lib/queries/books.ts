import pool from '@/lib/db'

// lib/queries/books.ts
export async function getBooksByUserUid(uid: string) {
  const result = await pool.query(`
    SELECT
      b.book_id, b.book_uid, b.title, b.author, b.published_year, b.page_count, b.publisher, b.isbn, b.notes, b.cover,
      ub.user_books_id, ub.user_books_uid, ub.status, ub.rating, ub.date_started, ub.date_finished, ub.read_number,
      ub.page_count_override, ub.title_override, ub.author_override, ub.published_year_override,
      ub.isbn_override, ub.publisher_override, ub.notes_override, ub.cover_override, ub.current_page, ub.is_favorite, 
      ub.priority_label_id, json_agg(bq.*) FILTER (WHERE bq.books_quotes_id IS NOT NULL) AS quotes, upl.priority, upl.priority_order, upl.color as priorityColor
    FROM books b
    JOIN user_books ub ON ub.book_id = b.book_id
    LEFT JOIN user_prioritylabels upl ON upl.id = ub.priority_label_id 
    LEFT JOIN books_quotes bq ON bq.ub_id = ub.user_books_id
    JOIN users u ON u.user_id = ub.user_id
    WHERE u.user_uid = $1
    GROUP BY
      b.book_id, b.book_uid, b.title, b.author, b.published_year, b.page_count, b.publisher, b.isbn, b.notes, b.cover,
      ub.user_books_id, ub.user_books_uid, ub.status, ub.rating, ub.date_started, ub.date_finished, ub.read_number,
      ub.page_count_override, ub.title_override, ub.author_override, ub.published_year_override,
      ub.isbn_override, ub.publisher_override, ub.notes_override, ub.cover_override, ub.current_page, ub.is_favorite, ub.priority_label_id, upl.priority, upl.priority_order, upl.color
    ORDER BY ub.date_started DESC NULLS LAST
  `, [uid])
  return result.rows
}

export async function getBookDetailByUid(uid: string) {
  const result = await pool.query(`
    SELECT b.*,
      ub.*,
      upl.priority, upl.color, 
      json_agg(DISTINCT bq.*) FILTER (WHERE bq.books_quotes_id IS NOT NULL) AS quotes,
      json_agg(DISTINCT bl.*) FILTER (WHERE bl.books_logs_id IS NOT NULL) AS logs
    FROM user_books ub 
    JOIN books b ON b.book_id = ub.book_id
    LEFT JOIN user_prioritylabels upl ON upl.id = ub.priority_label_id
    LEFT JOIN books_quotes bq ON bq.ub_id = ub.user_books_id
    LEFT JOIN books_log bl ON bl.bl_ub_id = ub.user_books_id
    LEFT JOIN books_thoughts bt on bt.bt_ub_id = ub.user_books_id
    LEFT JOIN books_reviews br on br.br_ub_id = ub.user_books_id
    WHERE ub.user_books_uid = $1
    GROUP BY b.book_id, ub.user_books_id, upl.id
  `, [uid]);

  return result.rows[0];
}