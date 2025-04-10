import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { CommonModule } from './core/common.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { TagsModule } from './modules/tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './core/config';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';

@Module({
  imports: [
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
      introspection: true,
      playground: false,
      plugins: [
        // Install a landing page plugin based on NODE_ENV
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              graphRef: 'my-graph-id@my-graph-variant',
              footer: false,
            })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
      buildSchemaOptions:{
        orphanedTypes: [User],
      }
    }),
    CategoriesModule,
    ProductsModule,
    CommonModule,
    AttachmentsModule,
    AttachmentsModule,
    TagsModule,
    UsersModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
      .forRoutes('graphql');
  }
}
