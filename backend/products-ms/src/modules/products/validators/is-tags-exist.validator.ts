import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/modules/tags/entities/tag.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsTagsExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async validate(
    tagIds: string[],
    args: ValidationArguments,
  ): Promise<boolean> {
    const tags = await this.tagRepository.findByIds(tagIds);
    return tags.length === tagIds.length;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Some tags do not exist';
  }
}

export function IsTagsExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTagsExistConstraint,
    });
  };
}
