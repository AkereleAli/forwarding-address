import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AccessTokenPayload } from './types/access-token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: AccessTokenPayload) {
    // const user = await this.userService.findById(payload.sub);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return { user_id: payload.sub, email: payload.username };
    return payload;
  }
}
