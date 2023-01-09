import {
  selectIdByHash,
  selectPostsByHashId,
  selectTrending,
} from "../repositories/hashtags.repositories.js";
import { getWhoLiked } from "../repositories/users.repositories.js";

export async function getPostsByHash(req, res) {
  const { hashtag } = req.params;

  try {
    const whoLiked = await getWhoLiked();
    const hashId = await selectIdByHash(hashtag);

    const { rows } = await selectPostsByHashId(hashId.rows[0].id);

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
    res.send(rows);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

export async function getTrending(req, res) {
  try {
    const trending = await selectTrending();

    res.send(trending.rows);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}
