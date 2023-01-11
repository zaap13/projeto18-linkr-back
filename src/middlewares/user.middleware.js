import { userSchema, followSchema } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function userMiddleware(req, res, next) {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  };
  next();
};

export function followMiddleware(req, res, next) {
  const verified = jwt.verify(res.locals.token, process.env.SECRET_JWT);
  const newFollow = {
    userId: verified.id,
    followerId: req.body.followerId,
  };

  const { error } = followSchema.validate(newFollow, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  };
  next();
};