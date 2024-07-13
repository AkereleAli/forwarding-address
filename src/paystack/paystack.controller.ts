import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { Public } from 'src/auth/decorators/public.decorators';

@Public()
@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Post('initialize')
  async initializePayment(
    @Body('email') email: string,
    @Body('amount') amount: number,
  ) {
    return await this.paystackService.initializePayment(email, amount);
  }

  @Post('verify')
  // async verifyPayment(@Param('reference') reference: string) {
  //   return await this.paystackService.verifyPayment(reference);
  // }
  async verifyPayment(@Body('reference') reference: string) {
    return await this.paystackService.verifyPayment(reference);
  }
}
