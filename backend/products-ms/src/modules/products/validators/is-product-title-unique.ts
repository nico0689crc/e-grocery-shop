import {
  registerDecorator,
  ValidationArguments,
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

  async validate(title: string, args: ValidationArguments) {
    const { id } = args.object as any; 
    const product = await this.productService.findBy({ title });
    
    if (id) {
      return product.length === 0 || (product.length === 1 && product[0].id === id);
    }
    
    return product.length === 0;
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
