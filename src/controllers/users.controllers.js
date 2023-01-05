import { getUserData, getUserPosts } from "../repositories/users.repositories.js";

export async function userPageData(req, res) {
    const userId = req.params.id;

    try {
        const userData = await getUserData(userId);

        const userPosts = await getUserPosts(userId);
       
        const objUserPage = {
            username: userData.rows[0].username,
            picture: userData.rows[0].picture,
            posts: userPosts.rows
        };

        res.status(200).send(objUserPage);

    } catch (err) {
        res.status(500).send(err);
    };
};