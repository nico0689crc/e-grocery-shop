import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { CommonModule } from './core/common.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { TagsModule } from './modules/tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './core/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.postgresHost || 'localhost',
      port: parseInt(envs.postgresContainerPort, 10) || 5432,
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
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ProductsModule,
    CommonModule,
    AttachmentsModule,
    CategoriesModule,
    AttachmentsModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
