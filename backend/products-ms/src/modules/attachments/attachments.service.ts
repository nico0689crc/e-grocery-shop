import { Injectable } from '@nestjs/common';
import { CreateAttachmentInput } from './dto/create-attachment.input';
import { UpdateAttachmentInput } from './dto/update-attachment.input';

@Injectable()
export class AttachmentsService {
  create(createAttachmentInput: CreateAttachmentInput) {
    return 'This action adds a new attachment';
  }

  findAll() {
    return `This action returns all attachments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attachment`;
  }

  update(id: number, updateAttachmentInput: UpdateAttachmentInput) {
    return `This action updates a #${id} attachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachment`;
  }
}
