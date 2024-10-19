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
import { Category } from '../entities/category.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCategoriesExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async validate(
    categoryIds: string[],
    args: ValidationArguments,
  ): Promise<boolean> {
    const categories = await this.categoryRepository.findByIds(categoryIds);
    return categories.length === categoryIds.length;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Some categories do not exist';
  }
}

export function IsCategoriesExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCategoriesExistConstraint,
    });
  };
}
