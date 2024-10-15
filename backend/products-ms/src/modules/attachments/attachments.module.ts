import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsResolver } from './attachments.resolver';

@Module({
  providers: [AttachmentsResolver, AttachmentsService],
})
export class AttachmentsModule {}
