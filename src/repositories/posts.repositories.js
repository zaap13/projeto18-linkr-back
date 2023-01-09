import { connection } from "../database/db.js";

export function insertPost(newPost) {
  const { userId, url, content, title, description, image } = newPost;

  return connection.query(
    `
        INSERT INTO posts ("userId", url, content, title, description, image)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id`,
    [userId, url, content, title, description, image]
  );
}

export function listOfPosts() {
  return connection.query(
    `SELECT p.id, p."userId", p.url, p.content, p.image, p.description, p.title, u.username, u.picture, COUNT(l."userId") AS likes
    FROM posts p
    LEFT JOIN likes l ON p.id = l."postId"
    JOIN users u 
    ON u.id = p."userId"
    GROUP BY p.id, u.id
    ORDER BY p."createdAt" DESC
    LIMIT 20;`
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

export function findPost(id) {
  return connection.query(
    `
    SELECT * FROM posts WHERE id = $1;
    `,
    [id]
  );
}

export function deletePost(id) {
  return connection.query(
    `
    DELETE FROM posts WHERE id = $1;
    `,
    [id]
  );
}

export function deleteTag(hash) {
  return connection.query(
    `UPDATE hashtags
     SET count = count - 1
     WHERE hashtags.name = '${hash}'`
  );
}

export function deleteHash(id) {
  return connection.query(
    `DELETE FROM "hashPost" WHERE "hashPost"."postId" = $1`,
    [id]
  );
}

export function editPost(id, content) {
  return connection.query(
    `UPDATE posts
     SET content = ${content}
     WHERE posts.id = '${id}'`
  );
}
