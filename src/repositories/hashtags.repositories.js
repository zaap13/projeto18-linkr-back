import { connection } from "../database/db.js";

export function selectPostsByHashId(hashId) {
  return connection.query(`
      SELECT posts.* FROM "posts" JOIN "hashPost" ON posts.id = "hashPost"."postId" WHERE "hashPost"."hashtagId" = ${hashId}
      `);
}

export function selectIdByHash(hash) {
  return connection.query(
    `SELECT id FROM hashtags WHERE hashtags.name = '#${hash}'`
  );
}
