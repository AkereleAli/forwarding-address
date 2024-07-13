import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { AccessToken } from './types/acces-token';
import { Role } from 'src/enums/role.enum';
import { MailService } from './mail.service';
import { ForgetPasswordDto } from './forget-password.dto';
import { ResetPasswordDto } from 'src/user/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.userService.findOneByEmail(email);
    if (!user) throw new BadRequestException('user not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('password does not match');
    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = {
      email: user.email,
      user_id: user.user_id,
      role: user.role,
    };
    console.log(payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(forgetPasswordDto: ForgetPasswordDto): Promise<void> {
    const { email } = forgetPasswordDto;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.jwtService.sign(
      { email },
      { secret: `${process.env.JWT_SECRET}`, expiresIn: '1h' },
    );
    const resetLink = `http://localhost:3000?token=${token}`;

    await this.mailService.sendPasswordResetEmail(user.email, resetLink);
    console.log(`token: ${token}`);
  }

  async resetPassword(
    token: string,
    resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    let email: string;
    try {
      const payload = this.jwtService.verify(token, {
        secret: `${process.env.JWT_SECRET}`,
      });
      email = payload.email;
    } catch (e) {
      throw new BadRequestException('Invalid or expired token');
    }

    const user = await this.userService.findOneByEmail(email);
    console.log(`before: ${user.password}`);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);
    resetPasswordDto.password = hashedPassword;
    await this.userService.update(user.user_id, resetPasswordDto);

    console.log(`after: ${user.password}`);
  }
}
