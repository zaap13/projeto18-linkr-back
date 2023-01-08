import { postsSchema } from "../models/posts.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function postsMiddleware(req, res, next) {
  const verified = jwt.verify(res.locals.token, process.env.SECRET_JWT);
  const newPost = {
    userId: verified.id,
    url: req.body.url,
    content: req.body.content,
  };

  const { error } = postsSchema.validate(newPost, { abortEarly: false });

  if (error) {
    const err = error.details.map((d) => d.message);
    console.log(err);
    return res.status(400).send(err);
  }

  req.post = newPost;
  next();
}