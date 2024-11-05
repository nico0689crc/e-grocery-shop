import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { CreateTagInput } from './dto/inputs/create-tag.input';
import { UpdateTagInput } from './dto/inputs/update-tag.input';
import { TagsResponse } from './responses/tags-response.dto';
import { Auth } from 'src/core/decorators/auth.decorator';
import { TagResponse } from './responses/tag-response.dto';
import { UserRole } from '../users/entities/user.entity';

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

  @Query(() => TagResponse, { name: 'tag' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<TagResponse> {
    const tag = await this.tagsService.findOne({
      where: { id },
      relations: ['products'],
    });

    return {  
      message: 'Tag fetched successfully',
      statusCode: 200,
      data: tag,
    };
  }

  @Mutation(() => TagResponse)
  @Auth(UserRole.ADMINISTRATOR)
  async createTag(
    @Args('createTagInput') createTagInput: CreateTagInput,
  ): Promise<TagResponse> {
    const tag = await this.tagsService.create(createTagInput);

    return { 
      message: 'Tag created successfully',
      statusCode: 201,
      data: tag,
    };
  }

  @Mutation(() => TagResponse)
  @Auth(UserRole.ADMINISTRATOR)
  async updateTag(
    @Args('updateTagInput') updateTagInput: UpdateTagInput,
  ): Promise<TagResponse> {
    await this.tagsService.update(updateTagInput);

    return {
      message: 'Tag updated successfully',
      statusCode: 200,
    };
  }

  @Mutation(() => TagResponse)
  @Auth(UserRole.ADMINISTRATOR)
  async removeTag(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TagResponse> {
    await this.tagsService.remove(id);

    return { message: 'Tag removed successfully', statusCode: 204 };
  }
}
