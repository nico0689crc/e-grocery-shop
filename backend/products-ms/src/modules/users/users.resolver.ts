import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly productsService: ProductsService) {}

    @ResolveField(() => [Product])
    async products(@Parent() user: User): Promise<Product[]> {
      return await this.productsService.findBy({ creator: user.id });
    }
}
