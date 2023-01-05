import { connection } from "../database/db.js";

export function insertUser(username, email, hashPassword, picture) {
  return connection.query(
    `INSERT INTO users 
         (username, email, password, picture) 
        VALUES 
         ($1, $2, $3, $4)`,
    [username, email, hashPassword, picture]
  );
}

export function selectUser(email) {
  return connection.query(`SELECT * FROM users WHERE users.email = '${email}'`);
}
