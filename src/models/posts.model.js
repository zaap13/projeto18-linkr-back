import joi from "joi";

export const postsSchema = joi.object({
    url: joi.string().uri().required(),
    content: joi.string().max(280).allow(null).allow('')
});