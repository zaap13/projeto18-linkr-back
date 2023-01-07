import {
  selectIdByHash,
  selectPostsByHashId,
  selectTrending,
} from "../repositories/hashtags.repositories.js";

export async function getPostsByHash(req, res) {
  const { hashtag } = req.params;
  try {
    const hashId = await selectIdByHash(hashtag);

    const hashPosts = await selectPostsByHashId(hashId.rows[0].id);
    res.send(hashPosts.rows);
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
