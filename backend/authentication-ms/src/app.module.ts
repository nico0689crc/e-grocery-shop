import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { envs } from './core/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.postgresHost || 'localhost',
      port: 5432,
      username: envs.postgresUser || 'your_username',
      password: envs.postgresPassword || 'your_password',
      database: envs.postgresDb || 'your_database',
      autoLoadEntities: true,
      synchronize: false,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        path: join(process.cwd(), 'src/schema.gql'),
        federation: 2,
      },
      plugins: [
        // Install a landing page plugin based on NODE_ENV
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              graphRef: 'my-graph-id@my-graph-variant',
              footer: false,
            })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
      playground: false,
      introspection: true
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
