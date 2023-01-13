import { connection } from "../database/db.js";

export function insertComment(newComment, postId) {
  const { content, userId } = newComment;

  return connection.query(
    `
        INSERT INTO comments(content, "userId", "postId") VALUES($1, $2, $3)
    `, 
    [content, userId, postId]);
}