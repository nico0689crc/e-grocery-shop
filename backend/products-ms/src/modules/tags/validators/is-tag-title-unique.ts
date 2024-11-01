import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { TagsService } from '../tags.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsTitleUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly tagService: TagsService) {}

  async validate(name: string) {
    const product = await this.tagService.findOne({ where: { name } });
    return !product;
  }

  defaultMessage() {
    return 'Title $value already exists. Choose another title.';
  }
}

export function IsTagTitleUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTitleUniqueConstraint,
    });
  };
}
