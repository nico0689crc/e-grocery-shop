import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

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
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            // { name: 'auth', url: 'http://authentication-ms-backend:3000/graphql' },
            { name: 'products', url: 'http://products-ms-backend:3000/graphql' },
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
