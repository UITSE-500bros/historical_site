import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(NodemailerService.name);

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    // Use Gmail for sending real emails
    this.logger.log('Initializing Gmail transporter for sending real emails');
    
    // Check if Gmail credentials are available
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      this.logger.warn('Gmail credentials not found in environment variables!');
      this.logger.warn('Please set GMAIL_USER and GMAIL_APP_PASSWORD in your .env file');
    }
    
    // Create a real Gmail transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASSWORD || '',
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    html: string
  ) {
    try {
      const mailOptions = {
        from: `"${process.env.SMTP_USER}" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
      };

      const result = await this.transporter.sendMail(mailOptions);

      // Log the email sending result regardless of environment
      this.logger.log(`Email sent via Gmail: ${result.messageId}`);
      this.logger.log(`Email sent to: ${to}`);
      this.logger.log(`Email subject: ${subject}`);

      return result;
    } catch (error) {
      this.logger.error('Error sending email via Nodemailer:', error);
      throw error;
    }
  }
}
