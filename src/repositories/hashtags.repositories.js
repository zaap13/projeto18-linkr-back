import { connection } from "../database/db.js";

export function selectPostsByHashId(hashId) {
  return connection.query(
    `SELECT p.id, p."userId", p.url, p.content, p.image, p.description, 
    p.title, u.username, u.picture,  COALESCE(liker.liked, '[]') 
    AS "whoLiked", COALESCE(commenter.commented, '[]') AS "comments"
    FROM   posts p
    JOIN users u ON u.id = p."userId"
    JOIN "hashPost" h ON p.id = h."postId" 
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
        WHERE h."hashtagId" = $1
    ORDER BY p."createdAt" DESC`,
    [hashId]
  );
}

export function selectIdByHash(hash) {
  return connection.query(
    `SELECT id FROM hashtags WHERE hashtags.name = '#${hash}'`
  );
}

export function selectTrending() {
  return connection.query(
    `SELECT hashtags.name 
    FROM "hashtags" 
    JOIN "hashPost" 
    ON hashtags.id = "hashPost"."hashtagId" 
    GROUP BY hashtags.id 
    ORDER BY hashtags.count DESC 
    LIMIT 10
    `
  );
}
