import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  Param,
  Request,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { RegisterUserResponseDto } from './response/register-user.dto';
import { User } from './user.entity';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDeco } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/auth/decorators/public.decorators';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateUserDto } from './update-user.dto';
// import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post('/register')
  registerUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<string> {
    return this.userService.registerUser(createUserDto);
  }

  // @UseGuards(JwtRolesGuard)
  // @UseGuards(AuthGuard('jwt'))
  @Roles(Role.USER)
  @Get('user-details')
  findById(@UserDeco() userDeco): Promise<User> {
    console.log(userDeco, userDeco.user_id, `Hey: ${userDeco.role}`);

    return this.userService.findById(userDeco.user_id);
  }

  // @Public()
  @Roles(Role.ADMIN)
  @Get('get-users')
  findUsers(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Patch(':id') // PUT requests to update menu by ID
  update(
    @Param('user_id') user_id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(user_id, updateUserDto);
  }
}
