import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { CreateTagInput } from './dto/inputs/create-tag.input';
import { UpdateTagInput } from './dto/inputs/update-tag.input';
import { TagsResponse } from './responses/tags-response.dto';
import { Auth } from 'src/core/decorators/auth.decorator';
import { UserRole } from 'src/core/entities/user.entity';

@Resolver(() => Tag)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query(() => TagsResponse, { name: 'tags' })
  async findAll(
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 })
    page: number = 1,
    @Args('pageSize', { type: () => Int, nullable: true, defaultValue: 10 })
    pageSize: number = 10,
  ): Promise<TagsResponse> {
    return await this.tagsService.findAll({
      search,
      page,
      pageSize,
    });
  }

  @Query(() => Tag, { name: 'tag' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tagsService.findOne({ where: { id } });
  }

  @Mutation(() => Tag)
  @Auth(UserRole.ADMINISTRATOR)
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagsService.create(createTagInput);
  }

  @Mutation(() => Tag)
  @Auth(UserRole.ADMINISTRATOR)
  updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return this.tagsService.update(updateTagInput.id, updateTagInput);
  }

  @Mutation(() => Tag)
  @Auth(UserRole.ADMINISTRATOR)
  removeTag(@Args('id', { type: () => ID }) id: string) {
    return this.tagsService.remove(id);
  }
}
