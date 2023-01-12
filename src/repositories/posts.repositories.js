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
    `SELECT p.id, p."userId", p.url, p.content, p.image, p.description, 
    p.title, u.username, u.picture,  COALESCE(liker.liked, '[]') 
    AS "whoLiked", COALESCE(commenter.commented, '[]') AS "comments", r."repostUserId", r."repostUsername", "repostCounter"."repostCount"
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
	   LEFT JOIN LATERAL (
       SELECT COUNT(*) AS "repostCount"
       FROM reposts
       WHERE  reposts."postId" = p.id
		) "repostCounter" ON true
	LEFT JOIN (SELECT reposts."postId" AS "repostId", reposts."userId" AS "repostUserId", users.username AS "repostUsername" FROM reposts JOIN users ON users.id = reposts."userId") r ON p.id = r."repostId"
	ORDER BY p."createdAt" DESC`
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
     SET content = '${content}'
     WHERE posts.id = '${id}'`
  );
}

export function likePost(userId, postId) {
  return connection.query(
    `INSERT INTO likes 
    ("userId", "postId") 
   VALUES 
    ($1, $2)`,
    [userId, postId]
  );
}

export function unlikePost(userId, postId) {
  return connection.query(
    `DELETE FROM likes l WHERE (l."userId" = $1 AND l."postId" = $2)`,
    [userId, postId]
  );
}

export function userLikes(userId) {
  return connection.query(
    `SELECT l."postId" FROM likes l JOIN users u ON u.id = l."userId" WHERE u.id = $1`,
    [userId]
  );
}

export function insertShare(userId, postId) {
  return connection.query(
    `INSERT INTO reposts 
    ("userId", "postId") 
   VALUES 
    ($1, $2)`,
    [userId, postId]
  );
}

export function removeShare(userId, postId) {
  return connection.query(
    `DELETE FROM reposts r WHERE (r."userId" = $1 AND r."postId" = $2)`,
    [userId, postId]
  );
}
