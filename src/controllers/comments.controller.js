import { connection } from "../database/db.js";

export async function newComment(req, res) {
    const { content, userId, postId } = req.post;

    try {
        const { rows: getUserIdWhoWillComment } = await connection.query(`
            SELECT id FROM users WHERE id = $1;
        `, [userId]);

        if(!getUserIdWhoWillComment[0]) {
            return res.sendStatus(404);
        };

        const { rows: getPostIdWhereWillComment } = await connection.query(`
            SELECT id FROM posts WHERE id = $1;
        `, [postId]);

        if(!getPostIdWhereWillComment[0]) {
            return res.sendStatus(404);
        };

        await connection.query(`
            INSERT INTO comments(content, "userId", "postId") VALUES($1, $2, $3)
        `, [content, userId, postId]);

        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err);
    }
}