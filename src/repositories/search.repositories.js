import { connection } from "../database/db.js";

export function getFollowedUsers(input, followerId) {

    return connection.query(`
        SELECT u.id, u.username, u.picture, f."followerId" FROM users u
        JOIN follow f ON u.id = f."userId"
        WHERE u.username ILIKE '%${input}%' AND f."followerId" = $1
        ORDER BY u.username;`,
        [followerId]
    );
};

export function getAllUsers(input) {

    return connection.query(`
        SELECT u.id, u.username, u.picture FROM users u
        WHERE u.username ILIKE '%${input}%'
        ORDER BY u.username;`,
    );
};

