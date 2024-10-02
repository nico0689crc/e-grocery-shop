import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  CLIENT_GATEWAY_BACKEND_HOST_PORT: string;
  CLIENT_GATEWAY_BACKEND_CONTAINER_PORT: string;
}

const envsSchema = joi.object({
  CLIENT_GATEWAY_BACKEND_HOST_PORT: joi.string().required(),
  CLIENT_GATEWAY_BACKEND_CONTAINER_PORT: joi.string().required(),
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
  clientGatewayBackendHostPort: envVars.CLIENT_GATEWAY_BACKEND_HOST_PORT,
  clientGatewayBackendContainerPort: envVars.CLIENT_GATEWAY_BACKEND_CONTAINER_PORT,  
};