import pool from '@/lib/db'

export async function postBookLog(logData: { uid: string, dateLogged: Date, startPage: number, endPage: number, quote?: string}) {
    const { uid, dateLogged, startPage, endPage } = logData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`
            SELECT user_books_id FROM user_books WHERE user_books_uid = $1
        `, [uid]);

        const userBooksId = rows[0].user_books_id;

        await client.query(`
            INSERT INTO books_log (bl_ub_id, date_logged, start_page, end_page)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (bl_ub_id, date_logged) DO UPDATE
            SET end_page = EXCLUDED.end_page
        `, [userBooksId, dateLogged, startPage, endPage]);

        await client.query(`
            UPDATE user_books SET current_page = $1 WHERE user_books_uid = $2
        `, [endPage, uid]);

        if (logData.quote) await client.query(`
            INSERT INTO books_quotes (ub_id, quote)
            VALUES ($1, $2)
        `, [userBooksId, logData.quote]);

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}
