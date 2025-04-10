import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  CLIENT_GATEWAY_BACKEND_HOST_PORT: string;
  CLIENT_GATEWAY_BACKEND_CONTAINER_PORT: string;
  CLIENT_GATEWAY_BACKEND_AUTHENTICATION_MS_HOST: string;
  CLIENT_GATEWAY_BACKEND_PRODUCTS_MS_HOST: string;
}

const envsSchema = joi.object<EnvVars>({
  CLIENT_GATEWAY_BACKEND_HOST_PORT: joi.string().required(),
  CLIENT_GATEWAY_BACKEND_CONTAINER_PORT: joi.string().required(),
  CLIENT_GATEWAY_BACKEND_AUTHENTICATION_MS_HOST: joi.string().required(),
  CLIENT_GATEWAY_BACKEND_PRODUCTS_MS_HOST: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({ 
  ...process.env
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;

export const envs = {
  clientGatewayBackendHostPort: envVars.CLIENT_GATEWAY_BACKEND_HOST_PORT,
  clientGatewayBackendContainerPort: envVars.CLIENT_GATEWAY_BACKEND_CONTAINER_PORT, 
  clientGatewayBackendAuthenticationMsHost: envVars.CLIENT_GATEWAY_BACKEND_AUTHENTICATION_MS_HOST, 
  clientGatewayBackendProductsMsHost: envVars.CLIENT_GATEWAY_BACKEND_PRODUCTS_MS_HOST, 
};