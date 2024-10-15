import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  RABBIT_MQ_TRANSPORT_HOST: string;
  RABBIT_MQ_QUEUE_NAME: string;
  RABBIT_MQ_TRANSPORT_HOST_PORT: string;
  RABBIT_MQ_TRANSPORT_CONTAINER_PORT: string;
  RABBIT_MQ_DEFAULT_USER: string;
  RABBIT_MQ_DEFAULT_PASS: string;
  PRODUCTS_MS_BACKEND_POSTGRES_DB: string;
  PRODUCTS_MS_BACKEND_POSTGRES_HOST: string;
  PRODUCTS_MS_BACKEND_POSTGRES_USER: string;
  PRODUCTS_MS_BACKEND_POSTGRES_PASSWORD: string;
  PRODUCTS_MS_BACKEND_POSTGRES_HOST_PORT: string;
  PRODUCTS_MS_BACKEND_POSTGRES_CONTAINER_PORT: string;
  PRODUCTS_MS_BACKEND_HOST_PORT: string;
  PRODUCTS_MS_BACKEND_CONTAINER_PORT: string;
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
    RABBIT_MQ_TRANSPORT_HOST: joi.string().required(),
    RABBIT_MQ_QUEUE_NAME: joi.string().required(),
    RABBIT_MQ_TRANSPORT_HOST_PORT: joi.string().required(),
    RABBIT_MQ_TRANSPORT_CONTAINER_PORT: joi.string().required(),
    RABBIT_MQ_DEFAULT_USER: joi.string().required(),
    RABBIT_MQ_DEFAULT_PASS: joi.string().required(),
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
  rabbitMqTransportHost: envVars.RABBIT_MQ_TRANSPORT_HOST,
  rabbitMqQueueName: envVars.RABBIT_MQ_QUEUE_NAME,
  rabbitMqTransportHostPort: envVars.RABBIT_MQ_TRANSPORT_HOST_PORT,
  rabbitMqTransportContainerPort: envVars.RABBIT_MQ_TRANSPORT_CONTAINER_PORT,
  rabbitMqDefaultUser: envVars.RABBIT_MQ_DEFAULT_USER,
  rabbitMqDefaultPass: envVars.RABBIT_MQ_DEFAULT_PASS,
};
