import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDetailsResponseDto {
  @Expose()
  first_name: string;

  @Expose()
  other_names: string;

  @Expose()
  email: string;

  @Expose()
  gender: string;

  @Expose()
  phone: string;

  @Expose()
  address: string;
}