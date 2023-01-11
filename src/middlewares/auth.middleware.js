import jwt from "jsonwebtoken";
import { connection } from "../database/db.js";

export async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  let id = 0;
  let err;

  if (!token) {
    console.log("aqui");

    return res.status(401).send({ message: "Token not found!" });
  }

  jwt.verify(token, process.env.SECRET_JWT, (error, decoded) => {
    if (error) {
      err = error;
    } else {
      id = decoded.id;
    }
  });
  if (err) {
    console.log("aqui");

    return res.status(401).send({ message: "Invalid Token!" });
  }
  try {
    const user = await connection.query(
      `SELECT id FROM users WHERE users.id = '${id}'`
    );
    if (!user.rows[0]) {
      console.log("aqui");
      return res.status(401).send({ message: "User not found!" });
    }
    req.user = user.rows[0];
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
