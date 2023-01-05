import { connection } from "../database/db.js";

export function insertPost(newPost) {
    const { userId, url, content } = newPost;

    return connection.query(`
        INSERT INTO posts ("userId", url, content)
        VALUES ($1, $2, $3)`,
        [userId, url, content]
    );
};