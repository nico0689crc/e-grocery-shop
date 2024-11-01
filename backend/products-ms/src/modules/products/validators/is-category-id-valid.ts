import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { In } from 'typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCategoryIdValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly categoriesService: CategoriesService) {}

  async validate(categories: string[]) {
    const categoryIds = await this.categoriesService.findOne({
      id: In(categories),
    });
    return categoryIds.length === categories.length;
  }

  defaultMessage() {
    return 'One or more category IDs are invalid.';
  }
}

export function IsCategoryIdValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCategoryIdValidConstraint,
    });
  };
}
