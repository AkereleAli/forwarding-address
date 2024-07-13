import {
  Body,
  Controller,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './decorators/public.decorators';
import { ForgetPasswordDto } from './forget-password.dto';
import { ResetPasswordDto } from 'src/user/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    await this.authService.forgotPassword(forgetPasswordDto);
    return { message: 'Password reset link sent' };
  }

  @Public()
  @Patch('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    await this.authService.resetPassword(token, resetPasswordDto);
    return { message: 'Password has been reset' };
  }
}
