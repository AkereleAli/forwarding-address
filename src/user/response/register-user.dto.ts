import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RegisterUserResponseDto {
  @Expose()
  first_name: string;

  @Expose()
  other_names: string;

  @Expose()
  email: string;
}
