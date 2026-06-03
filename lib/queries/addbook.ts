import pool from '@/lib/db';

export async function postNewBook(bookData: { userId: number, title: string, author: string, totalPages: number, publicationYear?: number, publisher?: string, isbn?: string, coverUrl?: string, status: string}) {
    const { userId, title, author, totalPages, publicationYear, publisher, isbn, coverUrl, status} = bookData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(
            `INSERT INTO books (title, author, page_count, published_year, publisher, isbn, cover) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING book_id`,
            [title, author, totalPages, publicationYear, publisher, isbn, coverUrl]
        );

        const bookId = rows[0].book_id;
        let dateStarted;

        status == "currently reading" ? dateStarted = new Date() : dateStarted = null; 

        await client.query(`INSERT INTO user_books (user_id, book_id, status, date_started) VALUES ($1, $2, $3, $4)`, [userId, bookId, status, dateStarted ]);

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}