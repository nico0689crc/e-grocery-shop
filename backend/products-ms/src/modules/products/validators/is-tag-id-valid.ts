import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { TagsService } from 'src/modules/tags/tags.service';
import { In } from 'typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsTagIdValidConstraint implements ValidatorConstraintInterface {
  constructor(private readonly tagsService: TagsService) {}

  async validate(tags: string[]) {
    if (!tags || tags.length === 0) {
      return true;
    }
    const tagIds = await this.tagsService.findBy({ id: In(tags) });
    return tagIds.length === tags.length;
  }

  defaultMessage() {
    return 'One or more tag IDs are invalid.';
  }
}

export function IsTagIdValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTagIdValidConstraint,
    });
  };
}
