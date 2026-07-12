import pool from '@/lib/db'

export async function postBookLog(logData: { userBooksuid: string, dateLogged: Date, startPage: number, endPage: number, quote?: string, isFinished?: boolean}) {
    const { userBooksuid, dateLogged, startPage, endPage, quote = null, isFinished = false } = logData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`
            SELECT user_books_id FROM user_books WHERE user_books_uid = $1
        `, [userBooksuid]);

        const userBooksId = rows[0].user_books_id;

        await client.query(`
            INSERT INTO books_logs (bl_ub_id, date_logged, start_page, end_page)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (bl_ub_id, date_logged) DO UPDATE
            SET end_page = EXCLUDED.end_page
        `, [userBooksId, dateLogged, startPage, endPage]);

        await client.query(`
            UPDATE user_books SET current_page = $1 WHERE user_books_uid = $2
        `, [endPage, userBooksuid]);

        if (quote) await client.query(`
            INSERT INTO books_quotes (bq_ub_id, quote)
            VALUES ($1, $2)
        `, [userBooksId, logData.quote]);

        if (isFinished) await client.query(`
            UPDATE user_books SET status = 'finished', date_finished = $2 WHERE user_books_uid = $1
        `, [userBooksuid, dateLogged])

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

export async function getBooksLogs(logData: { userUid: string}) {
    const { userUid } = logData;

    const result = await pool.query(`
        SELECT bl.*, b.cover, b.title, b.author, ub.user_books_uid, ub.cover_override, ub.title_override, ub.author_override
        FROM users u
        JOIN user_books ub ON ub.user_id = u.user_id
        JOIN books_logs bl ON bl.bl_ub_id = ub.user_books_id
        JOIN books b on b.book_id = ub.book_id
        WHERE u.user_uid = $1
        AND bl.date_logged >= date_trunc('year', now())
        ORDER BY bl.date_logged DESC NULLS LAST
    `, [userUid]);
    return result.rows;
}

export async function updateBookLog(logData: { logUid: string, dateLogged: Date, startPage: number, endPage: number, isFinished?: boolean}) {
    const { logUid, dateLogged, startPage, endPage, isFinished } = logData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`
            SELECT bl_ub_id FROM books_logs WHERE books_logs_uid = $1
        `, [logUid]);

        const userBooksId = rows[0].bl_ub_id

        await client.query(`
            UPDATE books_logs SET date_logged = $2, start_page = $3, end_page = $4 where books_logs_uid = $1
        `, [logUid, dateLogged, startPage, endPage]);

        if (isFinished) {
            await client.query(`UPDATE user_books SET status = 'finished', date_finished = $2 WHERE user_books_id = $1`, [userBooksId]);
        }

        await client.query(`
            UPDATE user_books SET current_page = COALESCE(
                (SELECT end_page FROM books_logs WHERE bl_ub_id = $1 ORDER BY date_logged DESC LIMIT 1),
                current_page
                )
                WHERE user_books_id = $1
            `, [userBooksId])

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
}

export async function deleteBookLog(loguid: string) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`
            SELECT bl_ub_id FROM books_logs WHERE books_logs_uid = $1
        `, [loguid]);

        const userBooksId = rows[0].bl_ub_id

        await client.query(`
            DELETE from books_logs
            WHERE books_logs_uid = $1
        `, [loguid]);

        await client.query(`
            UPDATE user_books SET current_page = COALESCE(
                (SELECT end_page FROM books_logs WHERE bl_ub_id = $1 ORDER BY date_logged DESC LIMIT 1),
                current_page
                )
                WHERE user_books_id = $1
        `, [userBooksId])

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}
