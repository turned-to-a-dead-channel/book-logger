import pool from '@/lib/db'

export async function postBookQuote(quoteData: { userBooksuid: string, quote: string, pageRef?: string}) {
    const { userBooksuid, quote, pageRef } = quoteData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`
            SELECT user_books_id FROM user_books WHERE user_books_uid = $1
        `, [userBooksuid]);

        const userBooksId = rows[0].user_books_id;

        await client.query(`
            INSERT INTO books_quotes (bq_ub_id, quote, page)
            VALUES ($1, $2, $3)
        `, [userBooksId, quote, pageRef]);


        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

export async function updateBookQuote(quoteData: { uid: string, quote: string, pageRef?: string}) {
    const { uid, quote, pageRef } = quoteData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(`
            UPDATE books_quotes set quote = $2, page = $3 where books_quotes_uid = $1
        `, [uid, quote, pageRef]);


        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

export async function deleteBookQuote(quoteuid: string) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(`
            DELETE from books_quotes 
            WHERE books_quotes_uid = $1
        `, [quoteuid]);

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}


