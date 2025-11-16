import Joi from 'joi';

export const databaseValidtaion = Joi.object({
  DATABASE_URL: Joi.string()
    .uri({ scheme: [/postgres/, /postgresql/] })
    .required(),
});
