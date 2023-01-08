import { connection } from "../database/db.js";

export function getUserData(userId) {

    return connection.query(`
        SELECT id, username, picture FROM users WHERE id=$1;`, [userId]
    );
};

export function getUserPosts(userId) {

    return connection.query(`
        SELECT p.id, p.url, p.content, COUNT(l."userId") AS likes
        FROM posts p
        LEFT JOIN likes l ON p.id = l."postId"
        WHERE p."userId"=$1
        GROUP BY p.id;`,
        [userId]
    );
};

export function getWhoLiked() {

    return connection.query(`
        SELECT p.id, p.url, p.content, l."userId", u.username AS "whoLiked"
        FROM posts p
        LEFT JOIN likes l ON p.id = l."postId"
        JOIN users u ON l."userId"=u.id;`
    );
};