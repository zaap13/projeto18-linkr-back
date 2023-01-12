import { getFollowedUsers, getAllUsers } from "../repositories/search.repositories.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function searchUsers(req, res) {
    const input = req.params.input;
    const followerId = jwt.verify(res.locals.token, process.env.SECRET_JWT).id;
    let arrOrder = [];
    let searchedUsers = [];

    try {
        const followedUsers = await getFollowedUsers(input, followerId); 
        
        for (let i=0; i<followedUsers.rowCount; i++) {
            arrOrder.push(followedUsers.rows[i].id);
            searchedUsers.push({
                id: followedUsers.rows[i].id,
                username: followedUsers.rows[i].username,
                picture: followedUsers.rows[i].picture,
                followed: true
            });
        };
        
        const allSearchedUsers = await getAllUsers(input);  
        
        for (let j=0; j<allSearchedUsers.rowCount; j++) {
            if (arrOrder.includes(allSearchedUsers.rows[j].id) === false){
                searchedUsers.push({
                    id: allSearchedUsers.rows[j].id,
                    username: allSearchedUsers.rows[j].username,
                    picture: allSearchedUsers.rows[j].picture,
                    followed: false
                });
            };            
        };  

        res.status(200).send(searchedUsers);
    } 
    catch (err) {
        res.status(500).send(err);
    };
};