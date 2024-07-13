import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // Replace with your email service provider
      auth: {
        user: `${process.env.G_MAIL}`, // Replace with your email
        pass: `${process.env.G_MAIL_PASS}`, // Replace with your email password
      },
    });
  }
  async sendPasswordResetEmail(email: string, resetLink: string) {
    await this.transporter.sendMail({
      from: `${process.env.G_MAIL}`,
      to: email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetLink}`,
      html: `<a href="${resetLink}">Click here to reset your password</a>`,
    });
  }
}
