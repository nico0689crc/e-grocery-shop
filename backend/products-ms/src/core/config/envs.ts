import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PRODUCTS_MS_BACKEND_POSTGRES_DB: string;
  PRODUCTS_MS_BACKEND_POSTGRES_HOST: string;
  PRODUCTS_MS_BACKEND_POSTGRES_USER: string;
  PRODUCTS_MS_BACKEND_POSTGRES_PASSWORD: string;
  PRODUCTS_MS_BACKEND_POSTGRES_HOST_PORT: string;
  PRODUCTS_MS_BACKEND_POSTGRES_CONTAINER_PORT: string;
  PRODUCTS_MS_BACKEND_HOST_PORT: string;
  PRODUCTS_MS_BACKEND_CONTAINER_PORT: string;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PRODUCTS_MS_BACKEND_POSTGRES_DB: joi.string().required(),
    PRODUCTS_MS_BACKEND_POSTGRES_HOST: joi.string().required(),
    PRODUCTS_MS_BACKEND_POSTGRES_USER: joi.string().required(),
    PRODUCTS_MS_BACKEND_POSTGRES_PASSWORD: joi.string().required(),
    PRODUCTS_MS_BACKEND_POSTGRES_HOST_PORT: joi.string().required(),
    PRODUCTS_MS_BACKEND_POSTGRES_CONTAINER_PORT: joi.string().required(),
    PRODUCTS_MS_BACKEND_HOST_PORT: joi.string().required(),
    PRODUCTS_MS_BACKEND_CONTAINER_PORT: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  postgresDb: envVars.PRODUCTS_MS_BACKEND_POSTGRES_DB,
  postgresHost: envVars.PRODUCTS_MS_BACKEND_POSTGRES_HOST,
  postgresUser: envVars.PRODUCTS_MS_BACKEND_POSTGRES_USER,
  postgresPassword: envVars.PRODUCTS_MS_BACKEND_POSTGRES_PASSWORD,
  postgresHostPort: envVars.PRODUCTS_MS_BACKEND_POSTGRES_HOST_PORT,
  postgresContainerPort: envVars.PRODUCTS_MS_BACKEND_POSTGRES_CONTAINER_PORT,
  backendHostPort: envVars.PRODUCTS_MS_BACKEND_HOST_PORT,
  backendContainerPort: envVars.PRODUCTS_MS_BACKEND_CONTAINER_PORT,
  natsServers: envVars.NATS_SERVERS,
};
