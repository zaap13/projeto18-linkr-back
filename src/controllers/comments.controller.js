import { connection } from "../database/db.js";
import { insertComment } from "../repositories/comments.repositories.js";

export async function newComment(req, res) {
    const postId = req.params.postId;
    const newComment = req.post;

    try {
        await insertComment(newComment, postId);

        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err);
    }
}