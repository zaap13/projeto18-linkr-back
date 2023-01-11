import { getUserData, getUserPosts, getWhoLiked } from "../repositories/users.repositories.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function userPageData(req, res) {
    const userId = req.params.id;
    
    try {
        const userData = await getUserData(userId);

        const userPosts = await getUserPosts(userId);

        const whoLiked = await getWhoLiked();
        
        let objUserPosts = userPosts.rows;

        for (let i=0; i<userPosts.rows.length; i++){
            let arrWhoLiked = [];
           
            for (let j=0; j<whoLiked.rows.length; j++) {

                if (userPosts.rows[i].id === whoLiked.rows[j].id) {
                    arrWhoLiked.push(
                        whoLiked.rows[j].whoLiked                        
                    );                    
                };
                
                objUserPosts.forEach(objUserPosts => {
                    if(objUserPosts.id === userPosts.rows[i].id){
                        objUserPosts.whoLiked = arrWhoLiked;
                    };
                });
            };
        };

        const objUserPage = {
            userId: userData.rows[0].id,
            username: userData.rows[0].username,
            picture: userData.rows[0].picture,
            posts: objUserPosts
        };

        res.status(200).send(objUserPage);

    } 
    catch (err) {
        res.status(500).send(err);
    };
};

export async function followUser(req, res) {
    const userId = req.params.id;
    const followerId = jwt.verify(res.locals.token, process.env.SECRET_JWT).id
    console.log(followerId)
};

export async function unfollowUser(req, res) {
    const userId = req.params.id;

};