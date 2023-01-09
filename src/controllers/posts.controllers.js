import {
  insertPost,
  insertTag,
  checkTag,
  updateTag,
  insertHashPost,
  listOfPosts,
  findPost,
  deletePost,
  deleteTag,
  deleteHash,
} from "../repositories/posts.repositories.js";
import { getWhoLiked } from "../repositories/users.repositories.js";

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
    const whoLiked = await getWhoLiked();
    const { rows } = await listOfPosts();
    let objPosts = rows;

    for (let i = 0; i < rows.length; i++) {
      let arrWhoLiked = [];

      for (let j = 0; j < whoLiked.rows.length; j++) {
        if (rows[i].id === whoLiked.rows[j].id) {
          arrWhoLiked.push(whoLiked.rows[j].whoLiked);
        }

        objPosts.forEach((objPosts) => {
          if (objPosts.id === rows[i].id) {
            objPosts.whoLiked = arrWhoLiked;
          }
        });
      }
    }

    return res.send(rows);
  } catch (error) {
    res.send(error);
  }
}

export async function removePost(req, res) {
  const { id } = req.params;

  try {
    const { rows: post } = await findPost(id);

    if (post[0] !== undefined) {
      if (post[0].content) {
        const hashs = post[0].content.match(/#\w+/g);
        if (hashs) {
          hashs.forEach(async (hash) => {
            await deleteTag(hash);
          });
        }
      }
      await deleteHash(id);
      await deletePost(id);
      return res.sendStatus(200);
      // aqui ta dando erro por conta da quantidade de conexões com o deploy do BD
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    return res.status(500).send(err);
    console.log(err);
  }
}
