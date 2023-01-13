import { connection } from "../database/db.js";

export async function newComment(req, res) {
    const postId = req.params.postId;
    const { content, userId } = req.post;

    try {
        await connection.query(`
            INSERT INTO comments(content, "userId", "postId") VALUES($1, $2, $3)
        `, [content, userId, postId]);

        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err);
    }
}

export async function getComments(req, res) {
    try {
        const { rows: allComments } = await connection.query(`
            SELECT * FROM comments;
        `);

        return res.send(allComments);
    } catch (error) {
        res.send(error);
    }
}