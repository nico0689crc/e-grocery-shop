import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttachmentsService } from './attachments.service';
import { Attachment } from './entities/attachment.entity';
import { CreateAttachmentInput } from './dto/create-attachment.input';
import { UpdateAttachmentInput } from './dto/update-attachment.input';

@Resolver(() => Attachment)
export class AttachmentsResolver {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Mutation(() => Attachment)
  createAttachment(
    @Args('createAttachmentInput') createAttachmentInput: CreateAttachmentInput,
  ) {
    return this.attachmentsService.create(createAttachmentInput);
  }

  @Query(() => [Attachment], { name: 'attachments' })
  findAll() {
    return this.attachmentsService.findAll();
  }

  @Query(() => Attachment, { name: 'attachment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attachmentsService.findOne(id);
  }

  @Mutation(() => Attachment)
  updateAttachment(
    @Args('updateAttachmentInput') updateAttachmentInput: UpdateAttachmentInput,
  ) {
    return this.attachmentsService.update(
      updateAttachmentInput.id,
      updateAttachmentInput,
    );
  }

  @Mutation(() => Attachment)
  removeAttachment(@Args('id', { type: () => Int }) id: number) {
    return this.attachmentsService.remove(id);
  }
}
