import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class ResetPasswordDto extends PartialType(CreateUserDto) {}
