import { getUserData, getUserPosts, getWhoLiked, postFollow, deleteFollow } from "../repositories/users.repositories.js";
import { followSchema } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export async function userPageData(req, res) {
  const userId = req.params.id;

  try {
    const userData = await getUserData(userId);

    const userPosts = await getUserPosts(userId);

    const objUserPage = {
      userId: userData.rows[0].id,
      username: userData.rows[0].username,
      picture: userData.rows[0].picture,
      posts: userPosts.rows,
    };
    res.status(200).send(objUserPage);
  } catch (err) {
    res.status(500).send(err);
  }
}
};

export async function followUser(req, res) {
    const userId = req.params.id;
    const followerId = jwt.verify(res.locals.token, process.env.SECRET_JWT).id;
   
    try {
        const { error } = followSchema.validate({userId, followerId}, { abortEarly: false });

        if (error) {
          const errors = error.details.map((detail) => detail.message);
          return res.status(422).send(errors);
        };

        await postFollow(userId, followerId);

        res.sendStatus(200);

    } catch(err) {
        res.status(500).send(err.message);
    };
};

export async function unfollowUser(req, res) {
    const userId = req.params.id;
    const followerId = jwt.verify(res.locals.token, process.env.SECRET_JWT).id;

    try {
        await deleteFollow(userId, followerId);

        res.sendStatus(200);
        
    } catch(err) {
        res.status(500).send(err.message);
    };
}