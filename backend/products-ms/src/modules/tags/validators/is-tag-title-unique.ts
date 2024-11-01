import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments, // Import ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { TagsService } from '../tags.service';
import { log } from 'console';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsTitleUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly tagService: TagsService) {}

  async validate(name: string, args: ValidationArguments) { // Add args parameter
    const { id } = args.object as any; // Access id from the input object
    const tag = await this.tagService.findBy({ name });
    
    // If id is present, exclude the current tag from the uniqueness check
    if (id) {
      return tag.length === 0 || (tag.length === 1 && tag[0].id === id);
    }
    
    return tag.length === 0;
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
