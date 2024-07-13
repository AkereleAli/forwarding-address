import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserGenderType } from './user.entity';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Field first_name must be added' })
  @IsString()
  first_name: string;

  @IsNotEmpty({ message: 'Field other_names must be added' })
  @IsString()
  other_names: string;

  @IsNotEmpty({ message: 'Field email must be added' })
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Field gender must be added' })
  gender: UserGenderType;

  @IsNotEmpty({ message: 'Field address must be added' })
  @IsString()
  address: string;

  @IsNotEmpty({ message: 'Field phone must be added' })
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty({ message: 'Field password must be added' })
  @IsString()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
