import {
  insertPost,
  insertTag,
  checkTag,
  updateTag,
  insertHashPost,
  listOfPosts,
  findPost,
  deletePost
} from "../repositories/posts.repositories.js";

export async function newPost(req, res) {
  const newPost = req.post;
  let hashs;
  if (newPost.content) {
    hashs = newPost.content.match(/#\w+/g);
  }

  try {
    const postId = await insertPost(newPost);

    if (hashs) {
      hashs.forEach(async (hash) => {
        const hashExists = await checkTag(hash);
        if (hashExists.rows[0]) {
          await updateTag(hash);
          await insertHashPost(postId.rows[0].id, hashExists.rows[0].id);
        } else {
          const tagId = await insertTag(hash);
          await insertHashPost(postId.rows[0].id, tagId.rows[0].id);
        }
      });
    }

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getAllPosts(req, res) {
  try {
    const { rows } = await listOfPosts();
    return res.send(rows);
  } catch (error) {
    res.send(error);
  }
}

export async function removePost(req, res) {
  const { id }  = req.params;

    try {
      const { rows: post } = await findPost(id); 

      if(post[0] !== undefined) {
        await deletePost(id);
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404); 
      }
    } catch (err) {
      return res.status(500).send(err);
    }
}

export async function updatePost(req, res) {
  const { id: postId } = req.params;
  const contentPost = req.post;
  const validation = postsSchema.validate(req.body, {abortEarly: false});
  let hashs;

  if (contentPost.content) {
    hashs = contentPost.content.match(/#\w+/g);
  };

  if(validation.error) {
    const error = validation.error.details.map(detail => detail.message);

    return res.status(400).send(error);
  };

  try {
    const { rows: postIdExists } = await connection.query(`
      SELECT * FROM posts WHERE id = $1;
    `, [postId]);

    if(postIdExists[0]) {
      await connection.query(`
        UPDATE posts SET content = $1 WHERE id = $2;
      `, [contentPost, postId]);

      return res.sendStatus(204);
    } else {
      return res.sendStatus(404);
    };
  } catch (err) {
    return res.status(500).send(err);
  }
};