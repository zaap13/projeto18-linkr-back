import { postsSchema } from "../models/posts.model.js";
import getMetaData from "metadata-scraper";

export async function postsMiddleware(req, res, next) {
  const { error } = postsSchema.validate(req.body, { abortEarly: false });

  const { title, description, url, image } = await getMetaData(req.body.url);

  const newPost = {
    userId: req.user.id,
    content: req.body.content,
    url,
    title,
    description,
    image,
  };

  console.log(newPost);

  if (error) {
    const err = error.details.map((d) => d.message);
    console.log(err);
    return res.status(400).send(err);
  }

  req.post = newPost;
  next();
}
