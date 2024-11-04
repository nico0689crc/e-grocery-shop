import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../categories.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCategoryTitleUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoriesService) {}

  async validate(title: string, args: ValidationArguments) {
    const { id } = args.object as any; 
    const tag = await this.categoryService.findBy({ title });
    
    if (id) {
      return tag.length === 0 || (tag.length === 1 && tag[0].id === id);
    }
    
    return tag.length === 0;
  }

  defaultMessage() {
    return 'Title $value already exists. Choose another title.';
  }
}

export function IsCategoryTitleUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCategoryTitleUniqueConstraint,
    });
  };
}
