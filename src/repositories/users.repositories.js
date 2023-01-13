import { connection } from "../database/db.js";

export function getUserData(userId) {
  return connection.query(`
    SELECT id, username, picture FROM users WHERE id=$1;`,
    [userId]
  );
};

export function getUserPosts(userId) {
   return connection.query(
    `SELECT p.id, p."userId", p.url, p.content, p.image, p.description, 
    p.title, u.username, u.picture, COALESCE(liker.liked, '[]') 
    AS "whoLiked", COALESCE(commenter.commented, '[]') AS "comments",
	"repostCounter"."repostCount", p."repostUserId", p."repostUsername"	
	FROM 
	(SELECT p.id, p."userId", p.url, p.content, p.image, p.description, 
    p.title, r."createdAt", r."userId" AS "repostUserId", u.username AS "repostUsername" FROM posts p
	JOIN reposts r ON r."postId" = p.id
	JOIN users u ON u.id = r."userId"
	WHERE r."userId" = $1
	UNION ALL
	SELECT p.id, p."userId", p.url, p.content, p.image, p.description, 
    p.title, p."createdAt", null AS "repostUserId", null AS "repostUsername" FROM posts p
	JOIN users u ON u.id = p."userId"
	WHERE p."userId" = $1) p 
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
	ORDER BY p."createdAt" DESC
`,
    [userId]
  );
};

export function postFollow(userId, followerId) {
  return connection.query(`
    INSERT INTO follow ("userId", "followerId")
    VALUES ($1, $2);`,
    [userId, followerId]
  );
};

export function deleteFollow(userId, followerId) {
  return connection.query(`
    DELETE FROM follow
    WHERE "userId"=$1 AND "followerId"=$2;`,
    [userId, followerId]
    );
};
