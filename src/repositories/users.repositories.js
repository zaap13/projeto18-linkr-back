import { connection } from "../database/db.js";

export function getUserData(userId) {

    return connection.query(`
        SELECT id, username, picture FROM users WHERE id=$1;`, [userId]
    );
};

export function getUserPosts(userId) {

    return connection.query(`
        SELECT url, content FROM posts WHERE "userId"=$1;`, [userId]
    );
};