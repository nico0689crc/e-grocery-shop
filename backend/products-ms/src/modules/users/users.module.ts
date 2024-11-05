import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { UsersResolver } from './users.resolver';

@Module({
    imports: [ProductsModule],
    providers: [UsersResolver],
})
export class UsersModule {}
