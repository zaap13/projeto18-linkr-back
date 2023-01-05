import joi from "joi";

export const postsSchema = joi.object({
    userId: joi.number().required(),
    url: joi.string().uri().required(),
    content: joi.string().max(280)
});