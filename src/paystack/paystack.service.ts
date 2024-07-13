import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaystackService {
  private readonly secretKey = process.env.PAYSTACK_SECRET_KEY;

  async initializePayment(email: string, amount: number): Promise<any> {
    const url = 'https://api.paystack.co/transaction/initialize';
    const headers = {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };
    const data = {
      email,
      amount: amount * 100,
    };

    try {
      const response = await axios.post(url, data, { headers });
      delete response.data.data.access_code;
      console.log(response.data);

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyPayment(reference: string): Promise<any> {
    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const headers = {
      Authorization: `Bearer ${this.secretKey}`,
    };

    try {
      const response = await axios.get(url, { headers });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
