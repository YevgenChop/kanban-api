import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

@Injectable()
export class EmailService {
  constructor(@InjectSendGrid() private client: SendGridService) {}

  public async sendVerificationEmail(to: string, token: string): Promise<void> {
    await this.client.send({
      to,
      subject: 'Verify token',
      text: `Please follow this link to verify your email: http://localhost:3000/auth/verify?token=${token}`,
    });
  }
}
