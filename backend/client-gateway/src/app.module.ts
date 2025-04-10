import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { envs } from "./config/envs"

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context: ({ req }) => ({ req }),
      },
      gateway: {
        supergraphSdl: process.env.NODE_ENV === 'production'
          ? require('fs').readFileSync(require('path').join(process.cwd(), 'supergraph.graphql')).toString()
          : new IntrospectAndCompose({
            subgraphs: [
              { name: 'auth', url: envs.clientGatewayBackendAuthenticationMsHost },
              { name: 'products', url: envs.clientGatewayBackendProductsMsHost },
            ],
          }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              if (context?.req?.headers?.authorization) {
                request.http.headers.set('authorization', context.req.headers.authorization);
              }
            },
          });
        },
      },
    }),
  ],
})
export class AppModule {}
