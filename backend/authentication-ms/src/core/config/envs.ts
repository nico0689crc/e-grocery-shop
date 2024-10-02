import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  JWT_SECRET: string;
  AUTHENTICATION_MS_BACKEND_USERS_PASSWORDS: string;
  AUTHENTICATION_MS_BACKEND_POSTGRES_DB: string;
  AUTHENTICATION_MS_BACKEND_POSTGRES_HOST: string;
  AUTHENTICATION_MS_BACKEND_POSTGRES_USER: string;
  AUTHENTICATION_MS_BACKEND_POSTGRES_PASSWORD: string;
  AUTHENTICATION_MS_BACKEND_POSTGRES_HOST_PORT: string;
  AUTHENTICATION_MS_BACKEND_POSTGRES_CONTAINER_PORT: string;
  DOCKER_HUB_USERNAME: string;
  AUTHENTICATION_MS_BACKEND_HOST_PORT: string;
  AUTHENTICATION_MS_BACKEND_CONTAINER_PORT: string;
  DOCKER_HUB_AUTHENTICATION_MS_BACKEND_IMAGE: string;
}

const envsSchema = joi
  .object({
    JWT_SECRET: joi.string().required(),
    AUTHENTICATION_MS_BACKEND_USERS_PASSWORDS: joi.string().required(),
    AUTHENTICATION_MS_BACKEND_POSTGRES_DB: joi.string().required(),
    AUTHENTICATION_MS_BACKEND_POSTGRES_HOST: joi.string().required(),
    AUTHENTICATION_MS_BACKEND_POSTGRES_USER: joi.string().required(),
    AUTHENTICATION_MS_BACKEND_POSTGRES_PASSWORD: joi.string().required(),
    AUTHENTICATION_MS_BACKEND_POSTGRES_HOST_PORT: joi.string().required(),
    AUTHENTICATION_MS_BACKEND_POSTGRES_CONTAINER_PORT: joi.string().required(),
    DOCKER_HUB_USERNAME: joi.string().required(),
    AUTHENTICATION_MS_BACKEND_HOST_PORT: joi.string().required(),
    AUTHENTICATION_MS_BACKEND_CONTAINER_PORT: joi.string().required(),
    DOCKER_HUB_AUTHENTICATION_MS_BACKEND_IMAGE: joi.string().required(),
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
  jwtSecret: envVars.JWT_SECRET,
  usersPassword: envVars.AUTHENTICATION_MS_BACKEND_USERS_PASSWORDS,
  postgresDb: envVars.AUTHENTICATION_MS_BACKEND_POSTGRES_DB,
  postgresHost: envVars.AUTHENTICATION_MS_BACKEND_POSTGRES_HOST,
  postgresUser: envVars.AUTHENTICATION_MS_BACKEND_POSTGRES_USER,
  postgresPassword: envVars.AUTHENTICATION_MS_BACKEND_POSTGRES_PASSWORD,
  postgresHostPort: envVars.AUTHENTICATION_MS_BACKEND_POSTGRES_HOST_PORT,
  postgresContainerPort:
    envVars.AUTHENTICATION_MS_BACKEND_POSTGRES_CONTAINER_PORT,
  dockerHubUsername: envVars.DOCKER_HUB_USERNAME,
  backendHostPort: envVars.AUTHENTICATION_MS_BACKEND_HOST_PORT,
  backendContainerPort: envVars.AUTHENTICATION_MS_BACKEND_CONTAINER_PORT,
  dockerHubBackendImage: envVars.DOCKER_HUB_AUTHENTICATION_MS_BACKEND_IMAGE,
};
