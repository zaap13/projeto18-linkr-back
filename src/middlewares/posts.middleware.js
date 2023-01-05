import { postsSchema } from "../models/posts.model.js";

export function postsMiddleware(req, res, next) {
    const newPost = {
        userId: req.user.id,
        url: req.body.url,
        content: req.body.content
    };
   
    const {error} = postsSchema.validate(newPost, {abortEarly: false});

    if (error) {
        const err = error.details.map((d) => d.message);
        return res.status(400).send(err);
    };

    req.post = newPost;
    next();
};