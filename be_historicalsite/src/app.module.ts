import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeriodsModule } from './modules/periods/periods.module';
import { TopicsModule } from './modules/topics/topics.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SentryModule } from '@sentry/nestjs/setup';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot(),
    PrismaModule,
    PeriodsModule,
    TopicsModule,
    ArticlesModule,
    AuthModule,
    FeedbacksModule,
    PaymentsModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SMTP_FROM,
      },
    }),
  ],
  providers: [
    AppService
  ],
  controllers: [AppController],
})
export class AppModule {}