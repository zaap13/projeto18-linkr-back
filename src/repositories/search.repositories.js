import { connection } from "../database/db.js";

export function getUsers(input) {

    return connection.query(`
        SELECT id, username, picture FROM users
        WHERE username ILIKE '%${input}%' ORDER BY username LIMIT 10;`,
    );
};