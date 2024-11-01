import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsTitleUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly productService: ProductsService) {}

  async validate(title: string) {
    const product = await this.productService.findOne({ where: { title } });
    return !product;
  }

  defaultMessage() {
    return 'Title $value already exists. Choose another title.';
  }
}

export function IsProductTitleUnique(validationOptions?: ValidationOptions) {
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
