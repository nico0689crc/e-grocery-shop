import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: DeepPartial<User>): Promise<User> {
    return await this.userRepository.save({
      ...createUserInput,
      password: bcrypt.hashSync(createUserInput.password, 10),
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(params: Partial<FindOneOptions<User>>): Promise<User> {
    return await this.userRepository.findOne(params);
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
