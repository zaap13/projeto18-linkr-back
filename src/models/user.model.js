import joi from "joi";

export const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  username: joi.string().required().min(3).max(50),
  picture: joi.string().uri().required(),
});
