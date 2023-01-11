import { connection } from "../database/db.js";

export function getUserData(userId) {
  return connection.query(`
    SELECT id, username, picture FROM users WHERE id=$1;`,
    [userId]
  );
};

export function getUserPosts(userId) {
  return connection.query(`
    SELECT p.id, p."userId", p.url, p.content, p.image, p.description, p.title, u.username, u.picture, COUNT(l."userId") AS likes
    FROM posts p
    LEFT JOIN likes l ON p.id = l."postId"
    JOIN users u 
    ON u.id = p."userId"
    WHERE p."userId"=$1
    GROUP BY p.id, u.id
    ORDER BY p."createdAt" DESC`,
    [userId]
  );
};

export function getWhoLiked() {
  return connection.query(`
    SELECT p.id, p.url, p.content, l."userId", u.username AS "whoLiked"
    FROM posts p
    LEFT JOIN likes l ON p.id = l."postId"
    JOIN users u ON l."userId"=u.id;`
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
