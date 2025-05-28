import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto, PaymentStatus } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { v4 as uuidv4 } from 'uuid';
import Stripe from "stripe";
import * as QRCode from 'qrcode';
import { NodemailerService } from './email/nodemailer.service';

@Injectable()
export class PaymentsService {
  private stripe =  new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2025-04-30.basil' });
  constructor(
    private prisma: PrismaService, 
    private emailService: NodemailerService
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    // Verify that museumId exists
    const museum = await this.prisma.museum.findUnique({
      where: { museumId: createPaymentDto.museumId },
    });
    
    if (!museum) {
      throw new NotFoundException(`Museum with ID ${createPaymentDto.museumId} not found`);
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'vnd', 
            product_data: {
              name: museum.museumName || 'Museum Visit', 
            },
            unit_amount: createPaymentDto.totalPrice * 100, 
          },
          quantity: createPaymentDto.quantity || 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment/status?status=success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/status?status=cancel`,
    });
    
    const result = await this.prisma.payment.create({
      data: {
        paymentId: uuidv4(),
        ...createPaymentDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    if (!result){
      throw new BadRequestException('Failed to create payment');
    }
    return { url: session.url };
  }

  async findAll() {
    return this.prisma.payment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { paymentId: id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }
  async updatePaymentStatus(sessionId: string, status: string) {
    const payment = await this.findOne(sessionId);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${sessionId} not found`);
    }

    if (payment.status === PaymentStatus.COMPLETED) {
      throw new BadRequestException('Payment already completed');
    }
    
    // Update the payment status first
    const updatedPayment = await this.update(sessionId, { status: status as PaymentStatus });
    
    // If status is now COMPLETED, send email asynchronously (don't await)
    if (status === PaymentStatus.COMPLETED) {
      this.sendConfirmationEmail(payment).catch(error => {
        console.error('Failed to send confirmation email:', error);
      });
    }
    
    return updatedPayment;
  }
  
  // Separate method for sending confirmation email
  private async sendConfirmationEmail(payment: any) {
    try {
      const qrData = JSON.stringify({
        bookingId: payment.paymentId,
        email: payment.userEmail,
      });

      // Generate QR code as base64 - make sure it's properly formatted for embedding in HTML
      let qrCodeBase64 = await QRCode.toDataURL(qrData);
      
      // Log the QR code to verify it's being generated correctly
      console.log('QR Code generated successfully, length:', qrCodeBase64.length);
      
      // Ensure the QR code has the proper data URI prefix
      if (!qrCodeBase64.startsWith('data:image/png;base64,')) {
        qrCodeBase64 = 'data:image/png;base64,' + qrCodeBase64;
      }
      
      // Create email HTML content with embedded QR code
      const htmlContent = `
        <div style="max-width:600px;margin:auto;padding:24px;font-family:Arial,sans-serif;background:#f9f9f9;border-radius:12px;border:1px solid #eee;">
          <div style="text-align:center;">
            <img src="https://your-company-logo-url.com/logo.png" alt="Company Logo" style="max-width:120px;margin-bottom:18px;">
          </div>
          <h2 style="color:#2b2e4a;">Booking Confirmed!</h2>
          <p style="font-size:16px;color:#333;">
            Hello <b>${payment.userEmail}</b>,
          </p>
          <p style="font-size:16px;color:#333;">
            Thank you for your purchase. Your booking has been successfully completed. Please find your ticket details below. Present the QR code at the entrance for fast check-in.
          </p>
          <table style="width:100%;background:#fff;border-radius:8px;padding:16px 8px;margin:20px 0;font-size:15px;">
            <tr>
              <td style="font-weight:bold;width:150px;">Booking ID:</td>
              <td>${payment.paymentId}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;">Date:</td>
              <td>${payment.bookingDate || 'N/A'}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;">Email:</td>
              <td>${payment.userEmail}</td>
            </tr>
          </table>
          <div style="text-align:center;margin:24px 0;">
            <img src="${qrCodeBase64}" alt="QR Code" style="width:160px;height:160px;border:8px solid #fff;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.08);"/>
            <p style="margin-top:10px;color:#777;">Scan this QR code to check in</p>
          </div>
          <div style="font-size:14px;color:#666;">
            <p>
              If you have any questions, please contact our support team at <a href="mailto:support@yourcompany.com" style="color:#3867d6;">support@yourcompany.com</a>.
            </p>
            <p>
              We look forward to seeing you at the event!
            </p>
            <p style="margin-top:32px;font-size:13px;color:#aaa;text-align:center;">
              &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
            </p>
          </div>
        </div>
      `;

      
      
      try {
        // Send email using Nodemailer with Gmail
        const response = await this.emailService.sendEmail(
          payment.userEmail,
          'Your Ticket Booking Confirmation',
          htmlContent
        );
        
        console.log(`Confirmation email sent to ${payment.userEmail} via Nodemailer`);
      } catch (emailError) {
        console.error('Nodemailer service error:', emailError.message || emailError);
        console.log(`[FALLBACK] Email would be sent to ${payment.userEmail}`);
        console.log(`[FALLBACK] With subject: Your Ticket Booking Confirmation`);
      }
    } catch (error) {
      console.error('Error sending confirmation email with Nodemailer:', error);
      // Don't throw the error - we don't want to affect the main flow
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      return await this.prisma.payment.update({
        where: { paymentId: id },
        data: {
          ...updatePaymentDto,
          
        },
      });
    } catch (error) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.payment.delete({
        where: { paymentId: id },
      });
    } catch (error) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
