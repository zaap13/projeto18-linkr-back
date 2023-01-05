import { insertPost } from "../repositories/posts.repositories.js";

export async function newPost(req, res) {
    const newPost = req.post;  

    try {
        await insertPost(newPost);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err);
    };
};