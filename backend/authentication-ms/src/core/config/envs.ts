import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  JWT_SECRET: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_HOST_PORT: string;
  POSTGRES_CONTAINER_PORT: string;
  DOCKER_HUB_USERNAME: string;
  AUTHENTICATION_MS_BACKEND_HOST_PORT: string;
  AUTHENTICATION_MS_BACKEND_CONTAINER_PORT: string;
  DOCKER_HUB_AUTHENTICATION_MS_BACKEND_IMAGE: string;
}

const envsSchema = joi.object({
  JWT_SECRET: joi.string().required(),
  POSTGRES_DB: joi.string().required(),
  POSTGRES_HOST: joi.string().required(),
  POSTGRES_USER: joi.string().required(),
  POSTGRES_PASSWORD: joi.string().required(),
  POSTGRES_HOST_PORT: joi.string().required(),
  POSTGRES_CONTAINER_PORT: joi.string().required(),
  DOCKER_HUB_USERNAME: joi.string().required(),
  AUTHENTICATION_MS_BACKEND_HOST_PORT: joi.string().required(),
  AUTHENTICATION_MS_BACKEND_CONTAINER_PORT: joi.string().required(),
  DOCKER_HUB_AUTHENTICATION_MS_BACKEND_IMAGE: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({ 
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;

export const envs = {
  jwtSecret: envVars.JWT_SECRET,
  postgresDb: envVars.POSTGRES_DB,
  postgresHost: envVars.POSTGRES_HOST,
  postgresUser: envVars.POSTGRES_USER,
  postgresPassword: envVars.POSTGRES_PASSWORD,
  postgresHostPort: envVars.POSTGRES_HOST_PORT,
  postgresContainerPort: envVars.POSTGRES_CONTAINER_PORT,
  dockerHubUsername: envVars.DOCKER_HUB_USERNAME,
  backendHostPort: envVars.AUTHENTICATION_MS_BACKEND_HOST_PORT,
  backendContainerPort: envVars.AUTHENTICATION_MS_BACKEND_CONTAINER_PORT,
  dockerHubBackendImage: envVars.DOCKER_HUB_AUTHENTICATION_MS_BACKEND_IMAGE,
};