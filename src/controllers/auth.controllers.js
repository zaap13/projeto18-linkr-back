import bcrypt from "bcrypt";

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
