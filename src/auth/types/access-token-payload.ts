import { Role } from 'src/enums/role.enum';

export type AccessTokenPayload = {
  user_id: string;
  email: string;
  role: Role;
};
