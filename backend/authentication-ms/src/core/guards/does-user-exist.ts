import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql'; // Import GqlExecutionContext
import { Observable } from 'rxjs';
import { Services } from '../constants';
import { UserAlreadyExists } from '../exceptions/user-already-exists';
import { UsersService } from 'src/modules/users/users.service';
import { SignUpInput } from 'src/modules/auth/dto/inputs/signup.input';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(@Inject(Services.USERS) private userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const args = gqlContext.getArgs();

    return this.validateRequest(args);
  }

  async validateRequest(args: {signupInput : SignUpInput}) {
    const user = await this.userService.findOne({
      where: {
        email: args.signupInput.email,
      },
    });

    if (user) {
      throw new UserAlreadyExists();
    }

    return true;
  }
}
