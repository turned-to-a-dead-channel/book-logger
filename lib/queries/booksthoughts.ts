import pool from '@/lib/db'

export async function postBookThought(thoughtData: { userBooksuid: string, thought: string, pageRef?: string}) {
    const { userBooksuid, thought, pageRef } = thoughtData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`
            SELECT user_books_id FROM user_books WHERE user_books_uid = $1
        `, [userBooksuid]);

        const userBooksId = rows[0].user_books_id;

        await client.query(`
            INSERT INTO books_thoughts (bt_ub_id, thought, page)
            VALUES ($1, $2, $3)
        `, [userBooksId, thought, pageRef]);


        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

export async function updateBookThought(thoughtData: { uid: string, thought: string, pageRef?: string}) {
    const { uid, thought, pageRef } = thoughtData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(`
            UPDATE books_thoughts set thought = $2, page = $3 where books_thoughts_uid = $1
        `, [uid, thought, pageRef]);


        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

export async function deleteBookThought(thoughtuid: string) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(`
            DELETE from books_thoughts 
            WHERE books_thoughts_uid = $1
        `, [thoughtuid]);

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}