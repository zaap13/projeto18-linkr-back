import { getUserData, getUserPosts, getWhoLiked } from "../repositories/users.repositories.js";

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