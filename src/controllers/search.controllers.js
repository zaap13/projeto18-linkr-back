import { getUsers } from "../repositories/search.repositories.js";

export async function searchUsers(req, res) {
    const input = req.params.input;
    
    try {
        const usersData = await getUsers(input);     

        res.status(200).send(usersData.rows);
    } 
    catch (err) {
        res.status(500).send(err);
    };
};