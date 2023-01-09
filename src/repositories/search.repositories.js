import { connection } from "../database/db.js";

export function getUsers() {

    return connection.query(`
        SELECT id, username, picture FROM users
        WHERE username LIKE '%est%' ORDER BY username LIMIT 10;`
    );
};