import { connection } from "../database/db.js";

export function selectPostsByHashId(hashId) {
  return connection.query(
    `
    SELECT p.id, p."userId", p.url, p.content, p.image, p.description, p.title, u.username, u.picture, COUNT(l."userId") AS likes
    FROM posts p
    LEFT JOIN likes l ON p.id = l."postId"
    JOIN users u 
    ON u.id = p."userId"
    JOIN "hashPost" h ON p.id = h."postId" 
    WHERE h."hashtagId" = $1
    GROUP BY p.id, u.id
    ORDER BY p."createdAt" DESC
      `,
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
