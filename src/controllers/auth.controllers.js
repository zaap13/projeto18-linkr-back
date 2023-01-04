import bcrypt from "bcrypt";
import { generateToken } from "../services/auth.service.js";

export async function postUser(req, res) {
  const { email, password, username, picture } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    /* await insertUser(username, email, hashPassword, picture); */
    console.log(email, password, username, picture);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.detail);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    /* const user = await selectUser(email);
      if (!user.rows[0]) {
        return res.status(404).send("Usuário não cadastrado");
      }
  
      const passwordOk = bcrypt.compareSync(password, user.rows[0].password);
  
      if (!passwordOk) {
        return res.sendStatus(401);
      } */

    const token = generateToken(10); /* user.rows[0].id */

    console.log(token);

    res.status(201).send({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
