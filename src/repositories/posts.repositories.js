import { connection } from "../database/db.js";

export function insertPost(newPost) {
  const { userId, url, content } = newPost;

  return connection.query(
    `
        INSERT INTO posts ("userId", url, content)
        VALUES ($1, $2, $3)
        RETURNING id`,
    [userId, url, content]
  );
}

export function insertTag(hash) {
  return connection.query(
    `INSERT INTO hashtags (name)
    VALUES ($1) 
    RETURNING id`,
    [hash]
  );
}

export function updateTag(hash) {
  return connection.query(
    `UPDATE hashtags
     SET count = count + 1
     WHERE hashtags.name = '${hash}'`
  );
}

export function checkTag(hash) {
  return connection.query(`
    SELECT id 
    FROM hashtags 
    WHERE hashtags.name = '${hash}'
`);
}

export function insertHashPost(postId, tagId) {
  return connection.query(
    `
    INSERT INTO "hashPost" ("postId", "hashtagId")
    VALUES($1, $2)
    `,
    [postId, tagId]
  );
}
