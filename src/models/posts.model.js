import joi from "joi";

export const postsSchema = joi.object({
    url: joi.string().uri().required(),
    content: joi.string().max(280).allow(null).allow('')
});

export const commentsSchema = joi.object({
    content: joi.string().max(280).required(),
    userId: joi.number().integer().required(),
    postId: joi.number().integer().required()
});