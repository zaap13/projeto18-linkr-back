import { connection } from "../database/db.js";

export function getUserData(userId) {
  return connection.query(
    `
        SELECT id, username, picture FROM users WHERE id=$1;`,
    [userId]
  );
}

export function getUserPosts(userId) {
  return connection.query(
    ` 
    SELECT p.id, p."userId", p.url, p.content, p.image, p.description, 
    p.title, u.username, u.picture,  COALESCE(liker.liked, '[]') 
    AS "whoLiked", COALESCE(commenter.commented, '[]') AS "comments"
    FROM   posts p
    JOIN users u ON u.id = p."userId"
    LEFT JOIN LATERAL (
      SELECT json_agg(json_build_object('userId', l."userId", 'username', u.username)) AS liked
      FROM   likes l JOIN users u ON u.id = l."userId"
      WHERE  l."postId" = p.id
      ) liker ON true
    LEFT JOIN LATERAL (
      SELECT json_agg(json_build_object('userId', c."userId", 'username', u.username, 'comment', c.content)) AS commented
      FROM   comments c JOIN users u ON u.id = c."userId"
      WHERE  c."postId" = p.id
      ) commenter ON true
        WHERE p."userId"=$1
    ORDER BY p."createdAt" DESC

`,
    [userId]
  );
}
